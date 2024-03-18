import React, { useState } from 'react';
import { Paper, Avatar, Typography, IconButton, TextField, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';

const Comment = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  // Retrieve the JSON string from localStorage
  const profileJson = localStorage.getItem('profile');

// Parse the JSON string into an object
  const profile = JSON.parse(profileJson);

// Access the token property from the profile object
  const token = profile.token;
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const commentObject = {
        user: 'Username', // You can replace this with the actual username
        text: newComment,
        likes: 0,
      };

      setComments([...comments, commentObject]);
      setNewComment('');
    }
  };

  return (
    <div>
      <Stack direction='row' alignItems='center' sx={{ marginBottom: '8px', color: 'white' }}>
      {!token && (
    <React.Fragment>
    <LockIcon style={{ marginRight: '8px' }} />
    <Typography variant='body1'>
      Please log in to use comment section
    </Typography>
  </React.Fragment>
)}
      </Stack>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        margin="dense"
        placeholder="Add a comment"
        value={newComment}
        onChange={handleCommentChange}
        disabled={!token}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleCommentSubmit} edge="end">
              <SendIcon />
            </IconButton>
          ),
        }}
        sx={{
          width: '100%',
          boxShadow: '0 0 10px white',
          marginBottom: '50px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
          '& .MuiInputBase-root': {
            color: 'white',
          },
        }}
      />

      {comments.map((comment, index) => (
        <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '8px', display: 'flex' }}>
          <Avatar style={{ marginRight: '8px' }}>U</Avatar>
          <div>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {comment.user}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.text}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
              <IconButton size="small" color="primary" style={{ marginRight: '4px' }}>
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {comment.likes} Likes
              </Typography>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Comment;
