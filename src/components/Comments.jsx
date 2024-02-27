import React, { useState } from 'react';
import { Paper, Avatar, Typography, IconButton, TextField } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';

const Comment = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Check if the newComment is not empty before submitting
    if (newComment.trim() !== '') {
      // Create a new comment object
      const commentObject = {
        user: 'Username', // You can replace this with the actual username
        text: newComment,
        likes: 0,
      };

      // Add the new comment to the comments array
      setComments([...comments, commentObject]);

      // Reset the input field after submitting
      setNewComment('');
    }
  };

  return (
    <div>
      {/* Input field for adding a new comment */}
      <TextField
        fullWidth
        size="small"
        label="Add a comment"
        variant="outlined"
        margin="dense"
        placeholder="Add a comment"
        value={newComment}
        onChange={handleCommentChange}
        sx={{ width: '100%', boxShadow: '0 0 10px white', marginBottom: '50px', marginTop: '15px', '& label': { color: 'white', opacity: '0.5' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, }, '& .MuiOutlinedInput-input': { color: 'white' } }}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleCommentSubmit} edge="end">
              <SendIcon />
            </IconButton>
          ),
        }}
      />

      {/* Display comments */}
      {comments.map((comment, index) => (
        <Paper key={index} elevation={3} sx={{ p: 2, marginBottom: 2, display: 'flex' }}>
          <Avatar sx={{ marginRight: 2 }}>U</Avatar>
          <div>
            <Typography variant="body1" fontWeight="bold">
              {comment.user}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.text}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <IconButton size="small" color="primary" sx={{ marginRight: 1 }}>
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