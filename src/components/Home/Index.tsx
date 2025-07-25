import { useState, useEffect } from "react";
import Navbar from "../navbar/index";
import axios from "axios";
import "./css/all-css-libraries.css";
import "../../index.css";

const Home = () => {
    const [banners, setBanners] = useState<{ imageUrl: string; title?: string; description?: string }[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('https://sekola-backend-production.up.railway.app/api/banner');
                setBanners(response.data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [banners]);

    return (
        <div className="relative min-h-screen bg-blue-900 pt-20 pb-20">
            <Navbar />

            {/* Background Shapes */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute bottom-20 left-32 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 bg-green-200 rounded-full opacity-40 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center">
                    {/* Carousel */}
                    <div className="w-full flex justify-center mb-8">
                        <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-lg">
                            {banners.length > 0 && (
                                <img
                                    src={banners[activeIndex].imageUrl}
                                    className="w-full h-[350px] object-cover transition-all duration-700"
                                    alt={`Slide ${activeIndex + 1}`}
                                />
                            )}
                            {/* Carousel indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {banners.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-3 h-3 rounded-full ${activeIndex === idx ? "bg-blue-600" : "bg-gray-300"}`}
                                        onClick={() => setActiveIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                                <i className="bi bi-tools text-blue-600 text-2xl"></i>
                            </div>
                            <span className="text-3xl font-bold text-blue-900">+ 62</span>
                            <h6 className="text-gray-600 mt-1">Guru</h6>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                                <i className="bi bi-brush text-green-600 text-2xl"></i>
                            </div>
                            <span className="text-3xl font-bold text-green-900">+ 20</span>
                            <h6 className="text-gray-600 mt-1">Tenaga Pendidik</h6>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 mb-3">
                                <i className="bi bi-bar-chart text-cyan-600 text-2xl"></i>
                            </div>
                            <span className="text-3xl font-bold text-cyan-900">+ 814</span>
                            <h6 className="text-gray-600 mt-1">Siswa</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
