import React from 'react';
import {LOADING, ERROR,} from './index-with-context';

export const List = (props) => {
    const {
        data,
        onNext,
        onPrev,
        next,
        prev,
        connected,
        statusData,
        error,
    } = props;
    return(
        <>
            {statusData === LOADING && (
                <p>Cargando datos...</p>
            )}
            {statusData === ERROR && (
                <p>{error.message}</p>
            )}
            <ul>
                {data && data.map(item => {
                    return (<li key={item.id}>{item.name}</li>);
                })}
            </ul>
            <button
                disabled={prev === null ? true : false}
                onClick={onPrev}
            >
                Anterior
            </button>
            <button
                disabled={next === null ? true : false}
                onClick={onNext}
            >
                Siguiente
            </button>
            {connected !== null && (
                <p>{connected === true ? 'Online' : 'Offline'}</p>
            )}
        </>
    );
};