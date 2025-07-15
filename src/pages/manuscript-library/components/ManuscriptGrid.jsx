import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import QuickActionDropdown from '../../../components/ui/QuickActionDropdown';

const ManuscriptGrid = ({
  manuscripts,
  selectedManuscripts,
  onSelectionChange,
  onQuickAction
}) => {
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

  const handleSelectManuscript = (manuscriptId, checked) => {
    if (checked) {
      onSelectionChange([...selectedManuscripts, manuscriptId]);
    } else {
      onSelectionChange(selectedManuscripts.filter(id => id !== manuscriptId));
    }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {manuscripts.map((manuscript) => (
        <div
          key={manuscript.id}
          className={`bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
            selectedManuscripts.includes(manuscript.id) ? 'ring-2 ring-primary/20 border-primary' : ''
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <Checkbox
              checked={selectedManuscripts.includes(manuscript.id)}
              onChange={(e) => handleSelectManuscript(manuscript.id, e.target.checked)}
            />
            <QuickActionDropdown
              actions={getQuickActions(manuscript)}
              position="bottom-right"
            />
          </div>

          {/* Title and Abstract */}
          <div className="mb-4">
            <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2">
              {manuscript.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {manuscript.abstract}
            </p>
          </div>

          {/* Journal */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={14} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {manuscript.journal}
            </span>
          </div>

          {/* Status */}
          <div className="mb-3">
            {getStatusBadge(manuscript.status)}
          </div>

          {/* Co-authors */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Users" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Co-authors</span>
            </div>
            <div className="flex items-center gap-1">
              {manuscript.coAuthors.slice(0, 4).map((author, index) => (
                <div
                  key={index}
                  className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground"
                  title={author}
                >
                  {author.charAt(0)}
                </div>
              ))}
              {manuscript.coAuthors.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{manuscript.coAuthors.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Submitted</span>
              <span className="text-foreground font-medium">
                {formatDate(manuscript.submissionDate)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Last Activity</span>
              <span className="text-foreground font-medium">
                {formatDate(manuscript.lastActivity)}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction('view', manuscript.id)}
            >
              <Icon name="Eye" size={14} className="mr-1" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction('download', manuscript.id)}
            >
              <Icon name="Download" size={14} className="mr-1" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickAction('duplicate', manuscript.id)}
            >
              <Icon name="Copy" size={14} className="mr-1" />
              Duplicate
            </Button>
          </div>
        </div>
      ))}

      {manuscripts.length === 0 && (
        <div className="col-span-full text-center py-12">
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

export default ManuscriptGrid;