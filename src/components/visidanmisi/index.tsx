import { useState } from 'react';
import Navbar from '../navbar';
import "../Home/css/all-css-libraries.css";
import VisiImg from "../../assets/pas3/visimisi.webp";
import MisiImg from "../../assets/pas3/MISI.webp";
import TujuanImg from "../../assets/pas3/TUJUAN.webp";

export default function VisiMisi() {
    const [activeTab, setActiveTab] = useState("visi");
    const [tabKey, setTabKey] = useState(0); // Untuk trigger ulang animasi

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setTabKey(prev => prev + 1); // Ganti key agar animasi ulang
    };

    return (
        <div className="relative min-h-screen bg-blue-900 pt-20 ">
            <Navbar/>
            <div className="max-w-3xl mx-auto py-10">
                <h2 className="text-2xl font-bold text-center mb-2">Visi dan Misi</h2>
                <h3 className="text-lg font-semibold text-center text-blue-900 mb-6">SMA Pasundan 3 Bandung</h3>
                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-2">
                    {["Visi", "Misi", "Tujuan"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab.toLowerCase())}
                            className={`px-6 py-2 rounded-t-md font-semibold transition ${
                                activeTab === tab.toLowerCase()
                                    ? "bg-yellow-400 text-blue-900 shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="border-t-2 border-gray-200" />
                {/* Content with animation */}
                <div
                    key={tabKey}
                    className="animate-fadeInSlide"
                >
                    {activeTab === "visi" && (
                        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
                            <img
                                src={VisiImg}
                                alt="Visi"
                                className="w-48 h-48 object-contain rounded bg-gray-100 shadow-lg"
                            />
                            <div className="text-left">
                                <b>Visi SMA PASUNDAN 3</b>
                                <p className="mt-2">
                                    "Mewujudkan lulusan SMA PASUNDAN 3 yang Berprestasi, Inovatif, Semat, Agamis dan Berwawasan Lingkungan Hidup"
                                </p>
                                <ul className="list-disc ml-6 mt-2 text-sm">
                                    <li>Berprestasi</li>
                                    <li>Inovatif</li>
                                    <li>Semat</li>
                                    <li>Agamis</li>
                                    <li>Berwawasan Lingkungan Hidup</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab === "misi" && (
                        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
                            <img
                                src={MisiImg}
                                alt="Misi"
                                className="w-48 h-48 object-contain rounded bg-gray-100 shadow-lg"
                            />
                            <div className="text-left">
                                <b>Misi SMA PASUNDAN 3</b>
                                <ul className="list-decimal ml-6 mt-2 text-sm">
                                    <li>Meningkatkan prestasi akademik dan non-akademik</li>
                                    <li>Mengembangkan inovasi dalam pembelajaran</li>
                                    <li>Menanamkan nilai-nilai keagamaan</li>
                                    <li>Mewujudkan sekolah yang peduli lingkungan</li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {activeTab === "tujuan" && (
                        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
                            <img
                                src={TujuanImg}
                                alt="Tujuan"
                                className="w-48 h-48 object-contain rounded bg-gray-100 shadow-lg"
                            />
                            <div className="text-left">
                                <b>Tujuan SMA PASUNDAN 3</b>
                                <ul className="list-decimal ml-6 mt-2 text-sm">
                                    <li>Menghasilkan lulusan yang kompeten dan berkarakter</li>
                                    <li>Meningkatkan kualitas pembelajaran</li>
                                    <li>Meningkatkan kepedulian terhadap lingkungan</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                {/* Tambahkan animasi fadeInSlide */}
                <style>{`
                    .animate-fadeInSlide {
                        animation: fadeInSlide 0.7s cubic-bezier(0.4,0,0.2,1);
                    }
                    @keyframes fadeInSlide {
                        from {
                            opacity: 0;
                            transform: translateY(40px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}