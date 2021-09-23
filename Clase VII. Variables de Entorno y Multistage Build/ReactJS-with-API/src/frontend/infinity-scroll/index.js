import React, {useRef} from 'react';
import {List} from './list';
import {useInfinityScrollCharacters} from './useInfinityScrollCharacters';

export const Characters = () => {
    const elementToObserveRef = useRef();
    const charactersDataRef = useRef([]);
    const [state] = useInfinityScrollCharacters(elementToObserveRef, charactersDataRef);
    const {
        statusData,
        error,
    } = state;
    return (
        <List
            status={statusData}
            charactersData={charactersDataRef.current}
            error={error}
            elementToObserveRef={elementToObserveRef}
        />
    );
};