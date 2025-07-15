import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ManuscriptHeader from './components/ManuscriptHeader';
import StatusTimeline from './components/StatusTimeline';
import ReviewComments from './components/ReviewComments';
import VersionHistory from './components/VersionHistory';
import Communications from './components/Communications';
import ActionsPanel from './components/ActionsPanel';
import StatusSidebar from './components/StatusSidebar';

const ManuscriptStatusTracking = () => {
  const { manuscriptId } = useParams();
  const [activeTab, setActiveTab] = useState('timeline');
  const [manuscript, setManuscript] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockManuscript = {
    id: "MS-2024-0789",
    title: "Novel Approaches to Machine Learning in Biomedical Data Analysis: A Comprehensive Study",
    authors: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Rodriguez"],
    journal: "Journal of Computational Biology",
    submissionDate: "March 15, 2024",
    status: "Revision Requested",
    daysInReview: 45,
    expectedDecision: "April 30, 2024",
    unreadNotifications: 2,
    category: "Research Article",
    wordCount: 8500,
    pages: 24
  };

  const mockTimeline = [
    {
      title: "Manuscript Submitted",
      description: "Your manuscript has been successfully submitted and assigned a tracking number.",
      date: "March 15, 2024",
      isCompleted: true,
      isCurrent: false,
      responsibleParty: "System",
      details: "Initial submission received with all required documents. Plagiarism check completed successfully."
    },
    {
      title: "Editorial Review",
      description: "The editor is conducting an initial review to assess manuscript fit and quality.",
      date: "March 18, 2024",
      isCompleted: true,
      isCurrent: false,
      responsibleParty: "Dr. Amanda Wilson (Editor-in-Chief)",
      details: "Manuscript passed initial editorial screening. Assigned to Associate Editor Dr. James Park."
    },
    {
      title: "Peer Review Assignment",
      description: "Manuscript has been sent to qualified peer reviewers for detailed evaluation.",
      date: "March 22, 2024",
      isCompleted: true,
      isCurrent: false,
      responsibleParty: "Dr. James Park (Associate Editor)",
      details: "Three reviewers assigned: Reviewer 1 (Accepted), Reviewer 2 (Accepted), Reviewer 3 (Pending response)"
    },
    {
      title: "Peer Review in Progress",
      description: "Reviewers are currently evaluating your manuscript.",
      date: "March 25, 2024",
      isCompleted: true,
      isCurrent: false,
      responsibleParty: "Peer Reviewers",
      details: "Review deadline: April 15, 2024. Current status: 2 of 3 reviews completed."
    },
    {
      title: "Reviews Completed",
      description: "All peer reviews have been submitted and are being evaluated by the editor.",
      date: "April 12, 2024",
      isCompleted: true,
      isCurrent: false,
      responsibleParty: "Peer Reviewers",
      details: "All three reviews received. Overall recommendation: Minor Revisions Required."
    },
    {
      title: "Editorial Decision",
      description: "The editor has made a decision based on the peer review feedback.",
      date: "April 15, 2024",
      isCompleted: true,
      isCurrent: true,
      responsibleParty: "Dr. James Park (Associate Editor)",
      details: "Decision: Revision Required. Please address reviewer comments and resubmit within 30 days.",
      actions: [
        { label: "View Decision Letter", onClick: () => {} },
        { label: "Download Reviews", onClick: () => {} }
      ]
    },
    {
      title: "Revision Submission",
      description: "Submit your revised manuscript addressing all reviewer comments.",
      date: "Pending",
      isCompleted: false,
      isCurrent: false,
      responsibleParty: "Author",
      details: "Revision deadline: May 15, 2024. Please include a detailed response letter."
    },
    {
      title: "Final Decision",
      description: "The editor will make the final decision on your revised manuscript.",
      date: "Pending",
      isCompleted: false,
      isCurrent: false,
      responsibleParty: "Editorial Team",
      details: "Expected timeline: 2-3 weeks after revision submission."
    }
  ];

  const mockReviewComments = [
    {
      id: 1,
      reviewer: "Reviewer 1",
      reviewerId: 1,
      date: "April 10, 2024",
      rating: 4,
      title: "Strong methodology with minor concerns",
      content: `This manuscript presents a comprehensive study on machine learning applications in biomedical data analysis. The methodology is sound and the results are promising.

Strengths:
- Novel approach to feature selection
- Comprehensive dataset analysis
- Clear presentation of results

Areas for improvement:
- Statistical analysis could be more robust
- Discussion section needs expansion
- Some figures need better resolution

Overall, this is a solid contribution that merits publication after minor revisions.`,
      isConfidential: false,
      attachments: [
        { name: "detailed_comments.pdf", size: "245 KB" },
        { name: "suggested_references.txt", size: "12 KB" }
      ],
      replies: [
        {
          author: "Dr. Sarah Johnson",
          date: "April 16, 2024",
          content: "Thank you for the detailed review. We have addressed all your concerns in the revised manuscript."
        }
      ]
    },
    {
      id: 2,
      reviewer: "Reviewer 2",
      reviewerId: 2,
      date: "April 11, 2024",
      rating: 3,
      title: "Interesting work but needs significant improvements",
      content: `The paper addresses an important topic in computational biology. However, several issues need to be addressed before publication.

Major concerns:
- The validation methodology is insufficient
- Comparison with existing methods is limited
- Some claims are not well supported by data

Minor issues:
- Typos and grammatical errors throughout
- Figure captions need improvement
- References formatting inconsistent

I recommend major revisions before this manuscript can be considered for publication.`,
      isConfidential: false,
      attachments: [],
      replies: []
    },
    {
      id: 3,
      reviewer: "Reviewer 3",
      reviewerId: 3,
      date: "April 12, 2024",
      rating: 5,
      title: "Excellent contribution to the field",
      content: `This is an outstanding piece of work that makes significant contributions to machine learning in biomedical applications.

The authors have:
- Developed innovative algorithms
- Provided thorough experimental validation
- Presented results clearly and comprehensively

I have only minor suggestions for improvement:
- Add more discussion on computational complexity
- Include additional case studies
- Consider discussing limitations more thoroughly

I strongly recommend acceptance after minor revisions.`,
      isConfidential: false,
      attachments: [
        { name: "minor_suggestions.docx", size: "89 KB" }
      ],
      replies: []
    }
  ];

  const mockVersions = [
    {
      id: 1,
      version: "1.1",
      type: "revision",
      description: "Revised manuscript addressing reviewer comments",
      uploadDate: "April 20, 2024",
      uploadedBy: "Dr. Sarah Johnson",
      fileSize: 2456789,
      canCompare: true,
      changes: [
        "Enhanced statistical analysis in Section 3.2",
        "Expanded discussion section with additional references",
        "Improved figure resolution and captions",
        "Added computational complexity analysis"
      ],
      files: [
        { name: "manuscript_v1.1.pdf", size: 2456789 },
        { name: "response_to_reviewers.pdf", size: 345678 },
        { name: "supplementary_data.xlsx", size: 1234567 }
      ]
    },
    {
      id: 2,
      version: "1.0",
      type: "initial",
      description: "Initial manuscript submission",
      uploadDate: "March 15, 2024",
      uploadedBy: "Dr. Sarah Johnson",
      fileSize: 2234567,
      canCompare: true,
      changes: [],
      files: [
        { name: "manuscript_v1.0.pdf", size: 2234567 },
        { name: "cover_letter.pdf", size: 123456 }
      ]
    }
  ];

  const mockCommunications = [
    {
      id: 1,
      type: "received",
      subject: "Decision on Manuscript MS-2024-0789: Revision Required",
      from: "Dr. James Park <j.park@journal.com>",
      to: "Dr. Sarah Johnson <s.johnson@university.edu>",
      date: "April 15, 2024 2:30 PM",
      content: `Dear Dr. Johnson,

Thank you for submitting your manuscript titled "Novel Approaches to Machine Learning in Biomedical Data Analysis: A Comprehensive Study" to the Journal of Computational Biology.

After careful consideration and peer review, we have decided that your manuscript requires revision before it can be accepted for publication.

The reviewers have provided detailed feedback that will help improve your manuscript. Please address all reviewer comments and resubmit your revised manuscript within 30 days.

Key points to address:
1. Enhance statistical analysis methodology
2. Expand discussion section
3. Improve figure quality and captions
4. Add computational complexity analysis

Please include a detailed response letter explaining how you have addressed each reviewer comment.

Best regards,
Dr. James Park
Associate Editor`,
      hasAttachments: true,
      attachments: [
        { name: "decision_letter.pdf", size: "156 KB" },
        { name: "reviewer_comments.pdf", size: "234 KB" }
      ],
      isRead: true,
      priority: "high"
    },
    {
      id: 2,
      type: "sent",
      subject: "Re: Clarification on Revision Requirements",
      from: "Dr. Sarah Johnson <s.johnson@university.edu>",
      to: "Dr. James Park <j.park@journal.com>",
      date: "April 16, 2024 10:15 AM",
      content: `Dear Dr. Park,

Thank you for the detailed feedback on our manuscript. We are committed to addressing all reviewer comments thoroughly.

I have a few clarification questions:

1. Regarding the statistical analysis enhancement - would you recommend any specific methods?
2. For the computational complexity analysis - should this be included in the main text or supplementary material?
3. What is the preferred format for the response letter?

We expect to submit the revised manuscript within the next two weeks.

Best regards,
Dr. Sarah Johnson`,
      hasAttachments: false,
      attachments: [],
      isRead: true,
      priority: "normal"
    },
    {
      id: 3,
      type: "system",
      subject: "Manuscript Submission Confirmation - MS-2024-0789",
      from: "Journal System <noreply@journal.com>",
      to: "Dr. Sarah Johnson <s.johnson@university.edu>",
      date: "March 15, 2024 4:45 PM",
      content: `Dear Dr. Johnson,

This email confirms that your manuscript has been successfully submitted to the Journal of Computational Biology.

Manuscript Details:
- Title: Novel Approaches to Machine Learning in Biomedical Data Analysis
- Manuscript ID: MS-2024-0789
- Submission Date: March 15, 2024
- Corresponding Author: Dr. Sarah Johnson

Your manuscript will undergo initial editorial screening followed by peer review. You will receive updates on the review progress via email.

You can track your manuscript status at any time using our online submission system.

Thank you for choosing our journal.

Best regards,
Journal of Computational Biology Editorial Office`,
      hasAttachments: false,
      attachments: [],
      isRead: true,
      priority: "normal"
    }
  ];

  const mockAvailableActions = [
    {
      type: "upload_revision",
      label: "Upload Revision",
      description: "Submit your revised manuscript and response letter",
      disabled: false
    },
    {
      type: "respond_to_reviewers",
      label: "Respond to Reviewers",
      description: "Provide detailed responses to reviewer comments",
      disabled: false
    },
    {
      type: "request_extension",
      label: "Request Extension",
      description: "Request additional time for revision",
      disabled: false
    },
    {
      type: "contact_editor",
      label: "Contact Editor",
      description: "Send a message to the handling editor",
      disabled: false
    },
    {
      type: "withdraw_submission",
      label: "Withdraw Submission",
      description: "Permanently withdraw your manuscript",
      disabled: false
    }
  ];

  const mockNextSteps = [
    {
      title: "Address Reviewer Comments",
      description: "Carefully review and address all feedback from the three reviewers",
      deadline: "May 15, 2024"
    },
    {
      title: "Prepare Response Letter",
      description: "Write a detailed point-by-point response to each reviewer comment",
      deadline: "May 15, 2024"
    },
    {
      title: "Upload Revised Manuscript",
      description: "Submit the revised manuscript through the online system",
      deadline: "May 15, 2024"
    }
  ];

  const mockDeadlines = [
    {
      title: "Revision Deadline",
      description: "Submit revised manuscript and response letter",
      date: "May 15, 2024",
      daysRemaining: 25
    }
  ];

  const mockQuickActions = [
    {
      label: "Download Reviews",
      icon: "Download",
      onClick: () => {},
      badge: null
    },
    {
      label: "View Guidelines",
      icon: "FileText",
      onClick: () => {},
      badge: null
    },
    {
      label: "Check Notifications",
      icon: "Bell",
      onClick: () => {},
      badge: 2
    },
    {
      label: "Export Data",
      icon: "Share",
      onClick: () => {},
      badge: null
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadManuscript = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setManuscript(mockManuscript);
      setLoading(false);
    };

    loadManuscript();
  }, [manuscriptId]);

  const handleReplyToComment = (commentId, reply) => {
    console.log('Reply to comment:', commentId, reply);
    // In real app, this would make an API call
  };

  const handleActionComplete = (actionType, data) => {
    console.log('Action completed:', actionType, data);
    // In real app, this would make an API call and update the manuscript status
  };

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'comments', label: 'Review Comments', icon: 'MessageSquare' },
    { id: 'versions', label: 'Version History', icon: 'GitBranch' },
    { id: 'communications', label: 'Communications', icon: 'Mail' },
    { id: 'actions', label: 'Actions', icon: 'Settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:ml-60 pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading manuscript details...</p>
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
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              <ManuscriptHeader manuscript={manuscript} />
              
              {/* Tab Navigation */}
              <div className="bg-surface border border-border rounded-lg">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                          ${activeTab === tab.id
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                          }
                        `}
                      >
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                
                <div className="p-6">
                  {activeTab === 'timeline' && (
                    <StatusTimeline timeline={mockTimeline} />
                  )}
                  {activeTab === 'comments' && (
                    <ReviewComments 
                      comments={mockReviewComments}
                      onReply={handleReplyToComment}
                    />
                  )}
                  {activeTab === 'versions' && (
                    <VersionHistory versions={mockVersions} />
                  )}
                  {activeTab === 'communications' && (
                    <Communications communications={mockCommunications} />
                  )}
                  {activeTab === 'actions' && (
                    <ActionsPanel 
                      manuscript={manuscript}
                      availableActions={mockAvailableActions}
                      onActionComplete={handleActionComplete}
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="xl:col-span-1">
              <StatusSidebar 
                manuscript={manuscript}
                nextSteps={mockNextSteps}
                deadlines={mockDeadlines}
                quickActions={mockQuickActions}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManuscriptStatusTracking;