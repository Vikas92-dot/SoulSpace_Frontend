import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, CircularProgress, Container, Box, Paper } from "@mui/material";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import { Favorite, ChatBubbleOutline } from "@mui/icons-material";
import api from "../api";
import { useSelector } from "react-redux";
import Sidebar from "../User/SideBar";

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  let user = useSelector((store) => store.User);
  let userId = user.user.id;
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(api.ALLFORUM);
      setPosts(response.data);
      const userLikedPosts = response.data
        .filter((post) => post.likes.some((like) => like.userId === userId))
        .map((post) => post.postId);
      setLikedPosts(userLikedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    try {
      const response = await axios.post(api.CREATE_FORUM, { ...newPost, userId });
      setPosts([response.data.newPost, ...posts]);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const likePost = async (postId) => {
    if (likedPosts.includes(postId)) return;
    try {
      await axios.post(api.ADD_LIKE, { forumPostId: postId, userId });
      setPosts(
        posts.map((post) =>
          post.postId === postId ? { ...post, likeCount: post.likeCount + 1 } : post
        )
      );
      setLikedPosts([...likedPosts, postId]);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const addComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(api.ADD_COMMENT, { id: postId, userId, commentText });
      setPosts(
        posts?.map((post) =>
          post.postId === postId
            ? { ...post, comments: [...post.comments, response.data.newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", background: "#F4F6F8", minHeight: "100vh" }}>
      <Sidebar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Community Forum
          </Typography>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Share your thoughts..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={addPost}>
            Post
          </Button>
        </Paper>

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        ) : (
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
            <Card key={post.postId} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  By {post.author?.userName || "Unknown"} - {new Date(post.createdAt).toLocaleString()}
                </Typography>
                <Typography sx={{ mt: 1 }}>{post.content}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => likePost(post.postId)} disabled={likedPosts.includes(post.postId)}>
                  <Favorite color={likedPosts.includes(post.postId) ? "error" : "inherit"} />
                </IconButton>
                <Typography>{post.likeCount}</Typography>
                <IconButton>
                  <ChatBubbleOutline />
                </IconButton>
                <Typography>{post.commentCount || 0}</Typography>
              </CardActions>
              <CardContent>
                {post.comments?.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      <strong>{comment.userName || "Anonymous"}:</strong> {comment.comment}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No comments yet.
                  </Typography>
                )}
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a comment..."
                  sx={{ mt: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(post.postId, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default CommunityForum;
