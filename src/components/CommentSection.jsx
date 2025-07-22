import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getComments();
  }, [blogId]);

  const getComments = () => {
    setLoading(true);
    setError(null);
    
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
      .catch((error) => {
        console.log("Error getting comments from the API...", error);
        setError("Failed to load comments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addComment = () => {
    if (!newComment.trim() || !commentAuthor.trim()) {
      alert("Please fill in both name and comment!");
      return;
    }

    setSubmitting(true);

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
      .catch((error) => {
        console.log("Error adding comment to the API...", error);
        alert("Failed to add comment. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      axios
        .delete(`${BASE_URL}/comments/${commentId}.json`)
        .then(() => {
          getComments(); // Refresh comments
        })
        .catch((error) => {
          console.log("Error deleting comment from the API...", error);
          alert("Failed to delete comment. Please try again.");
        });
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
      .catch((error) => {
        console.log("Error updating comment in the API...", error);
        alert("Failed to update comment. Please try again.");
      });
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
              disabled={submitting}
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
              disabled={submitting}
            ></textarea>
          </div>
          <div className="card-actions justify-end">
            <button 
              className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none" 
              onClick={addComment}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <span className="loading loading-spinner loading-md text-teal-700"></span>
            <p className="mt-2 text-gray-600">Loading comments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="alert alert-error max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <span>{error}</span>
            </div>
            <button 
              className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none mt-4"
              onClick={getComments}
            >
              Try Again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
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
                        <i className="fa fa-edit text-emerald-600"></i>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => deleteComment(comment.id)}
                        title="Delete comment"
                      >
                        <i className="fa fa-trash text-red-600"></i>
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
                        className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none btn-xs"
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