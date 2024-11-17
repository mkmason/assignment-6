import React from 'react';

const Movie = ({ movie }) => {
    return (
        <div>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>{movie.overview}</p>
        </div>
    );
};

export default Movie;
