// model.js

import React, { useState } from 'react';

const Model = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/process_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { image_url } = await response.json();
        // Update the state with the processed image URL
        setProcessedImageUrl(`http://localhost:5000${image_url}`);
      } else {
        console.error('Error processing image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageSubmit}>Submit Image</button>

      {processedImageUrl && (
        <div>
          <p>Processed Image:</p>
          <img src={processedImageUrl} alt="Processed" />
        </div>
      )}
    </div>
  );
};

export default Model;
