// 生成 PBKDF2 密碼雜湊的工具腳本
// 用法: node scripts/generate-password-hash.mjs <password>

async function hashPasswordCrypto(password) {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  )

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )

  const exported = await crypto.subtle.exportKey('raw', key)
  const hashArray = Array.from(new Uint8Array(exported))
  const saltArray = Array.from(salt)

  // 組合 salt 和 hash
  return (
    saltArray.map((b) => b.toString(16).padStart(2, '0')).join('') +
    ':' +
    hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  )
}

// 主程式
const password = process.argv[2] || 'Test123!'

console.log('密碼:', password)
const hash = await hashPasswordCrypto(password)
console.log('雜湊:', hash)
console.log('\n可以在 SQL 中使用:')
console.log(`'${hash}'`)
