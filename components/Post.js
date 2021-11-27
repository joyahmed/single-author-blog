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

const PostCardContent = styled(Grid)({});

const PostCardMedia = styled(CardMedia)({});

const PostCardHeader = styled(CardHeader)({});

const Post = ({ post, user, handleDelete }) => {
	//console.log(user);
	//console.log('postspage=>', post)
	return (
		<>
			{post && (
				<Grid item xs={12} sm={12} md={12}>
					<Link href={`/posts/${post._id}`}>
						<a>
							<Card>
								<CardActionArea>
									<Grid container>
										<Grid item xs={6}>
											<Grid item xs={12} sx={{ p: 1 }}>
												<Typography variant='h5' color='secondary'>
													{post.category && post.category}
												</Typography>
											</Grid>
											<Grid item xs={12} sx={{ p: 1 }}>
												<Typography variant='h4' color='steelblue'>
													{post.title && post.title}
												</Typography>
											</Grid>
											<Grid item xs={12} sx={{ p: 1 }} color='tomato'>
												<Typography>
													<small>
														{moment(post.createdAt).fromNow()}
													</small>
												</Typography>
											</Grid>
										</Grid>
										<Grid item xs={6}>
											<Grid item xs={12}>
												{post && post.image && (
													<CardMedia
														sx={{ objectFit: 'cover' }}
														component='img'
														image={post.image.url}
														alt={post.title}
														height='200'
													/>
												)}
											</Grid>
										</Grid>
									</Grid>

									<PostCardContent sx={{ pt: 0 }}>
										{user &&
										user[`${process.env.AUTH0_NAMESPACE}/roles`].includes(
											'admin'
										) &&
										post ? (
											<Grid container>
												<Grid item xs={6}>
													<Button
														variant='contained'
														size='small'
														color='info'
													>
														<Link href={`/posts/${post._id}`}>
															<a>
																<EditIcon /> Edit
															</a>
														</Link>
													</Button>
												</Grid>
												<Grid item xs={6} sx={{ textAlign: 'right' }}>
													<Button
														variant='contained'
														size='small'
														color='error'
														onClick={() => handleDelete(post)}
													>
														<DeleteIcon />
														Delete
													</Button>
												</Grid>
											</Grid>
										) : null}
									</PostCardContent>
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
