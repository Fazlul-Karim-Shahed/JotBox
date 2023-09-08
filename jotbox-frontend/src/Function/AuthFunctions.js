
export const saveTokenToLocal = decodedToken => {

    const token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN)
    if (token != null) {
        localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN)
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN, JSON.stringify(decodedToken))
    }
    else {
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN, JSON.stringify(decodedToken))
    }

}

export const checkAuth = () => {
    let token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN)
    if (token != null) {
        token = JSON.parse(token)
        let currentTime = new Date().getTime()
        if (currentTime < new Date(token.exp * 1000)) return true
        else return false

    }
    else return false
}


export const tokenDecode = () => {

    if (checkAuth()) {
        const token = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN))
        return token
    }
    else return {}

}

