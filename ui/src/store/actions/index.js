export const setToken = tokens => {
    return {
        type: 'SET_TOKEN',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }
}