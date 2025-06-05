import React, { useState } from 'react';

const FormLaporanKasus = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    incidentDate: '',
    cause: '',
    expectedOutcome: '',
    email: '',
    evidence: null, // Untuk file bukti
  });

  // Handle perubahan input pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle perubahan file bukti
  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, evidence: files[0] });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirimkan data dan file
    const dataToSend = new FormData();
    dataToSend.append('description', formData.description);
    dataToSend.append('category', formData.category);
    dataToSend.append('provinsi', formData.provinsi);
    dataToSend.append('kabupaten', formData.kabupaten);
    dataToSend.append('kecamatan', formData.kecamatan);
    dataToSend.append('desa', formData.desa);
    dataToSend.append('incidentDate', formData.incidentDate);
    dataToSend.append('cause', formData.cause);
    dataToSend.append('expectedOutcome', formData.expectedOutcome);
    dataToSend.append('email', formData.email);
    dataToSend.append('evidence', formData.evidence); // Mengirim file bukti

    try {
      const response = await fetch('http://localhost:8000/api/kasus', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        alert('Laporan berhasil dikirim!');
        setFormData({
          description: '',
          category: '',
          provinsi: '',
          kabupaten: '',
          kecamatan: '',
          desa: '',
          incidentDate: '',
          cause: '',
          expectedOutcome: '',
          email: '',
          evidence: null,
        });
      } else {
        alert('Terjadi kesalahan saat mengirim laporan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div>
      <h2>Form Laporan Kasus</h2>
      <form onSubmit={handleSubmit}>
        {/* Deskripsi Kasus */}
        <div>
          <label>Deskripsi Kasus</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Deskripsi Kasus"
            required
          />
        </div>

        {/* Kategori Kasus */}
        <div>
          <label>Kategori Kasus</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Pelanggaran HAM">Pelanggaran HAM</option>
            <option value="Korupsi">Korupsi</option>
            <option value="Kekerasan">Kekerasan</option>
          </select>
        </div>

        {/* Alamat */}
        <div>
          <label>Provinsi</label>
          <input
            type="text"
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            placeholder="Provinsi"
            required
          />
        </div>
        <div>
          <label>Kabupaten</label>
          <input
            type="text"
            name="kabupaten"
            value={formData.kabupaten}
            onChange={handleChange}
            placeholder="Kabupaten"
            required
          />
        </div>
        <div>
          <label>Kecamatan</label>
          <input
            type="text"
            name="kecamatan"
            value={formData.kecamatan}
            onChange={handleChange}
            placeholder="Kecamatan"
            required
          />
        </div>
        <div>
          <label>Desa</label>
          <input
            type="text"
            name="desa"
            value={formData.desa}
            onChange={handleChange}
            placeholder="Desa"
            required
          />
        </div>

        {/* Tanggal Kejadian */}
        <div>
          <label>Tanggal Kejadian</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Penyebab Kasus */}
        <div>
          <label>Penyebab Kasus</label>
          <textarea
            name="cause"
            value={formData.cause}
            onChange={handleChange}
            placeholder="Penyebab Kasus"
            required
          />
        </div>

        {/* Tindak Lanjut yang Diharapkan */}
        <div>
          <label>Tindak Lanjut yang Diharapkan</label>
          <textarea
            name="expectedOutcome"
            value={formData.expectedOutcome}
            onChange={handleChange}
            placeholder="Tindak Lanjut yang Diharapkan"
            required
          />
        </div>

        {/* Email Pelapor */}
        <div>
          <label>Email Pelapor</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Pelapor"
            required
          />
        </div>

        {/* File Bukti */}
        <div>
          <label>Bukti (File)</label>
          <input
            type="file"
            name="evidence"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Kirim Laporan</button>
      </form>
    </div>
  );
};

export default FormLaporanKasus;
