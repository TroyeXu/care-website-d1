export interface StorageProvider {
  upload(key: string, data: Blob | Buffer | Uint8Array, type: string): Promise<string>
  getUrl(key: string): string
  delete(key: string): Promise<boolean>
}

/**
 * Mock Storage Provider for Development
 */
class MockStorageProvider implements StorageProvider {
  async upload(key: string, data: Blob | Buffer | Uint8Array, type: string): Promise<string> {
    console.log('\n===== 📁 MOCK FILE UPLOAD 📁 =====')
    console.log('Key:', key)
    console.log('Type:', type)
    console.log('Size:', data instanceof Blob ? data.size : data.length)
    console.log('==================================\n')

    // In a real mock, we might save to disk, but for now just return a fake URL
    // that points to a placeholder image service or local asset
    return `https://placehold.co/600x400?text=${encodeURIComponent(key)}`
  }

  getUrl(key: string): string {
    return `https://placehold.co/600x400?text=${encodeURIComponent(key)}`
  }

  async delete(key: string): Promise<boolean> {
    console.log(`Mock file deleted: ${key}`)
    return true
  }
}

/**
 * R2 Storage Provider for Production (Placeholder)
 * This would typically use aws-sdk or Cloudflare R2 bindings
 */
class R2StorageProvider implements StorageProvider {
  private bucket: any // R2Bucket binding

  constructor(bucket: any) {
    this.bucket = bucket
  }

  async upload(key: string, data: Blob | Buffer | Uint8Array, type: string): Promise<string> {
    if (!this.bucket) throw new Error('R2 Bucket not configured')

    await this.bucket.put(key, data, {
      httpMetadata: { contentType: type },
    })

    return this.getUrl(key)
  }

  getUrl(key: string): string {
    // Assuming a public domain is mapped to the bucket
    const publicDomain = process.env.PUBLIC_STORAGE_URL || 'https://storage.example.com'
    return `${publicDomain}/${key}`
  }

  async delete(key: string): Promise<boolean> {
    if (!this.bucket) return false
    await this.bucket.delete(key)
    return true
  }
}

// Singleton instance
let storageProvider: StorageProvider | null = null

export function getStorageProvider(event?: any): StorageProvider {
  if (storageProvider) return storageProvider

  // In Cloudflare Workers, the bucket binding comes from the event context
  const bucket = event?.context?.cloudflare?.env?.STORAGE_BUCKET

  if (process.env.NODE_ENV === 'production' && bucket) {
    storageProvider = new R2StorageProvider(bucket)
  } else {
    storageProvider = new MockStorageProvider()
  }

  return storageProvider
}

/**
 * Helper to upload file
 */
export async function uploadFile(
  key: string,
  data: Blob | Buffer | Uint8Array,
  type: string
): Promise<string> {
  const provider = getStorageProvider()
  return provider.upload(key, data, type)
}
