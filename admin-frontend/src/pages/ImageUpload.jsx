import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const ImageUpload = () => {
  const [files, setFiles] = useState([]);  // Store accumulated files
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    
    // Append all accumulated files
    files.forEach(file => {
      formData.append('images', file);
    });
    
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
      toast.success(`${files.length} image(s) uploaded successfully!`);
      
      // Reset form
      setFiles([]);
      setTitle('');
      setEvent('');
      
      // Reset file input
      document.querySelector('input[type="file"]').value = '';
      
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length === 0) return;
    
    // Add new files to existing files (avoid duplicates by name)
    const newFiles = [...files];
    const existingFileNames = files.map(f => f.name);
    
    selectedFiles.forEach(file => {
      if (!existingFileNames.includes(file.name)) {
        newFiles.push(file);
      } else {
        toast.error(`File "${file.name}" already selected`);
      }
    });
    
    setFiles(newFiles);
    toast.success(`${selectedFiles.length} file(s) added. Total: ${newFiles.length}`);
    
    // Clear the input so the same files can be selected again if needed
    e.target.value = '';
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    toast.success('File removed');
  };

  const clearAllFiles = () => {
    setFiles([]);
    toast.success('All files cleared');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
      
      <form onSubmit={handleSubmit}>
        <h2>Upload Images to Gallery</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
          <div>
            <small>Tip: Hold Ctrl/Cmd to select multiple files at once, or add files one by one</small>
          </div>
        </div>

        {/* Show selected files */}
        {files.length > 0 && (
          <div style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong>{files.length} file(s) selected:</strong>
              <button type="button" onClick={clearAllFiles} style={{ 
                background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', 
                borderRadius: '3px', cursor: 'pointer', fontSize: '12px' 
              }}>
                Clear All
              </button>
            </div>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {files.map((file, index) => (
                <div key={index} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '5px 0', borderBottom: '1px solid #eee'
                }}>
                  <span style={{ fontSize: '14px' }}>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    style={{ 
                      background: '#ff6b7a', color: 'white', border: 'none', 
                      padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <input
          type="text"
          placeholder="Event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        
        <button 
          type="submit" 
          disabled={loading || files.length === 0}
          style={{
            background: files.length === 0 ? '#ccc' : '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: files.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? `Uploading ${files.length} image(s)...` : `Upload ${files.length} image(s)`}
        </button>
      </form>
      
      {/* <FileUpload />   */}
    </div>
  );
}

export default ImageUpload;