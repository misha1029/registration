import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import '../app/assets/styles/globals.scss'
import AuthProviders from '../app/providers/auth-providers/AuthProviders'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProviders>
				<Component {...pageProps} />
			</AuthProviders>
		</QueryClientProvider>
	)
}

export default MyApp
