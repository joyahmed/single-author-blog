import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Post from '@/components/Post';
import { styled } from '@mui/styles';
import Link from 'next/link';
import CategoryList from './CategoryList';

const PostGrid = styled(Grid)({
	marginTop: '30px',
	maxWidth: '100%'
});

const PostContainer = styled(Container)({
	marginTop: '30px',
	maxWidth: '100%'
});

const HIDDEN = 'hidden';

const EmptyGrid = styled(Grid)`
	@media (min-width: ${p => p.theme.breakpoints.values.xs}px) {
		display: ${p => (p.xs === HIDDEN ? 'none' : 'flex')};
	}
`;

const PostList = ({
	posts,
	user,
	uniqueCategories,
	handleDelete,
	comment,
	setComment,
	postComment,
	page,
	loading
}) => {
	return (
		<>
			<PostContainer container justifyContent='center' sx={{width: '100%'}}>
				<PostGrid container sx={{width: '100%'}}>
					{posts && posts.length > 0 && !loading && (
						<>
							<Grid item md={12} lg={2} sx={{ pt: 5, mt: 5 }}>
								{/* {page !== 'category' && (
									<CategoryList
										posts={posts}
										uniqueCategories={uniqueCategories}
									/>
								)} */}
							</Grid>
							<Grid item xs={12} md={8}>
								{page !== 'category' && (
									<PostGrid
										container
										justifyContent='center'
										sx={{ mt: 3 }}
									>
										<Typography variant='h4' color='gray'>
											<Link href='/'>
												<a>Recent Blogs</a>
											</Link>
										</Typography>
									</PostGrid>
								)}
								<PostGrid container>
									{posts.map(post => (
										<Post
											key={post._id}
											post={post}
											user={user}
											handleDelete={handleDelete}
											comment={comment}
											setComment={setComment}
											postComment={postComment}
											page={page}
										/>
									))}
								</PostGrid>
							</Grid>
							<Grid item xs={12} md={2} sx={{ pt: 10, mt: 10 }}>
								{page !== 'category' && (
									<CategoryList
										posts={posts}
										uniqueCategories={uniqueCategories}
									/>
								)}
							</Grid>
						</>
					)}
				</PostGrid>
			</PostContainer>
		</>
	);
};

export default PostList;
