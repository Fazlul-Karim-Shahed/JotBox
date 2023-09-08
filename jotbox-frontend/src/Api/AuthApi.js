
import axios from 'axios'

export const SigninApi = (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND + '/api/user/signin', obj).then(data => data.data).catch(err => err) 

    return data

}


export const SignupApi = (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND + '/api/user/signup', obj).then(data => data.data).catch(err => err)

    return data

}