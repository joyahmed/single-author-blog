import Grid from '@mui/material/Grid';
import Post from '@/components/Post';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostDetail from '../../../components/PostDetail';
import PostList from '../../../components/PostList';
import { useState } from 'react';

export default function PostByCategory({ posts, category }) {
	const [disabled, setDisabled] = useState(false);
	//const cat = { category };
	const page = 'category';
	return (
		<>
			<Grid
				container
				style={{ textAlign: 'center', paddingTop: '20px' }}
			>
				<Grid item xs='12' md='12' pt={3}>
					<Typography variant='h5' color='secondary'>
						Posts in Category: {category}
					</Typography>
				</Grid>
			</Grid>
			{posts && <PostList posts={posts} page={page} />}
		</>
	);
}

export async function getServerSideProps({ params: { category } }) {
	const response = await fetch(
		`${process.env.AUTH0_BASE_URL}/api/posts/category/${category}`
	);

	const data = await response.json();
	//console.log({ category });

	return {
		props: {
			posts: data,
			category: category
		}
	};
}
