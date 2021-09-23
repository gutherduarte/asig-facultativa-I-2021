import React from 'react';
import {
    LOADING,
    ERROR,
} from './useDataProvider';
import {Item} from './item';
import './list.styles.css';

export const List = (props) => {
    const {
        status,
        charactersData,
        error,
        elementToObserveRef,
    } = props;
    return (
        <section className='characters-list'>
            {charactersData && charactersData.map(character => {
                return (
                    <Item
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        species={character.species}
                    />
                );
            })}
            <section ref={elementToObserveRef} className='loading'>
                <p>
                    Cargando una nueva página...
                </p>
                {status === ERROR && (
                    <p>{error.message}</p>
                )}
            </section>
        </section>
    );
};