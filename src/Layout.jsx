import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/sections/Header.jsx'
import Footer from './components/sections/Footer.jsx'

const Layout = () => {

    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const percentage = (scrollY / (documentHeight - windowHeight)) * 100;
            const clampedPercentage = Math.min(100, Math.max(0, percentage));

            setScrollPercentage(clampedPercentage);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // console.log(`Scroll Percentage: ${scrollPercentage}%`);
        if (scrollPercentage) {
            document.body.classList.add('scrolled')
        } else {
            document.body.classList.remove('scrolled')
        }
    }, [scrollPercentage]);

    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Content of pages */}
            </main>
            <Footer />
        </>
    );
};

export default Layout;