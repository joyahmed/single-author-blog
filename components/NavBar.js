import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';

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
			<MenuItem onClick={handleMenuClose}>Update Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				{user ? (
					<p>
						<LogoutLink />
					</p>
				) : (
					<p>
						<LoginLink />
					</p>
				)}
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
			{user && (
				<MenuItem>
					<IconButton size='large' color='inherit'>
						<SettingsIcon fontSize='small' />
					</IconButton>
					<p>Admin Dashboard</p>
				</MenuItem>
			)}
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton size='large' aria-haspopup='true' color='inherit'>
					<PersonIcon fontSize='small' />
				</IconButton>
				<p> Update Profile</p>
			</MenuItem>
			{user ? (
				<LogoutLink style={{ width: '100%', display: 'block' }}>
					<MenuItem>
						<IconButton
							size='large'
							aria-haspopup='true'
							color='inherit'
						>
							<LogoutIcon fontSize='small' />
						</IconButton>
					</MenuItem>
				</LogoutLink>
			) : (
				<MenuItem>
					<IconButton
						size='large'
						aria-haspopup='true'
						color='inherit'
					>
						<LoginIcon fontSize='small' />
					</IconButton>
					<p>
						<LoginLink />
					</p>
				</MenuItem>
			)}
		</Menu>
	);

	// #endregion mobile menu

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				style={{ color: 'white', boxShadow: 'none' }}
			>
				<Toolbar>
					<Link href='/'>
						<a>
							<Typography
								variant='h6'
								noWrap
								component='div'
								sx={{ ml: 1, mr: 4 }}
							>
								RB
							</Typography>
						</a>
					</Link>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							sx={{
								display: {
									xs: 'none',
									xs: 'flex',
									alignItems: 'center'
								}
							}}
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>

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
						{user ? (
							<Typography
								sx={{ display: { xs: 'none', sm: 'block' } }}
							>
								<Link href='/dashboard'>
									<a className='navLink'>Dashboard</a>
								</Link>
							</Typography>
						) : (
							<Typography
								sx={{ display: { xs: 'none', sm: 'block' } }}
								style={{ marginRight: '30px' }}
							>
								<LoginLink />
							</Typography>
						)}

						{user && (
							<>
								<Typography
									sx={{
										display: {
											xs: 'none',
											sm: 'block',
											minWidth: 100
										}
									}}
									style={{ marginLeft: '10px', marginRight: '-50px' }}
								>
									<UserImage src={user.picture} alt={user.name} />
								</Typography>
								<Typography
									sx={{
										display: {
											xs: 'none',
											sm: 'block',
											minWidth: 100
										}
									}}
								>
									<UserName title={user.name} />
								</Typography>
							</>
						)}
						<IconButton
							style={{ marginLeft: '-30px' }}
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							{user && (
								<>
									<Typography sx={{ minWidth: 50 }}>
										<Tooltip title=''>
											<IconButton
												onClick={handleClick}
												size='big'
												sx={{ mr: 1, color: 'white' }}
											>
												<ArrowDropDownIcon onClick={handleClick} />
											</IconButton>
										</Tooltip>
									</Typography>
								</>
							)}
						</IconButton>
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
