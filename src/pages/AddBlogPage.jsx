import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import ImageUpload from "../components/ImageUpload";

function AddBlogPage() {
  const { blogId, travelId } = useParams();
  const [title, setTitle] = useState("");
  const [selectedTravel, setSelectedTravel] = useState(travelId || "");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [resources, setResources] = useState([{ link: "", description: "" }]);
  const [travels, setTravels] = useState([]);
  const [newTravelTitle, setNewTravelTitle] = useState("");
  const [newTravelImage, setNewTravelImage] = useState("");
  const [addingTravel, setAddingTravel] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const navigate = useNavigate();

  // TipTap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-[#5A7D1A] pl-4 py-2 bg-base-200/50 italic',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-inside space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-inside space-y-1',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'ml-4',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md',
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      Color,
      TextStyle,
      Highlight,
    ],
    content: "",
  });

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Fetch travels for dropdown
  useEffect(() => {
    axios
      .get(`${BASE_URL}/travels.json`)
      .then((response) => {
        if (response.data) {
          const travelsArray = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          setTravels(travelsArray);
        }
      })
      .catch((error) => console.log("Error fetching travels:", error));
  }, []);

  // Fetch blog data if editing
  useEffect(() => {
    if (blogId && editor) {
      axios
        .get(`${BASE_URL}/blogs/${blogId}.json`)
        .then((response) => {
          const blog = response.data;

          if (blog) {
            setTitle(blog.title || "");
            setSelectedTravel(blog.travelId || "");
            setImage(blog.imageUrl || "");
            setAuthor(
              Array.isArray(blog.author)
                ? blog.author.join(" & ")
                : blog.author || ""
            );
            // Convert date to YYYY-MM-DD format for HTML date input
            const dateValue = blog.date
              ? new Date(blog.date).toISOString().split("T")[0]
              : "";
            setDate(dateValue);
            setResources(blog.resources || [{ link: "", description: "" }]);

            // Set editor content after a small delay to ensure editor is ready
            setTimeout(() => {
              if (editor && !editor.isDestroyed) {
                editor.commands.setContent(blog.content || "");
              }
            }, 100);
          }
        })
        .catch((error) => {
          console.log("Error fetching blog data:", error);
        });
    }
  }, [blogId, editor]);

  if (!editor) {
    return (
      <div className="min-h-screen bg-base-200 py-8 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-teal-700"></span>
          <p className="mt-4">Loading editor...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPublishing(true);

    const blogData = {
      title: title,
      travelId: selectedTravel,
      imageUrl: image,
      author: author.split("&").map((a) => a.trim()),
      date: date,
      content: editor.getHTML(),
      resources: resources.filter((resource) => resource.link.trim() !== ""),
    };
    if (blogId) {
      // Edit mode: update existing blog with PUT /blogs.json
      axios.get(`${BASE_URL}/blogs.json`).then((response) => {
        const allBlogs = response.data || {};
        allBlogs[blogId] = blogData;
        axios
          .put(`${BASE_URL}/blogs.json`, allBlogs)
          .then(() => {
            navigate(`/blogs/${blogId}`);
            window.scrollTo(0, 0);
          })
          .catch((error) => {
            console.log("Error updating blog:", error);
            alert("Error updating blog. Please try again.");
          })
          .finally(() => {
            setPublishing(false);
          });
      });
    } else {
      // Add mode: create new blog
      axios
        .post(`${BASE_URL}/blogs.json`, blogData)
        .then((response) => {
          console.log("Blog added successfully:", response.data);
          const newBlogId = response.data.name;
          navigate(`/blogs/${newBlogId}`);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log("Error adding blog:", error);
          alert("Error adding blog. Please try again.");
        })
        .finally(() => {
          setPublishing(false);
        });
    }
  };

  const addResource = () => {
    setResources([...resources, { link: "", description: "" }]);
  };

  const removeResource = (index) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const updateResource = (index, field, value) => {
    const newResources = [...resources];
    newResources[index][field] = value;
    setResources(newResources);
  };

  const handleAddTravel = () => {
    if (!newTravelTitle.trim()) return;
    setAddingTravel(true);

    axios
      .post(`${BASE_URL}/travels.json`, {
        title: newTravelTitle,
        imageUrl: newTravelImage,
      })
      .then((response) => {
        const newTravelId = response.data.name;
        setTravels((prev) => [
          ...prev,
          { id: newTravelId, title: newTravelTitle, imageUrl: newTravelImage },
        ]);
        setSelectedTravel(newTravelId);
        setNewTravelTitle("");
        setNewTravelImage("");
      })
      .catch(() => {
        alert("Error adding new travel.");
      })
      .finally(() => {
        setAddingTravel(false);
      });
  };

  const handleDelete = () => {
    if (!blogId) return;

    if (window.confirm("Are you sure you want to delete this blog?")) {
      setDeleting(true);

      // Delete the blog using PUT /blogs.json
      axios.get(`${BASE_URL}/blogs.json`).then((response) => {
        const allBlogs = response.data || {};
        delete allBlogs[blogId];

        axios
          .put(`${BASE_URL}/blogs.json`, allBlogs)
          .then(() => {
            navigate("/blogs");
          })
          .catch((error) => {
            console.log("Error deleting blog:", error);
            alert("Error deleting blog. Please try again.");
          })
          .finally(() => {
            setDeleting(false);
          });
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(`/my-travels/${selectedTravel || travelId}`)}
            className="btn btn-ghost text-base"
          >
            <i className="fa fa-chevron-left p-1" aria-hidden="true"></i>Back
          </button>
        </div>
        
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center mb-8">
              {blogId ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Travel Selection + Add New Travel */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Select Travel
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="select select-bordered w-full"
                    value={selectedTravel}
                    onChange={(e) => setSelectedTravel(e.target.value)}
                    required
                  >
                    <option value="">Choose a travel</option>
                    {travels.map((travel) => (
                      <option key={travel.id} value={travel.id}>
                        {travel.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add New Travel Accordion */}
                <div className="collapse collapse-arrow bg-base-200 mt-2">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium">
                    <i className="fa fa-plus mr-2" aria-hidden="true"></i>
                    Add New Travel
                  </div>
                  <div className="collapse-content">
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-sm flex-1"
                          placeholder="New travel title"
                          value={newTravelTitle}
                          onChange={(e) => setNewTravelTitle(e.target.value)}
                        />
                        <button
                          type="button"
                          className="px-4 py-2 text-sm font-medium text-white bg-[#d89d20] hover:bg-[#be6406] rounded-lg transition-colors"
                          disabled={addingTravel || !newTravelTitle.trim()}
                          onClick={handleAddTravel}
                        >
                          {addingTravel ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Adding...
                            </>
                          ) : (
                            "Add Travel"
                          )}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {/* Image Upload */}
                        <ImageUpload onUploadSuccess={(url) => setImage(url)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <ImageUpload onUploadSuccess={(url) => setImage(url)} compact={true} />

              {/* Author and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Author</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name"
                    className="input input-bordered w-full"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Content</span>
                </label>
                <div className="border border-base-300 rounded-lg">
                  {/* Toolbar */}
                  <div className="bg-base-200 p-2 border-b border-base-300">
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                              <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBold().run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("bold") ? "text-white border-none shadow-md" : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("bold") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Bold"
                        >
                          <Bold className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("italic")
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("italic") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Italic"
                        >
                          <Italic className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("bulletList")
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("bulletList") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("orderedList")
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("orderedList") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Numbered List"
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("blockquote")
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("blockquote") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Quote"
                        >
                          <Quote className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("textAlign", { align: "left" })
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("textAlign", { align: "left" }) ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Align Left"
                        >
                          <AlignLeft className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("textAlign", { align: "center" })
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("textAlign", { align: "center" }) ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Align Center"
                        >
                          <AlignCenter className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                          }
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("textAlign", { align: "right" })
                              ? "text-white border-none shadow-md"
                              : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("textAlign", { align: "right" }) ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Align Right"
                        >
                          <AlignRight className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={setLink}
                          className={`btn btn-sm transition-all duration-200 ${
                            editor.isActive("link") ? "text-white border-none shadow-md" : "btn-ghost hover:bg-base-300"
                          }`}
                          style={editor.isActive("link") ? { background: 'linear-gradient(135deg, #5A7D1A, #d89d20)' } : {}}
                          title="Add Link"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            title="Upload Image"
                            onClick={() => setShowImageUpload(!showImageUpload)}
                          >
                            <ImageIcon className="w-4 h-4" />
                          </button>
                          {showImageUpload && (
                            <div className="absolute top-full left-0 mt-2 z-50 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 min-w-[300px]">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-semibold">Upload Image</h4>
                                <button
                                  type="button"
                                  className="btn btn-ghost btn-xs"
                                  onClick={() => setShowImageUpload(false)}
                                >
                                  ✕
                                </button>
                              </div>
                              <ImageUpload
                                onUploadSuccess={(url) => {
                                  if (editor) {
                                    editor
                                      .chain()
                                      .focus()
                                      .setImage({
                                        src: url,
                                        alt: "Uploaded image",
                                      })
                                      .run();
                                  }
                                  setShowImageUpload(false);
                                }}
                                compact={true}
                              />
                            </div>
                          )}
                        </div>

                      <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="btn btn-sm btn-ghost disabled:opacity-50"
                        title="Undo"
                      >
                        <Undo className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="btn btn-sm btn-ghost disabled:opacity-50"
                        title="Redo"
                      >
                        <Redo className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <EditorContent
                    editor={editor}
                    className="prose max-w-none p-4 min-h-[400px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-[#5A7D1A] [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:py-2 [&_.ProseMirror_blockquote]:bg-base-200/50 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-4 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:list-inside [&_.ProseMirror_ul]:space-y-1 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:list-inside [&_.ProseMirror_ol]:space-y-1 [&_.ProseMirror_li]:ml-4 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:shadow-md [&_.ProseMirror_img]:my-4"
                  />
                </div>
              </div>

              {/* Resources */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Resources</span>
                </label>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 items-start"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="url"
                          placeholder="Resource link"
                          className="input input-bordered input-sm"
                          value={resource.link}
                          onChange={(e) =>
                            updateResource(index, "link", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Resource description"
                          className="input input-bordered input-sm"
                          value={resource.description}
                          onChange={(e) =>
                            updateResource(index, "description", e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeResource(index)}
                        className="btn btn-ghost btn-sm text-[#b03a2e] hover:bg-[#b03a2e] hover:text-white"
                        title="Remove Resource"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addResource}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#d89d20] hover:bg-[#be6406] rounded-lg transition-colors"
                  >
                    Add Resource
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                {blogId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-outline border-[#b03a2e] text-[#b03a2e] hover:bg-[#b03a2e] hover:text-white"
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete Blog"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate(`/my-travels/${selectedTravel}`)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#5a7d1a] hover:bg-[#4a6d15] rounded-lg transition-colors"
                  disabled={publishing}
                >
                  {publishing
                    ? blogId
                      ? "Saving..."
                      : "Publishing..."
                    : blogId
                    ? "Save Changes"
                    : "Publish Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlogPage;
