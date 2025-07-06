import { useState, useEffect } from 'react';

import "./mycss.css"
import { Link } from 'react-router-dom';
import Logo from "../../assets/pas3/sma3-title-white-normal-75.png"

// Type definitions (Pastikan ini ada di file types Anda, misalnya frontend/src/types/navbar.ts)
interface NavItem {
    path: string;
    label: string;
}

// Navbar component
const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    // Debugging logs (bisa dihapus setelah selesai debugging)
    useEffect(() => {
        // console.log("Mobile menu isOpen:", isOpen);
    }, [isOpen]);

    useEffect(() => {
        console.log("Profile dropdown isProfileOpen:", isProfileOpen);
    }, [isProfileOpen]);

    // Logic untuk mengubah Navbar saat di-scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items (bisa dipindahkan ke file constants/navigation.ts)
    const navItems: NavItem[] = [
        { path: '/', label: 'Home' },
        { path: '/all-news', label: 'Berita' },
        { path: '/Allprestasi', label: 'Prestasi' },
        { path: '/ppdb', label: 'PPDB' },
        { path: '/contact', label: 'Kontak' },
    ];

    const profileItems: NavItem[] = [
        { path: '/profile/visi-misi', label: 'Visi & Misi' },
        { path: '/profile/riwayat-kepala-sekolah', label: 'Riwayat Kepala Sekolah' },
        { path: '/profile/staff', label: 'Guru & Staff' },
        { path: '/profile/struktur-organisasi', label: 'Struktur Organisasi' },
    ];

    // Kelas teks dinamis untuk desktop
    const desktopTextColorClass = isScrolled ? 'text-gray-700' : 'text-white';
    const desktopHoverColorClass = isScrolled ? 'hover:text-blue-600' : 'hover:text-blue-300'; // Hover untuk teks putih

    // Kelas teks untuk mobile (selalu gelap karena background mobile menu putih)
    const mobileTextColorClass = 'text-gray-700';
    const mobileHoverColorClass = 'hover:text-blue-600';

    return (
        <nav 
            className={`fixed w-full top-0 z-50 transition-all no-underline duration-300 ease-in-out
                       ${isScrolled ? 'bg-blue-950 shadow-lg' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                className="h-12 w-auto" 
                                // Ganti URL gambar berdasarkan state isScrolled
                                src={Logo}
                                alt="SMA Pasundan 3" 
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item: NavItem) => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`${desktopTextColorClass} ${desktopHoverColorClass} px-3 py-2 rounded-md text-sm font-bold !no-underline`}
                                style={{ textDecoration: "none" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                        
                        {/* Profile Dropdown for Desktop */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className={`${desktopTextColorClass} ${desktopHoverColorClass} px-3 py-2 rounded-md text-sm font-bold !no-underline`}
                                style={{ textDecoration: "none", display: "flex" }}
                            >
                                Profile
                                <svg 
                                    className={`ml-2 h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''} ${desktopTextColorClass}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isProfileOpen && (
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        {profileItems.map((item: NavItem) => (
                                            <Link 
                                                key={item.path}
                                                to={item.path} 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PPDB Button for Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link 
                            to="/ppdb" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline"
                        >
                            PPDB 2025
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${desktopTextColorClass} ${desktopHoverColorClass} focus:outline-none`}
                            aria-label="Toggle menu"
                        >
                            <svg 
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg 
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu content */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item: NavItem) => (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`block px-3 py-2 rounded-md text-base ${mobileTextColorClass} ${mobileHoverColorClass} font-bold no-underline`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    
                    {/* Profile Dropdown for Mobile */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base ${mobileTextColorClass} ${mobileHoverColorClass} font-bold no-underline flex items-center justify-between`}
                        >
                            Profile
                            <svg 
                                className={`ml-2 h-4 w-4 transition-transform ${isMobileProfileOpen ? 'rotate-180' : ''} ${mobileTextColorClass}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isMobileProfileOpen && (
                            <div className="pl-6 pr-3 py-1 space-y-1">
                                {profileItems.map((item: NavItem) => (
                                    <Link 
                                        key={item.path}
                                        to={item.path} 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md no-underline font-normal" // Sub-item mobile bisa normal atau bold sesuai selera
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link 
                        to="/ppdb" 
                        className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-base font-bold mt-4 no-underline"
                    >
                        PPDB 2025
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;