import {useState, useEffect} from 'react';

export const useScreenHook = (reference, margin) => {
    const [isShowing, setShowing] = useState(false);
    useEffect(() =>  {
        if(IntersectionObserver) {
            const handleIntersecting = (entries) => {
                const [entry] = entries;
                setShowing(entry.isIntersecting);
            };
            const options = {rootMargin: margin};
            const observer = new IntersectionObserver(handleIntersecting, options);
            if(reference.current) {
                observer.observe(reference.current);
            }
            return () => observer.unobserve(reference.current);
        }
    }, []);
    return [isShowing];
};