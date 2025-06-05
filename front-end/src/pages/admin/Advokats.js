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

const AdvokatAdminPage = () => {
  const [formData, setFormData] = useState({
    advokat_id: '',
    email_advokat: '',
    password_advokat: '',
    nama_advokat: '',
    no_kta: '',
    spesialisasi: '',
    ketersediaan: '',
    bio_advokat: '',
    foto_advokat: null,
    status_akun_advokat: '',
  });

  const [advokatList, setAdvokatList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdvokat, setSelectedAdvokat] = useState(null);

  // Fetch advokat on component mount
  useEffect(() => {
    fetchAdvokat();
  }, []);

  const fetchAdvokat = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/advokat');
      if (response.data.success) {
        setAdvokatList(response.data.data);
      } else {
        setError(response.data.message || 'Error fetching advokats');
      }
    } catch (err) {
      setError('Error fetching advokats');
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
    formDataToSend.append('email_advokat', formData.email_advokat);
    formDataToSend.append('password_advokat', formData.password_advokat);
    formDataToSend.append('nama_advokat', formData.nama_advokat);
    formDataToSend.append('no_kta', formData.no_kta);
    formDataToSend.append('spesialisasi', formData.spesialisasi);
    formDataToSend.append('ketersediaan', formData.ketersediaan);
    formDataToSend.append('bio_advokat', formData.bio_advokat);
    formDataToSend.append('status_akun_advokat', formData.status_akun_advokat);
    if (formData.foto_advokat) {
      formDataToSend.append('foto_advokat', formData.foto_advokat);
    }
    if (formData.advokat_id) {
      formDataToSend.append('advokat_id', formData.advokat_id); // Send advokat_id for update
    }
  
    try {
      let response;
      if (editingId) {
        // Update advokat using advokat_id
        response = await axios.put(`http://127.0.0.1:8000/api/advokat/${editingId}`, formData);
      } else {
        // Create new advokat
        response = await axios.post('http://127.0.0.1:8000/api/advokat', formData);
      }
  
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        fetchAdvokat(); // Refetch advokats
        setFormData({
          advokat_id: '',
          email_advokat: '',
          password_advokat: '',
          nama_advokat: '',
          no_kta: '',
          spesialisasi: '',
          ketersediaan: '',
          bio_advokat: '',
          foto_advokat: null,
          status_akun_advokat: '',
        });
        setEditingId(null);
      } else {
        setError(response.data.message || 'Error submitting advokat');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting advokat');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (advokat) => {
    setFormData({
      advokat_id: advokat.advokat_id,
      email_advokat: advokat.email_advokat,
      password_advokat: advokat.password_advokat,
      nama_advokat: advokat.nama_advokat,
      no_kta: advokat.no_kta,
      spesialisasi: advokat.spesialisasi,
      ketersediaan: advokat.ketersediaan,
      bio_advokat: advokat.bio_advokat,
      foto_advokat: null,
      status_akun_advokat: advokat.status_akun_advokat,
    });
    setEditingId(advokat.advokat_id);
  };

  const handleView = (advokat) => {
    setSelectedAdvokat(advokat);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAdvokat(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <PageContainer>
          <FormContainer>
            <Title>{editingId ? 'Edit Advokat' : 'Add New Advokat'}</Title>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email_advokat"
                  value={formData.email_advokat}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password_advokat"
                  value={formData.password_advokat}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Nama</Label>
                <Input
                  type="text"
                  name="nama_advokat"
                  value={formData.nama_advokat}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>No KTA</Label>
                <Input
                  type="text"
                  name="no_kta"
                  value={formData.no_kta}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Spesialisasi</Label>
                <Input
                  type="text"
                  name="spesialisasi"
                  value={formData.spesialisasi}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ketersediaan</Label>
                <Input
                  type="text"
                  name="ketersediaan"
                  value={formData.ketersediaan}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bio</Label>
                <Textarea
                  name="bio_advokat"
                  value={formData.bio_advokat}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Status Akun</Label>
                <Input
                  type="text"
                  name="status_akun_advokat"
                  value={formData.status_akun_advokat}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Foto</Label>
                <Input
                  type="file"
                  name="foto_advokat"
                  onChange={handleFileChange}
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </SubmitButton>
            </form>
          </FormContainer>

          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {advokatList.map((advokat) => (
                <TableRow key={advokat.advokat_id}>
                  <TableCell>{advokat.advokat_id}</TableCell>
                  <TableCell>{advokat.nama_advokat}</TableCell>
                  <TableCell>{advokat.email_advokat}</TableCell>
                  <TableCell>
                    <button onClick={() => handleEdit(advokat)}>Edit</button>
                    <button onClick={() => handleView(advokat)}>View</button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          {modalOpen && (
            <ModalOverlay onClick={handleCloseModal}>
              <Modal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>Advokat Details</ModalHeader>
                <ModalContent>
                  <p><strong>Email:</strong> {selectedAdvokat.email_advokat}</p>
                  <p><strong>Nama:</strong> {selectedAdvokat.nama_advokat}</p>
                  <p><strong>No KTA:</strong> {selectedAdvokat.no_kta}</p>
                  <p><strong>Spesialisasi:</strong> {selectedAdvokat.spesialisasi}</p>
                  <p><strong>Bio:</strong> {selectedAdvokat.bio_advokat}</p>
                  <ModalImage src={selectedAdvokat.foto_advokat} alt="Advokat Foto" />
                  <ModalButton onClick={handleCloseModal}>Close</ModalButton>
                </ModalContent>
              </Modal>
            </ModalOverlay>
          )}
        </PageContainer>
      </div>
    </div>
  );
};

export default AdvokatAdminPage;
