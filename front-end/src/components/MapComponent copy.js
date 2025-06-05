import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import CountUp from 'react-countup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import provJson from './indonesia-prov.json'; // Pastikan JSON ini ada dan struktur provinsi benar
import './MapComponent.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const getIconByCaseLevel = (level, cases) => {
  const size = Math.min(35 + cases / 10, 50);
  let color = '#808080'; // default gray
  if (level === 'high') color = '#ff0000'; // red
  else if (level === 'medium') color = '#ffff00'; // yellow
  else if (level === 'low') color = '#00ff00'; // green

  return new L.DivIcon({
    className: `leaflet-div-icon-${level}`,
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid #444;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Data asli pengadu dari user, jumlah per wilayah
const rawCaseData = {
  "Aceh": 64,
  "Bali": 35,
  "Banten": 106,
  "Bengkulu": 8,
  "Daerah Istimewa Yogyakarta": 43,
  "DKI Jakarta": 592,
  "Gorontalo": 3,
  "Pelayanan Pengaduan | KFA": 4,
  "Jambi": 40,
  "Jawa Barat": 281,
  "Jawa Tengah": 126,
  "Jawa Timur": 200,
  "Kalimantan Barat": 72,
  "Kalimantan Selatan": 27,
  "Kalimantan Tengah": 29,
  "Kalimantan Timur": 38,
  "Kalimantan Utara": 6,
  "Kepulauan Bangka Belitung": 6,
  "Kepulauan Riau": 13,
  "Lampung": 40,
  "Malaysia": 1,
  "Maluku": 63,
  "Maluku Utara": 2,
  "Nusa Tenggara Barat": 25,
  "Nusa Tenggara Timur": 27,
  "Papua": 65,
  "Papua Barat": 3,
  "Papua Barat Daya": 7,
  "Papua Pegunungan": 4,
  "Papua Selatan": 3,
  "Papua Tengah": 6,
  "Riau": 61,
  "Sulawesi Barat": 3,
  "Sulawesi Selatan": 69,
  "Sulawesi Tengah": 33,
  "Sulawesi Tenggara": 29,
  "Sulawesi Utara": 36,
  "Sumatera Barat": 99,
  "Sumatera Selatan": 102,
  "Sumatera Utara": 243,
  "Taiwan": 1,
  "Afghanistan": 1,
  "Filipina": 1,
  "Hongkong": 1,
  "Inggris": 1,
  "Norwegia": 1,
  "Tanpa Keterangan Provinsi": 9,
};

// Mengolah data jadi format caseData dengan level
const caseData = {};
Object.entries(rawCaseData).forEach(([province, count]) => {
  let level = 'low';
  if (count >= 100) level = 'high';
  else if (count >= 30) level = 'medium';

  let key = province.toUpperCase();
  if (key === 'DAERAH ISTIMEWA YOGYAKARTA') key = 'DI YOGYAKARTA';
  if (key === 'PELAYANAN PENGADUAN | KFA') key = 'KFA';

  caseData[key] = { cases: count, level };
});

const MapComponent = () => {
  const [totalCases, setTotalCases] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const total = Object.values(caseData).reduce((sum, item) => sum + item.cases, 0);
    setTotalCases(total);
    setMapReady(true);
  }, []);

  const getBarChartData = () => {
    const high = Object.values(caseData).filter((data) => data.level === 'high').length;
    const medium = Object.values(caseData).filter((data) => data.level === 'medium').length;
    const low = Object.values(caseData).filter((data) => data.level === 'low').length;

    return {
      labels: ['Tinggi', 'Sedang', 'Rendah'],
      datasets: [{
        label: 'Jumlah Provinsi',
        data: [high, medium, low],
        backgroundColor: ['#ff0000', '#ffff00', '#00ff00'],
        borderWidth: 1,
      }],
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
          <div className="map-section">
            <div className="map-header">
              <h2>Peta Sebaran Kasus HAM</h2>
              <div className="total-count">
                <CountUp end={totalCases} duration={2} className="count-number" />
                <span>Total Kasus HAM</span>
              </div>
            </div>

            <div className="map-container-wrapper">
              {mapReady && (
                <MapContainer center={[-2.5489, 118.0149]} zoom={5} style={{ height: '500px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {provJson.map((prov) => {
                    const provinceData = caseData[prov.name.toUpperCase()] || { cases: 0, level: 'low' };
                    const levelIcon = getIconByCaseLevel(provinceData.level, provinceData.cases);

                    return (
                      <Marker
                        key={prov.id}
                        position={[prov.latitude, prov.longitude]}
                        icon={levelIcon}
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
          </div>

          <div className="legend">
            <h3>Legenda:</h3>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#ff0000' }}></div>
              <span>Tinggi (≥ 100 kasus)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#ffff00' }}></div>
              <span>Sedang (30-99 kasus)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#00ff00' }}></div>
              <span>Rendah (&lt; 30 kasus)</span>
            </div>
          </div>

          <div className="bar-chart-section">
            <h3>Distribusi Kasus per Tingkat Keparahan</h3>
            <Bar data={getBarChartData()} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MapComponent;
