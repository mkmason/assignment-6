import React, { useEffect, useState } from 'react';
import key from './key';

const ImagesFor = ({ id }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${key}`);
                const data = await response.json();
                setImages(data.profiles);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [id, key]);

    const baseUrl = "https://image.tmdb.org/t/p/";
    const fileSize = "w45";

    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={`${baseUrl}${fileSize}${image.file_path}`} alt={`Profile ${index + 1}`} />
            ))}
        </div>
    );
};

export default ImagesFor;
