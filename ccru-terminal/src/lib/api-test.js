// lib/api-test.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://94.130.218.45:3066';
const API_KEY = import.meta.env.VITE_API_KEY || 'test123';

export const testApiEndpoint = async () => {
  try {
    // Test the health endpoint first
    const healthResponse = await fetch(`${API_BASE_URL}/health`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY
      },
      mode: 'no-cors' // Add this to allow mixed content
    });
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);

    // Test the query endpoint
    const testResponse = await fetch(`${API_BASE_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      mode: 'no-cors', // Add this to allow mixed content
      body: JSON.stringify({ question: 'test' })
    });

    if (!testResponse.ok) {
      throw new Error(`Query test failed: ${testResponse.status}`);
    }

    const queryData = await testResponse.json();
    console.log('Query test:', queryData);
    
    return true;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};