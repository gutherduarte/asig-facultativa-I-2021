import React from 'react';
import './item.styles.css';

export const Item = (props) => {
    const {
        image,
        name,
        species,
    } = props;
    return (
        <article className='character'>
            <header className='character-header'>
                <h1>{name}</h1>
                <p>{species}</p>
            </header>
            <section className='character-resource'>
                <img src={image} />
            </section>
        </article>
    );
};