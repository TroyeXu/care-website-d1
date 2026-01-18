import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { nanoid } from 'nanoid'
import { uploadFile } from '../utils/storage'
import { createSuccessResponse } from '../utils/api-response'
import { handleError } from '../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 檢查認證（如果有需要）
    // const user = await requireAuth(event)

    const multipartData = await readMultipartFormData(event)
    if (!multipartData || multipartData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded',
      })
    }

    const file = multipartData[0] // 假設只上傳第一個檔案

    // 驗證檔案類型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    if (!file.type || !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file type. Allowed: jpg, png, gif, pdf',
      })
    }

    // 驗證檔案大小 (例如最大 5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.data.length > MAX_SIZE) {
      throw createError({
        statusCode: 400,
        message: 'File too large. Max size: 5MB',
      })
    }

    const extension = file.type === 'application/pdf' ? 'pdf' : file.type.split('/')[1]
    const key = `uploads/${nanoid()}.${extension}`

    // 上傳檔案
    const url = await uploadFile(key, file.data, file.type)

    return createSuccessResponse({
      url,
      params: {
        key,
        type: file.type,
        size: file.data.length
      }
    }, '檔案上傳成功')

  } catch (error: any) {
    handleError(error, '檔案上傳')
  }
})
