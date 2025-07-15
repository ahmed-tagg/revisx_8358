import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AuthorsStep = ({ formData, onFormDataChange, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const addAuthor = () => {
    const newAuthor = {
      id: Date.now(),
      firstName: '',
      lastName: '',
      email: '',
      affiliation: '',
      orcid: '',
      isCorresponding: false
    };
    
    const updatedAuthors = [...(formData.authors || []), newAuthor];
    onFormDataChange({
      ...formData,
      authors: updatedAuthors
    });
  };

  const removeAuthor = (authorId) => {
    const updatedAuthors = formData.authors.filter(author => author.id !== authorId);
    onFormDataChange({
      ...formData,
      authors: updatedAuthors
    });
  };

  const updateAuthor = (authorId, field, value) => {
    const updatedAuthors = formData.authors.map(author =>
      author.id === authorId ? { ...author, [field]: value } : author
    );
    onFormDataChange({
      ...formData,
      authors: updatedAuthors
    });
    
    // Clear errors for this field
    if (errors[`${authorId}_${field}`]) {
      setErrors(prev => ({ ...prev, [`${authorId}_${field}`]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.authors || formData.authors.length === 0) {
      newErrors.general = 'At least one author is required';
      setErrors(newErrors);
      return false;
    }
    
    let hasCorrespondingAuthor = false;
    
    formData.authors.forEach(author => {
      if (!author.firstName?.trim()) {
        newErrors[`${author.id}_firstName`] = 'First name is required';
      }
      if (!author.lastName?.trim()) {
        newErrors[`${author.id}_lastName`] = 'Last name is required';
      }
      if (!author.email?.trim()) {
        newErrors[`${author.id}_email`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(author.email)) {
        newErrors[`${author.id}_email`] = 'Invalid email format';
      }
      if (!author.affiliation?.trim()) {
        newErrors[`${author.id}_affiliation`] = 'Affiliation is required';
      }
      
      if (author.isCorresponding) {
        hasCorrespondingAuthor = true;
      }
    });
    
    if (!hasCorrespondingAuthor) {
      newErrors.corresponding = 'At least one corresponding author must be designated';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const sendInvitation = (authorEmail) => {
    // Mock invitation functionality
    alert(`Invitation sent to ${authorEmail}`);
  };

  // Initialize with current user as first author if no authors exist
  React.useEffect(() => {
    if (!formData.authors || formData.authors.length === 0) {
      const currentUser = {
        id: Date.now(),
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@university.edu',
        affiliation: 'Department of Biology, University of Science',
        orcid: '0000-0002-1825-0097',
        isCorresponding: true
      };
      
      onFormDataChange({
        ...formData,
        authors: [currentUser]
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Authors & Affiliations</h2>
        <p className="text-muted-foreground">
          Add all authors and their affiliations. Designate at least one corresponding author.
        </p>
      </div>

      {errors.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-error text-sm">{errors.general}</p>
        </div>
      )}

      {errors.corresponding && (
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-warning text-sm">{errors.corresponding}</p>
        </div>
      )}

      <div className="space-y-6">
        {formData.authors?.map((author, index) => (
          <div key={author.id} className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                Author {index + 1}
                {author.isCorresponding && (
                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Corresponding
                  </span>
                )}
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => sendInvitation(author.email)}
                  disabled={!author.email}
                >
                  <Icon name="Mail" size={14} className="mr-1" />
                  Invite
                </Button>
                {formData.authors.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAuthor(author.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={author.firstName}
                onChange={(e) => updateAuthor(author.id, 'firstName', e.target.value)}
                error={errors[`${author.id}_firstName`]}
                required
              />

              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={author.lastName}
                onChange={(e) => updateAuthor(author.id, 'lastName', e.target.value)}
                error={errors[`${author.id}_lastName`]}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={author.email}
                onChange={(e) => updateAuthor(author.id, 'email', e.target.value)}
                error={errors[`${author.id}_email`]}
                required
              />

              <Input
                label="ORCID ID"
                type="text"
                placeholder="0000-0000-0000-0000"
                value={author.orcid}
                onChange={(e) => updateAuthor(author.id, 'orcid', e.target.value)}
                description="Optional but recommended"
              />
            </div>

            <div className="mt-4">
              <Input
                label="Affiliation"
                type="text"
                placeholder="Department, Institution, City, Country"
                value={author.affiliation}
                onChange={(e) => updateAuthor(author.id, 'affiliation', e.target.value)}
                error={errors[`${author.id}_affiliation`]}
                required
                description="Full institutional affiliation"
              />
            </div>

            <div className="mt-4">
              <Checkbox
                label="Corresponding Author"
                checked={author.isCorresponding}
                onChange={(e) => updateAuthor(author.id, 'isCorresponding', e.target.checked)}
                description="This author will receive all correspondence about the manuscript"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addAuthor}
        className="w-full"
      >
        <Icon name="Plus" size={16} className="mr-2" />
        Add Another Author
      </Button>

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
          Next: Review & Submit
          <Icon name="ChevronRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AuthorsStep;