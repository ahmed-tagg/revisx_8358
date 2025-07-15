import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import QuickActionDropdown from '../../../components/ui/QuickActionDropdown';

const ManuscriptTable = ({ manuscripts, onActionClick, className = '' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getQuickActions = (manuscript) => [
    {
      id: 'view',
      label: 'View Details',
      icon: 'Eye',
      onClick: () => onActionClick('view', manuscript.id)
    },
    {
      id: 'edit',
      label: 'Edit Manuscript',
      icon: 'Edit',
      onClick: () => onActionClick('edit', manuscript.id),
      disabled: manuscript.status === 'Published' || manuscript.status === 'Rejected'
    },
    {
      type: 'separator'
    },
    {
      id: 'upload-revision',
      label: 'Upload Revision',
      icon: 'Upload',
      onClick: () => onActionClick('upload-revision', manuscript.id),
      disabled: manuscript.status !== 'Revision Requested'
    },
    {
      id: 'download',
      label: 'Download PDF',
      icon: 'Download',
      onClick: () => onActionClick('download', manuscript.id)
    },
    {
      type: 'separator'
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: 'XCircle',
      variant: 'destructive',
      onClick: () => onActionClick('withdraw', manuscript.id),
      disabled: manuscript.status === 'Published' || manuscript.status === 'Rejected' || manuscript.status === 'Withdrawn'
    }
  ];

  const getNextAction = (status) => {
    switch (status) {
      case 'Submitted':
        return 'Awaiting review assignment';
      case 'Under Review':
        return 'Review in progress';
      case 'Revision Requested':
        return 'Upload revised manuscript';
      case 'Accepted':
        return 'Awaiting publication';
      case 'Published':
        return 'View published article';
      case 'Rejected':
        return 'Consider other journals';
      case 'Withdrawn':
        return 'No action required';
      default:
        return 'Check status';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manuscript
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Journal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Action
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manuscripts.map((manuscript) => (
              <tr key={manuscript.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/manuscript-status-tracking?id=${manuscript.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                      >
                        {manuscript.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {manuscript.authors.join(', ')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{manuscript.journal}</div>
                  <div className="text-sm text-gray-500">{manuscript.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(manuscript.submissionDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {manuscript.daysAgo} days ago
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={manuscript.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {getNextAction(manuscript.status)}
                  </div>
                  {manuscript.deadline && (
                    <div className="text-sm text-orange-600 mt-1">
                      Due: {formatDate(manuscript.deadline)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <QuickActionDropdown
                    actions={getQuickActions(manuscript)}
                    position="bottom-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {manuscripts.map((manuscript) => (
          <div key={manuscript.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/manuscript-status-tracking?id=${manuscript.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                  >
                    {manuscript.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {manuscript.authors.join(', ')}
                  </p>
                </div>
              </div>
              <QuickActionDropdown
                actions={getQuickActions(manuscript)}
                position="bottom-right"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Journal</p>
                <p className="text-gray-900 font-medium">{manuscript.journal}</p>
              </div>
              <div>
                <p className="text-gray-500">Submitted</p>
                <p className="text-gray-900">{formatDate(manuscript.submissionDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <StatusBadge status={manuscript.status} />
              <div className="text-right">
                <p className="text-sm text-gray-900">{getNextAction(manuscript.status)}</p>
                {manuscript.deadline && (
                  <p className="text-sm text-orange-600">
                    Due: {formatDate(manuscript.deadline)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {manuscripts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No manuscripts found</h3>
          <p className="text-gray-500 mb-6">Get started by submitting your first manuscript.</p>
          <Button asChild>
            <Link to="/manuscript-submission" className="inline-flex items-center">
              <Icon name="Plus" size={16} className="mr-2" />
              Submit Manuscript
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ManuscriptTable;