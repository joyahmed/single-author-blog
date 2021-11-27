import React from 'react';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Post from '@/components/Post';
import { styled } from '@mui/styles';
import Link from 'next/link'

const PostGrid = styled(Grid)({
	marginTop: '30px'
});

const HIDDEN = 'hidden';

const EmptyGrid = styled(Grid)`
	@media (min-width: ${p => p.theme.breakpoints.values.xs}px) {
		display: ${p => (p.xs === HIDDEN ? 'none' : 'flex')};
	}
`;

const PostList = ({ posts, user, handleDelete }) => {
	/* 	const oddEven = () => {
		const content = [];

		posts.map((post, index) => {
			if (index % 2 === 0) {
				content.push(
					<>
						<Grid item xs={12} md={8}>
							<Post key={post._id} post={post} user={user} />
						</Grid>
						<EmptyGrid xs='hidden' item md={4}></EmptyGrid>
					</>
				);
			} else {
				content.push(
					<>
						<EmptyGrid xs='hidden' item md={4}></EmptyGrid>
						<Grid item xs={12} md={8}>
							<Post key={post._id} post={post} user={user} />
						</Grid>
					</>
				);
			}
		});
		return content;
	}; */

	return (
		<>
			<Grid container spacing={5}>
				{posts && (
					<>
						<Grid item xs={6} md={1}></Grid>
						<Grid item xs={12} md={10}>
							<PostGrid
								container
								justifyContent='center'
								sx={{ mt: 3 }}
							>
								<Link href='/'>
									<a>
										<Typography variant='h4' color='gray'>
								  		Latest Blogs
										</Typography>
								</a>
								</Link>
							</PostGrid>
							<PostGrid container spacing={3}>
								{posts.map(post => (
									<Post key={post._id} post={post} user={user} handleDelete={handleDelete} />
								))}
							</PostGrid>
						</Grid>
					</>
				)}
			</Grid>
		</>
	);
};

export default PostList;
