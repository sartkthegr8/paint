import axios from 'axios';

const apiService = {
  saveDrawing: (drawingData) => axios.post('/api/drawings', drawingData),
  loadDrawing: (id) => axios.get(`/api/drawings/${id}`),
};

export default apiService;
