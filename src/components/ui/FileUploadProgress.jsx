import React, { useState, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';


const FileUploadProgress = ({
  files = [],
  onFilesChange,
  onUpload,
  onCancel,
  onRemove,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.doc', '.docx'],
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const isValidType = acceptedTypes.some(type => 
        file.name.toLowerCase().endsWith(type.toLowerCase())
      );
      const isValidSize = file.size <= maxFileSize;
      return isValidType && isValidSize;
    });

    if (files.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const filesWithMetadata = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      status: 'pending', // pending, uploading, completed, error
      progress: 0,
      error: null
    }));

    if (onFilesChange) {
      onFilesChange([...files, ...filesWithMetadata]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      case 'uploading':
        return { name: 'Loader', color: 'text-primary animate-spin' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        // Update file status to completed
        if (onFilesChange) {
          const updatedFiles = files.map(f => 
            f.id === fileId 
              ? { ...f, status: 'completed', progress: 100 }
              : f
          );
          onFilesChange(updatedFiles);
        }
      } else {
        // Update progress
        if (onFilesChange) {
          const updatedFiles = files.map(f => 
            f.id === fileId 
              ? { ...f, status: 'uploading', progress: Math.round(progress) }
              : f
          );
          onFilesChange(updatedFiles);
        }
      }
    }, 200);
  };

  const handleUploadFile = (fileId) => {
    simulateUpload(fileId);
  };

  const handleRemoveFile = (fileId) => {
    if (onRemove) {
      onRemove(fileId);
    } else if (onFilesChange) {
      const updatedFiles = files.filter(f => f.id !== fileId);
      onFilesChange(updatedFiles);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Supported formats: {acceptedTypes.join(', ')} • Max size: {formatFileSize(maxFileSize)}
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Icon name="FolderOpen" size={16} className="mr-2" />
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            Files ({files.length}/{maxFiles})
          </h4>
          {files.map((file) => {
            const statusIcon = getStatusIcon(file.status);
            return (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
              >
                <Icon 
                  name={statusIcon.name} 
                  size={20} 
                  className={statusIcon.color}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Uploading...</span>
                        <span>{file.progress}%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {file.error && (
                    <p className="text-xs text-error mt-1">{file.error}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUploadFile(file.id)}
                    >
                      <Icon name="Upload" size={14} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Actions */}
      {files.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {files.filter(f => f.status === 'completed').length} of {files.length} files uploaded
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={files.some(f => f.status === 'uploading')}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                files.forEach(file => {
                  if (file.status === 'pending') {
                    handleUploadFile(file.id);
                  }
                });
                if (onUpload) onUpload(files);
              }}
              disabled={files.every(f => f.status === 'completed' || f.status === 'uploading')}
            >
              Upload All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadProgress;