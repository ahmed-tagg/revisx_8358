import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SummaryCard from './components/SummaryCard';
import ManuscriptTable from './components/ManuscriptTable';
import ActivityTimeline from './components/ActivityTimeline';
import StatusFilterTabs from './components/StatusFilterTabs';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredManuscripts, setFilteredManuscripts] = useState([]);

  // Mock data for manuscripts
  const manuscripts = [
    {
      id: 'ms-001',
      title: 'Machine Learning Approaches for Predicting Protein-Protein Interactions in Alzheimer\'s Disease',
      authors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'],
      journal: 'Nature Neuroscience',
      category: 'Research Article',
      submissionDate: '2025-06-15T10:30:00Z',
      daysAgo: 26,
      status: 'Under Review',
      deadline: '2025-07-25T23:59:59Z'
    },
    {
      id: 'ms-002',
      title: 'CRISPR-Cas9 Gene Editing Efficiency in Human Embryonic Stem Cells: A Comparative Study',
      authors: ['Dr. Sarah Johnson', 'Dr. James Wilson'],
      journal: 'Cell Stem Cell',
      category: 'Original Research',
      submissionDate: '2025-06-01T14:20:00Z',
      daysAgo: 40,
      status: 'Revision Requested',
      deadline: '2025-07-20T23:59:59Z'
    },
    {
      id: 'ms-003',
      title: 'Novel Biomarkers for Early Detection of Pancreatic Cancer Using Liquid Biopsy Techniques',
      authors: ['Dr. Sarah Johnson', 'Dr. Lisa Park', 'Dr. Robert Kim'],
      journal: 'Journal of Clinical Oncology',
      category: 'Clinical Study',
      submissionDate: '2025-05-20T09:15:00Z',
      daysAgo: 52,
      status: 'Accepted'
    },
    {
      id: 'ms-004',
      title: 'Quantum Computing Applications in Drug Discovery: Current State and Future Prospects',
      authors: ['Dr. Sarah Johnson'],
      journal: 'Nature Reviews Drug Discovery',
      category: 'Review Article',
      submissionDate: '2025-05-10T16:45:00Z',
      daysAgo: 62,
      status: 'Published'
    },
    {
      id: 'ms-005',
      title: 'Environmental Impact of Microplastics on Marine Ecosystems: A Meta-Analysis',
      authors: ['Dr. Sarah Johnson', 'Dr. Maria Santos', 'Dr. David Thompson'],
      journal: 'Environmental Science & Technology',
      category: 'Research Article',
      submissionDate: '2025-07-05T11:30:00Z',
      daysAgo: 6,
      status: 'Submitted'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 'act-001',
      type: 'review',
      title: 'Reviewer assigned',
      description: 'Dr. Michael Thompson has been assigned as a reviewer',
      manuscriptTitle: 'Machine Learning Approaches for Predicting Protein-Protein Interactions',
      timestamp: '2025-07-11T10:30:00Z'
    },
    {
      id: 'act-002',
      type: 'revision',
      title: 'Revision deadline reminder',
      description: 'Revision due in 9 days',
      manuscriptTitle: 'CRISPR-Cas9 Gene Editing Efficiency in Human Embryonic Stem Cells',
      timestamp: '2025-07-11T08:15:00Z'
    },
    {
      id: 'act-003',
      type: 'acceptance',
      title: 'Manuscript accepted',
      description: 'Congratulations! Your manuscript has been accepted for publication',
      manuscriptTitle: 'Novel Biomarkers for Early Detection of Pancreatic Cancer',
      timestamp: '2025-07-10T16:20:00Z'
    },
    {
      id: 'act-004',
      type: 'submission',
      title: 'New submission received',
      description: 'Your manuscript has been successfully submitted',
      manuscriptTitle: 'Environmental Impact of Microplastics on Marine Ecosystems',
      timestamp: '2025-07-05T11:35:00Z'
    },
    {
      id: 'act-005',
      type: 'publication',
      title: 'Article published',
      description: 'Your article is now available online',
      manuscriptTitle: 'Quantum Computing Applications in Drug Discovery',
      timestamp: '2025-07-01T14:00:00Z'
    }
  ];

  // Calculate status counts
  const statusCounts = {
    all: manuscripts.length,
    inProgress: manuscripts.filter(m => ['Submitted', 'Under Review'].includes(m.status)).length,
    underReview: manuscripts.filter(m => m.status === 'Under Review').length,
    revisionRequested: manuscripts.filter(m => m.status === 'Revision Requested').length,
    completed: manuscripts.filter(m => ['Accepted', 'Published'].includes(m.status)).length
  };

  // Filter manuscripts based on active tab
  useEffect(() => {
    let filtered = manuscripts;
    
    switch (activeTab) {
      case 'in-progress':
        filtered = manuscripts.filter(m => ['Submitted', 'Under Review'].includes(m.status));
        break;
      case 'under-review':
        filtered = manuscripts.filter(m => m.status === 'Under Review');
        break;
      case 'revision-requested':
        filtered = manuscripts.filter(m => m.status === 'Revision Requested');
        break;
      case 'completed':
        filtered = manuscripts.filter(m => ['Accepted', 'Published'].includes(m.status));
        break;
      default:
        filtered = manuscripts;
    }
    
    setFilteredManuscripts(filtered);
  }, [activeTab]);

  const handleManuscriptAction = (action, manuscriptId) => {
    console.log(`Action: ${action} for manuscript: ${manuscriptId}`);
    // Handle different actions here
    switch (action) {
      case 'view':
        // Navigate to manuscript details
        break;
      case 'edit':
        // Navigate to edit form
        break;
      case 'upload-revision':
        // Navigate to revision upload
        break;
      case 'download':
        // Download manuscript
        break;
      case 'withdraw':
        // Withdraw manuscript
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      
      <main className="lg:pl-60 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, Dr. Sarah Johnson. Here's an overview of your manuscript submissions.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Data
                </Button>
                <Button asChild>
                  <Link to="/manuscript-submission">
                    <Icon name="Plus" size={16} className="mr-2" />
                    New Submission
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="xl:col-span-8 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                  title="Total Submissions"
                  value="12"
                  subtitle="All time"
                  icon="FileText"
                  trend="up"
                  trendValue="2 new"
                />
                <SummaryCard
                  title="Acceptance Rate"
                  value="75%"
                  subtitle="Last 12 months"
                  icon="TrendingUp"
                  trend="up"
                  trendValue="5%"
                />
                <SummaryCard
                  title="Avg Review Time"
                  value="45 days"
                  subtitle="Current submissions"
                  icon="Clock"
                  trend="down"
                  trendValue="3 days"
                />
                <SummaryCard
                  title="Active Reviews"
                  value="3"
                  subtitle="In progress"
                  icon="Eye"
                />
              </div>

              {/* Manuscripts Section */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recent Manuscripts</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Track the status of your submitted manuscripts
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to="/manuscript-library">
                        View All
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <StatusFilterTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  statusCounts={statusCounts}
                  className="px-6"
                />

                <ManuscriptTable
                  manuscripts={filteredManuscripts}
                  onActionClick={handleManuscriptAction}
                />
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* Activity Timeline */}
              <ActivityTimeline activities={recentActivities} />

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                  <p className="text-sm text-gray-500 mt-1">Important dates to remember</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Revision Due</p>
                        <p className="text-sm text-gray-500">CRISPR-Cas9 Gene Editing Efficiency</p>
                        <p className="text-sm text-orange-600 font-medium">July 20, 2025 (9 days)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Review Deadline</p>
                        <p className="text-sm text-gray-500">Machine Learning Approaches</p>
                        <p className="text-sm text-yellow-600 font-medium">July 25, 2025 (14 days)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;