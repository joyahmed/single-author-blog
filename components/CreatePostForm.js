import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false
});
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormGroup, Input, TextField, Button } from '@mui/material';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';

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

const CreatePostForm = ({
	title,
	setTitle,
	slug,
	content,
	setContent,
	category,
	setCategory,
	postSubmit,
	handleImage,
	uploading,
	image,
	open,
	setOpen,
	handleOpen,
	handleClose
}) => {
	/* 	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false); */
	return (
		<PostFormGrid>
			<Box sx={{ textAlign: 'center' }}>
				<Button
					variant='contained'
					component='span'
					onClick={handleOpen}
				>
					➕ Add New Blog
				</Button>
			</Box>

			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Paper>
						<Paper>
							<form>
								<Grid container>
									<Grid item xs={12} md={8}>
										<Grid item xs={12}>
											<Box p={1}>
												<Grid container spacing={2}>
													<Grid item xs={12} md={4}>
														<TextField
															variant='standard'
															label='Blog Title'
															type='title'
															value={title}
															onChange={e => setTitle(e.target.value)}
															placeholder='title'
														/>
													</Grid>
													<Grid item xs={12} md={4}>
														<TextField
															variant='standard'
															label='Blog Category'
															type='text'
															value={category}
															onChange={e =>
																setCategory(e.target.value)
															}
															placeholder='Category'
														/>
													</Grid>
													<Grid item xs={12} md={4}>
														<TextField
															variant='standard'
															label='Slug'
															type='slug'
															value={slug}
															onChange={e => setTitle(e.target.value)}
															placeholder='slug'
															disabled
														/>
													</Grid>
												</Grid>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Box p={1}>
												<ReactQuill
													theme='snow'
													value={content}
													onChange={e => setContent(e)}
													placeholder='Write your blog content...'
													style={{ color: 'black' }}
												/>
											</Box>
										</Grid>
									</Grid>
									<Grid
										item
										xs={12}
										md={4}
										sx={{ textAlign: 'center' }}
									>
										<Paper>
											<label>
												<input
													accept='image/*'
													id='contained-button-file'
													type='file'
													hidden
												/>
											</label>
											<label>
												<input
													accept='image/*'
													type='file'
													onChange={handleImage}
													hidden
												/>
												<IconButton
													color='primary'
													aria-label='upload picture'
													component='span'
												>
													<Button
														variant='contained'
														component='span'
													>
														<PhotoCamera sx={{ mr: 1 }} />
														Upload Image
													</Button>
												</IconButton>
											</label>
										</Paper>
										<Paper>
											<Typography>Image Preview</Typography>
										</Paper>
										{uploading && (
											<Grid
												container
												justify='center'
												style={{
													display: 'flex',
													justifyContent: 'center'
												}}
											>
												<CircularProgress />
											</Grid>
										)}
										<Paper>
											{image && image.url && (
												<Image
													height={300}
													width={300}
													src={image.url}
													alt='image'
												/>
											)}
										</Paper>
									</Grid>
								</Grid>
							</form>
						</Paper>

						<Grid container sx={{ justifyContent: 'center' }}>
							<Paper>
								<ButtonGroup variant='contained' color='primary'>
									<Button
										disabled={!content}
										color='secondary'
										startIcon={<SaveAsIcon />}
									>
										Save Draft
									</Button>
									<Button
										disabled={!content}
										onClick={postSubmit}
										color='primary'
										endIcon={<SaveIcon />}
									>
										Publish Post
									</Button>
								</ButtonGroup>
							</Paper>
						</Grid>
					</Paper>
				</Box>
			</Modal>
		</PostFormGrid>
	);
};

export default CreatePostForm;
