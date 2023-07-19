import React, {createContext, useState} from 'react';
import {useEffect} from 'react';

export const PreloaderContext = createContext();


export const PreloaderProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    return (
        <PreloaderContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </PreloaderContext.Provider>
    );
};
