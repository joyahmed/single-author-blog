import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CreatePostForm from '@/components/CreatePostForm';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import PostList from '@/components/PostList';
import { styled } from '@mui/styles';
import { kebabCase } from 'lodash';

const TypeGrid = styled(Grid)({
	marginTop: '30px',
	justifyContent: 'center'
});

const PostContainer = styled(Container)({
	marginTop: '30px'
});

export default function Dashboard() {
	const { user } = useUser();

	//const { data, error, loading } = useGetPosts();
	// state
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState({});
	const [category, setCategory] = useState('');
	const [uploading, setUploading] = useState(false);
	// posts
	const [posts, setPosts] = useState([]);

	// modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// router
	// router
	const router = useRouter();

	const { id } = router.query;

	const slug = encodeURI(kebabCase(title));

	useEffect(() => {
		populatePosts();
	}, []);

	const postSubmit = async e => {
		e.preventDefault();

		try {
			const { data } = await axios.post('api/posts', {
				title,
				slug,
				content,
				category,
				image
			});
			//console.log('create post responsee => ', data);
			if (data.error) {
				toast.error(data.error);
			} else {
				handleClose();
				populatePosts();
				toast.success('Post created successfully!');
				setTitle('');
				setContent('');
				setCategory('');
				setImage({});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const populatePosts = async () => {
		try {
			const { data } = await axios.get('/api/posts');
			setPosts(data);
			console.log('dashboard=>', data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleImage = async e => {
		const images = e.target.files[0];
		let data = new FormData();
		/* 		for (let i = 0; i < images.length; i++) {
			data.append('file', images[i]);
		} */
		data.append('file', images);
		data.append('upload_preset', 'UnsignedUpload');
		console.log([...data]);
		setUploading(true);

		fetch(
			`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`,
			{
				method: 'post',
				body: data
			}
		)
			.then(resp => resp.json())
			.then(data => {
				console.log('uploaded image => ', data);
				setImage({
					url: data.url,
					public_id: data.public_id
				});
				setUploading(false);
			})
			.catch(err => console.log(err));
	};

	const handleDelete = async post => {
		try {
			const answer = window.confirm('Are you sure?');
			if (!answer) {
				return;
			}
			const { data } = await axios.delete(`/api/posts/${post._id}`);
			console.log(data);
			toast.error('Post deleted');
			router.push('/dashboard');
			populatePosts();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<PostContainer>
				{user &&
					user[`${process.env.AUTH0_NAMESPACE}/roles`].includes(
						'admin'
					) && (
						<CreatePostForm
							title={title}
							setTitle={setTitle}
							slug={slug}
							content={content}
							setContent={setContent}
							category={category}
							setCategory={setCategory}
							postSubmit={postSubmit}
							handleImage={handleImage}
							uploading={uploading}
							image={image}
							open={open}
							setOpen={setOpen}
							handleOpen={handleOpen}
							handleClose={handleClose}
						/>
					)}
				<PostList
					posts={posts}
					user={user}
					handleDelete={handleDelete}
				/>
			</PostContainer>
		</>
	);
}

export const getServerSideProps = withPageAuthRequired();
