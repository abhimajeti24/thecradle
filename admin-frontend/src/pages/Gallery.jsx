import { useEffect } from "react";
import {useState} from "react";
import toast from "react-hot-toast";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllImages = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/gallery/");

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const result = await response.json();
      setImages(result);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllImages();
  }, [])

  return <>
    <h2>Gallery of events</h2>
    {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images found</p>
      ) : (
        <div className="image-container">
          {images.map((image) => (
            <div key={image._id} className="image-card">
              <img 
                src={image.url} 
                alt={image.title} 
                style={{ width: "100px", height: "auto" }}
              />
              <h3>{image.title}</h3>
              <p>{image.event}</p>
              <small>
                {new Date(image.createdAt).toLocaleDateString()}
              </small>

            </div>
          ))}

        </div>
      )}
  </>;
};

export default Gallery;