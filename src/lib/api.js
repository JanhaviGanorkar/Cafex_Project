const API_BASE_URL = import.meta.env.VITE_API_URL;

async function searchDocuments(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Search failed');
    }
   
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

async function addDocument(title, content) {
  try {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add document');
    }

    return await response.json();
  } catch (error) {
    console.error('Add document error:', error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export {
  searchDocuments,
  addDocument,
  loginUser,
  registerUser
};
