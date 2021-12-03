import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import EditPostForm from '@/components/Forms/EditPostForm';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/styles';
import { kebabCase } from 'lodash';
import PostDetail from '@/components/PostDetail';
import CircularProgress from '@mui/material/CircularProgress';

const TypeGrid = styled(Grid)({
	marginTop: '30px',
	justifyContent: 'center'
});

const PostContainer = styled(Container)({
	marginTop: '30px'
});

const EditPost = () => {
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState({});
	const [posts, setPosts] = useState('');
	const [category, setCategory] = useState('');
	const [comments, setComments] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(true);

	const [post, setPost] = useState({});
	const { user } = useUser();
	// router
	const router = useRouter();
	// modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// list
	const [disabled, setDisabled] = useState(false);

	const { id } = router.query;

	const editedSlug = encodeURI(kebabCase(title));

	//console.log('id =>', id);

	const fetchPost = async () => {
		//	console.log('id => ', id);

		try {
			const { data } = await axios.get(`/api/posts/${id}`);
			console.log(data);
			setPost(data);
			setTitle(data.title);
			setCategory(data.category);
			setSlug(data.slug);
			setContent(data.content);
			setImage(data.image);
			setComments(data.comments);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const page = 'admin';
	useEffect(() => {
		if (id) {
			fetchPost();
			populateCateogry();
		}
	}, [id]); //eslint-disable-line

	const handleList = event => {
		setDisabled(true);
		setCategory(event.target.value);
	};

	const populateCateogry = async () => {
		try {
			const { data } = await axios.get('/api/posts');
			setPosts(data);
			//console.log('[id]=>', data);
		} catch (error) {
			console.log(error);
		}
	};

	const postSubmit = async e => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`/api/posts/${id}`, {
				title,
				editedSlug,
				content,
				category,
				image
			});
			//console.log('create post responsee => ', data);
			if (data.error) {
				toast.error(data.error);
			} else {
				fetchPost();
				handleClose();
				toast.success('Post updated successfully!');
				router.push('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
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

	const handleImage = async e => {
		const images = e.target.files[0];
		let data = new FormData();
		data.append('file', images);
		data.append('upload_preset', 'UnsignedUpload');
		//console.log([...data]);
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

	const [commentContent, setCommentContent] = useState('');

	let heartBy = '';
	let commentBy = '';
	let userImage = '';
	let userEmail = '';
	if (user) {
		heartBy = user.name;
		commentBy = user.name;
		userImage = user.picture;
		userEmail = user.email;
	}
	//console.log('commentBy=>', commentBy);

	let heartCount = 0;
	const [heart, setHeart] = useState(heartCount);

	const makeHeart = async () => {
		if (!user) {
			toast.error('You need to be loggend in to heart.');
		} else {
			try {
				const { data } = await axios.post('/api/posts/hearts', {
					postId: id,
					heartBy: heartBy,
					userImage: userImage,
					userEmail: userEmail
				});
				heartCount++;
				setHeart(heartCount);
				console.log(heartCount);
				fetchPost();
				console.log('create heart responsee => ', data);
				toast.success('💖💖💖');
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getComments = async () => {
		//	console.log('id => ', id);

		try {
			const { data } = await axios.get(`/api/posts/comments/${id}`);
			console.log(data);

			setComments(data.comments);
		} catch (error) {
			console.log(error);
		}
	};

	const postComment = async e => {
		if (e.target.value < 0) {
			setDisabled(true);
		}
		if (!user) {
			toast.error('You need to be logged in to post comment.');
		} else {
			try {
				const { data } = await axios.post('/api/posts/comments', {
					postId: id,
					commentContent: commentContent,
					commentBy: commentBy,
					userImage: userImage
				});
				fetchPost();
				console.log('create comment responsee => ', data);
				setCommentContent('');
				toast.success('Comment posted successfully!');
			} catch (error) {
				console.log(error);
			}
		}
	};

	const removeComment = async (postId, comment) => {
		console.log(postId, comment);
		/* 		let answer = window.confirm('Are you sure?');
		if (!answer) return; */

		try {
			const { data } = await axios.put('/api/posts/comments/${id}', {
				postId,
				comment
			});
			fetchPost();
			toast.success('Comment removed successfully!');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{post && !loading ? (
				<PostContainer>
					<PostDetail
						post={post}
						heartCount={heartCount}
						heart={heart}
						setHeart={setHeart}
						makeHeart={makeHeart}
						commentBy={commentBy}
						commentContent={commentContent}
						setCommentContent={setCommentContent}
						postComment={postComment}
						page={page}
						title={title}
						setTitle={setTitle}
						slug={slug}
						handleList={handleList}
						disabled={disabled}
						setDisabled={setDisabled}
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
						open={open}
						setOpen={setOpen}
						handleOpen={handleOpen}
						handleClose={handleClose}
						removeComment={removeComment}
						handleDelete={handleDelete}
					/>
				</PostContainer>
			) : (
				<Grid
					container
					sx={{ height: 100 + 'vh' }}
					alignItems='center'
					justifyContent='center'
				>
					<CircularProgress
						sx={{ color: 'steelblue', height: 3 + 'em' }}
					/>
				</Grid>
			)}
		</>
	);
};

export default EditPost;
