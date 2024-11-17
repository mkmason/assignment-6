import React, { useEffect, useState } from 'react';

const ImagesFor = ({ id }) => {
    const [images, setImages] = useState([]);
    const API_KEY = '0263244cabbc1d330a16d2f2c343388b';

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`);
                const data = await response.json();
                setImages(data.profiles);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [id, API_KEY]);

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
