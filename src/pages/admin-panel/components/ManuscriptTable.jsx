import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import QuickActionDropdown from '../../../components/ui/QuickActionDropdown';

const ManuscriptTable = ({ manuscripts, onBulkAction, onStatusUpdate }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('submitted_date');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'revision_requested', label: 'Revision Requested' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'submitted_date', label: 'Submission Date' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'status', label: 'Status' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', label: 'Submitted' },
      under_review: { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
      revision_requested: { color: 'bg-orange-100 text-orange-800', label: 'Revision Requested' },
      accepted: { color: 'bg-green-100 text-green-800', label: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredManuscripts.map(m => m.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const filteredManuscripts = manuscripts.filter(manuscript => {
    const matchesSearch = manuscript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manuscript.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || manuscript.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedManuscripts = [...filteredManuscripts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'submitted_date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const bulkActions = [
    {
      id: 'assign_reviewer',
      label: 'Assign Reviewer',
      icon: 'UserPlus',
      onClick: () => onBulkAction('assign_reviewer', selectedItems)
    },
    {
      id: 'update_status',
      label: 'Update Status',
      icon: 'RefreshCw',
      onClick: () => onBulkAction('update_status', selectedItems)
    },
    { type: 'separator' },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      onClick: () => onBulkAction('export', selectedItems)
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: 'Trash2',
      variant: 'destructive',
      onClick: () => onBulkAction('delete', selectedItems)
    }
  ];

  const getRowActions = (manuscript) => [
    {
      id: 'view',
      label: 'View Details',
      icon: 'Eye',
      onClick: () => console.log('View manuscript:', manuscript.id)
    },
    {
      id: 'assign',
      label: 'Assign Reviewer',
      icon: 'UserPlus',
      onClick: () => console.log('Assign reviewer:', manuscript.id)
    },
    {
      id: 'download',
      label: 'Download Files',
      icon: 'Download',
      onClick: () => console.log('Download:', manuscript.id)
    },
    { type: 'separator' },
    {
      id: 'reject',
      label: 'Reject',
      icon: 'X',
      variant: 'destructive',
      onClick: () => onStatusUpdate(manuscript.id, 'rejected')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with filters and search */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search manuscripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-full sm:w-48"
            />
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} selected
              </span>
              <QuickActionDropdown
                actions={bulkActions}
                trigger="dots"
                position="bottom-right"
              />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedItems.length === filteredManuscripts.length && filteredManuscripts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Title</th>
              <th className="text-left p-4 font-medium text-foreground">Author</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Submitted</th>
              <th className="text-left p-4 font-medium text-foreground">Reviewer</th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedManuscripts.map((manuscript) => (
              <tr key={manuscript.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <Checkbox
                    checked={selectedItems.includes(manuscript.id)}
                    onChange={(e) => handleSelectItem(manuscript.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground truncate max-w-xs">
                      {manuscript.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: {manuscript.id}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{manuscript.author}</p>
                    <p className="text-sm text-muted-foreground">{manuscript.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(manuscript.status)}
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">
                    {new Date(manuscript.submitted_date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(manuscript.submitted_date).toLocaleTimeString()}
                  </p>
                </td>
                <td className="p-4">
                  {manuscript.reviewer ? (
                    <div>
                      <p className="text-sm font-medium text-foreground">{manuscript.reviewer}</p>
                      <p className="text-xs text-muted-foreground">Assigned</p>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="p-4">
                  <QuickActionDropdown
                    actions={getRowActions(manuscript)}
                    trigger="dots"
                    position="bottom-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedManuscripts.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No manuscripts found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'No manuscripts have been submitted yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ManuscriptTable;