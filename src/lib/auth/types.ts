import { User } from "firebase/auth"

export interface AuthResponse {
  success: boolean
  message: string
  user?: User | null
  error?: {
    code: string
    message: string
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: Error | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string
}

export interface ResetPasswordCredentials {
  email: string
}

export interface UpdatePasswordCredentials {
  newPassword: string
  confirmPassword: string
}
