import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import ReactMarkdown from "react-markdown";

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getComments = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`${BASE_URL}/comments.json`)
      .then((response) => {
        if (response.data) {
          const blogComments = Object.entries(response.data)
            .filter(([, comment]) => comment.blogId === blogId)
            .map(([key, comment]) => ({
              id: key,
              ...comment,
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // En yeni comment'ler en üstte
          setComments(blogComments);
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        console.error("Error getting comments from the API:", error);
        setError("Failed to load comments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, [blogId]);

  const addComment = () => {
    if (!newComment.trim()) {
      alert("Please write a comment!");
      return;
    }

    if (!currentUser) {
      alert("Please log in to comment!");
      return;
    }

    setSubmitting(true);

    const commentData = {
      blogId: blogId,
      author: currentUser.name,
      authorId: currentUser.uid,
      content: newComment.trim(),
      date: new Date().toISOString(),
    };

    axios
      .post(`${BASE_URL}/comments.json`, commentData)
      .then((response) => {
        if (response.data) {
          setNewComment("");
          getComments();
        } else {
          throw new Error("Failed to add comment");
        }
      })
      .catch((error) => {
        console.error("Error adding comment to the API:", error);
        alert("Failed to add comment. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const deleteComment = (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    axios
      .delete(`${BASE_URL}/comments/${commentId}.json`)
      .then((response) => {
        if (response.status === 200) {
          getComments();
        } else {
          throw new Error("Failed to delete comment");
        }
      })
      .catch((error) => {
        console.error("Error deleting comment from the API:", error);
        alert("Failed to delete comment. Please try again.");
      });
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
      content: editContent.trim(),
      date: new Date().toISOString(),
    };

    axios
      .patch(`${BASE_URL}/comments/${commentId}.json`, updatedComment)
      .then((response) => {
        if (response.data) {
          setEditingComment(null);
          setEditContent("");
          getComments();
        } else {
          throw new Error("Failed to update comment");
        }
      })
      .catch((error) => {
        console.error("Error updating comment in the API:", error);
        alert("Failed to update comment. Please try again.");
      });
  };

  return (
    <>
      <div className="divider">
        <h2 className="text-2xl font-bold text-base-content">Comments</h2>
      </div>

      {/* Add Comment Form */}
      <div className="card bg-base-100 shadow-xl mb-6 relative">
        <div className="card-body space-y-4">
          <h3 className="card-title text-lg text-base-content">Add a Comment</h3>

          {currentUser ? (
            <>
              {submitting && (
                <div className="absolute inset-0 bg-base-100/80 rounded-lg flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
                    <p className="text-base-content/70">Posting comment...</p>
                  </div>
                </div>
              )}
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>

                <div className="relative">
                  <textarea
                    className="textarea textarea-bordered w-full min-h-[100px] rounded-md"
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={submitting}
                  ></textarea>

                  {/* Emoji Toggle Button */}
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 text-lg"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    😊
                  </button>

                  {/* Emoji Picker (conditionally rendered) */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 right-0 z-50">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setNewComment((prev) => prev + emojiData.emoji);
                          setShowEmojiPicker(false); 
                        }}
                        height={320}
                        width={280}
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline border-[#5A7D1A] text-[#5A7D1A] hover:bg-[#5A7D1A] hover:text-white"
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
            </>
          ) : (
            <div className="text-center py-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Please log in to comment
                </p>
                <button
                  className="btn btn-outline border-[#5A7D1A] text-[#5A7D1A] hover:bg-[#5A7D1A] hover:text-white"
                  onClick={() => navigate("/log-in")}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <span className="loading loading-spinner loading-md text-primary"></span>
            <p className="mt-2 text-gray-600">Loading comments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="alert alert-error max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button
              className="btn btn-outline border-[#5A7D1A] text-[#5A7D1A] hover:bg-[#5A7D1A] hover:text-white mt-4"
              onClick={getComments}
            >
              Try Again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-base-content/30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-base-content/70">No comments yet. Be the first to comment!</p>
            </div>
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
                        <i className="fa fa-edit text-[#5A7D1A]"></i>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => deleteComment(comment.id)}
                        title="Delete comment"
                      >
                        <i className="fa fa-trash text-[#b03a2e]"></i>
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
                        className="btn btn-outline border-[#5A7D1A] text-[#5A7D1A] hover:bg-[#5A7D1A] hover:text-white btn-xs"
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
                  <ReactMarkdown>{comment.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CommentSection;
