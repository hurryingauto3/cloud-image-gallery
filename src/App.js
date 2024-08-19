import React, { useState } from 'react';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (files) => {
    // You can process the files here, e.g., send them to the backend
    const newFiles = Array.from(files).map((file) => URL.createObjectURL(file));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  return (
    <div>
      <Header onUpload={handleUpload} />
      <ImageGrid images={uploadedFiles} /> {/* Pass the uploaded images to the grid */}
    </div>
  );
};

export default App;
