import { axiosClassic } from '../api/interceptors'

import { IAuthResponse } from '../shared/interface/user.interface'

import { removeTokensStorage, saveToStorage } from './auth.helper'



export const AuthService = {
    async login(email: string, password: string) { 
		const response = await axiosClassic.post<IAuthResponse>( 
			('/auth/login'),
			{ email, password } 
		)
		if (response.data.accessToken) { 
			saveToStorage(response.data)
		}
		return response.data
	},

	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			('/auth/register'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	},

	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')

	},
}