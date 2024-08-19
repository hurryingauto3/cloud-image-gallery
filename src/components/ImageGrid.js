import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCard from './ImageCard'; // Assuming the component is named 'ImageCard'

async function getImagesFromAPI() {
    try {
        const response = await fetch('http://localhost:3001/images');
        console.log('Raw response:', response);

        const images = await response.json();
        console.log('Parsed JSON:', images);

        // Check if images is an array
        if (!Array.isArray(images.fileUrls)) {
            console.error('Expected an array but got:', typeof images);
            return [];
        }

        return images.fileUrls.map((url, index) => ({
            id: index + 1,
            url: url,
        }));
    } catch (error) {
        console.error('Failed to fetch images', error);
        return [];
    }
}

const ImageGrid = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            const newImages = await getImagesFromAPI();
            setImages(newImages);
        };

        fetchImages();
    }, []);

    const fetchMoreImages = async () => {
        const newImages = await getImagesFromAPI();
        setImages([...images, ...newImages]);
    };

    const handleSelectImage = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((img) => img !== image));
        } else {
            setSelectedImages([...selectedImages, image]);
        }
    };
    console.log(images)

    return (
        <InfiniteScroll
            dataLength={images.length}
            next={fetchMoreImages}
            hasMore={hasMore}
            loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', margin: '20px' }}>
                {images.map((image) => (
                    <ImageCard
                        key={image.id}
                        imageUrl={image.url}
                        isSelected={selectedImages.includes(image)}
                        onSelect={() => handleSelectImage(image)}
                    />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default ImageGrid;
