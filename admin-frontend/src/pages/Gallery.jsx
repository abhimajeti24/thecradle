import { useEffect, useState } from "react";

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const showToast = (message, type = 'success') => {
    // Simple toast replacement - you can replace this with your toast library
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
  };

  const getAllImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/gallery/");

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const result = await response.json();
      
      // The backend now returns { message, galleries }
      setGalleries(result.galleries || []);

    } catch (err) {
      console.error(err);
      showToast("Failed to load images", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteGallery = async (documentId, title) => {
    if (!window.confirm(`Are you sure you want to delete the entire "${title}" gallery?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gallery");
      }

      setGalleries(galleries.filter(gallery => gallery._id !== documentId));
      showToast("Gallery deleted successfully");
      
      // Close modal if the deleted gallery was open
      if (selectedGallery && selectedGallery._id === documentId) {
        setSelectedGallery(null);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to delete gallery", "error");
    }
  };

  const openGalleryModal = (gallery) => {
    setSelectedGallery(gallery);
  };

  const closeGalleryModal = () => {
    setSelectedGallery(null);
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const galleryCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    padding: '20px'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
    position: 'relative'
  };

  const imageDisplayStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '15px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>
          Dashboard
        </a>
        <a href="/imageUpload" style={{ textDecoration: 'none', color: '#007bff' }}>
          Image Upload
        </a>
      </div>

      <h2>Gallery of Events</h2>
      
      {loading ? (
        <p>Loading galleries...</p>
      ) : galleries.length === 0 ? (
        <p>No galleries found</p>
      ) : (
        <div style={imageGridStyle}>
          {galleries.map((gallery) => (
            <div 
              key={gallery._id} 
              style={galleryCardStyle}
              onClick={() => openGalleryModal(gallery)}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {/* Thumbnail */}
              {gallery.thumbnail && (
                <img 
                  src={gallery.thumbnail} 
                  alt={gallery.title}
                  style={{ 
                    width: "100%", 
                    height: "200px", 
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginBottom: "10px"
                  }}
                />
              )}
              
              <h3 style={{ margin: '5px 0', color: '#333' }}>{gallery.title}</h3>
              <p style={{ margin: '5px 0', color: '#666' }}>{gallery.event}</p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#888' }}>
                {gallery.imageCount} image{gallery.imageCount !== 1 ? 's' : ''}
              </p>
              <small style={{ color: '#999' }}>
                {new Date(gallery.createdAt).toLocaleDateString()}
              </small>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening
                  deleteGallery(gallery._id, gallery.title);
                }}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'block',
                  width: '100%'
                }}
              >
                Delete Gallery
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing all images in a gallery */}
      {selectedGallery && (
        <div style={modalStyle} onClick={closeGalleryModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedGallery.title}</h2>
                <p style={{ margin: '5px 0', color: '#666' }}>{selectedGallery.event}</p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#888' }}>
                  {selectedGallery.imageCount} images
                </p>
              </div>
              <button 
                onClick={closeGalleryModal}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={imageDisplayStyle}>
              {selectedGallery.images.map((image, index) => (
                <div key={image._id || index} style={{ textAlign: 'center' }}>
                  <img 
                    src={image.url} 
                    alt={`${selectedGallery.title} - ${index + 1}`}
                    style={{ 
                      width: "100%", 
                      height: "150px", 
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginBottom: "5px"
                    }}
                  />
                  {image.originalName && (
                    <small style={{ display: 'block', color: '#666' }}>
                      {image.originalName}
                    </small>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;


// import { useEffect } from "react";
// import {useState} from "react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";


// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getAllImages = async () => {
//     setLoading(true);
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/api/gallery/");

//       if (!response.ok) {
//         throw new Error("Failed to fetch images");
//       }
//       const result = await response.json();
//       setImages(result);

//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load images");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteImage = async (imageId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/gallery/${imageId}`, {
//         method:"DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete image");
//       }

//       setImages(images.filter(image => image._id !== imageId));
//       toast.success("Image deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete image");
//     }
//   };

//   useEffect(() => {
//     getAllImages();
//   }, [])

//   return <>
//   <Link to="/">Dashboard</Link>
//   <Link to="/imageUpload">Image upload</Link>
//     <h2>Gallery of events</h2>
//     {loading ? (
//         <p>Loading images...</p>
//       ) : images.length === 0 ? (
//         <p>No images found</p>
//       ) : (
//         <div className="image-container">
//           {images.map((image) => (
//             <div key={image._id} className="image-card">
//               <img 
//                 src={image.url} 
//                 alt={image.title} 
//                 style={{ width: "100px", height: "auto" }}
//               />
//               <h3>{image.title}</h3>
//               <p>{image.event}</p>
//               <small>
//                 {new Date(image.createdAt).toLocaleDateString()}
//               </small>
//             <button onClick={() => deleteImage(image._id)}>Delete</button>
//             </div>
//           ))}

//         </div>
//       )}
//   </>;
// };

// export default Gallery;