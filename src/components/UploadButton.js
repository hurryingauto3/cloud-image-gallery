import React from 'react';

const UploadButton = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <label
        htmlFor="file-upload"
        style={{
          backgroundColor: '#fff',
          color: '#DA291B',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        Upload Image
      </label>
    </div>
  );
};

export default UploadButton;
