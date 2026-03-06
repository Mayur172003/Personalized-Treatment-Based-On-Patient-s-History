const API = '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${url}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || res.statusText);
    if (data.errors) err.errors = data.errors;
    throw err;
  }
  return data;
}

export const authAPI = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
};

export const adminAPI = {
  login: (body) => request('/admin/login', { method: 'POST', body: JSON.stringify(body) }),
  getDoctors: () => request('/admin/doctors'),
  addDoctor: (body) => request('/admin/doctors', { method: 'POST', body: JSON.stringify(body) }),
};

export const doctorAPI = {
  login: (body) => request('/doctors/login', { method: 'POST', body: JSON.stringify(body) }),
};

export const analysisAPI = {
  submit: (body) => request('/analysis', { method: 'POST', body: JSON.stringify(body) }),
  history: () => request('/analysis/history'),
};

export const dietAPI = {
  list: () => request('/diet'),
};

export const exerciseAPI = {
  list: () => request('/exercise'),
};

export const doctorsAPI = {
  list: () => request('/doctors'),
};

export const appointmentsAPI = {
  list: () => request('/appointments'),
  create: (body) => request('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  listDoctor: () => request('/appointments/doctor'),
};

export const visualizationAPI = {
  diet: () => request('/visualization/diet'),
  diabetes: () => request('/visualization/diabetes'),
};
