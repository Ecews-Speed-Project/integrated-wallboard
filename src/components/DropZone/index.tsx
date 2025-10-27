import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert
import { RootState } from '../../store';

interface DropZoneProps {
  uploadUrl: string;
  tablename?: string;
}

const DropZone: React.FC<DropZoneProps> = ({ uploadUrl , tablename}) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth);
  const tableName = "tablename";

  // Function to handle file upload with progress tracking
  const uploadFile = (file: File) => {


    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track the upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          Swal.fire('Success', 'File uploaded successfully!', 'success');
          resolve();
        } else {
          Swal.fire('Error', 'Failed to upload the file.', 'error');
          reject();
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        Swal.fire('Error', 'An error occurred during the file upload.', 'error');
        setUploading(false);
        reject();
      };


      xhr.open('POST', uploadUrl);
      xhr.setRequestHeader('Authorization', `Bearer ${userData!.token}`);

      const formData = new FormData();
    
      // xhr.setRequestHeader('Content-Type', `multipart/form-data`);
      //formData.append('table_name', tablename);
    
      formData.append('file', file);
      xhr.send(formData);

      setUploading(true); // Start uploading
    });
  };

  // Function to handle files dropped into the drop zone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if the file is a valid type (JSON, CSV, Excel)
      const validTypes = [
        'application/json',
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'application/zip', // .zip
        'application/x-zip-compressed', //
      ];

      if (!validTypes.includes(file.type)) {
        Swal.fire('Invalid File', 'Please upload a valid JSON, CSV, or Excel file.', 'error');
        return;
      }

      // Proceed with the file upload
      uploadFile(file);
    }
  }, [uploadUrl]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
    },
    multiple: false,
  });

  return (
    <div>
      {uploading && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploading: {progress}%</p>
          <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '10px',
                backgroundColor: '#4caf50',
                borderRadius: '5px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}
      <br />
      <div className="dropzone"
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#f9f9f9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '16px'
        }}
      >
        <input {...getInputProps()} />
        {
          isDragActive
            ? isDragReject
              ? <p>Unsupported file type...</p>
              : <p>Drop the file here...</p>
            : <p>Drag & drop a ZIP, CSV, or Excel file here, or click to select a file. Please ensure you are uploading  the file for the specific file type</p>
        }
      </div>


    </div>
  );
};

export default DropZone;
