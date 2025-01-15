import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

interface NavItem {
    text: string;
    link: string;
}

interface HeaderProps {
    logoText: string;
    navItems: NavItem[];
    dropdownTitle: string;
    dropdownItems: string[];
}

const Header: React.FC<HeaderProps> = ({ logoText, navItems, dropdownTitle, dropdownItems }) => {
    const location = useLocation();
    const [activeNav, setActiveNav] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    // Update active navigation state based on pathname
    useEffect(() => {
        setActiveNav(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <header className="bg-pink-300 text-white shadow-md max-w-screen w-full">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    {/* Logo Section */}
                    <div className="text-2xl font-bold">
                        <Link to="/">{logoText}</Link>
                    </div>

                    {/* Hamburger Menu Icon for Small Screens */}
                    <button
                        className="text-2xl sm:hidden focus:outline-none"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Navigation Menu for Larger Screens */}
                    <nav className="hidden sm:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.text}
                                to={item.link}
                                className={`text-xl font-bold px-4 py-2 rounded-full transition-colors ${
                                    activeNav === item.link
                                        ? "bg-white text-pink-500"
                                        : "hover:bg-white hover:text-pink-500"
                                }`}
                            >
                                {item.text}
                            </Link>
                        ))}

                        {/* Dropdown Menu */}
                        <div
                            className="text-xl font-bold relative group"
                            onMouseEnter={() => setActiveNav(dropdownTitle)}
                            onMouseLeave={() => setActiveNav(null)}
                        >
                            <button
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    activeNav === dropdownTitle
                                        ? "bg-white text-pink-500"
                                        : "hover:bg-white hover:text-pink-500"
                                } flex items-center`}
                            >
                                {dropdownTitle} <span className="ml-1">▼</span>
                            </button>
                            <div
                                className={`text-lg absolute bg-white text-gray-800 rounded shadow-md mt-2 w-40 transition-opacity ${
                                    activeNav === dropdownTitle ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item}
                                        to="#"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Sidebar for Mobile Screens */}
            <Sidebar
                isOpen={isSidebarOpen}
                navItems={navItems}
                dropdownTitle={dropdownTitle}
                dropdownItems={dropdownItems}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
};

Header.propTypes = {
    logoText: PropTypes.string.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    dropdownTitle: PropTypes.string.isRequired,
    dropdownItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Header;
