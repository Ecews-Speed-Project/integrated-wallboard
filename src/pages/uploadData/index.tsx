import React, { useState } from 'react';
import DropZone from '../../components/DropZone'; // Ensure correct import path
import BreadCrumb from '../../components/BreadCrumb';
import './App.css';

// Define the interface for the DropZone configuration
interface DropZoneConfig {
  name: string; // Name of the DropZone
  url: string;  // API endpoint URL for the DropZone
}

const DropZoneSwitcher: React.FC = () => {
  const [selectedDropZoneIndex, setSelectedDropZoneIndex] = useState<number>(0);

  // Array of objects, each containing the name and URL for a DropZone
  const dropZones: DropZoneConfig[] = [
    { name: 'Select upload Type', url: '' },
    { name: 'Retention', url: 'http://eboard.ecews.org/api/import/file-upload?type=RETENTION' },
    { name: 'Viral Load', url: 'http://eboard.ecews.org/api/import/file-upload?type=VL' },
    { name: 'Viralload Age and Sex', url: 'http://eboard.ecews.org/api/import/file-upload?type=VLAGESEX' },
    { name: 'SOMAS', url: 'http://eboard.ecews.org/api/import/file-upload?type=SORMAS' },
    { name: 'Facility Line list', url: 'http://eboard.ecews.org/api/import/file-upload?type=LINELIST' },
   /*  { name: 'DropZone 6', url: 'https://api-endpoint.com/upload6' },
    { name: 'DropZone 7', url: 'https://api-endpoint.com/upload7' },
    { name: 'DropZone 8', url: 'https://api-endpoint.com/upload8' }, */
  ];

  // Handles dropdown change to switch between different DropZone instances
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDropZoneIndex(parseInt(event.target.value, 10));
  };

  return (
    <div>			
      <div className="bg-container container-fluid  mt-2">
      <BreadCrumb state={"General"} page={"Upload page"}></BreadCrumb>

      <h1>Select an upload  type</h1>

      {/* Dropdown to switch between DropZone components */}
      <select value={selectedDropZoneIndex} onChange={handleSelectChange}  className="styled-select">
        {dropZones.map((dropZone, index) => (
          <option key={index} value={index}>
            {dropZone.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        {/* Render the selected DropZone component using the selected URL */}
        <DropZone uploadUrl={dropZones[selectedDropZoneIndex].url}  />
      </div>
    </div>
    </div>
  );
};

export default DropZoneSwitcher;
