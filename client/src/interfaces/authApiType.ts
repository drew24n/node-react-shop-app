export interface registerType {
    name: string
    lastName: string
    email: string
    password: string
}

export interface loginType {
    email: string
    password: string
}

export interface userApiResponseType {
    success: boolean
    message: string
}

export interface authResponseType {
    isAuthorized: boolean
    id: string | undefined
    email: string | undefined
    name: string | undefined
    lastName: string | undefined
    role: number | undefined
}