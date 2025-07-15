import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const JournalConfigForm = ({ config, onSave }) => {
  const [formData, setFormData] = useState({
    journal_name: config?.journal_name || '',
    submission_guidelines: config?.submission_guidelines || '',
    review_criteria: config?.review_criteria || '',
    max_file_size: config?.max_file_size || '10',
    allowed_formats: config?.allowed_formats || ['pdf', 'doc', 'docx'],
    review_deadline: config?.review_deadline || '30',
    auto_acknowledgment: config?.auto_acknowledgment || true,
    email_notifications: config?.email_notifications || true,
    plagiarism_check: config?.plagiarism_check || false,
    submission_fee: config?.submission_fee || '0',
    categories: config?.categories || []
  });

  const [isLoading, setIsLoading] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'doc', label: 'DOC' },
    { value: 'docx', label: 'DOCX' },
    { value: 'tex', label: 'LaTeX' },
    { value: 'rtf', label: 'RTF' }
  ];

  const fileSizeOptions = [
    { value: '5', label: '5 MB' },
    { value: '10', label: '10 MB' },
    { value: '25', label: '25 MB' },
    { value: '50', label: '50 MB' },
    { value: '100', label: '100 MB' }
  ];

  const reviewDeadlineOptions = [
    { value: '14', label: '2 weeks' },
    { value: '21', label: '3 weeks' },
    { value: '30', label: '1 month' },
    { value: '45', label: '6 weeks' },
    { value: '60', label: '2 months' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormatChange = (format, checked) => {
    setFormData(prev => ({
      ...prev,
      allowed_formats: checked
        ? [...prev.allowed_formats, format]
        : prev.allowed_formats.filter(f => f !== format)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Journal Configuration</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure journal settings and submission requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Basic Information</h4>
          
          <Input
            label="Journal Name"
            type="text"
            value={formData.journal_name}
            onChange={(e) => handleInputChange('journal_name', e.target.value)}
            placeholder="Enter journal name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Submission Guidelines
            </label>
            <textarea
              className="w-full p-3 border border-border rounded-md text-sm text-foreground bg-input resize-none"
              rows={4}
              value={formData.submission_guidelines}
              onChange={(e) => handleInputChange('submission_guidelines', e.target.value)}
              placeholder="Enter submission guidelines..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Review Criteria
            </label>
            <textarea
              className="w-full p-3 border border-border rounded-md text-sm text-foreground bg-input resize-none"
              rows={4}
              value={formData.review_criteria}
              onChange={(e) => handleInputChange('review_criteria', e.target.value)}
              placeholder="Enter review criteria..."
            />
          </div>
        </div>

        {/* File Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">File Settings</h4>
          
          <Select
            label="Maximum File Size"
            options={fileSizeOptions}
            value={formData.max_file_size}
            onChange={(value) => handleInputChange('max_file_size', value)}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Allowed File Formats
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formatOptions.map((format) => (
                <Checkbox
                  key={format.value}
                  label={format.label}
                  checked={formData.allowed_formats.includes(format.value)}
                  onChange={(e) => handleFormatChange(format.value, e.target.checked)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Review Settings</h4>
          
          <Select
            label="Review Deadline"
            description="Default deadline for peer reviews"
            options={reviewDeadlineOptions}
            value={formData.review_deadline}
            onChange={(value) => handleInputChange('review_deadline', value)}
          />

          <div className="space-y-3">
            <Checkbox
              label="Auto-acknowledgment emails"
              description="Send automatic acknowledgment emails upon submission"
              checked={formData.auto_acknowledgment}
              onChange={(e) => handleInputChange('auto_acknowledgment', e.target.checked)}
            />

            <Checkbox
              label="Email notifications"
              description="Send email notifications for status changes"
              checked={formData.email_notifications}
              onChange={(e) => handleInputChange('email_notifications', e.target.checked)}
            />

            <Checkbox
              label="Plagiarism check"
              description="Enable automatic plagiarism checking"
              checked={formData.plagiarism_check}
              onChange={(e) => handleInputChange('plagiarism_check', e.target.checked)}
            />
          </div>
        </div>

        {/* Financial Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Financial Settings</h4>
          
          <Input
            label="Submission Fee (USD)"
            type="number"
            value={formData.submission_fee}
            onChange={(e) => handleInputChange('submission_fee', e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JournalConfigForm;