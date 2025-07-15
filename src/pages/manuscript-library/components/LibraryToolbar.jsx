import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LibraryToolbar = ({
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onBulkAction,
  selectedCount,
  totalCount
}) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'revision-requested', label: 'Revision Requested' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'published', label: 'Published' }
  ];

  const journalOptions = [
    { value: 'all', label: 'All Journals' },
    { value: 'nature', label: 'Nature' },
    { value: 'science', label: 'Science' },
    { value: 'cell', label: 'Cell' },
    { value: 'plos-one', label: 'PLOS ONE' },
    { value: 'jama', label: 'JAMA' },
    { value: 'nejm', label: 'New England Journal of Medicine' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const coAuthorOptions = [
    { value: 'all', label: 'All Co-authors' },
    { value: 'with-coauthors', label: 'With Co-authors' },
    { value: 'solo', label: 'Solo Submissions' },
    { value: 'dr-smith', label: 'Dr. Smith' },
    { value: 'dr-johnson', label: 'Dr. Johnson' },
    { value: 'dr-williams', label: 'Dr. Williams' }
  ];

  const bulkActions = [
    { value: 'archive', label: 'Archive Selected', icon: 'Archive' },
    { value: 'unarchive', label: 'Unarchive Selected', icon: 'ArchiveRestore' },
    { value: 'export-csv', label: 'Export to CSV', icon: 'Download' },
    { value: 'export-bibtex', label: 'Export to BibTeX', icon: 'FileText' },
    { value: 'export-endnote', label: 'Export to EndNote', icon: 'BookOpen' },
    { value: 'batch-download', label: 'Download Files', icon: 'FolderDown' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Main Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search manuscripts by title, abstract, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="mt-2 text-xs"
          >
            <Icon name="Settings" size={14} className="mr-1" />
            Advanced Search
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="h-8 px-3"
            >
              <Icon name="Table" size={16} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="h-8 px-3"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Search Panel */}
      {showAdvancedSearch && (
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3">Advanced Search Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={selectedFilters.status}
              onChange={(value) => onFilterChange('status', value)}
            />
            <Select
              label="Journal"
              options={journalOptions}
              value={selectedFilters.journal}
              onChange={(value) => onFilterChange('journal', value)}
              searchable
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={selectedFilters.dateRange}
              onChange={(value) => onFilterChange('dateRange', value)}
            />
            <Select
              label="Co-authors"
              options={coAuthorOptions}
              value={selectedFilters.coAuthors}
              onChange={(value) => onFilterChange('coAuthors', value)}
            />
          </div>
        </div>
      )}

      {/* Filter Tags and Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(selectedFilters).map(([key, value]) => {
            if (value && value !== 'all') {
              const filterLabel = key === 'dateRange' ? 'Date' : 
                                key === 'coAuthors' ? 'Co-authors' : 
                                key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {filterLabel}: {value}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onFilterChange(key, 'all')}
                    className="h-4 w-4 hover:bg-primary/20"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </span>
              );
            }
            return null;
          })}
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} of {totalCount} selected
            </span>
            <Select
              placeholder="Bulk Actions"
              options={bulkActions}
              value=""
              onChange={(value) => onBulkAction(value)}
              className="min-w-40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryToolbar;