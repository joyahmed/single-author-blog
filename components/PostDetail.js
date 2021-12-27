import React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';
import renderHTML from 'react-render-html';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { styled } from '@mui/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import CommentForm from '@/components/Forms/CommentForm';
import { useUser } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import CommentsComponent from './CommentsComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartComponent from './HeartComponent';
import EditPostForm from '@/components/Forms/EditPostForm';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	wrapIcon: {
		alignItems: 'center',
		display: 'flex'
	}
}));

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '1px solid #fbfbfb',
	borderRadius: '5px',
	boxShadow: 24,
	p: 2
};

const PostFormGrid = styled(Grid)({
	marginTop: '30px'
});

const PostContainer = styled(Container)({
	marginTop: '30px',
	maxWidth: '100%'
});

const PostDetail = ({
	id,
	post,
	handleDelete,
	commentBy,
	commentContent,
	setCommentContent,
	postComment,
	page,
	title,
	setTitle,
	slug,
	handleList,
	disabled,
	setDisabled,
	category,
	editedSlug,
	setSlug,
	content,
	setContent,
	posts,
	setCategory,
	postSubmit,
	handleImage,
	uploading,
	image,
	open,
	handleOpen,
	handleClose,
	heartCount,
	heart,
	setHeart,
	makeHeart,
	removeComment
}) => {
	const { user } = useUser();

	const classes = useStyles();

	let numberOfComments = 0;
	if (post.comments && post.comments.length) {
		numberOfComments = post.comments.length;
	}

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<EditPostForm
						post={post}
						title={title}
						setTitle={setTitle}
						slug={slug}
						handleList={handleList}
						disabled={disabled}
						category={category}
						editedSlug={editedSlug}
						setSlug={setSlug}
						content={content}
						setContent={setContent}
						posts={posts}
						setCategory={setCategory}
						postSubmit={postSubmit}
						handleImage={handleImage}
						uploading={uploading}
						image={image}
					/>
				</Box>
			</Modal>

			{post && (
				<PostContainer justifyContent='center'>
					<Grid container>
						<Grid item xs={12} md={12} sx={{ mt: 10, mb: 10 }}>
							<Grid item xs={12}>
								<Typography variant='h4' color='secondary'>
									Category : {post.category && post.category}
								</Typography>
							</Grid>

							<Grid item xs={12} sx={{ pt: 1 }}>
								<Typography variant='h3' color='steelblue'>
									{post.title && post.title}
								</Typography>
							</Grid>

							<Grid
								container
								justifyContent='flex-start'
								sx={{ pt: 1 }}
							>
								<Box pr={2}>
									<Typography>
										<small>
											{moment(post.createdAt).format('DD MMMM YYYY')}
										</small>
									</Typography>
								</Box>

								<Box
									pr={2}
									sx={{ display: 'flex', alignItems: 'center' }}
								>
									<Typography className={classes.wrapIcon}>
										<small style={{ paddingRight: '2px' }}>
											{post && post.hearts && post.hearts.length}
										</small>
										<FavoriteIcon
											size='small'
											sx={{ color: 'red', fontSize: '1rem' }}
											disabled={disabled}
										/>
									</Typography>
								</Box>
								<Box>
									<Typography color='steelblue'>
										<small>
											{numberOfComments && numberOfComments} Comments
										</small>
									</Typography>
								</Box>
							</Grid>

							<Grid item xs={12} sx={{ pt: 1 }}>
								<Typography color='steelblue'>
									{post.content && renderHTML(post.content)}
								</Typography>
							</Grid>

							<Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
								{post.image && (
									<CardMedia
										sx={{ objectFit: 'cover' }}
										component='img'
										image={post.image.url}
										alt={post.title}
										width='100%'
										height='auto'
									/>
								)}
							</Grid>

							<Grid
								item
								xs={12}
								sx={{
									pt: 1,
									pb: 1,
									display: 'flex',
									alignItems: 'center'
								}}
							>
								<HeartComponent
									heartCount={heartCount}
									heart={heart}
									setHeart={setHeart}
									makeHeart={makeHeart}
									numberOfComments={numberOfComments}
									post={post}
									disabled={disabled}
									setDisabled={setDisabled}
								/>
							</Grid>

							<Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
								{post.comments && post.comments.length > 0 && (
									<CommentsComponent
										id={id}
										post={post}
										disabled={disabled}
										commentBy={commentBy}
										removeComment={removeComment}
									/>
								)}
							</Grid>
							<Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
								<CommentForm
									commentBy={commentBy}
									commentContent={commentContent}
									setCommentContent={setCommentContent}
									postComment={postComment}
								/>
							</Grid>

							{user &&
							user['https://rubas-blog.com/roles'] &&
							user['https://rubas-blog.com/roles'].includes(
								'admin'
							) &&
							post ? (
								<Grid
									container
									item
									xs={12}
									style={{
										justifyContent: 'center',
										marginTop: '20px'
									}}
								>
									<ButtonGroup>
										<Button
											variant='contained'
											size='large'
											startIcon={<EditIcon />}
											color='info'
											onClick={handleOpen}
										>
											<Link href={`/posts/${post._id}`}>
												<a>Edit Post</a>
											</Link>
										</Button>

										<Button
											variant='contained'
											size='large'
											endIcon={<DeleteIcon />}
											color='error'
											onClick={() => handleDelete(post)}
										>
											Delete Post
										</Button>
									</ButtonGroup>
								</Grid>
							) : null}
						</Grid>
					</Grid>
				</PostContainer>
			)}
		</>
	);
};

export default PostDetail;
