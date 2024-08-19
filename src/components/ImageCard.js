import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaDownload, FaExpand } from 'react-icons/fa';

const ImageCard = ({ imageUrl, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL after download
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px',
        cursor: 'pointer',
        border: isSelected ? '3px solid #DA291B' : '3px solid transparent', // Highlight border if selected
        borderRadius: '8px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    // onClick={onSelect} // Handle selection on click
    >
      <img src={imageUrl} alt="img" style={{ width: '100%', borderRadius: '8px' }} />

      {isHovered && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          gap: '20px',
        }}>
          <FaDownload
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering selection when downloading
              handleDownload(); // Calls the handleDownload function
            }}
            style={{
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          />

          <FaExpand
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering selection when viewing
              toggleModal();
            }}
            style={{
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="View Image"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '60%',
            maxHeight: '600px',
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            overflow: 'hidden'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }
        }}
      >
        <img src={imageUrl} alt="img" style={{ width: '100%', height: 'auto' }} loading="lazy" />
        <button
          onClick={toggleModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ImageCard;
