import React, { useState } from 'react';
import axios from 'axios';
import './ReportForm.css';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    email_pelapor: '',
    tanggal_laporan: '',
    jenis_laporan: 'pengaduan',
    judul_laporan: '',
    isi_laporan: '',
    tempat_kejadian: '',
    bukti_laporan: null,
    status_laporan: 'dalam ajuan',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, bukti_laporan: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null) dataToSend.append(key, val);
      });
      await axios.post('http://127.0.0.1:8000/api/laporan', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setLoading(false);
    } catch {
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="report-form-container">
        {/* Header atas */}
        <div className="form-header">
          <div className="form-logo-circle">
            <img src="/logo-merah.png" alt="Logo" className="form-logo" />
          </div>
          <h2>Laporkan Kasus HAM Anda</h2>
          <p className="form-subtitle">
            Siapkan informasi dan dokumen yang diperlukan untuk melaporkan kasus HAM secara akurat dan lengkap. 
            Tim kami akan membantu memproses laporan Anda dengan cepat dan transparan.
          </p>
        </div>

        {/* Form Laporan */}
        <form className="report-form" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email_pelapor"
            value={formData.email_pelapor}
            onChange={handleInputChange}
            placeholder="Ketik Email Anda"
            required
          />

          <input
            type="date"
            name="tanggal_laporan"
            value={formData.tanggal_laporan}
            onChange={handleInputChange}
            required
          />

          <select
            name="jenis_laporan"
            value={formData.jenis_laporan}
            onChange={handleInputChange}
            required
          >
            <option value="pengaduan">Pengaduan</option>
            <option value="aspirasi">Aspirasi</option>
            <option value="permintaan informasi">Permintaan Informasi</option>
          </select>

          <input
            type="text"
            name="judul_laporan"
            value={formData.judul_laporan}
            onChange={handleInputChange}
            placeholder="Ketik Judul Laporan Anda"
            required
          />

          <textarea
            name="isi_laporan"
            value={formData.isi_laporan}
            onChange={handleInputChange}
            placeholder="Ketik Isi Laporan Anda"
            rows="5"
            required
          />

          <input
            type="text"
            name="tempat_kejadian"
            value={formData.tempat_kejadian}
            onChange={handleInputChange}
            placeholder="Ketik Lokasi Kejadian"
            required
          />

          <input
            type="file"
            name="bukti_laporan"
            onChange={handleFileChange}
            required
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Mengirim...' : 'Lapor'}
          </button>

          {success === true && (
            <div className="success-notification">
              <p>
                Selamat, laporan Anda telah berhasil dikirimkan! Terima kasih telah berani berbagi suara.
                Kami akan segera memproses laporan Anda dalam 4x24 jam.
              </p>
            </div>
          )}
          {success === false && <p className="error-message">Ada masalah saat mengirim laporan. Coba lagi!</p>}
        </form>

        {/* Section Proses Penanganan */}
        <div className="process-section">
          <h3>Proses Penanganan Laporan Kasus HAM</h3>
          <div className="process-items">
            <div className="process-item">
              <div className="process-icon">📝</div>
              <h4>Pengajuan Laporan</h4>
              <p>Tim kami menerima dan memverifikasi kelengkapan data laporan Anda.</p>
            </div>
            <div className="process-item">
              <div className="process-icon">⚙️</div>
              <h4>Investigasi</h4>
              <p>Penyelidikan dan pengumpulan bukti dilakukan oleh tim terkait.</p>
            </div>
            <div className="process-item">
              <div className="process-icon">✔️</div>
              <h4>Tindak Lanjut</h4>
              <p>Hasil investigasi diserahkan ke pihak hukum untuk proses selanjutnya.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
