import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StepIndicator from './components/StepIndicator';
import FileUploadStep from './components/FileUploadStep';
import ManuscriptDetailsStep from './components/ManuscriptDetailsStep';
import AuthorsStep from './components/AuthorsStep';
import ReviewStep from './components/ReviewStep';
import SubmissionGuidelines from './components/SubmissionGuidelines';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ManuscriptSubmission = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    category: '',
    manuscriptType: '',
    funding: '',
    competingInterests: '',
    comments: '',
    authors: []
  });
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);

  const steps = [
    {
      label: 'File Upload',
      description: 'Upload manuscript files'
    },
    {
      label: 'Manuscript Details',
      description: 'Enter manuscript information'
    },
    {
      label: 'Authors & Affiliations',
      description: 'Add author details'
    },
    {
      label: 'Review & Submit',
      description: 'Review and submit'
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const saveData = {
      currentStep,
      files,
      formData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('manuscript-draft', JSON.stringify(saveData));
  }, [currentStep, files, formData]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('manuscript-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.formData) {
          setFormData(parsed.formData);
        }
        if (parsed.files) {
          setFiles(parsed.files);
        }
        // Don't restore currentStep to avoid confusion
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleSubmit = () => {
    // Clear saved draft after successful submission
    localStorage.removeItem('manuscript-draft');
    setIsSubmissionComplete(true);
  };

  const handleStartNew = () => {
    setCurrentStep(0);
    setFiles([]);
    setFormData({
      title: '',
      abstract: '',
      keywords: '',
      category: '',
      manuscriptType: '',
      funding: '',
      competingInterests: '',
      comments: '',
      authors: []
    });
    setIsSubmissionComplete(false);
    localStorage.removeItem('manuscript-draft');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FileUploadStep
            files={files}
            onFilesChange={setFiles}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ManuscriptDetailsStep
            formData={formData}
            onFormDataChange={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <AuthorsStep
            formData={formData}
            onFormDataChange={setFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ReviewStep
            formData={formData}
            files={files}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            onEditStep={handleEditStep}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmissionComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-60 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Submission Successful!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your manuscript has been successfully submitted for review.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-left max-w-md mx-auto">
                <h3 className="font-medium text-foreground mb-4">Submission Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manuscript ID:</span>
                    <span className="font-medium text-foreground">MS-2025-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium text-foreground">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-primary">Under Review</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-primary">
                  <Icon name="Mail" size={16} className="inline mr-2" />
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/manuscript-status-tracking'}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Track Status
                </Button>
                <Button onClick={handleStartNew}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Submit Another Manuscript
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>RevisX</span>
              <Icon name="ChevronRight" size={14} />
              <span>Manuscript Submission</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Submit New Manuscript</h1>
            <p className="text-muted-foreground mt-2">
              Follow the steps below to submit your manuscript for peer review.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="bg-card border border-border rounded-lg p-8">
                <StepIndicator currentStep={currentStep} steps={steps} />
                {renderCurrentStep()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <SubmissionGuidelines currentStep={currentStep} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManuscriptSubmission;