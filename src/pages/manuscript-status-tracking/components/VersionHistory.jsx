import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ versions }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVersionIcon = (type) => {
    switch (type) {
      case 'initial':
        return { name: 'FileText', color: 'text-blue-600' };
      case 'revision':
        return { name: 'Edit', color: 'text-orange-600' };
      case 'final':
        return { name: 'CheckCircle', color: 'text-green-600' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const getVersionBadge = (type) => {
    switch (type) {
      case 'initial':
        return 'bg-blue-100 text-blue-800';
      case 'revision':
        return 'bg-orange-100 text-orange-800';
      case 'final':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {versions.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No versions available</p>
        </div>
      ) : (
        versions.map((version, index) => {
          const versionIcon = getVersionIcon(version.type);
          const isLatest = index === 0;
          
          return (
            <div key={version.id} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    <Icon name={versionIcon.name} size={20} className={versionIcon.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-foreground">
                        Version {version.version}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVersionBadge(version.type)}`}>
                        {version.type}
                      </span>
                      {isLatest && (
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          Latest
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{version.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {version.uploadDate}
                      </span>
                      <span className="flex items-center">
                        <Icon name="User" size={12} className="mr-1" />
                        {version.uploadedBy}
                      </span>
                      <span className="flex items-center">
                        <Icon name="HardDrive" size={12} className="mr-1" />
                        {formatFileSize(version.fileSize)}
                      </span>
                    </div>
                    
                    {version.changes && version.changes.length > 0 && (
                      <div className="mt-3 p-2 bg-muted/50 rounded">
                        <p className="text-xs text-muted-foreground mb-1">Key Changes:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {version.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="flex items-start">
                              <Icon name="ArrowRight" size={10} className="mr-1 mt-0.5 flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={14} className="mr-1" />
                    Download
                  </Button>
                  {version.canCompare && (
                    <Button variant="ghost" size="sm">
                      <Icon name="GitCompare" size={14} className="mr-1" />
                      Compare
                    </Button>
                  )}
                </div>
              </div>
              
              {version.files && version.files.length > 1 && (
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Additional Files:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {version.files.slice(1).map((file, fileIndex) => (
                      <div key={fileIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <div className="flex items-center space-x-2 min-w-0">
                          <Icon name="Paperclip" size={12} />
                          <span className="text-xs text-foreground truncate">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Icon name="Download" size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default VersionHistory;