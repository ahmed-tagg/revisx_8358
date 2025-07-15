import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionGuidelines = ({ currentStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const guidelines = {
    0: {
      title: "File Upload Guidelines",
      items: [
        "Accepted formats: PDF, DOC, DOCX, LaTeX (.tex)",
        "Maximum file size: 50MB per file",
        "Include main manuscript and supplementary materials",
        "Ensure all figures are embedded or uploaded separately",
        "Use clear, descriptive filenames"
      ]
    },
    1: {
      title: "Manuscript Details Requirements",
      items: [
        "Title should be concise and descriptive (max 150 characters)",
        "Abstract must be 100-3000 characters",
        "Provide 3-8 relevant keywords",
        "Select appropriate research category",
        "Include funding information if applicable"
      ]
    },
    2: {
      title: "Author Information Guidelines",
      items: [
        "All authors must provide complete affiliations",
        "At least one corresponding author is required",
        "ORCID IDs are recommended for all authors",
        "Ensure email addresses are current and accessible",
        "List authors in the order they should appear"
      ]
    },
    3: {
      title: "Submission Checklist",
      items: [
        "Review all information for accuracy",
        "Ensure all required agreements are accepted",
        "Verify file uploads are complete",
        "Check author details and affiliations",
        "Confirm manuscript meets journal requirements"
      ]
    }
  };

  const currentGuideline = guidelines[currentStep] || guidelines[0];

  const formatRequirements = [
    {
      title: "Manuscript Structure",
      items: [
        "Title page with author information",
        "Abstract (structured if required)",
        "Introduction and background",
        "Methods/Methodology",
        "Results and discussion",
        "Conclusions",
        "References (journal style)",
        "Acknowledgments (if applicable)"
      ]
    },
    {
      title: "Formatting Standards",
      items: [
        "Double-spaced text throughout",
        "12-point Times New Roman font",
        "1-inch margins on all sides",
        "Line numbers for review",
        "Page numbers in header/footer",
        "Figures and tables properly labeled",
        "References in journal format"
      ]
    },
    {
      title: "Ethical Requirements",
      items: [
        "IRB approval for human subjects research",
        "Animal care committee approval if applicable",
        "Conflict of interest declarations",
        "Data availability statements",
        "Consent for publication if required",
        "Plagiarism and originality verification"
      ]
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Submission Guidelines</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </Button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Current Step Guidelines */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
            {currentGuideline.title}
          </h4>
          <ul className="space-y-2">
            {currentGuideline.items.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <Icon name="Dot" size={12} className="mr-2 mt-1 text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Format Requirements */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2 text-primary" />
            Format Requirements
          </h4>
          <div className="space-y-4">
            {formatRequirements.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h5 className="text-sm font-medium text-foreground mb-2">
                  {section.title}
                </h5>
                <ul className="space-y-1">
                  {section.items.slice(0, 3).map((item, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start">
                      <Icon name="Dot" size={10} className="mr-1 mt-1 text-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
            Quick Tips
          </h4>
          <div className="space-y-2">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-xs text-primary font-medium mb-1">Save Progress</p>
              <p className="text-xs text-muted-foreground">
                Your work is automatically saved as you progress through each step.
              </p>
            </div>
            <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
              <p className="text-xs text-success font-medium mb-1">Review Carefully</p>
              <p className="text-xs text-muted-foreground">
                Double-check all information before final submission.
              </p>
            </div>
            <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
              <p className="text-xs text-warning font-medium mb-1">Contact Support</p>
              <p className="text-xs text-muted-foreground">
                Need help? Contact editorial@journal.com for assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Journal Information */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="Info" size={16} className="mr-2 text-primary" />
            Journal Information
          </h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p><strong>Review Time:</strong> 4-6 weeks average</p>
            <p><strong>Publication Fee:</strong> $2,500 USD</p>
            <p><strong>Open Access:</strong> Available</p>
            <p><strong>Impact Factor:</strong> 4.2 (2023)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionGuidelines;