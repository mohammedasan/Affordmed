// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? window.location.origin + '/api'  // Production: use same domain
  : 'http://localhost:5000/api';      // Development: use localhost

// API service functions
export const apiService = {
  // Auth endpoints
  login: (credentials) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  register: (userData) => 
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),

  // Services endpoints
  getServices: () => 
    fetch(`${API_BASE_URL}/services`).then(res => res.json()),

  getOwnerServices: (token) => 
    fetch(`${API_BASE_URL}/services/owner`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()),

  createService: (serviceData, token) => 
    fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    }).then(res => res.json()),

  deleteService: (serviceId, token) => 
    fetch(`${API_BASE_URL}/services/${serviceId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()),

  // Bookings endpoints
  createBooking: (bookingData, token) => 
    fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    }).then(res => res.json()),

  getMyBookings: (token) => 
    fetch(`${API_BASE_URL}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()),

  getOwnerBookings: (token) => 
    fetch(`${API_BASE_URL}/bookings/owner`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()),

  updateBookingStatus: (bookingId, status, token) => 
    fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    }).then(res => res.json())
};

export default apiService; 