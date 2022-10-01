import Cookies from 'js-cookie'
import { IAuthResponse } from '../shared/interface/user.interface'



export const saveTokensStorage = (accessToken: string) => {
	Cookies.set('accessToken', accessToken)
}

export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
