import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import CountUp from 'react-countup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import provJson from './indonesia-prov.json'; // Pastikan JSON ada dan valid
import './MapComponent.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Fungsi buat icon custom lingkaran warna & nomor kasus
const createCaseIcon = (level, cases) => {
  const size = Math.min(40 + cases / 5, 60);
  const colorMap = {
    high: '#ff4c4c',
    medium: '#ffcc00',
    low: '#4caf50',
  };
  const bgColor = colorMap[level] || '#888';

  const html = `
    <div style="
      background-color: ${bgColor};
      width: ${size}px;
      height: ${size}px;
      line-height: ${size}px;
      border-radius: 50%;
      text-align: center;
      color: #000;
      font-weight: bold;
      font-size: ${size / 3}px;
      border: 2px solid #333;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
      user-select: none;
      ">
      ${cases}
    </div>
  `;

  return new L.DivIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Data kasus HAM
const caseData = {
  "ACEH": { cases: 64, level: "medium" },
  "BALI": { cases: 35, level: "medium" },
  "BANTEN": { cases: 106, level: "high" },
  "BENGKULU": { cases: 8, level: "low" },
  "DAERAH ISTIMEWA YOGYAKARTA": { cases: 43, level: "medium" },
  "DKI JAKARTA": { cases: 592, level: "high" },
  "GORONTALO": { cases: 3, level: "low" },
  "KFA": { cases: 4, level: "low" },  // Pelayanan Pengaduan | KFA
  "JAMBI": { cases: 40, level: "medium" },
  "JAWA BARAT": { cases: 281, level: "high" },
  "JAWA TENGAH": { cases: 126, level: "high" },
  "JAWA TIMUR": { cases: 200, level: "high" },
  "KALIMANTAN BARAT": { cases: 72, level: "medium" },
  "KALIMANTAN SELATAN": { cases: 27, level: "low" },
  "KALIMANTAN TENGAH": { cases: 29, level: "low" },
  "KALIMANTAN TIMUR": { cases: 38, level: "medium" },
  "KALIMANTAN UTARA": { cases: 6, level: "low" },
  "KEPULAUAN BANGKA BELITUNG": { cases: 6, level: "low" },
  "KEPULAUAN RIAU": { cases: 13, level: "low" },
  "LAMPUNG": { cases: 40, level: "medium" },
  "MALAYSIA": { cases: 1, level: "low" },
  "MALUKU": { cases: 63, level: "medium" },
  "MALUKU UTARA": { cases: 2, level: "low" },
  "NUSA TENGGARA BARAT": { cases: 25, level: "low" },
  "NUSA TENGGARA TIMUR": { cases: 27, level: "low" },
  "PAPUA": { cases: 65, level: "medium" },
  "PAPUA BARAT": { cases: 3, level: "low" },
  "PAPUA BARAT DAYA": { cases: 7, level: "low" },
  "PAPUA PEGUNUNGAN": { cases: 4, level: "low" },
  "PAPUA SELATAN": { cases: 3, level: "low" },
  "PAPUA TENGAH": { cases: 6, level: "low" },
  "RIAU": { cases: 61, level: "medium" },
  "SULAWESI BARAT": { cases: 3, level: "low" },
  "SULAWESI SELATAN": { cases: 69, level: "medium" },
  "SULAWESI TENGAH": { cases: 33, level: "medium" },
  "SULAWESI TENGGARA": { cases: 29, level: "low" },
  "SULAWESI UTARA": { cases: 36, level: "medium" },
  "SUMATERA BARAT": { cases: 99, level: "medium" },
  "SUMATERA SELATAN": { cases: 102, level: "high" },
  "SUMATERA UTARA": { cases: 243, level: "high" },
  "TAIWAN": { cases: 1, level: "low" },
  "AFGHANISTAN": { cases: 1, level: "low" },
  "FILIPINA": { cases: 1, level: "low" },
  "HONGKONG": { cases: 1, level: "low" },
  "INGGRIS": { cases: 1, level: "low" },
  "NORWEGIA": { cases: 1, level: "low" },
  "TANPA KETERANGAN PROVINSI": { cases: 9, level: "low" }
};

const CombinedMapComponent = () => {
  const [advokats, setAdvokats] = useState([]);
  const [totalAdvokats, setTotalAdvokats] = useState(0);
  const [advokatRegions, setAdvokatRegions] = useState({
    "DKI Jakarta": 0,
    "Jawa Barat": 0,
    "Jawa Timur": 0,
    "Jawa Tengah": 0
  });
  const [totalCases, setTotalCases] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const total = Object.values(caseData).reduce((sum, item) => sum + item.cases, 0);
    setTotalCases(total);

    const fetchAdvokats = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/advokat-map');
        const data = await res.json();
        const validData = data.map(adv => ({
          ...adv,
          latitude: parseFloat(adv.latitude) || -6.2088,
          longitude: parseFloat(adv.longitude) || 106.8456,
        }));
        setAdvokats(validData);
        setTotalAdvokats(validData.length);

        const regionCount = validData.reduce((acc, adv) => {
          const addr = adv.address || '';
          if (addr.includes('Jakarta')) acc["DKI Jakarta"]++;
          if (addr.includes('Jawa Barat')) acc["Jawa Barat"]++;
          if (addr.includes('Jawa Timur')) acc["Jawa Timur"]++;
          if (addr.includes('Jawa Tengah')) acc["Jawa Tengah"]++;
          return acc;
        }, { "DKI Jakarta":0, "Jawa Barat":0, "Jawa Timur":0, "Jawa Tengah":0 });

        setAdvokatRegions(regionCount);
        setMapReady(true);
      } catch (e) {
        console.error(e);
        setMapReady(true);
      }
    };

    fetchAdvokats();
  }, []);

  const getCaseChartData = () => {
    const high = Object.values(caseData).filter(d => d.level === 'high').length;
    const medium = Object.values(caseData).filter(d => d.level === 'medium').length;
    const low = Object.values(caseData).filter(d => d.level === 'low').length;
    return {
      labels: ['Tinggi', 'Sedang', 'Rendah'],
      datasets: [{
        label: 'Jumlah Provinsi',
        data: [high, medium, low],
        backgroundColor: ['#ff4c4c', '#ffcc00', '#4caf50'],
        borderWidth: 1
      }]
    };
  };

  return (
    <div className="map-page">
      <Header />
      <div className="content-wrapper">
        <div className="hero-section">
          <h1>Radar Rakyat</h1>
          <p className="hero-subtitle">
            Platform pemantauan sebaran advokat dan kasus HAM di Indonesia
          </p>
        </div>

        <div className="main-content">

          {/* Peta Kasus HAM */}
          <section className="map-section">
            <div className="section-header">
              <h2>Peta Sebaran Kasus HAM</h2>
              <div className="total-count">
                <CountUp end={totalCases} duration={2} className="count-number" />
                <span>Total Kasus HAM</span>
              </div>
            </div>
            <div className="map-container-wrapper">
              {mapReady && (
                <MapContainer
                  center={[-2.5489, 118.0149]}
                  zoom={5}
                  style={{ height: '500px', width: '100%' }}
                  key="cases-map"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  {provJson.map(prov => {
                    const provinceData = caseData[prov.name.toUpperCase()] || { cases: 0, level: 'low' };
                    const icon = createCaseIcon(provinceData.level, provinceData.cases);
                    return (
                      <Marker
                        key={`case-${prov.id}`}
                        position={[prov.latitude, prov.longitude]}
                        icon={icon}
                      >
                        <Popup>
                          <h4>{prov.name}</h4>
                          <p>Kasus: {provinceData.cases}</p>
                          <p>Tingkat: {provinceData.level === 'high' ? 'Tinggi' : provinceData.level === 'medium' ? 'Sedang' : 'Rendah'}</p>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              )}
            </div>
          </section>

          {/* Peta Advokat */}
          <section className="map-section">
            <div className="section-header">
              <h2>Peta Sebaran Advokat</h2>
              <div className="total-count">
                <CountUp end={totalAdvokats} duration={2} className="count-number" />
                <span>Total Advokat</span>
              </div>
            </div>

            <div className="distribution-section">
              <h3>Sebaran Advokat per Wilayah</h3>
              <div className="region-list">
                {Object.entries(advokatRegions).map(([region, count]) => (
                  <div className="region-item" key={region}>
                    <span className="region-name">{region}</span>
                    <span className="region-count">{count}</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: totalAdvokats > 0 ? (count / totalAdvokats) * 100 + '%' : 0,
                          backgroundColor: '#3182ce'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-container-wrapper">
              {mapReady && (
                <MapContainer
                  center={[-2.5489, 118.0149]}
                  zoom={5}
                  style={{ height: '500px', width: '100%' }}
                  key="advokat-map"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  {advokats.map(adv => (
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
              )}
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CombinedMapComponent;
