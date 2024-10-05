// DynamicBreadCrumb.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BreadCrumb from '../BreadCrumb';

interface DynamicBreadCrumbProps {
  page: string;
}

const DynamicBreadCrumb: React.FC<DynamicBreadCrumbProps> = ({ page }) => {
  const userData = useSelector((state: RootState) => state.auth);
  return <BreadCrumb state={userData.state ?? 'Unknown State'} page={page} />;
};

export default DynamicBreadCrumb;
