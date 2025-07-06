import React from "react";
import KotakSaran from "./kontaksaran";
import Navbar from "../navbar";

const MapsContact: React.FC = () => (
  <div className="bg-blue-500 min-h-screen">
    <div className="">
      <Navbar/>
    </div>
    <div className="min-h-screen bg-blue-900 py-25">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Hubungi Kami</h2>
      <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8 rounded"></div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
        {/* Denah Lokasi */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-900">Denah Lokasi</h3>
          <div className="rounded-lg overflow-hidden shadow">
            <iframe
              title="Denah Lokasi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7841356616927!2d107.59844357499648!3d-6.916392093083207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63ce3bd88b1%3A0xbecf6297a64f6256!2sSMA%20Pasundan%203%20Bandung!5e0!3m2!1sid!2sid!4v1751738063148!5m2!1sid!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Kontak */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-900">Kontak</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
                  <path d="M12 16v2m0 0h-2m2 0h2" />
                </svg>
              </span>
              <span>Email</span>
              <span className="ml-2 text-gray-700">smapasundan3bdg@yahoo.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span>Address</span>
              <span className="ml-2 text-gray-700">Jl. Kebon Jati No.31 Kb.Jeruk
              Kec.Andir, Kota Bandung, Jawa Barat.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5h12M9 3v2m0 4v2m0 4v2m0 4v2" />
                </svg>
              </span>
              <span>Phone</span>
              <span className="ml-2 text-gray-700">Call or Chat: +62 813-2026-4411 & +62 813-2026-4422</span>
            </div>
           
          </div>
        </div>
      </div>
      <KotakSaran/>
    </div>
  </div>
);

export default MapsContact;
