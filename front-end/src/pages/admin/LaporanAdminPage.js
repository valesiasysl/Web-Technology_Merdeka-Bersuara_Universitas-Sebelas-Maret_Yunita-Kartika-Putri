import React, { useState, useEffect } from 'react';
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
// Action Buttons Styles
const ActionButton = styled.button`
  padding: 10px 16px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #a60000;
    transform: scale(1.05);  // Slight scaling effect
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  // Adding a shadow on hover
  }

  &:active {
    background-color: #7a0000;  // Darker shade on click
    transform: scale(1.02);  // Slight scaling effect when active
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;  // Adds space between the buttons
  justify-content: flex-start;  // Aligns the buttons to the left
  margin-top: 10px;  // Adds some spacing above the buttons
`;



const LaporanAdminPage = () => {
  const [formData, setFormData] = useState({
    email_pelapor: '',
    tanggal_laporan: '',
    jenis_laporan: '',
    judul_laporan: '',
    isi_laporan: '',
    tempat_kejadian: '',
    bukti_laporan: null,
    status_laporan: 'dalam ajuan',
  });

  const [laporanList, setLaporanList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/laporan');
      const data = await response.json();
      if (response.ok) {
        setLaporanList(data);
      } else {
        throw new Error(data.message || 'Failed to fetch laporan');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      bukti_laporan: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.email_pelapor || !formData.tanggal_laporan || !formData.jenis_laporan || !formData.judul_laporan || !formData.isi_laporan || !formData.tempat_kejadian) {
      setError('Semua kolom harus diisi.');
      return;
    }

    const formDataToSubmit = new FormData();
    for (let key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    setLoading(true);
    try {
      let response;
      if (editingId) {
        // Update laporan jika ada editingId
        response = await fetch(`http://127.0.0.1:8000/api/laporan/${editingId}`, {
          method: 'PUT',
          body: formDataToSubmit,
        });
      } else {
        // Create laporan baru
        response = await fetch('http://127.0.0.1:8000/api/laporan', {
          method: 'POST',
          body: formDataToSubmit,
        });
      }

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(editingId ? 'Laporan berhasil diperbarui!' : 'Laporan berhasil dibuat!');
        fetchLaporan();
        setFormData({
          email_pelapor: '',
          tanggal_laporan: '',
          jenis_laporan: '',
          judul_laporan: '',
          isi_laporan: '',
          tempat_kejadian: '',
          bukti_laporan: null,
          status_laporan: 'dalam ajuan',
        });
        setEditingId(null);
        setError('');
      } else {
        throw new Error(result.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (laporan) => {
    setEditingId(laporan.laporan_id);
    setFormData({
      email_pelapor: laporan.email_pelapor,
      tanggal_laporan: laporan.tanggal_laporan,
      jenis_laporan: laporan.jenis_laporan,
      judul_laporan: laporan.judul_laporan,
      isi_laporan: laporan.isi_laporan,
      tempat_kejadian: laporan.tempat_kejadian,
      bukti_laporan: laporan.bukti_laporan,
      status_laporan: laporan.status_laporan,
    });
    setError('');
  };

  const handleDelete = async (laporanId) => {
    const confirmed = window.confirm('Are you sure you want to delete this report?');
    if (confirmed) {
      try {
        await fetch(`http://127.0.0.1:8000/api/laporan/${laporanId}`, {
          method: 'DELETE',
        });
        fetchLaporan();
      } catch (error) {
        setError('Failed to delete laporan');
      }
    }
  };

  const handleOpenModal = (laporan) => {
    setSelectedLaporan(laporan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <PageContainer>
      <Header />
      <Sidebar />
      <FormContainer>
        <Title>{editingId ? 'Edit Laporan' : 'Buat Laporan'}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Pelapor</Label>
            <Input
              type="email"
              name="email_pelapor"
              value={formData.email_pelapor}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Tanggal Laporan</Label>
            <Input
              type="date"
              name="tanggal_laporan"
              value={formData.tanggal_laporan}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Jenis Laporan</Label>
            <Input
              type="text"
              name="jenis_laporan"
              value={formData.jenis_laporan}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Judul Laporan</Label>
            <Input
              type="text"
              name="judul_laporan"
              value={formData.judul_laporan}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Isi Laporan</Label>
            <Textarea
              name="isi_laporan"
              value={formData.isi_laporan}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Tempat Kejadian</Label>
            <Input
              type="text"
              name="tempat_kejadian"
              value={formData.tempat_kejadian}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Bukti Laporan</Label>
            <Input
              type="file"
              name="bukti_laporan"
              onChange={handleFileChange}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Loading...' : editingId ? 'Update Laporan' : 'Submit Laporan'}
          </SubmitButton>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </FormContainer>

      {/* Table to show laporan */}
      <Table>
        <thead>
          <tr>
            <TableHeader>Email</TableHeader>
            <TableHeader>Judul</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {laporanList.map((laporan) => (
            <TableRow key={laporan.laporan_id}>
              <TableCell>{laporan.email_pelapor}</TableCell>
              <TableCell>{laporan.judul_laporan}</TableCell>
              <TableCell>{laporan.status_laporan}</TableCell>
              <TableCell>
                <button onClick={() => handleEdit(laporan)}>Edit</button>
                <button onClick={() => handleDelete(laporan.laporan_id)}>Delete</button>
                <button onClick={() => handleOpenModal(laporan)}>View</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Modal for view laporan */}
      {modalOpen && selectedLaporan && (
        <Modal>
          <ModalContent>
            <h3>{selectedLaporan.judul_laporan}</h3>
            <p><strong>Email:</strong> {selectedLaporan.email_pelapor}</p>
            <p><strong>Tanggal:</strong> {selectedLaporan.tanggal_laporan}</p>
            <p><strong>Jenis:</strong> {selectedLaporan.jenis_laporan}</p>
            <p><strong>Isi Laporan:</strong> {selectedLaporan.isi_laporan}</p>
            <p><strong>Tempat Kejadian:</strong> {selectedLaporan.tempat_kejadian}</p>
            {selectedLaporan.bukti_laporan && (
              <div>
                <strong>Bukti Laporan:</strong>
                <img src={selectedLaporan.bukti_laporan} alt="Bukti Laporan" />
              </div>
            )}
            <button onClick={handleCloseModal}>Close</button>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};


export default LaporanAdminPage;
