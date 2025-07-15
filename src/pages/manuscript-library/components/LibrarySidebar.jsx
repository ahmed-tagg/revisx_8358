import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LibrarySidebar = ({ onSavedSearchClick, onExportClick }) => {
  const libraryStats = [
    {
      label: 'Total Submissions',
      value: '47',
      icon: 'FileText',
      color: 'text-blue-600'
    },
    {
      label: 'Accepted Papers',
      value: '23',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      label: 'Under Review',
      value: '12',
      icon: 'Eye',
      color: 'text-yellow-600'
    },
    {
      label: 'Published',
      value: '18',
      icon: 'BookOpen',
      color: 'text-purple-600'
    }
  ];

  const acceptanceRates = [
    { journal: 'Nature', rate: '85%', submissions: 6 },
    { journal: 'Science', rate: '75%', submissions: 4 },
    { journal: 'Cell', rate: '90%', submissions: 3 },
    { journal: 'PLOS ONE', rate: '60%', submissions: 8 },
    { journal: 'JAMA', rate: '100%', submissions: 2 }
  ];

  const submissionTrends = [
    { year: '2024', count: 15, change: '+25%' },
    { year: '2023', count: 12, change: '+20%' },
    { year: '2022', count: 10, change: '+11%' },
    { year: '2021', count: 9, change: '+12%' },
    { year: '2020', count: 8, change: '-' }
  ];

  const savedSearches = [
    {
      id: 1,
      name: 'Accepted Nature Papers',
      query: 'journal:nature status:accepted',
      count: 5
    },
    {
      id: 2,
      name: 'Recent Submissions',
      query: 'date:last-month',
      count: 8
    },
    {
      id: 3,
      name: 'Revision Requested',
      query: 'status:revision-requested',
      count: 3
    },
    {
      id: 4,
      name: 'Co-authored Papers',
      query: 'coauthors:with-coauthors',
      count: 28
    }
  ];

  return (
    <div className="w-80 bg-surface border-l border-border p-6 space-y-6 overflow-y-auto">
      {/* Library Statistics */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Library Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {libraryStats.map((stat, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Icon name={stat.icon} size={16} className={stat.color} />
                <span className="text-lg font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Acceptance Rates by Journal */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Acceptance Rates by Journal</h3>
        <div className="space-y-3">
          {acceptanceRates.map((journal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{journal.journal}</p>
                <p className="text-xs text-muted-foreground">{journal.submissions} submissions</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-success">{journal.rate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Trends */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Submission Trends</h3>
        <div className="space-y-2">
          {submissionTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded">
              <span className="text-sm text-foreground">{trend.year}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{trend.count}</span>
                {trend.change !== '-' && (
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    trend.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trend.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Searches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Saved Searches</h3>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={14} />
          </Button>
        </div>
        <div className="space-y-2">
          {savedSearches.map((search) => (
            <button
              key={search.id}
              onClick={() => onSavedSearchClick(search)}
              className="w-full text-left p-3 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{search.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{search.query}</p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {search.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Export Library</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onExportClick('csv')}
          >
            <Icon name="Download" size={14} className="mr-2" />
            Export to CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onExportClick('bibtex')}
          >
            <Icon name="FileText" size={14} className="mr-2" />
            Export to BibTeX
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onExportClick('endnote')}
          >
            <Icon name="BookOpen" size={14} className="mr-2" />
            Export to EndNote
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Plus" size={14} className="mr-2" />
            New Submission
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Archive" size={14} className="mr-2" />
            Archive Manager
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="BarChart3" size={14} className="mr-2" />
            Analytics Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibrarySidebar;