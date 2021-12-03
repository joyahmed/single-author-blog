import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import Layout from '@/components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import theme from '../src/theme';
import NavBar from '@/components/NavBar';

export default function MyApp(props) {
	const { Component, pageProps } = props;
	return (
		<UserProvider>
			<ThemeProvider theme={theme}>
				<Layout>
					<NavBar />
					<CssBaseline />
					<Component {...pageProps} />
					<ToastContainer />
				</Layout>
			</ThemeProvider>
		</UserProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired
};
