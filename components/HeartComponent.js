import React from 'react';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useUser } from '@auth0/nextjs-auth0';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const useStyles = makeStyles(theme => ({
	wrapIcon: {
		alignItems: 'center',
		display: 'flex'
	}
}));

const HeartComponent = ({
	heartCount,
	heart,
	setHeart,
	makeHeart,
	numberOfComments,
	post,
	disabled,
	setDisabled
}) => {
	const { user } = useUser();
	const classes = useStyles();
	console.log('heart count =>', post.heartCount);

	if (post.hearts && post.hearts.length > 0) {
		post.hearts.map(heart => {
			if (user && heart.userEmail === user.email) {
				setDisabled(true);
				console.log('userEmail =>', heart.userEmail);
			}
		});
	}

	return (
		<Grid
			item
			xs={12}
			sx={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<Grid
				item
				md={12}
				sx={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{!disabled && (
					<Typography
						variant='subtitle1'
						className={classes.wrapIcon}
					>
						<FavoriteBorderIcon
							onClick={() => makeHeart(setHeart(heartCount))}
							size='large'
							sx={{ color: 'red', fontSize: 2 + 'rem' }}
							disabled={disabled}
						/>
					</Typography>
				)}
				{/* 	{post.comments &&
					post.comments.map((comment, index) => {
						if (index === 5) {
							return null;
						} else if (index === 4) {
							return (
								<Typography
									key={post.id}
									style={{
										display: 'inline-block',
										paddingRight: '5px'
									}}
								>
									{comment.commentBy}...
								</Typography>
							);
						} else if (index === post.comments.length - 1) {
							return (
								<Typography
									key={post.id}
									style={{
										display: 'inline-block',
										paddingRight: '5px'
									}}
								>
									{comment.commentBy}
								</Typography>
							);
						} else if (index < post.comments.length - 1) {
							return (
								<Typography
									key={post.id}
									style={{
										display: 'inline-block',
										paddingRight: '5px'
									}}
								>
									{comment.commentBy},
								</Typography>
							);
						}
					})} */}
			</Grid>
		</Grid>
	);
};

export default HeartComponent;
