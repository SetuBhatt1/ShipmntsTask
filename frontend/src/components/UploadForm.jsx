import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setFile(file);
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      console.log("JSON data:", jsonData);
  
      const headers = jsonData.shift(); // Remove header
      const transformedData = jsonData.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          // set undefined to null
          obj[header] = row[index]!== undefined? row[index] : null;
        });
        return obj;
      });
  
      console.log("Transformed data:", transformedData);
  
      setData(transformedData); 
    };
    reader.readAsBinaryString(file);
  };
  
  
  

  // Function to handle upload to backend
  const handleUpload = async () => {
    console.log('Uploading...');
    if (!file) {
      setUploadStatus('No file selected. Please select a file to upload.');
      console.log('No file selected.');
      return;
    }

    try {
       for (let i = 0; i < data.length; i++) {
        const row = data[i];
        try {
          console.log("Sending row to backend:", row);
          const response = await axios.post('http://localhost:4000/api/company', row, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Response from backend:', response.data);
        } catch (error) {
          console.error('Upload failed for row:', row, error);
          setUploadStatus('Upload failed. Please try again.');
          return; // prevent further recursive calls
        }
      }

      setUploadStatus('Upload successful!');
      console.log('Upload successful');
    } catch (error) {
      console.error('Error during upload:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />

      <Button variant="primary" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>

      {uploadStatus && <p style={{ color: 'red' }}>{uploadStatus}</p>}

      {data.length > 0 && (
        <Table striped bordered hover style={{
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '14px'
        }}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={index} style={{ padding: '12px 15px', textAlign: 'left' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0? '#f9f9f9' : 'transparent' }}>
                {Object.values(row).map((value, index) => (
                  <td key={index} style={{ padding: '12px 15px', verticalAlign: 'top' }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UploadForm;
