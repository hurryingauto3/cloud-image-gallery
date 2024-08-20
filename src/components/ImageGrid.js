import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCard from './ImageCard'; // Assuming the component is named 'ImageCard'
import { getImagesFromAPI } from '../utils/api';


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
