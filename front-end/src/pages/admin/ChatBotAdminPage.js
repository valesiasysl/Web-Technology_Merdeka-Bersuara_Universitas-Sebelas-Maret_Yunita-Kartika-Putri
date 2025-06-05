import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-left: 270px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 1.6em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #8b0000;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin-bottom: 10px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    border-color: #8b0000;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a60000;
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
  padding: 12px;
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

// ChatBotAdminPage Component
const ChatBotAdminPage = () => {
  const [formData, setFormData] = useState({ chatbot_id: '', keyword: '', response: '' });
  const [chatBots, setChatBots] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch chatbots on component mount
  useEffect(() => {
    fetchChatBots();
  }, []);

  const fetchChatBots = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chatbots');
      if (response.data.success) {
        setChatBots(response.data.data);
      } else {
        setError(response.data.message || 'Error fetching chatbots');
      }
    } catch (err) {
      setError('Error fetching chatbots');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      let response;
      if (editingId) {
        // Update using chatbot_id
        response = await axios.put(`http://127.0.0.1:8000/api/chatbots/${editingId}`, formData);
      } else {
        // Create new chatbot
        response = await axios.post('http://127.0.0.1:8000/api/chatbots', formData);
      }

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        fetchChatBots(); // Refetch chatbots
        setFormData({ chatbot_id: '', keyword: '', response: '' });
        setEditingId(null);
      } else {
        setError(response.data.message || 'Error submitting chatbot');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (chatBot) => {
    setEditingId(chatBot.chatbot_id);
    setFormData({ chatbot_id: chatBot.chatbot_id, keyword: chatBot.keyword, response: chatBot.response });
    setSuccessMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/chatbots/${id}`);
        if (response.data.success) {
          setSuccessMessage(response.data.message);
          setChatBots(chatBots.filter(chatBot => chatBot.chatbot_id !== id)); // Optimistic UI update
        } else {
          setError(response.data.message || 'Error deleting chatbot');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageContainer>
      <Header />
      <Sidebar />
      <FormContainer>
        <Title>{editingId ? 'Edit Chatbot' : 'Tambah Chatbot'}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="chatbot_id">Chatbot ID</Label>
            <Input
              type="text"
              id="chatbot_id"
              name="chatbot_id"
              value={formData.chatbot_id}
              onChange={handleInputChange}
              readOnly // Prevent changes to the ID
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              type="text"
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="response">Response</Label>
            <Textarea
              id="response"
              name="response"
              value={formData.response}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processing...' : editingId ? 'Update Chatbot' : 'Tambah Chatbot'}
          </SubmitButton>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </FormContainer>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Chatbot ID</TableHeader>
              <TableHeader>Keyword</TableHeader>
              <TableHeader>Response</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {chatBots.length > 0 ? (
              chatBots.map((chatBot) => (
                <TableRow key={chatBot.chatbot_id}>
                  <TableCell>{chatBot.chatbot_id}</TableCell>
                  <TableCell>{chatBot.keyword}</TableCell>
                  <TableCell>{chatBot.response}</TableCell>
                  <TableCell>
                    <button onClick={() => handleEdit(chatBot)}>Edit</button>
                    <button onClick={() => handleDelete(chatBot.chatbot_id)}>Delete</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">No chatbots available</TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      )}
    </PageContainer>
  );
};

export default ChatBotAdminPage;
