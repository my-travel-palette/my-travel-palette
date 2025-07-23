import { useState } from "react";

const ImageUpload = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return alert('Please choose a file first!');
    setUploading(true);

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'my_preset');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dukamnpgl/image/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.secure_url) {
        console.log('Uploaded image URL:', result.secure_url);
        onUploadSuccess(result.secure_url); 
        alert('Upload success!');
      } else {
        alert('Upload failed — no URL returned.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Upload Image</span>
      </label>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" width="200" />}
      <button
        type="button"
        onClick={uploadImage}
        disabled={uploading}
        className="btn btn-sm mt-2"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ImageUpload;
