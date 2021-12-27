import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import PublicPage from '@/components/PublicPage';
import { styled } from '@mui/styles';

const PostContainer = styled(Container)({
	marginTop: '30px',
	maxWidth: '100%'
});

const useStyles = makeStyles(theme => ({
	hero: {
		position: 'relative',
		display: 'flex',

		justifyContent: 'center',
		alignItems: 'center',
		color: '#000',
		fontSize: '4rem'
		/* 		[theme.breakpoints.down('sm')]: {
			height: 300,
			fontSize: '3em'
		} */
	},
	blogsContainer: {
		paddingTop: theme.spacing(3)
	},
	blogTitle: {
		fontWeight: 800,
		paddingBottom: theme.spacing(3)
	},
	card: {
		maxWidth: '100%'
	},
	media: {
		height: 240
	},
	cardActions: {
		display: 'flex',
		margin: '0 10px',
		justifyContent: 'space-between'
	},
	container: { widht: '100%' }
	/* 	author: {
		display: 'flex'
	},
	paginationContainer: {
		display: 'flex',
		justifyContent: 'center'
	} */
}));

const HomeBody = () => {
	const classes = useStyles();
	return (
		<>
			<Grid
				container
				sx={{ height: '100%', width: '100%', p: 0 }}
				style={{ width: '100%' }}
				width='100vw'
			>
				<Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
					<Box>
						{/* 						<Image
						className='image'
							layout='fill'
							src='/images/header-image.jpg'
							alt='hero'
							priority
						/> */}
						{/* eslint-disable-next-line */}
						<img className='image' src='/images/header-image.jpg' />
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					order={{ xs: 1, md: 2 }}
					sx={{
						display: 'flex',
						alignItems: 'center',
						textAlign: 'center',
						padding: { xs: 5 }
					}}
				>
					<Grid
						container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100%',
							p: 0
						}}
					>
						{/* <Grid item xs={12}> */}
						{/* eslint-disable-next-line */}
						<Typography variant='h4' color='gray'>
							Ruba's Blog {/* eslint-disable-line */}
						</Typography>
						{/* </Grid> */}
						{/* <Grid item xs={12}>
														<Typography variant='subtitle1'>
								Contrary to popular belief, Lorem Ipsum is not simply
								random text.
							</Typography>
						</Grid> */}
					</Grid>
				</Grid>
			</Grid>

			<PostContainer>
				<PublicPage />
			</PostContainer>
		</>
	);
};

export default HomeBody;
