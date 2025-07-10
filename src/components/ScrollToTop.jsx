import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force immediate scroll to top
        window.scrollTo(0, 0);
        
        // Override any browser scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;