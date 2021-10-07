import React, {useState, useEffect,} from 'react';
import {List} from './list';

export const Characters = () => {
    const [characterData, setCharactersData] = useState([]);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character/');

    const [connected, setConnected] = useState(!navigator ? null : navigator.onLine);

    const handleConnectedChanged = () => {
        if(!navigator) setConnected(null);

        setConnected(navigator.onLine);
    };

    const handlePrevClick = () => setUrl(prev);
    const handleNextClick = () => setUrl(next);

    useEffect(() => {
        if(window) {
            window.addEventListener('online', handleConnectedChanged);
            window.addEventListener('offline', handleConnectedChanged);
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setCharactersData(data.results);
            setPrev(data.info.prev);
            setNext(data.info.next);
        })
        .catch(error => console.log(error));

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
        />
    );
};