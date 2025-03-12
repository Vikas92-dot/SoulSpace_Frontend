import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardActions } from "@mui/material";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import { Favorite, ChatBubbleOutline } from "@mui/icons-material";
import api from "./api";
import { useSelector } from "react-redux";
import Sidebar from "./User/SideBar";

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // Store liked posts for logged-in user
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  let user = useSelector((store) => store.User);
  let userId = user?.user?.id;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(api.ALLFORUM);
      setPosts(response.data);

      // Extract posts already liked by the user
      const userLikedPosts = response.data
        .filter((post) => post.likes.some((like) => like.userId === userId))
        .map((post) => post.postId);

      setLikedPosts(userLikedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
    if (likedPosts.includes(postId)) return; // Prevent duplicate likes

    try {
      await axios.post(api.ADD_LIKE, { forumPostId: postId, userId });

      // Optimistic UI Update
      setPosts(
        posts.map((post) =>
          post.postId === postId ? { ...post, likeCount: post.likeCount + 1 } : post
        )
      );
      setLikedPosts([...likedPosts, postId]); // Mark post as liked
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const addComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(api.ADD_COMMENT, { id: postId, userId, commentText });
      setPosts(
        posts.map((post) =>
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
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ maxWidth: "600px", margin: "auto", padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Community Forum
        </Typography>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            label="Share your thoughts..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{ marginTop: "8px" }}
          />
          <Button variant="contained" color="primary" onClick={addPost} style={{ marginTop: "8px" }}>
            Post
          </Button>
        </div>

        {[...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
          <Card key={post.postId} style={{ marginBottom: "16px", padding: "16px" }}>
            <CardContent
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  By {post.author?.userName || "Unknown"}
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body1">{post.content}</Typography>
            </CardContent>
            <CardActions>
            <IconButton 
                onClick={() => likePost(post.postId)} 
                disabled={likedPosts.includes(post.postId)}
                >
                <Favorite color={likedPosts.includes(post.postId) ? "error" : "inherit"} />
                </IconButton>
                <Typography>{post.likeCount}</Typography>
              <IconButton>
                <ChatBubbleOutline />
              </IconButton>
              <Typography>{post.commentCount || 0}</Typography>
            </CardActions>
            <CardContent>
              {/* Display All Comments */}
              {Array.isArray(post.comments) && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <Typography key={index} variant="body2" color="textSecondary">
                    <strong>{comment.userName || "Anonymous"}:</strong> {comment.comment}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments yet.
                </Typography>
              )}

              {/* Input for adding comments */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a comment..."
                style={{ marginTop: "8px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addComment(post.postId, e.target.value);
                    e.target.value = ""; // Clear input after adding comment
                  }
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
