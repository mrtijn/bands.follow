export const setToken = tokens => {
    console.log(tokens)
    return {
        type: 'SET_TOKEN',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }
}