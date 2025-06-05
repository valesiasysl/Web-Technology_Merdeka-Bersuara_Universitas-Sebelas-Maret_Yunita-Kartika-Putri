import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CountUp from 'react-countup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/MapComponent.css';

// Setup icon leaflet default agar marker muncul dengan benar
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ITEMS_PER_PAGE = 5;

// Komponen pagination sederhana
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10 }}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      aria-label="Previous Page"
    >
      Prev
    </button>
    <span style={{ lineHeight: '30px' }}>
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      aria-label="Next Page"
    >
      Next
    </button>
  </div>
);

// Mock function for Google Places data (replace with real API call if tersedia)
async function fetchGooglePlacesData(addresses) {
  // Simulasi delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return addresses.map(address => ({
    placeName: `Kantor Hukum ${address.slice(0, 15)}`,
    placeAddress: address,
  }));
}

const PetaAdvokat = () => {
  const [advokats, setAdvokats] = useState([]);
  const [totalAdvokats, setTotalAdvokats] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const [googlePlacesData, setGooglePlacesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data advokat dan Google Places saat mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/advokat-map'); // Update this URL if needed
        const data = await res.json();

        // Validasi latitude & longitude, default ke Jakarta jika tidak valid
        const validatedAdvokats = data.map(item => ({
          ...item,
          latitude: Number(item.latitude) || -6.2088,
          longitude: Number(item.longitude) || 106.8456,
        }));

        setAdvokats(validatedAdvokats);
        setTotalAdvokats(validatedAdvokats.length);

        // Ambil data Google Places mock (bisa diganti API nyata)
        const addresses = validatedAdvokats.map(adv => adv.address || '');
        const googleData = await fetchGooglePlacesData(addresses);
        setGooglePlacesData(googleData);

      } catch (error) {
        console.error('Error fetching advokat data:', error);
      } finally {
        setMapReady(true);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(advokats.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedAdvokats = advokats.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pagedGoogleData = googlePlacesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Ganti halaman
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />

      <main className="main-content" style={{ padding: 20 }}>
        <section
          className="map-section"
          style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
          aria-label="Peta dan daftar advokat"
        >
          {/* Bagian Peta */}
          <div style={{ flex: '1 1 60%', minWidth: 300 }}>
            <div className="section-header" style={{ marginBottom: 10 }}>
              <h2>Peta Sebaran Advokat</h2>
              <div className="total-count" style={{ fontSize: '1.5rem', color: '#3182ce' }}>
                <CountUp end={totalAdvokats} duration={2} />
                <span style={{ marginLeft: 8 }}>Total Advokat</span>
              </div>
            </div>

            <div
              style={{
                height: 500,
                width: '100%',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              }}
            >
              {mapReady ? (
                <MapContainer
                  center={[-2.5489, 118.0149]}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom
                  aria-label="Peta sebaran advokat"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {advokats.map((adv) => (
                    <Marker
                      key={`advokat-${adv.id}`}
                      position={[adv.latitude, adv.longitude]}
                    >
                      <Popup>
                        <h4>{adv.name || 'Nama tidak tersedia'}</h4>
                        <p><strong>Alamat:</strong> {adv.address || '-'}</p>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <p>Loading peta...</p>
              )}
            </div>
          </div>

          {/* Sidebar daftar advokat dengan pagination */}
          <aside
            style={{
              flex: '1 1 35%',
              minWidth: 280,
              maxHeight: 600,
              overflowY: 'auto',
              padding: 16,
              border: '1px solid #ddd',
              borderRadius: 12,
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
            }}
            aria-label="Daftar advokat"
          >
            <h3>Daftar Advokat</h3>

            {pagedAdvokats.length === 0 ? (
              <p>Tidak ada data advokat.</p>
            ) : (
              pagedAdvokats.map((adv, i) => {
                const googleInfo = pagedGoogleData[i];
                return (
                  <div
                    key={adv.id}
                    style={{ borderBottom: '1px solid #eee', paddingBottom: 12, marginBottom: 12 }}
                  >
                    <h4 style={{ margin: 0, color: '#3182ce' }}>{adv.name || 'Nama tidak tersedia'}</h4>
                    <p style={{ margin: '4px 0' }}>
                      <strong>Alamat Lokal:</strong> {adv.address || '-'}
                    </p>
                    {googleInfo && (
                      <>
                        <p style={{ margin: '4px 0', fontStyle: 'italic', color: '#555' }}>
                          <strong>Google Place:</strong> {googleInfo.placeName}
                        </p>
                        <p style={{ margin: '4px 0', fontSize: 12, color: '#777' }}>
                          {googleInfo.placeAddress}
                        </p>
                      </>
                    )}
                  </div>
                );
              })
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PetaAdvokat;
