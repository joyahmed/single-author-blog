import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Post from './Post';
import axios from 'axios';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { getUniqueCategories } from '../helper';

const CategoryList = ({ posts }) => {
	const router = useRouter();
	/* 	const uniqueCategories = [
		...new Set(posts.map(post => post.category))
	]; */
	//console.log('unique => ', uniqueCategories);

	return (
		<>
			{posts && posts.length > 0 && (
				<>
					<Grid
						container
						spacing={2}
						sx={{
							textAlign: 'center',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Typography
							variant='body1'
							color='gray'
							sx={{ pb: 2, md: { pt: 20 } }}
						>
							Categories
						</Typography>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{
							textAlign: 'center',
							justifyContent: 'center',
							pb: 2
						}}
					>
						{posts &&
							getUniqueCategories(posts).map((category, index) => (
								<>
									<Grid
										item
										xs={12}
										style={{ paddingLeft: 0 }}
										key={index}
									>
										<Link
											href='posts/category/[category]'
											as={`posts/category/${category}`}
										>
											<a>
												<Typography variant='body2' color='steelblue'>
													{category}
												</Typography>
											</a>
										</Link>
									</Grid>
								</>
							))}
					</Grid>
				</>
			)}
		</>
	);
};

export default CategoryList;
