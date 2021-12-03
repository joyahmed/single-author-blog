import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useUser } from '@auth0/nextjs-auth0';

export default function CommentsComponent({ post, removeComment }) {
	const { user, loading } = useUser();

	const [noOfComments, setNoOfComments] = useState(3);
	const [disabled, setDisabled] = useState(false);
	const [text, setText] = useState('Show More...');

	const postComments = post.comments
		.sort((a, b) => (a.created > b.created ? -1 : 1))
		.slice(0, noOfComments);

	const showMore = () => {
		setNoOfComments(noOfComments + noOfComments);
		if (noOfComments >= post.comments.length - 1) {
			setDisabled(true);
			setText('No more comments!');
		}
	};

	return (
		<>
			<List
				sx={{
					width: '100%',
					paddingRight: '2%',
					bgcolor: 'background.paper'
				}}
			>
				{postComments.map(comment => (
					<>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								<Avatar
									alt={comment.commentBy}
									src={comment.userImage}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={comment.commentBy}
								secondary={
									<>
										<Typography
											sx={{ display: 'inline' }}
											component='span'
											variant='body2'
											color='text.primary'
										>
											{comment.commentContent}
										</Typography>
										{' — '}
										{moment(comment.created).fromNow()}
									</>
								}
							/>
						</ListItem>
						{user &&
							user[`${process.env.AUTH0_NAMESPACE}/roles`].includes(
								'admin'
							) && (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
										marginTop: '-1.5rem'
									}}
								>
									<Button
										onClick={() => removeComment(post._id, comment)}
									>
										<DeleteForeverIcon />
									</Button>
								</Box>
							)}

						<Divider variant='inset' component='li' />
					</>
				))}
			</List>
			<Box pt={2}>
				<Button
					variant='text'
					onClick={() => showMore()}
					disabled={disabled}
				>
					{text}
				</Button>
			</Box>
		</>
	);
}
