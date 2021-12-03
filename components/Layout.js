import NavBar from './NavBar';
import Footer from './Footer';
import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
	return (
		<>
			{/* 			<NavBar /> */}
			{children}
			<Footer />
		</>
	);
}
