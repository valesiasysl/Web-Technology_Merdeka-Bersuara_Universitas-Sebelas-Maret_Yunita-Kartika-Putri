import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CountUp from "react-countup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import provJson from "../components/indonesia-prov.json";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faMapMarkerAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import "./PetaKasus.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Fix Leaflet default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Data kasus per tahun dan provinsi (contoh)
const caseDataByYear = {
  2020: {
    ACEH: { cases: 20, level: "medium" },
    BALI: { cases: 42, level: "medium" },
    BANTEN: { cases: 107, level: "high" },
    BENGKULU: { cases: 23, level: "low" },
    "DAERAH ISTIMEWA YOGYAKARTA": { cases: 27, level: "medium" },
    "DKI JAKARTA": { cases: 386, level: "high" },
    GORONTALO: { cases: 7, level: "low" },
    JAMBI: { cases: 45, level: "medium" },
    "JAWA BARAT": { cases: 296, level: "high" },
    "JAWA TENGAH": { cases: 132, level: "high" },
    "JAWA TIMUR": { cases: 268, level: "high" },
    "KALIMANTAN BARAT": { cases: 37, level: "medium" },
    "KALIMANTAN SELATAN": { cases: 41, level: "low" },
    "KALIMANTAN TENGAH": { cases: 35, level: "low" },
    "KALIMANTAN TIMUR": { cases: 62, level: "medium" },
    "KALIMANTAN UTARA": { cases: 6, level: "low" },
    "KEPULAUAN BANGKA BELITUNG": { cases: 12, level: "low" },
    "KEPULAUAN RIAU": { cases: 26, level: "low" },
    LAMPUNG: { cases: 47, level: "medium" },
    MALUKU: { cases: 20, level: "medium" },
    "MALUKU UTARA": { cases: 9, level: "low" },
    "NUSA TENGGARA BARAT": { cases: 42, level: "low" },
    "NUSA TENGGARA TIMUR": { cases: 61, level: "low" },
    PAPUA: { cases: 38, level: "medium" },
    "PAPUA BARAT": { cases: 13, level: "low" },
    RIAU: { cases: 81, level: "medium" },
    "SULAWESI BARAT": { cases: 14, level: "low" },
    "SULAWESI SELATAN": { cases: 110, level: "medium" },
    "SULAWESI TENGAH": { cases: 26, level: "medium" },
    "SULAWESI TENGGARA": { cases: 32, level: "low" },
    "SULAWESI UTARA": { cases: 24, level: "medium" },
    "SUMATERA SELATAN": { cases: 102, level: "high" },
    "SUMATERA UTARA": { cases: 268, level: "high" },
  },
  2023: {
    ACEH: { cases: 32, level: "medium" },
    BALI: { cases: 22, level: "medium" },
    BANTEN: { cases: 139, level: "high" },
    BENGKULU: { cases: 16, level: "low" },
    "DAERAH ISTIMEWA YOGYAKARTA": { cases: 44, level: "medium" },
    "DKI JAKARTA": { cases: 460, level: "high" },
    GORONTALO: { cases: 3, level: "low" },
    JAMBI: { cases: 56, level: "medium" },
    "JAWA BARAT": { cases: 342, level: "high" },
    "JAWA TENGAH": { cases: 133, level: "high" },
    "JAWA TIMUR": { cases: 268, level: "high" },
    "KALIMANTAN BARAT": { cases: 35, level: "medium" },
    "KALIMANTAN SELATAN": { cases: 51, level: "low" },
    "KALIMANTAN TENGAH": { cases: 47, level: "low" },
    "KALIMANTAN TIMUR": { cases: 62, level: "medium" },
    "KALIMANTAN UTARA": { cases: 10, level: "low" },
    "KEPULAUAN BANGKA BELITUNG": { cases: 14, level: "low" },
    "KEPULAUAN RIAU": { cases: 35, level: "low" },
    LAMPUNG: { cases: 52, level: "medium" },
    MALUKU: { cases: 13, level: "medium" },
    "MALUKU UTARA": { cases: 11, level: "low" },
    "NUSA TENGGARA BARAT": { cases: 35, level: "low" },
    "NUSA TENGGARA TIMUR": { cases: 56, level: "low" },
    PAPUA: { cases: 38, level: "medium" },
    "PAPUA BARAT": { cases: 10, level: "low" },
    RIAU: { cases: 92, level: "medium" },
    "SULAWESI BARAT": { cases: 10, level: "low" },
    "SULAWESI SELATAN": { cases: 98, level: "medium" },
    "SULAWESI TENGAH": { cases: 21, level: "medium" },
    "SULAWESI TENGGARA": { cases: 36, level: "low" },
    "SULAWESI UTARA": { cases: 40, level: "medium" },
    "SUMATERA BARAT": { cases: 52, level: "medium" },
    "SUMATERA SELATAN": { cases: 132, level: "high" },
    "SUMATERA UTARA": { cases: 334, level: "high" },
    "TANPA KETERANGAN": { cases: 47, level: "low" },
  },
  2024: {
    ACEH: { cases: 64, level: "medium" },
    BALI: { cases: 35, level: "medium" },
    BANTEN: { cases: 106, level: "high" },
    BENGKULU: { cases: 8, level: "low" },
    "DAERAH ISTIMEWA YOGYAKARTA": { cases: 43, level: "medium" },
    "DKI JAKARTA": { cases: 592, level: "high" },
    GORONTALO: { cases: 3, level: "low" },
    JAMBI: { cases: 40, level: "medium" },
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
    LAMPUNG: { cases: 40, level: "medium" },
    MALUKU: { cases: 63, level: "medium" },
    "MALUKU UTARA": { cases: 2, level: "low" },
    "NUSA TENGGARA BARAT": { cases: 25, level: "low" },
    "NUSA TENGGARA TIMUR": { cases: 27, level: "low" },
    PAPUA: { cases: 65, level: "medium" },
    "PAPUA BARAT": { cases: 3, level: "low" },
    "PAPUA BARAT DAYA": { cases: 7, level: "low" },
    "PAPUA PEGUNUNGAN": { cases: 4, level: "low" },
    "PAPUA SELATAN": { cases: 3, level: "low" },
    "PAPUA TENGAH": { cases: 6, level: "low" },
    RIAU: { cases: 61, level: "medium" },
    "SULAWESI BARAT": { cases: 3, level: "low" },
    "SULAWESI SELATAN": { cases: 69, level: "medium" },
    "SULAWESI TENGAH": { cases: 33, level: "medium" },
    "SULAWESI TENGGARA": { cases: 29, level: "low" },
    "SULAWESI UTARA": { cases: 36, level: "medium" },
    "SUMATERA BARAT": { cases: 99, level: "medium" },
    "SUMATERA SELATAN": { cases: 102, level: "high" },
    "SUMATERA UTARA": { cases: 243, level: "high" },
    "TANPA KETERANGAN PROVINSI": { cases: 9, level: "low" },
  },
};

const sumberData = {
  2020: "https://www.komnasham.go.id/files/20210830-laporan-tahunan-komnas-ham-ri--$R1X5O.pdf",
  2023: "https://www.komnasham.go.id/files/20230605-laporan-tahunan-komnas-ham-ri--$WMOQ2Q.pdf",
  2024: "https://www.komnasham.go.id/files/20240807-laporan-tahunan-komnas-ham-tahun-$WFGA.pdf",
};

const createCaseIcon = (level, cases) => {
  const size = Math.min(30 + cases / 3, 70); // Adjusted for better mobile visibility
  const colorMap = {
    high: "#ff4c4c",
    medium: "#ffcc00",
    low: "#4caf50",
  };
  const bgColor = colorMap[level] || "#888";

  const html = `
    <div style="
      background: radial-gradient(circle at center, ${bgColor}cc, ${bgColor}99);
      width: ${size}px;
      height: ${size}px;
      line-height: ${size}px;
      border-radius: 50%;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: ${size / 3}px;
      border: 2px solid white;
      box-shadow: 0 0 8px ${bgColor}aa;
      user-select: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
    ">
      ${cases}
    </div>
  `;

  return new L.DivIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

const PetaKasus = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [totalCases, setTotalCases] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const data = caseDataByYear[selectedYear] || {};
    const total = Object.values(data).reduce((sum, item) => sum + (item?.cases || 0), 0);
    setTotalCases(total);

    // Hitung kategori kasus untuk chart
    const highCount = Object.values(data).filter((d) => d.level === "high").length;
    const mediumCount = Object.values(data).filter((d) => d.level === "medium").length;
    const lowCount = Object.values(data).filter((d) => d.level === "low").length;

    setChartData({
      labels: ["Tinggi", "Sedang", "Rendah"],
      datasets: [
        {
          label: "Jumlah Provinsi",
          data: [highCount, mediumCount, lowCount],
          backgroundColor: ["#ff4c4c", "#ffcc00", "#4caf50"],
          borderRadius: 8,
          maxBarThickness: 40,
        },
      ],
    });

    // Small delay to ensure map container is properly sized
    setTimeout(() => setMapReady(true), 100);
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setMapReady(false);
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <>
      <Header />
      <main className="peta-kasus-page">
        <section className="hero">
          <div className="hero-top">
            <h1>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-title" /> 
              Peta Sebaran Kasus HAM {selectedYear}
            </h1>
            <div className="year-selector">
              <FontAwesomeIcon icon={faCalendarCheck} className="icon-calendar" />
              <label htmlFor="year-select">Tahun: </label>
              <select 
                id="year-select" 
                value={selectedYear} 
                onChange={handleYearChange}
                aria-label="Pilih tahun data kasus HAM"
              >
                <option value={2020}>2020</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
              </select>
            </div>
          </div>

          <p className="description">
            Pantau secara interaktif sebaran kasus pelanggaran HAM di seluruh Indonesia. 
            Data bersumber dari laporan resmi Komnas HAM dan diperbarui secara berkala.
          </p>

          <div className="stats-container">
            <div className="total-cases">
              <div className="total-label">Total Kasus Terdata</div>
              <div className="total-number">
                <CountUp end={totalCases} duration={2} separator="," />
              </div>
            </div>
          </div>

          <div className="container-map-chart-legend">
            <section className="map-section">
              {mapReady && (
                <MapContainer
                  center={[-2.5489, 118.0149]}
                  zoom={isMobile ? 4 : 5}
                  style={{ height: "100%", width: "100%" }}
                  key={`${selectedYear}-${isMobile}`}
                  zoomControl={!isMobile}
                  dragging={!isMobile}
                  tap={!isMobile}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {provJson.map((prov) => {
                    const keyName = prov.name.toUpperCase();
                    const data = caseDataByYear[selectedYear][keyName] || { cases: 0, level: "low" };
                    const icon = createCaseIcon(data.level, data.cases);
                    return (
                      <Marker
                        key={`${prov.id}-${selectedYear}`}
                        position={[prov.latitude, prov.longitude]}
                        icon={icon}
                      >
                        <Popup className="custom-popup">
                          <div className="popup-content">
                            <h3>{prov.name}</h3>
                            <p>
                              <strong>Kasus:</strong> {data.cases}
                            </p>
                            <p>
                              <strong>Tingkat:</strong>{" "}
                              {data.level === "high"
                                ? "Tinggi"
                                : data.level === "medium"
                                ? "Sedang"
                                : "Rendah"}
                            </p>
                            <p className="popup-note">
                              Data tahun {selectedYear}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              )}
            </section>

            <aside className="legend-chart-section">
              <div className="legend-section">
                <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Legenda Kasus</h3>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-circle high"></span> 
                    <span>Kasus Tinggi</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-circle medium"></span> 
                    <span>Kasus Sedang</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-circle low"></span> 
                    <span>Kasus Rendah</span>
                  </div>
                </div>
                
                <div className="info-section">
                  <h3>Informasi</h3>
                  <p>
                    Peta menampilkan data sebaran kasus pelanggaran HAM berdasarkan laporan tahunan Komnas HAM. 
                    Level kasus dibagi dalam tiga kategori sesuai jumlah kasus tiap provinsi.
                  </p>
                  <p>
                    Pilih tahun untuk melihat perkembangan kasus dari waktu ke waktu.
                  </p>
                </div>
                
                {chartData && (
                  <div className="chart-section">
                    <h3>Distribusi Kategori Kasus</h3>
                    <div className="chart-container">
                      <Bar
                        data={chartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { 
                              enabled: true,
                              callbacks: {
                                label: function(context) {
                                  return `${context.dataset.label}: ${context.raw}`;
                                }
                              }
                            },
                          },
                          scales: {
                            y: { 
                              beginAtZero: true, 
                              ticks: { 
                                stepSize: 1,
                                precision: 0
                              } 
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="source-section">
                  <h3>Sumber Data</h3>
                  <p>
                    <a 
                      href={sumberData[selectedYear]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      <FontAwesomeIcon icon={faLink} /> Laporan Tahunan Komnas HAM {selectedYear}
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetaKasus;