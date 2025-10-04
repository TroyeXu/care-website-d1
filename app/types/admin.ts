// 管理員相關類型定義

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  is_super: boolean
  permissions: string[]
  avatar?: string
  user_id?: string
  role_id?: string
  department?: string
  last_login?: string
  created_at?: string
}

export interface AdminLoginResponse {
  success: boolean
  admin: AdminUser
}

export interface AdminMeResponse {
  admin: AdminUser
}
