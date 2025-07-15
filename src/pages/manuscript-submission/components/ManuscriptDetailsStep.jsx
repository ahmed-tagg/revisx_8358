import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ManuscriptDetailsStep = ({ formData, onFormDataChange, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const researchCategories = [
    { value: 'biology', label: 'Biology & Life Sciences' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics & Astronomy' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine & Health Sciences' },
    { value: 'environmental', label: 'Environmental Sciences' },
    { value: 'social-sciences', label: 'Social Sciences' },
    { value: 'other', label: 'Other' }
  ];

  const manuscriptTypes = [
    { value: 'research-article', label: 'Research Article' },
    { value: 'review', label: 'Review Article' },
    { value: 'short-communication', label: 'Short Communication' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'letter', label: 'Letter to Editor' }
  ];

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.abstract?.trim()) {
      newErrors.abstract = 'Abstract is required';
    } else if (formData.abstract.length < 100) {
      newErrors.abstract = 'Abstract must be at least 100 characters';
    }
    
    if (!formData.keywords?.trim()) {
      newErrors.keywords = 'Keywords are required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Research category is required';
    }
    
    if (!formData.manuscriptType) {
      newErrors.manuscriptType = 'Manuscript type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getCharacterCount = (text, max) => {
    const count = text?.length || 0;
    const isOverLimit = count > max;
    return (
      <span className={`text-xs ${isOverLimit ? 'text-error' : 'text-muted-foreground'}`}>
        {count}/{max}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Manuscript Details</h2>
        <p className="text-muted-foreground">
          Provide detailed information about your manuscript including title, abstract, and keywords.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Input
            label="Manuscript Title"
            type="text"
            placeholder="Enter your manuscript title"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={errors.title}
            required
            description="Provide a clear and descriptive title for your manuscript"
          />

          <Select
            label="Manuscript Type"
            placeholder="Select manuscript type"
            options={manuscriptTypes}
            value={formData.manuscriptType || ''}
            onChange={(value) => handleInputChange('manuscriptType', value)}
            error={errors.manuscriptType}
            required
          />

          <Select
            label="Research Category"
            placeholder="Select primary research category"
            options={researchCategories}
            value={formData.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            error={errors.category}
            required
            searchable
          />

          <Input
            label="Keywords"
            type="text"
            placeholder="Enter keywords separated by commas"
            value={formData.keywords || ''}
            onChange={(e) => handleInputChange('keywords', e.target.value)}
            error={errors.keywords}
            required
            description="Provide 3-8 keywords that best describe your research"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Abstract <span className="text-error">*</span>
            </label>
            <div className="relative">
              <textarea
                className="w-full h-40 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Enter your manuscript abstract..."
                value={formData.abstract || ''}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                maxLength={3000}
              />
              <div className="absolute bottom-2 right-2">
                {getCharacterCount(formData.abstract, 3000)}
              </div>
            </div>
            {errors.abstract && (
              <p className="text-sm text-error mt-1">{errors.abstract}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Provide a comprehensive abstract (minimum 100 characters)
            </p>
          </div>

          <Input
            label="Funding Information"
            type="text"
            placeholder="Grant numbers, funding agencies (optional)"
            value={formData.funding || ''}
            onChange={(e) => handleInputChange('funding', e.target.value)}
            description="List any funding sources or grant numbers"
          />

          <Input
            label="Competing Interests"
            type="text"
            placeholder="Declare any competing interests (optional)"
            value={formData.competingInterests || ''}
            onChange={(e) => handleInputChange('competingInterests', e.target.value)}
            description="Declare any financial or non-financial competing interests"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Comments
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Any additional information for the editor..."
              value={formData.comments || ''}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-muted-foreground">
                Optional comments for the editorial team
              </p>
              {getCharacterCount(formData.comments, 1000)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next: Authors & Affiliations
          <Icon name="ChevronRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ManuscriptDetailsStep;