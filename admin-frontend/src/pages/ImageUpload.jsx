import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import toast  from 'react-hot-toast';

const ImageUpload = () => {

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file){
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('event', event);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/gallery/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const result = await response.json();
      toast.success('Uploaded!');
      setFile(null);
      setTitle('');
      setEvent('');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
    <FileUpload />  
    </div>
  );
}

export default ImageUpload;
