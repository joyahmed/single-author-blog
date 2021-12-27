import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto'
	}
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

export default function NavBar() {
	const { user, loading } = useUser();
	//console.log(user);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const LoginLink = () => (
		//eslint-disable-next-line
		<a className='navLink' href='/api/auth/login'>
			Login
		</a>
	);

	const LogoutLink = () => (
		//eslint-disable-next-line
		<a className='navLink' href='/api/auth/logout'>
			Logout
		</a>
	);

	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const UserImage = ({ src, alt }) => {
		return <Avatar src={src} alt={alt} width={40} height={40} />;
	};

	const UserName = ({ title }) => {
		return <a className='navLink'>{title}</a>;
	};

	//#region main menu

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{/* 			<MenuItem onClick={handleMenuClose}>Update Profile</MenuItem> */}
			<MenuItem onClick={handleMenuClose}>
				<LogoutLink />
			</MenuItem>
		</Menu>
	);

	// #endregion main menu

	// #region  mobile menu
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{user &&
				user['https://rubas-blog.com/roles'] &&
				user['https://rubas-blog.com/roles'].includes('admin') && (
					<MenuItem>
						<Button
							className='navItem'
							variant='text'
							size='large'
							style={{ backgroundColor: 'transparent' }}
						>
							{/* eslint-disable-next-line */}
							<a className='navLink' href='/dashboard'>
								<SettingsIcon fontSize='small' />{' '}
								<span style={{ paddingLeft: '10px' }}>Dashboard</span>
							</a>
						</Button>
					</MenuItem>
				)}
			{user ? (
				<MenuItem>
					<Button
						className='navItem'
						variant='text'
						size='large'
						style={{ backgroundColor: 'transparent' }}
					>
						{/* eslint-disable-next-line */}
						<a className='navLink' href='/api/auth/logout'>
							<LogoutIcon fontSize='small' />{' '}
							<span style={{ paddingLeft: '10px' }}>Logout</span>
						</a>
					</Button>
				</MenuItem>
			) : (
				<MenuItem>
					<Button
						className='navLink'
						variant='text'
						size='large'
						style={{ backgroundColor: 'transparent' }}
					>
						{/* eslint-disable-next-line */}
						<a className='navLink' href='/api/auth/login'>
							<LogoutIcon fontSize='small' />{' '}
							<span style={{ paddingLeft: '10px' }}>Login</span>
						</a>
					</Button>
				</MenuItem>
			)}
		</Menu>
	);

	// #endregion mobile menu

	return (
		// #region main menu render
		<Box sx={{ flexGrow: 0 }}>
			<AppBar
				position='static'
				style={{
					color: 'white',
					boxShadow: 'none'
				}}
			>
				<Toolbar>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ ml: 1, mr: 4 }}
					>
						<Link href='/'>
							<a>RB</a>
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{
							display: {
								xs: 'none',
								md: 'flex',
								alignItems: 'center'
							}
						}}
					>
						{user &&
							user['https://rubas-blog.com/roles'] &&
							user['https://rubas-blog.com/roles'].includes(
								'admin'
							) && (
								<Link href='/dashboard'>
									<a className='navLink'>
										<Typography
											sx={{
												display: {
													xs: 'none',
													sm: 'block'
													// marginRight: 4 + 'px'
												}
											}}
										>
											Dashboard
										</Typography>
									</a>
								</Link>
							)}
						{!user && (
							<Link href='/api/auth/login'>
								<a>
									<Typography
										sx={{ display: { xs: 'none', sm: 'block' } }}
										style={{ marginRight: '30px' }}
									>
										Login
									</Typography>
								</a>
							</Link>
						)}
						{user ? (
							<>
								<Typography
									sx={{
										display: {
											xs: 'none',
											sm: 'block'
											// minWidth: 100
										}
									}}
									style={{ marginLeft: '10px', marginRight: '-5px' }}
								>
									<UserImage src={user.picture} alt={user.name} />
								</Typography>
								<Typography
									sx={{
										display: {
											xs: 'none',
											sm: 'block'
											//minWidth: 100
										}
									}}
								>
									<UserName title={user.name} />
								</Typography>
								<Typography
									sx={{
										display: {
											xs: 'none',
											sm: 'block'
										}
									}}
								>
									{/* eslint-disable-next-line */}
									<a className='navLink' href='/api/auth/logout'>
										<Box mr={2}>Logout</Box>
									</a>
								</Typography>
							</>
						) : null}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
