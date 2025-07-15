import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewStep = ({ formData, files, onPrevious, onSubmit, onEditStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    ethics: false,
    originality: false,
    copyright: false
  });
  const [errors, setErrors] = useState({});

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'tex':
        return 'Code';
      default:
        return 'File';
    }
  };

  const handleAgreementChange = (field, checked) => {
    setAgreements(prev => ({ ...prev, [field]: checked }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateAgreements = () => {
    const newErrors = {};
    
    Object.keys(agreements).forEach(key => {
      if (!agreements[key]) {
        newErrors[key] = 'This agreement is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateAgreements()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      onSubmit();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    // Mock save draft functionality
    alert('Draft saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review all information before submitting your manuscript.
        </p>
      </div>

      {/* Files Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Uploaded Files</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(0)}
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={getFileIcon(file.name)} size={20} className="text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manuscript Details Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Manuscript Details</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <p className="text-foreground">{formData.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Type</label>
            <p className="text-foreground">{formData.manuscriptType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <p className="text-foreground">{formData.category}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Keywords</label>
            <p className="text-foreground">{formData.keywords}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Abstract</label>
            <p className="text-foreground text-sm leading-relaxed">
              {formData.abstract?.substring(0, 200)}
              {formData.abstract?.length > 200 && '...'}
            </p>
          </div>
          {formData.funding && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Funding</label>
              <p className="text-foreground">{formData.funding}</p>
            </div>
          )}
        </div>
      </div>

      {/* Authors Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Authors</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          {formData.authors?.map((author, index) => (
            <div key={author.id} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">
                  {author.firstName} {author.lastName}
                </h4>
                {author.isCorresponding && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Corresponding
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{author.email}</p>
              <p className="text-sm text-muted-foreground">{author.affiliation}</p>
              {author.orcid && (
                <p className="text-sm text-muted-foreground">ORCID: {author.orcid}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agreements Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Required Agreements</h3>
        <div className="space-y-4">
          <Checkbox
            label="Terms and Conditions"
            description="I agree to the journal's terms and conditions for manuscript submission"
            checked={agreements.terms}
            onChange={(e) => handleAgreementChange('terms', e.target.checked)}
            error={errors.terms}
          />
          
          <Checkbox
            label="Ethical Guidelines"
            description="I confirm that this research complies with ethical guidelines and has appropriate approvals"
            checked={agreements.ethics}
            onChange={(e) => handleAgreementChange('ethics', e.target.checked)}
            error={errors.ethics}
          />
          
          <Checkbox
            label="Originality Declaration"
            description="I declare that this manuscript is original work and has not been published elsewhere"
            checked={agreements.originality}
            onChange={(e) => handleAgreementChange('originality', e.target.checked)}
            error={errors.originality}
          />
          
          <Checkbox
            label="Copyright Transfer"
            description="I agree to transfer copyright to the journal upon acceptance"
            checked={agreements.copyright}
            onChange={(e) => handleAgreementChange('copyright', e.target.checked)}
            error={errors.copyright}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={saveDraft}
            disabled={isSubmitting}
          >
            <Icon name="Save" size={16} className="mr-2" />
            Save Draft
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Manuscript'}
          <Icon name="Send" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;