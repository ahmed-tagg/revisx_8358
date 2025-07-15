import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return {
          label: 'Submitted',
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'under review':
        return {
          label: 'Under Review',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'revision requested':
        return {
          label: 'Revision Requested',
          className: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'accepted':
        return {
          label: 'Accepted',
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'published':
        return {
          label: 'Published',
          className: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'withdrawn':
        return {
          label: 'Withdrawn',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;