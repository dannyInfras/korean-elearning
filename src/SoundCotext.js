import React, { createContext, useContext, useState } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);

    const toggleSound = () => {
        setIsSoundEnabled(prevState => !prevState);
    };

    return (
        <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
};