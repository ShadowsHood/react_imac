import { Outlet } from "react-router-dom";
import Header from './components/sections/Header.jsx'
import Footer from './components/sections/Footer.jsx'

const Layout = () => {
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