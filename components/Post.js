import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';
import renderHTML from 'react-render-html';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { styled } from '@mui/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	wrapIcon: {
		alignItems: 'center',
		display: 'flex'
	}
}));

const Post = ({ post }) => {
	//console.log(user);
	//console.log('postspage=>', post)

	const classes = useStyles();
	return (
		<>
			{post && (
				<Grid item xs={12} sm={12} md={12} sx={{ mt: 5 }}>
					<Link href={`/posts/${post._id}`}>
						<a>
							<Card sx={{ height: { md: '100%' } }}>
								<CardActionArea sx={{ pb: 0 }}>
									<Grid container sx={{ position: 'relative' }}>
										<Grid item xs={12} md={6}>
											<Grid item xs={12} md={6} sx={{ pl: 1, pt: 3 }}>
												<Typography
													variant='h4'
													color='secondary'
													sx={{
														fontSize: { xs: '1.5em', md: '1.1em' }
													}}
												>
													{post.category && post.category}
												</Typography>
											</Grid>
											<Grid
												item
												xs={12}
												md={10}
												sx={{ pl: 1, pt: 2, pb: 2 }}
											>
												<Typography
													variant='h3'
													color='steelblue'
													sx={{
														fontSize: { xs: '2em', md: '2.3em' }
													}}
												>
													{post.title && post.title}
												</Typography>
											</Grid>

											<Grid
												container
												sx={{
													justifyContent: 'center',
													textAlign: 'center',
													position: { md: 'absolute' },
													bottom: { md: 0 },
													width: { md: '50%' }
												}}
											>
												<Grid
													item
													xs={5}
													md={5}
													sx={{ p: 1 }}
													color='steelblue'
												>
													<Typography
														sx={{
															fontSize: {
																xs: '1em',
																md: '1em',
																textAlign: 'left',
																color: 'steelblue'
															}
														}}
													>
														{moment(post.createdAt).format(
															'DD MMMM YYYY'
														)}
													</Typography>
												</Grid>
												<Grid
													item
													xs={2}
													md={3}
													sx={{ p: 1 }}
													color='gray'
												>
													<Typography
														sx={{
															textAlign: 'center'
														}}
														className={classes.wrapIcon}
													>
														<small style={{ paddingRight: '2px' }}>
															{post &&
																post.hearts &&
																post.hearts.length}
														</small>
														<FavoriteIcon
															size='small'
															sx={{ color: 'red', fontSize: '1rem' }}
														/>
													</Typography>
												</Grid>
												<Grid
													item
													md={4}
													xs={5}
													sx={{ p: 1 }}
													color='tomato'
												>
													<Typography
														sx={{
															fontSize: {
																xs: '1em',
																md: '1em',
																textAlign: 'right',
																color: 'steelblue'
															}
														}}
													>
														{post.comments.length} Comments
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12} md={6}>
											{post && post.image && (
												<CardMedia
													sx={{ objectFit: 'cover' }}
													component='img'
													image={post.image.url}
													alt={post.title}
													style={{ height: { xs: 500, md: 400 } }}
												/>
											)}
										</Grid>
									</Grid>
								</CardActionArea>
							</Card>
						</a>
					</Link>
				</Grid>
			)}
		</>
	);
};

export default Post;
