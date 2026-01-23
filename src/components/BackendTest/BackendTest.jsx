import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const BackendTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const axiosPublic = useAxiosPublic();

  const testBackend = async () => {
    setTesting(true);
    setTestResult(null);
    
    const baseURL = axiosPublic.defaults.baseURL;
    const testURL = `${baseURL}/menu`;
    
    console.log('Testing backend at:', testURL);
    
    try {
      // Test 1: Direct fetch
      const fetchResult = await fetch(testURL);
      console.log('Fetch result:', fetchResult);
      
      if (!fetchResult.ok) {
        throw new Error(`HTTP ${fetchResult.status}: ${fetchResult.statusText}`);
      }
      
      const data = await fetchResult.json();
      console.log('Backend data received:', data);
      
      // Test 2: Axios
      const axiosResult = await axiosPublic.get('/menu');
      console.log('Axios result:', axiosResult);
      
      setTestResult({
        success: true,
        message: 'Backend is accessible!',
        baseURL,
        testURL,
        dataLength: Array.isArray(data) ? data.length : 'N/A',
        status: fetchResult.status,
      });
    } catch (error) {
      console.error('Backend test error:', error);
      setTestResult({
        success: false,
        message: error.message || 'Unknown error',
        baseURL,
        testURL,
        error: {
          name: error.name,
          code: error.code,
          message: error.message,
        },
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Backend Connection Test</h3>
      <button 
        onClick={testBackend} 
        disabled={testing}
        className="btn btn-primary mb-4"
      >
        {testing ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      {testResult && (
        <div className={`p-4 rounded ${testResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-semibold">{testResult.success ? '✅ Success' : '❌ Failed'}</p>
          <p className="mt-2">Base URL: <code className="bg-gray-200 px-2 py-1 rounded">{testResult.baseURL}</code></p>
          <p className="mt-2">Test URL: <code className="bg-gray-200 px-2 py-1 rounded">{testResult.testURL}</code></p>
          <p className="mt-2">Message: {testResult.message}</p>
          {testResult.success && (
            <p className="mt-2">Data items: {testResult.dataLength}</p>
          )}
          {testResult.error && (
            <div className="mt-2">
              <p>Error Details:</p>
              <pre className="bg-gray-200 p-2 rounded text-sm overflow-auto">
                {JSON.stringify(testResult.error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Current Environment:</strong> {import.meta.env.PROD ? 'Production' : 'Development'}</p>
        <p><strong>Backend URL:</strong> {axiosPublic.defaults.baseURL}</p>
        <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</p>
      </div>
    </div>
  );
};

export default BackendTest;
