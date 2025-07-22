import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    getComments();
  }, [blogId]);

  const getComments = () => {
    axios
      .get(`${BASE_URL}/comments.json`)
      .then((response) => {
        if (response.data) {
          // Filter comments for this specific blog
          const blogComments = Object.entries(response.data)
            .filter(([, comment]) => comment.blogId === blogId)
            .map(([key, comment]) => ({
              id: key,
              ...comment
            }));
          setComments(blogComments);
        }
      })
      .catch((error) =>
        console.log("Error getting comments from the API...", error)
      );
  };

  const addComment = () => {
    if (!newComment.trim() || !commentAuthor.trim()) {
      alert("Please fill in both name and comment!");
      return;
    }

    const commentData = {
      blogId: blogId,
      author: commentAuthor,
      content: newComment,
      date: new Date().toISOString()
    };

    axios
      .post(`${BASE_URL}/comments.json`, commentData)
      .then(() => {
        setNewComment("");
        setCommentAuthor("");
        getComments(); // Refresh comments
      })
      .catch((error) =>
        console.log("Error adding comment to the API...", error)
      );
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      axios
        .delete(`${BASE_URL}/comments/${commentId}.json`)
        .then(() => {
          getComments(); // Refresh comments
        })
        .catch((error) =>
          console.log("Error deleting comment from the API...", error)
        );
    }
  };

  const startEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  const saveEdit = (commentId) => {
    if (!editContent.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const updatedComment = {
      content: editContent,
      date: new Date().toISOString()
    };

    axios
      .patch(`${BASE_URL}/comments/${commentId}.json`, updatedComment)
      .then(() => {
        setEditingComment(null);
        setEditContent("");
        getComments(); // Refresh comments
      })
      .catch((error) =>
        console.log("Error updating comment in the API...", error)
      );
  };

  return (
    <div className="pl-40 pr-40 pt-8">
      <div className="divider">
        <h2 className="text-2xl font-bold text-teal-700">Comments</h2>
      </div>

      {/* Add Comment Form */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title text-lg">Add a Comment</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Comment</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={addComment}>
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h4 className="card-title text-sm">{comment.author}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => startEdit(comment)}
                        title="Edit comment"
                      >
                        <i className="fa fa-edit text-blue-500"></i>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => deleteComment(comment.id)}
                        title="Delete comment"
                      >
                        <i className="fa fa-trash text-red-500"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                {editingComment === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows="3"
                    ></textarea>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => saveEdit(comment.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{comment.content}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection; 