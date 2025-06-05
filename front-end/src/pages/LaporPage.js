import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LaporPage.css";

const stepsData = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/709/709699.png",
    title: "Identifikasi Kasus",
    desc:
      "Laporkan setiap kejadian pelanggaran HAM yang Anda ketahui secara detail dan jelas untuk proses penyelidikan yang akurat.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    title: "Siapkan Bukti Pendukung",
    desc:
      "Lampirkan dokumen, foto, video, atau bukti lain yang mendukung laporan pelanggaran HAM Anda.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
    title: "Kirim Laporan",
    desc:
      "Setelah semua data lengkap, kirim laporan Anda. Tim kami akan menindaklanjuti dan memberi konfirmasi secara transparan.",
  },
];

const ReportForm = () => {
  const [formData, setFormData] = useState({
    email_pelapor: "",
    tanggal_laporan: "",
    jenis_laporan: "pengaduan",
    judul_laporan: "",
    isi_laporan: "",
    tempat_kejadian: "",
    bukti_laporan: null,
    status_laporan: "dalam ajuan",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // null = no message, true = success, false = error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }
    setFormData((prev) => ({ ...prev, bukti_laporan: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null); // Reset previous success/error state

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Send data to the backend API
      const response = await axios.post("http://127.0.0.1:8000/api/laporan", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccess(true); // Show success message
        // Reset the form data after successful submission
        setFormData({
          email_pelapor: "",
          tanggal_laporan: "",
          jenis_laporan: "pengaduan",
          judul_laporan: "",
          isi_laporan: "",
          tempat_kejadian: "",
          bukti_laporan: null,
          status_laporan: "dalam ajuan",
        });
      } else {
        setSuccess(false); // In case of an unexpected response status
      }
    } catch (error) {
      setSuccess(false); // If an error occurs during the submission
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setSuccess(null);

  return (
    <>
      <Header />
      <div className="page-container">
        <section className="header-section">
          <h1 className="header-title">Sampaikan Laporan Kasus HAM Anda</h1>
          <p className="header-description">
            Silakan laporkan setiap dugaan pelanggaran Hak Asasi Manusia (HAM) yang Anda ketahui. Kami menjamin kerahasiaan data dan proses yang transparan untuk penanganan setiap laporan secara profesional.
          </p>

          <div className="steps-container">
            {stepsData.map(({ icon, title, desc }, idx) => (
              <div key={idx} className="step-card">
                <div className="step-icon-wrapper">
                  <img src={icon} alt={`${title} icon`} />
                </div>
                <h4 className="step-title">{title}</h4>
                <p className="step-desc">{desc}</p>
                {idx !== stepsData.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </section>

        <section className="form-section">
          <form className="report-form" onSubmit={handleSubmit} noValidate>
            <div className="form-top-bar">SAMPAIKAN LAPORAN ANDA</div>

            <div className="jenis-laporan-container">
              {["pengaduan", "aspirasi", "permintaan informasi"].map((val) => (
                <label key={val} className="radio-wrapper">
                  <input
                    type="radio"
                    name="jenis_laporan"
                    value={val}
                    checked={formData.jenis_laporan === val}
                    onChange={handleInputChange}
                    required
                  />
                  {val.toUpperCase()}
                </label>
              ))}
            </div>

            <input
              type="email"
              name="email_pelapor"
              value={formData.email_pelapor}
              onChange={handleInputChange}
              placeholder="Ketik Email Anda"
              required
              autoComplete="off"
            />

            <input
              type="text"
              name="judul_laporan"
              value={formData.judul_laporan}
              onChange={handleInputChange}
              placeholder="Ketik Judul Laporan Anda"
              required
              autoComplete="off"
            />

            <textarea
              name="isi_laporan"
              value={formData.isi_laporan}
              onChange={handleInputChange}
              placeholder="Ketik Isi Laporan Anda"
              rows={6}
              required
            />

            <input
              type="date"
              name="tanggal_laporan"
              value={formData.tanggal_laporan}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="tempat_kejadian"
              value={formData.tempat_kejadian}
              onChange={handleInputChange}
              placeholder="Ketik Lokasi Kejadian"
              required
              autoComplete="off"
            />

            <label htmlFor="bukti_laporan" className="file-upload-label" tabIndex={0}>
              <svg
                className="file-upload-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h16v2H4V4zm3 5h10v2H7V9zm-3 5h16v2H4v-2zm3 5h10v2H7v-2z" />
              </svg>
              Upload Lampiran
            </label>
            <input
              id="bukti_laporan"
              type="file"
              name="bukti_laporan"
              onChange={handleFileChange}
              className="file-input"
              required
            />

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Mengirim..." : "LAPOR"}
            </button>
          </form>
        </section>

        {/* Success/Error Popup */}
        {(success === true || success === false) && (
          <div className="popup-overlay" onClick={closePopup}>
            <div
              className={`popup-box ${success ? "success" : "error"}`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
              aria-describedby="popup-desc"
            >
              <div className="popup-icon">
                {success ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3bbf7e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-error"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
              </div>

              <h3 id="popup-title">
                {success ? "Laporan Berhasil Dikirim!" : "Gagal Mengirim Laporan"}
              </h3>
              <p id="popup-desc">
                {success
                  ? "Terima kasih telah berani berbagi suara. Kami akan segera memproses laporan Anda dalam 4x24 jam."
                  : "Ada masalah saat mengirim laporan. Silakan coba lagi."}
              </p>
              <button
                onClick={closePopup}
                className="popup-close-btn"
                aria-label="Tutup notifikasi"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReportForm;
