import React, { useState } from 'react';

const FormAdvokat = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/advokat-map', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Advokat berhasil ditambahkan!');
      setFormData({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
      });
    } else {
      alert('Terjadi kesalahan saat menambahkan advokat.');
    }
  };

  return (
    <div>
      <h2>Tambah Advokat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Advokat</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Alamat</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Tambah Advokat</button>
      </form>
    </div>
  );
};

export default FormAdvokat;
