import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Layout from '@/components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
					<ToastContainer />
				</Layout>
			</ThemeProvider>

		</UserProvider>
	);
}

export default MyApp;
