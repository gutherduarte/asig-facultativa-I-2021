import React, {useState, useEffect, useReducer,} from 'react';
import {List} from './list';

export const LOADING = 'loading';
export const SUCCESS = 'success';
export const ERROR = 'error';

const reducer = (state, action) => {
    switch(action.type) {
        case LOADING: return {
            ...state,
            statusData: LOADING,
            url: action.payload.url,
        };
        case SUCCESS: return {
            ...state,
            statusData: SUCCESS,
            characterData: action.payload.characterData,
            prev: action.payload.prev,
            next: action.payload.next,
        };
        case ERROR: return {
            ...state,
            statusData: ERROR,
            error: action.payload.error,
        };
    }
};

const initialState = {
    characterData: [],
    prev: null,
    next: null,
    url: 'https://rickandmortyapi.com/api/character/',
    statusData: LOADING,
    error: null,
};

export const Characters = () => {
    const [state, dispatch] = useReducer(reducer, initialState,);
    const {
        characterData,
        prev,
        next,
        url,
        statusData,
        error,
    } = state;

    const [connected, setConnected] = useState(!navigator ? null : navigator.onLine);

    const handleConnectedChanged = () => {
        if(!navigator) setConnected(null);

        setConnected(navigator.onLine);
    };

    const handlePrevClick = () => dispatch({
        type: LOADING,
        payload: {url: prev},
    });
    const handleNextClick = () => dispatch({
        type: LOADING,
        payload: {url: next},
    });

    useEffect(() => {
        if(window) {
            window.addEventListener('online', handleConnectedChanged);
            window.addEventListener('offline', handleConnectedChanged);
        }
        if(statusData === LOADING) {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: SUCCESS,
                    payload: {
                        characterData: data.results,
                        prev: data.info.prev,
                        next: data.info.next,
                    },
                });
            })
            .catch(error => dispatch({
                type: ERROR,
                payload: { error: error },
            }));
        }

        return () => {
            if(window) {
                window.removeEventListener('online', handleConnectedChanged);
                window.removeEventListener('offline', handleConnectedChanged);
            }
        };
    }, [url]);

    return (
        <List
            data={characterData}
            onNext={handleNextClick}
            onPrev={handlePrevClick}
            next={next}
            prev={prev}
            connected={connected}
            statusData={statusData}
            error={error}
        />
    );
};