import React, { useEffect, useState } from 'react';
import DropZone from '../../../components/DropZone'; // Ensure correct import path
import Lottie from 'lottie-react';

import './App.css';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';

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
  ];



  // Handles dropdown change to switch between different DropZone instances
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDropZoneIndex(parseInt(event.target.value, 10));
  };

  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Fetch the animation JSON from the public folder
    fetch(`${process.env.PUBLIC_URL}/animations/waiting.json`)
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
      })
      .catch((error) => {
        console.error('Error loading animation data:', error);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Don't render Lottie until animationData is loaded
  if (!animationData) {
    return <div>Loading animation...</div>;
  }

  return (
    <div>
      <div className="bg-container container-fluid  mt-2">
        <DynamicBreadCrumb page="Upload page" />

        <h1>Select an upload  type</h1>

        {/* Dropdown to switch between DropZone components */}
        <select value={selectedDropZoneIndex} onChange={handleSelectChange} className="styled-select">
          {dropZones.map((dropZone, index) => (
            <option key={index} value={index}>
              {dropZone.name}
            </option>
          ))}
        </select>

        <div style={{ marginTop: '20px' }}>
          {/* Render the selected DropZone component using the selected URL */}
          {(dropZones[selectedDropZoneIndex].url) ? <DropZone uploadUrl={dropZones[selectedDropZoneIndex].url} /> :
            <div>
              <h3 style={{
                textAlign: 'center',
              }}>
                Please select an upload type to upload your file</h3>
              <br />
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div>

                  <Lottie
                    loop={defaultOptions.loop}
                    autoplay={defaultOptions.autoplay}
                    animationData={animationData}
                    rendererSettings={defaultOptions.rendererSettings}
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DropZoneSwitcher;
