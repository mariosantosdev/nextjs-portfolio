import { createContext, useEffect, useState } from "react";

type AppContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const AppContext = createContext({} as AppContextType);

export default function AppProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    function toggleDarkMode(state = true) {
        const html = document.getElementsByTagName('html');
        const isDark = html[0].classList.contains('dark');

        if (state && !isDark) {
            html[0].classList.add('dark');
            setDarkMode(true);
            return
        }
        if (!isDark) {
            html[0].classList.add('dark');
            setDarkMode(true);
            return
        }

        setDarkMode(false);
        html[0].classList.remove('dark');
    }

    useEffect(() => {
        window.addEventListener('load', () => {
            const isDark = localStorage.getItem('@marioportfolio:darkmode');

            toggleDarkMode(Boolean(isDark));
        })

        return window.removeEventListener('load', () => { });
    }, []);

    return (
        <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    )
}