import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import QuickActionDropdown from '../../../components/ui/QuickActionDropdown';

const ManuscriptTable = ({
  manuscripts,
  selectedManuscripts,
  onSelectionChange,
  onSort,
  sortConfig,
  onQuickAction
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'submitted': { color: 'bg-blue-100 text-blue-800', icon: 'Clock' },
      'under-review': { color: 'bg-yellow-100 text-yellow-800', icon: 'Eye' },
      'revision-requested': { color: 'bg-orange-100 text-orange-800', icon: 'Edit' },
      'accepted': { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
      'rejected': { color: 'bg-red-100 text-red-800', icon: 'XCircle' },
      'published': { color: 'bg-purple-100 text-purple-800', icon: 'BookOpen' }
    };

    const config = statusConfig[status] || statusConfig['submitted'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(manuscripts.map(m => m.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectManuscript = (manuscriptId, checked) => {
    if (checked) {
      onSelectionChange([...selectedManuscripts, manuscriptId]);
    } else {
      onSelectionChange(selectedManuscripts.filter(id => id !== manuscriptId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getQuickActions = (manuscript) => [
    {
      id: 'view',
      label: 'View Details',
      icon: 'Eye',
      onClick: () => onQuickAction('view', manuscript.id)
    },
    {
      id: 'duplicate',
      label: 'Duplicate Submission',
      icon: 'Copy',
      onClick: () => onQuickAction('duplicate', manuscript.id)
    },
    {
      id: 'download',
      label: 'Download Files',
      icon: 'Download',
      onClick: () => onQuickAction('download', manuscript.id)
    },
    { type: 'separator' },
    {
      id: 'archive',
      label: manuscript.archived ? 'Unarchive' : 'Archive',
      icon: manuscript.archived ? 'ArchiveRestore' : 'Archive',
      onClick: () => onQuickAction('archive', manuscript.id)
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      variant: 'destructive',
      onClick: () => onQuickAction('delete', manuscript.id)
    }
  ];

  const isAllSelected = manuscripts.length > 0 && selectedManuscripts.length === manuscripts.length;
  const isIndeterminate = selectedManuscripts.length > 0 && selectedManuscripts.length < manuscripts.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('title')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Title
                  {getSortIcon('title')}
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('journal')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Journal
                  {getSortIcon('journal')}
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('submissionDate')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Submitted
                  {getSortIcon('submissionDate')}
                </Button>
              </th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('status')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Status
                  {getSortIcon('status')}
                </Button>
              </th>
              <th className="text-left px-4 py-3">Co-authors</th>
              <th className="text-left px-4 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('lastActivity')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Last Activity
                  {getSortIcon('lastActivity')}
                </Button>
              </th>
              <th className="w-12 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {manuscripts.map((manuscript) => (
              <tr
                key={manuscript.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  selectedManuscripts.includes(manuscript.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(manuscript.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedManuscripts.includes(manuscript.id)}
                    onChange={(e) => handleSelectManuscript(manuscript.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <h4 className="font-medium text-foreground truncate">
                      {manuscript.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {manuscript.abstract}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="BookOpen" size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {manuscript.journal}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {formatDate(manuscript.submissionDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(manuscript.status)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {manuscript.coAuthors.slice(0, 3).map((author, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground"
                        title={author}
                      >
                        {author.charAt(0)}
                      </div>
                    ))}
                    {manuscript.coAuthors.length > 3 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{manuscript.coAuthors.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(manuscript.lastActivity)}
                  </span>
                </td>
                <td className="px-4 py-3">
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

      {manuscripts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No manuscripts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to find manuscripts.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManuscriptTable;