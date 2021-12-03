import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false
});
import CircularProgress from '@mui/material/CircularProgress';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { getUniqueCategories } from '@/helper';
import AddIcon from '@mui/icons-material/Add';

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
	posts,
	handleList,
	disabled,
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
	const categories = getUniqueCategories(posts);

	return (
		<PostFormGrid>
			<Box sx={{ textAlign: 'center' }}>
				<Button
					variant='contained'
					color='info'
					onClick={handleOpen}
					sx={{ color: '#fff', pt: 1.5 }}
					startIcon={<AddIcon sx={{ marginBottom: 2 + 'px' }} />}
				>
					Add New Blog
				</Button>
			</Box>

			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Paper>
						<form>
							<Grid container>
								<Grid item xs={12} md={8}>
									<Grid item xs={12}>
										<Box p={1}>
											<Grid container spacing={2}>
												<Grid item xs={12} md={6}>
													<Paper>
														<TextField
															variant='standard'
															disableUnderline
															label='Blog Title'
															type='title'
															value={title}
															onChange={e => setTitle(e.target.value)}
															placeholder='title'
															style={{
																width: '100%',
																marginLeft: '2px'
															}}
														/>
													</Paper>
												</Grid>
												<Grid item xs={12} md={6}>
													<Paper>
														<TextField
															variant='standard'
															label='Slug'
															type='slug'
															value={slug}
															placeholder='slug'
															disabled
															style={{
																width: '100%',
																marginLeft: '2px'
															}}
														/>
													</Paper>
												</Grid>
												<Grid item xs={12} md={6}>
													<Paper>
														<FormControl
															variant='standard'
															fullWidth
															style={{
																width: '100%',
																marginLeft: '2px'
															}}
														>
															<InputLabel id='demo-simple-select-label'>
																Select Category
															</InputLabel>
															<Select
																labelId='demo-simple-select-label'
																id='demo-simple-select'
																value={category}
																label='Category'
																onChange={handleList}
															>
																{posts &&
																	categories.map(category => (
																		<MenuItem
																			key={category}
																			value={category}
																		>
																			{category}
																		</MenuItem>
																	))}
															</Select>
														</FormControl>
													</Paper>
												</Grid>
												<Grid item xs={12} md={6}>
													<Paper>
														<TextField
															variant='standard'
															label='New Category'
															type='text'
															value={category}
															onChange={e =>
																setCategory(e.target.value)
															}
															placeholder='Category'
															style={{
																width: '100%',
																marginLeft: '2px'
															}}
														/>
													</Paper>
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
									<Paper sx={{ height: '11%', mt: 1 }}>
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
													color='info'
													startIcon={<PhotoCamera />}
													sx={{ marginTop: '-5px', color: 'white' }}
												>
													Upload Image
												</Button>
											</IconButton>
										</label>
									</Paper>
									<Paper
										sx={{
											margin: '5px',
											marginLeft: 0,
											height: '84.4%',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										{uploading ? (
											<Grid
												container
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<CircularProgress />
											</Grid>
										) : (
											<>
												{image && image.url ? null : (
													<Typography color='gray'>
														Image Preview
													</Typography>
												)}
											</>
										)}
										{image && image.url && (
											<Grid
												container
												style={{
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Image
													height={345}
													width={390}
													src={image.url}
													alt='image'
												/>
											</Grid>
										)}
									</Paper>
								</Grid>
							</Grid>
						</form>
					</Paper>

					<Grid
						container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<ButtonGroup
							variant='contained'
							color='success'
							size='large'
							sx={{ m: 2 }}
						>
							<Button
								disabled={!content}
								startIcon={<SaveAsIcon />}
								sx={{ background: 'orange' }}
							>
								<Typography>Draft</Typography>
							</Button>
							<Button
								color='info'
								disabled={!content}
								onClick={postSubmit}
								endIcon={<SaveIcon />}
								sx={{ color: 'white' }}
							>
								<Typography>Publish</Typography>
							</Button>
						</ButtonGroup>
					</Grid>
				</Box>
			</Modal>
		</PostFormGrid>
	);
};

export default CreatePostForm;
