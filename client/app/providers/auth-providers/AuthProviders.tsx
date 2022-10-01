import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { AuthService } from '../../services/auth.service'
import { IContext, TypeUserState } from './auth.interface'

export const AuthContext = createContext({} as IContext)

const AuthProviders: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			const user = JSON.parse(localStorage.getItem('user') || '')
			setUser(user)
		}
	}, []) // при 1 загрузке срабатывает получаем токен из КУКОВ, если токен есть значит авторизация существует достаем юзера из ЛОКАЛСТОРАДЖА и сохраняем в стейт


	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken && !user) {
			AuthService.logout()

			setUser(null)
		}
	}, [pathname])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProviders;
