
export type UserInfo = {
    user: {
        username: string,
        first_name: string,
        last_name: string,
        email: string,
    } | null
    access_token: string
}