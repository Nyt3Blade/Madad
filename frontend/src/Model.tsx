import React, { useState, ChangeEvent } from 'react';

interface ProcessedImageResponse {
  image_url: string;
}

const Model: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageSubmit = async (): Promise<void> => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/process_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data: ProcessedImageResponse = await response.json();
        setProcessedImageUrl(`http://localhost:5000${data.image_url}`);
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