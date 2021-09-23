import {useEffect} from 'react';
import {useScreenHook} from './useScreenHook';
import {useDataProvider,LOADING} from './useDataProvider';

const API_URL = process.env.API_URL || 'https://rickandmortyapi.com/api/character';

if(process.env.API_URL) {
    console.log(`ENVIRONMENT VARIABLE CONFIGURED WITH VALUE: ${process.env.API_URL}`);
}
else {
    console.log(`ENVIRONMENT VARIABLE NOT FOUND`);
}
const mergeData = (currentData, newData) => {
    if(newData) {
        const elementsToAdd = newData.filter(newItem => {
            return !currentData.some(item => item.id === newItem.id)
        });
        return [
            ...currentData,
            ...elementsToAdd,
        ];
    }
    return currentData;
};

export const useInfinityScrollCharacters = (
    elementToObserveRef,
    charactersRef
) => {
    const [isShowing] = useScreenHook(elementToObserveRef, '600px');
    const [state, loading] = useDataProvider(API_URL);
    const {
        statusData,
        data,
    } = state;
    const {results, info} = data ? data : {};
    charactersRef.current = mergeData(charactersRef.current,results);
    useEffect(() => {
        if(isShowing && statusData !== LOADING) {
            if(info.next) loading(info.next);
        };
    },[isShowing]);
    return [state];
};