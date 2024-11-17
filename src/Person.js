import React from 'react';
import Movie from './Movie';
import ImagesFor from './ImagesFor';

const Person = ({ person }) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <p>Known for: {person.known_for_department}</p>
            <ImagesFor id={person.id} />
            <div>
                {person.known_for.map((movie, index) => (
                    <Movie key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Person;
