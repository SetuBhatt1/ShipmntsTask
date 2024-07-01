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
      const sheetName = workbook.SheetNames[0]; //header
      const worksheet = workbook.Sheets[sheetName];

      // Convert the first worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData);

      // Validate and filter rows
      // const validatedData = validateRows(jsonData);
      // console.log('Validated data:', validatedData); 
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  // Function to validate rows
  // const validateRows = (rows) => {
  //   const requiredFields = ['name', 'address', 'phone', 'email', 'website', 'noOfEmployees', 'foundedDate', 'industryType'];
  //   console.log('All rows before validation:', rows); // Debugging line
  //   return rows.filter(row => requiredFields.every(field => row.hasOwnProperty(field)));
  // };


  // Function to handle upload to backend
  const handleUpload = async () => {
    console.log('Uploading...'); // Debugging line
    if (!file) {
      setUploadStatus('No file selected. Please select a file to upload.');
      console.log('No file selected.'); // Debugging line
      return;
    }

    try {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        try {
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
      {/* File upload input */}
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />

      {/* Upload button */}
      <Button variant="primary" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>

      {/* Upload status message */}
      {uploadStatus && <p>{uploadStatus}</p>}

      {/* Display data */}
      {data.length > 0 && (
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              {/* headers */}
              {Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {data.map((row, index) => (
              <tr key={index}>
                {/*cells */}
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
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
