import React from 'react';

type StatusType = 'active' | 'inactive' | 'scheduled' | 'over' | 'pending';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusStyles = (status: StatusType): string => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium inline-block';
  
  switch (status) {
    case 'active':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'inactive':
      return `${baseClasses} bg-red-100 text-red-800`;
    case 'scheduled':
      return `${baseClasses} bg-purple-100 text-purple-800`;
    case 'over':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case 'pending':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span className={`${getStatusStyles(status)} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge; 