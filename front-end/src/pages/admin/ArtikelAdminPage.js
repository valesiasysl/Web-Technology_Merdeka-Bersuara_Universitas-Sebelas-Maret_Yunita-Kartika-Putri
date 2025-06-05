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
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  &:focus {
    border-color: #8b0000;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  &:focus {
    border-color: #8b0000;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a60000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #8b0000;
  color: white;
  padding: 15px;
  text-align: left;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 101;
  overflow-y: auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalHeader = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  font-size: 16px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const ModalImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 12px 18px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a60000;
  }
`;

const ArtikelAdminPage = () => {
  const [formData, setFormData] = useState({
    artikel_id: '', // Menyimpan artikel_id
    judul_artikel: '',
    isi_artikel: '',
    tanggal_terbit: '',
    gambar_artikel: null,
  });
  const [artikelList, setArtikelList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState(null);

  // Fetch artikel on component mount
  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/artikel');
      if (response.data.success) {
        setArtikelList(response.data.data);
      } else {
        setError(response.data.message || 'Error fetching articles');
      }
    } catch (err) {
      setError('Error fetching articles');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const isValidFile = ['image/png', 'image/jpeg'].includes(file.type);
      if (isValidFile) {
        setFormData((prevState) => ({ ...prevState, [name]: file }));
      } else {
        setError('Only PNG or JPG files are allowed.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('judul_artikel', formData.judul_artikel);
    formDataToSend.append('isi_artikel', formData.isi_artikel);
    formDataToSend.append('tanggal_terbit', formData.tanggal_terbit);

    // Ensure gambar_artikel is appended if it exists
    if (formData.gambar_artikel) {
      formDataToSend.append('gambar_artikel', formData.gambar_artikel);
    }

    // Only include artikel_id if we are editing
    if (editingId) {
      formDataToSend.append('artikel_id', formData.artikel_id);
    }

    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file upload
        },
      };

      // Determine if it's an update or create operation
      if (editingId) {
        response = await axios.put(`http://127.0.0.1:8000/api/artikel/${editingId}`, formDataToSend, config);
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/artikel', formDataToSend, config);
      }

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        fetchArtikel(); // Refetch the article list after success
        setFormData({ artikel_id: '', judul_artikel: '', isi_artikel: '', tanggal_terbit: '', gambar_artikel: null });
        setEditingId(null);
      } else {
        setError(response.data.message || 'Error submitting article');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (artikel) => {
    setEditingId(artikel.artikel_id);
    setFormData({
      artikel_id: artikel.artikel_id, // Set artikel_id saat edit
      judul_artikel: artikel.judul_artikel,
      isi_artikel: artikel.isi_artikel,
      tanggal_terbit: artikel.tanggal_terbit,
      gambar_artikel: null,
    });
  };

  const handleDelete = async (artikelId) => {
    if (window.confirm(`Are you sure you want to delete article with ID: ${artikelId}?`)) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/artikel/${artikelId}`);
        if (response.data.success) {
          fetchArtikel(); // Refetch articles after delete
        } else {
          setError(response.data.message || 'Error deleting article');
        }
      } catch (err) {
        setError('Error deleting article');
      }
    }
  };

  const handleView = (artikel) => {
    setSelectedArtikel(artikel);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArtikel(null);
  };

  return (
    <PageContainer>
      <Sidebar />
      <Header />
      <FormContainer>
        <Title>{editingId ? 'Edit Artikel' : 'Create Artikel'}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="artikel_id">Artikel ID</Label>
            <Input
              type="text"
              name="artikel_id"
              value={formData.artikel_id}
              onChange={handleInputChange}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="judul_artikel">Judul Artikel</Label>
            <Input
              type="text"
              name="judul_artikel"
              value={formData.judul_artikel}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="isi_artikel">Isi Artikel</Label>
            <Textarea
              name="isi_artikel"
              value={formData.isi_artikel}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="tanggal_terbit">Tanggal Terbit</Label>
            <Input
              type="date"
              name="tanggal_terbit"
              value={formData.tanggal_terbit}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gambar_artikel">Gambar Artikel</Label>
            <Input
              type="file"
              name="gambar_artikel"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Submitting...' : editingId ? 'Update Artikel' : 'Create Artikel'}
          </SubmitButton>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </FormContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Artikel ID</TableHeader>
            <TableHeader>Judul</TableHeader>
            <TableHeader>Tanggal Terbit</TableHeader>
            <TableHeader>Aksi</TableHeader>
          </tr>
        </thead>
        <tbody>
          {artikelList.map((artikel) => (
            <TableRow key={artikel.artikel_id}>
              <TableCell>{artikel.artikel_id}</TableCell> {/* Menampilkan artikel_id */}
              <TableCell>{artikel.judul_artikel}</TableCell>
              <TableCell>{artikel.tanggal_terbit}</TableCell>
              <TableCell>
                <button onClick={() => handleView(artikel)}>View</button>
                <button onClick={() => handleEdit(artikel)}>Edit</button>
                <button onClick={() => handleDelete(artikel.artikel_id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {modalOpen && selectedArtikel && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>{selectedArtikel.judul_artikel}</ModalHeader>
            <ModalImage src={`http://127.0.0.1:8000/storage/${selectedArtikel.gambar_artikel}`} alt="Artikel Image" />
            <ModalContent>{selectedArtikel.isi_artikel}</ModalContent>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ArtikelAdminPage;
