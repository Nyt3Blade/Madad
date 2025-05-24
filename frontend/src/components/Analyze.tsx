import React, { useState, useRef } from 'react';
import './Analyze.css';

type AnalysisType = 'plant' | 'soil';

const Analyze: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('plant');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const pasteAreaRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<{
    name: string;
    cause?: string;
    cure?: string;
    characteristics?: string;
    suitableCrops?: string[];
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    Array.from(items).forEach(item => {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(file));
          setResult(null);
          setError(null);
          setShowPasteArea(false);
        }
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const endpoint = analysisType === 'plant' 
        ? 'analyze/plant-disease'
        : 'analyze/soil-type';

      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data.prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="result-box">
        <h4>Analysis Result</h4>
        <p><strong>{analysisType === 'plant' ? 'Disease' : 'Soil Type'}:</strong> {result.name}</p>
        
        {analysisType === 'plant' && (
          <>
            <p><strong>Cause:</strong> {result.cause}</p>
            <p><strong>Recommended Treatment:</strong> {result.cure}</p>
          </>
        )}

        {analysisType === 'soil' && (
          <>
            <p><strong>Characteristics:</strong> {result.characteristics}</p>
            <p><strong>Suitable Crops:</strong></p>
            <ul>
              {result.suitableCrops?.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="analyze-container">
      <h2>Image Analysis</h2>
      
      <div className="analysis-type-selector">
        <button
          className={`type-button ${analysisType === 'plant' ? 'active' : ''}`}
          onClick={() => setAnalysisType('plant')}
        >
          Plant Disease Detection
        </button>
        <button
          className={`type-button ${analysisType === 'soil' ? 'active' : ''}`}
          onClick={() => setAnalysisType('soil')}
        >
          Soil Type Detection
        </button>
      </div>

      <div className="analysis-sections">
        <div className="analysis-section">
          <h3>{analysisType === 'plant' ? 'Upload Plant Image' : 'Upload Soil Image'}</h3>
          <p className="section-description">
            {analysisType === 'plant' 
              ? 'Upload a clear image of a plant leaf to analyze for potential diseases.'
              : 'Upload a clear image of soil to analyze its type and characteristics.'}
            Our AI model can provide detailed analysis and recommendations.
          </p>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="image-upload">
              <input
                type="file"
                id="image-upload"
                className="file-input"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <label htmlFor="image-upload" className="upload-label">
                {selectedFile ? selectedFile.name : 'Choose an image...'}
              </label>
            </div>

            <div className="paste-option">
              <button
                type="button"
                className="paste-button"
                onClick={() => setShowPasteArea(!showPasteArea)}
              >
                {showPasteArea ? 'Hide Paste Area' : 'Paste Image Instead'}
              </button>
              
              {showPasteArea && (
                <div 
                  ref={pasteAreaRef}
                  className="paste-area"
                  onPaste={handlePaste}
                  tabIndex={0}
                >
                  <p>Click here and paste (Ctrl+V) your image</p>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {renderResult()}
        </div>

        <div className="analysis-section">
          <h3>How It Works</h3>
          <div className="how-it-works">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Upload or Paste Image</h4>
                <p>Upload a photo or paste an image from your clipboard</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>AI Analysis</h4>
                <p>Our AI model analyzes the image to provide detailed insights</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Get Results</h4>
                <p>Receive detailed analysis and recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;