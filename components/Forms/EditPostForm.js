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
import { TextField, Button } from '@mui/material';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { getUniqueCategories } from '@/helper';

const PostFormGrid = styled(Grid)({
	marginTop: '30px'
});

const EditPostForm = ({
	posts,
	title,
	setTitle,
	slug,
	editedSlug,
	content,
	setContent,
	category,
	handleList,
	disabled,
	setCategory,
	postSubmit,
	handleImage,
	uploading,
	image
}) => {
	const categories = getUniqueCategories(posts);
	return (
		<PostFormGrid>
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
													value={editedSlug}
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
														Selected Category
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
													label='Edit Category'
													type='text'
													value={category}
													onChange={e => setCategory(e.target.value)}
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
						<Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
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
											startIcon={<PhotoCamera />}
											sx={{ marginTop: '-5px' }}
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
			<Grid container sx={{ justifyContent: 'center' }}>
				<ButtonGroup
					variant='contained'
					color='primary'
					sx={{ mt: 2 }}
				>
					<Button
						onClick={postSubmit}
						color='primary'
						endIcon={<SaveIcon />}
					>
						Publish Post
					</Button>
				</ButtonGroup>
			</Grid>
		</PostFormGrid>
	);
};

export default EditPostForm;
