import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';
import Container from '@mui/material/Container';
import PostList from '@/components/PostList';
import { styled } from '@mui/styles';

const PostContainer = styled(Container)({
	marginTop: '30px',
	maxWidth: '100%'
});

export default function Dashboard() {
	const { user } = useUser();
	//console.log('user => ', user);
	// state
	// posts
	const [posts, setPosts] = useState([]);

	const page = 'public';

	// router
	const router = useRouter();

	useEffect(() => {
		populatePosts();
	}, []);

	const populatePosts = async () => {
		try {
			const { data } = await axios.get('/api/posts');
			setPosts(data);
			//console.log('dashboard=>', data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<PostContainer justifyContent='center' sx={{width: '100%'}}>
				<PostList posts={posts} user={user} page={page} />
			</PostContainer>
		</>
	);
}

export const getServerSideProps = withPageAuthRequired();
