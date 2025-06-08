import { useState } from 'react';
import { uploadImage } from '../services/api';

export default function GalleryUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Select an image');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('event', event);

    try {
      setLoading(true);
      const res = await uploadImage(formData);
      alert('Uploaded!');
      console.log(res);
      setFile(null);
      setTitle('');
      setEvent('');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Image to Gallery</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}
