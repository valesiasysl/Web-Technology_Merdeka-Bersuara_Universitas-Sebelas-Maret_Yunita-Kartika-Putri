import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background-color: #f4f4f4;
  border-radius: 10px;
  margin-left: 270px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h2`
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1em;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.1em;
`;

const TableRow = styled.tr`
  background-color: #f9f9f9;
  &:nth-child(even) {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
  font-size: 1em;
`;

const LaporanAdminPage = () => {
  const [laporanData, setLaporanData] = useState([]);
  const [formData, setFormData] = useState({ judul: '', deskripsi: '', tanggal: '' });

  useEffect(() => {
    // Fetch data for laporan from API or database
    axios.get('/api/laporan')
      .then(response => setLaporanData(response.data))
      .catch(error => console.error('Error fetching laporan data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit form data to API or database
    axios.post('/api/laporan', formData)
      .then(response => {
        setLaporanData([...laporanData, response.data]);
        setFormData({ judul: '', deskripsi: '', tanggal: '' }); // Reset form
      })
      .catch(error => console.error('Error submitting laporan:', error));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <PageContainer>
        <Header />
        <FormContainer>
          <Title>Tambah Laporan</Title>
          <form onSubmit={handleFormSubmit}>
            <InputGroup>
              <Label htmlFor="judul">Judul Laporan</Label>
              <Input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Input
                type="text"
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <Button type="submit">Submit Laporan</Button>
          </form>
        </FormContainer>

        <FormContainer>
          <Title>Daftar Laporan</Title>
          <Table>
            <thead>
              <tr>
                <TableHeader>Judul</TableHeader>
                <TableHeader>Deskripsi</TableHeader>
                <TableHeader>Tanggal</TableHeader>
              </tr>
            </thead>
            <tbody>
              {laporanData.map((laporan, index) => (
                <TableRow key={index}>
                  <TableData>{laporan.judul}</TableData>
                  <TableData>{laporan.deskripsi}</TableData>
                  <TableData>{laporan.tanggal}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </FormContainer>
      </PageContainer>
    </div>
  );
};

export default LaporanAdminPage;
