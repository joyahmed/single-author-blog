import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useUser } from '@auth0/nextjs-auth0';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const CommentForm = ({
	commentBy,
	commentContent,
	setCommentContent,
	postComment,
	disabled
}) => {
	const { user } = useUser();

	return (
		<>
			<Grid container sx={{ mt: 1, mb: 1 }} justifyContent='center'>
				<Grid item xs={9} md={11}>
					<TextField
						variant='standard'
						type='comment'
						value={commentContent}
						onChange={e => setCommentContent(e.target.value)}
						placeholder='leave a comment...'
						sx={{
							width: '100%',
							height: '100%',
							paddingLeft: '5px',
							border: '1px solid #8080807a',
							borderRadius: '5px',
							justifyContent: 'center'
						}}
					/>
					<input type='text' value={commentBy} disabled hidden />
				</Grid>
				<Grid item xs={2} md={1}>
					<Button
						disabled={!commentContent}
						variant='contained'
						size='large'
						startIcon={<SendIcon size='large' sx={{ ml: 2 }} />}
						color='secondary'
						onClick={postComment}
						sx={{ height: '100%', padding: { xs: 0, md: 2 } }}
					></Button>
				</Grid>
			</Grid>
		</>
	);
};

export default CommentForm;
