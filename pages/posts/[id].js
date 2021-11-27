import { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import EditPostForm from '@/components/EditPostForm';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import Post from '@/components/Post';
import { styled } from '@mui/styles';
import { kebabCase } from 'lodash';


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
	const [category, setCategory] = useState('');
	const [uploading, setUploading] = useState(false);

	const [post, setPost] = useState({});
	const { user } = useUser();
	// router
	const router = useRouter();

	const { id } = router.query;

	const editedSlug = encodeURI(kebabCase(title));

	console.log('id =>', id);
	useEffect(() => {
		if (id) {
			fetchPost();
		}
	}, [id]);

	const fetchPost = async () => {
		console.log('id => ', id);
		try {
			const { data } = await axios.get(`/api/posts/${id}`);
			console.log(data);
			setPost(data);
			setTitle(data.title);
			setCategory(data.category);
			setSlug(data.slug);
			setContent(data.content);
			setImage(data.image);
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
				//populatePosts();
				toast.success('Post updated successfully!');
				router.push('/dashboard')
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleImage = async e => {
		const images = e.target.files[0];
		let data = new FormData();
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

	return (
		<PostContainer>
			{user &&
				user[`${process.env.AUTH0_NAMESPACE}/roles`].includes(
					'admin'
				) ? (
					<EditPostForm
						title={title}
						setTitle={setTitle}
						slug={slug}
						editedSlug={editedSlug}
						setSlug={setSlug}
						content={content}
						setContent={setContent}
						category={category}
						setCategory={setCategory}
						postSubmit={postSubmit}
						handleImage={handleImage}
						uploading={uploading}
						image={image}
					/>
				) : (<Post post={post} user={user} />)}

		</PostContainer>
	);
};

export default EditPost;

/* export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`api/posts/${slug}`);
	const post = await res.json();
	console.log(post)

	return {
		props: {}
	};
} */
