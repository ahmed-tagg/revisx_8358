import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import TrendChart from './components/TrendChart';
import ManuscriptTable from './components/ManuscriptTable';
import UserManagementTable from './components/UserManagementTable';
import ActivityFeed from './components/ActivityFeed';
import PendingTasksWidget from './components/PendingTasksWidget';
import JournalConfigForm from './components/JournalConfigForm';
import AnalyticsReports from './components/AnalyticsReports';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for metrics
  const metricsData = [
    {
      title: 'Total Submissions',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Pending Reviews',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Avg. Processing Time',
      value: '18 days',
      change: '-2.3 days',
      changeType: 'decrease',
      icon: 'Timer',
      color: 'success'
    },
    {
      title: 'User Registrations',
      value: '2,456',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    }
  ];

  // Mock data for charts
  const submissionTrendData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 },
    { name: 'Jul', value: 73 }
  ];

  const processingEfficiencyData = [
    { name: 'Week 1', value: 22 },
    { name: 'Week 2', value: 19 },
    { name: 'Week 3', value: 18 },
    { name: 'Week 4', value: 16 }
  ];

  // Mock manuscripts data
  const manuscriptsData = [
    {
      id: 'MS-2024-001',
      title: 'Advanced Machine Learning Techniques for Climate Prediction',
      author: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      status: 'under_review',
      submitted_date: '2024-07-05T10:30:00Z',
      reviewer: 'Dr. Michael Chen'
    },
    {
      id: 'MS-2024-002',
      title: 'Quantum Computing Applications in Cryptography',
      author: 'Prof. David Wilson',
      email: 'david.wilson@tech.edu',
      status: 'revision_requested',
      submitted_date: '2024-07-03T14:15:00Z',
      reviewer: 'Dr. Lisa Zhang'
    },
    {
      id: 'MS-2024-003',
      title: 'Sustainable Energy Solutions for Urban Development',
      author: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@green.org',
      status: 'submitted',
      submitted_date: '2024-07-08T09:45:00Z',
      reviewer: null
    },
    {
      id: 'MS-2024-004',
      title: 'Biomedical Applications of Nanotechnology',
      author: 'Dr. James Thompson',
      email: 'james.thompson@med.edu',
      status: 'accepted',
      submitted_date: '2024-06-28T16:20:00Z',
      reviewer: 'Dr. Anna Petrov'
    },
    {
      id: 'MS-2024-005',
      title: 'Artificial Intelligence in Healthcare Diagnostics',
      author: 'Dr. Maria Garcia',
      email: 'maria.garcia@health.org',
      status: 'rejected',
      submitted_date: '2024-06-25T11:10:00Z',
      reviewer: 'Dr. Robert Kim'
    }
  ];

  // Mock users data
  const usersData = [
    {
      id: 'USR-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'author',
      status: 'active',
      institution: 'Stanford University',
      department: 'Computer Science',
      last_active: '2024-07-11T08:30:00Z',
      manuscript_count: 3
    },
    {
      id: 'USR-002',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@review.org',
      role: 'reviewer',
      status: 'active',
      institution: 'MIT',
      department: 'Artificial Intelligence Lab',
      last_active: '2024-07-10T15:45:00Z',
      manuscript_count: 0
    },
    {
      id: 'USR-003',
      name: 'Prof. David Wilson',
      email: 'david.wilson@tech.edu',
      role: 'editor',
      status: 'active',
      institution: 'Caltech',
      department: 'Physics',
      last_active: '2024-07-11T12:20:00Z',
      manuscript_count: 7
    },
    {
      id: 'USR-004',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@green.org',
      role: 'author',
      status: 'pending',
      institution: 'Green Energy Institute',
      department: 'Renewable Energy',
      last_active: '2024-07-09T10:15:00Z',
      manuscript_count: 1
    },
    {
      id: 'USR-005',
      name: 'Dr. Lisa Zhang',
      email: 'lisa.zhang@admin.edu',
      role: 'admin',
      status: 'active',
      institution: 'Journal Administration',
      department: 'Editorial Office',
      last_active: '2024-07-11T14:00:00Z',
      manuscript_count: 0
    }
  ];

  // Mock activities data
  const activitiesData = [
    {
      id: 'ACT-001',
      type: 'submission',
      user: 'Dr. Sarah Johnson',
      action: 'submitted a new manuscript',
      details: 'MS-2024-006: "Deep Learning for Medical Image Analysis"',
      timestamp: '2024-07-11T13:30:00Z',
      priority: 'normal'
    },
    {
      id: 'ACT-002',
      type: 'review',
      user: 'Dr. Michael Chen',
      action: 'completed review for manuscript',
      details: 'MS-2024-001: Recommended for acceptance with minor revisions',
      timestamp: '2024-07-11T12:15:00Z',
      priority: 'normal'
    },
    {
      id: 'ACT-003',
      type: 'status_change',
      user: 'Prof. David Wilson',
      action: 'changed manuscript status to accepted',
      details: 'MS-2024-004: Final decision made',
      timestamp: '2024-07-11T11:45:00Z',
      priority: 'high'
    },
    {
      id: 'ACT-004',
      type: 'user_registration',
      user: 'Dr. Anna Petrov',
      action: 'registered as a new reviewer',
      details: 'Specialization: Biomedical Engineering',
      timestamp: '2024-07-11T10:20:00Z',
      priority: 'normal'
    },
    {
      id: 'ACT-005',
      type: 'system',
      user: 'System',
      action: 'automated reminder sent',
      details: 'Review deadline reminder to 5 reviewers',
      timestamp: '2024-07-11T09:00:00Z',
      priority: 'normal'
    }
  ];

  // Mock pending tasks data
  const pendingTasksData = [
    {
      id: 'TASK-001',
      type: 'review_overdue',
      title: 'Overdue Review',
      description: 'MS-2024-001 review is 3 days overdue',
      priority: 'high',
      due_date: '2024-07-08T23:59:59Z'
    },
    {
      id: 'TASK-002',
      type: 'reviewer_assignment',
      title: 'Assign Reviewer',
      description: 'MS-2024-003 needs reviewer assignment',
      priority: 'medium',
      due_date: '2024-07-12T23:59:59Z'
    },
    {
      id: 'TASK-003',
      type: 'editorial_decision',
      title: 'Editorial Decision Required',
      description: 'MS-2024-002 awaiting final decision',
      priority: 'high',
      due_date: '2024-07-11T23:59:59Z'
    },
    {
      id: 'TASK-004',
      type: 'system_alert',
      title: 'System Maintenance',
      description: 'Scheduled maintenance window approaching',
      priority: 'low',
      due_date: '2024-07-15T02:00:00Z'
    }
  ];

  // Mock journal configuration
  const journalConfig = {
    journal_name: 'International Journal of Advanced Research',
    submission_guidelines: `Manuscripts should be original research articles, review papers, or technical notes.\n\nAll submissions must include:\n- Abstract (max 250 words)\n- Keywords (3-6 terms)\n- Complete author information\n- References in APA format`,
    review_criteria: `Manuscripts will be evaluated based on:\n- Originality and significance\n- Technical quality and methodology\n- Clarity of presentation\n- Relevance to journal scope`,
    max_file_size: '25',
    allowed_formats: ['pdf', 'doc', 'docx', 'tex'],
    review_deadline: '30',
    auto_acknowledgment: true,
    email_notifications: true,
    plagiarism_check: true,
    submission_fee: '150.00',
    categories: ['Computer Science', 'Engineering', 'Mathematics', 'Physics']
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'manuscripts', label: 'Manuscript Management', icon: 'FileText' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'configuration', label: 'Journal Configuration', icon: 'Settings' },
    { id: 'analytics', label: 'Analytics & Reports', icon: 'BarChart3' }
  ];

  const handleBulkAction = (action, items) => {
    console.log('Bulk action:', action, 'Items:', items);
    // Implement bulk action logic
  };

  const handleStatusUpdate = (manuscriptId, newStatus) => {
    console.log('Status update:', manuscriptId, 'New status:', newStatus);
    // Implement status update logic
  };

  const handleUserAction = (action, userIds) => {
    console.log('User action:', action, 'Users:', userIds);
    // Implement user action logic
  };

  const handleTaskAction = (action, taskId) => {
    console.log('Task action:', action, 'Task:', taskId);
    // Implement task action logic
  };

  const handleConfigSave = (configData) => {
    console.log('Saving configuration:', configData);
    // Implement configuration save logic
    return Promise.resolve();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendChart
                title="Submission Volume Trends"
                data={submissionTrendData}
                type="line"
                color="#1E3A8A"
              />
              <TrendChart
                title="Processing Efficiency"
                data={processingEfficiencyData}
                type="bar"
                color="#059669"
              />
            </div>

            {/* Recent Activity and Pending Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed activities={activitiesData} />
              <PendingTasksWidget
                tasks={pendingTasksData}
                onTaskAction={handleTaskAction}
              />
            </div>
          </div>
        );

      case 'manuscripts':
        return (
          <ManuscriptTable
            manuscripts={manuscriptsData}
            onBulkAction={handleBulkAction}
            onStatusUpdate={handleStatusUpdate}
          />
        );

      case 'users':
        return (
          <UserManagementTable
            users={usersData}
            onUserAction={handleUserAction}
          />
        );

      case 'configuration':
        return (
          <JournalConfigForm
            config={journalConfig}
            onSave={handleConfigSave}
          />
        );

      case 'analytics':
        return (
          <AnalyticsReports analyticsData={{}} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive manuscript workflow management and system administration
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Data
                </Button>
                <Button iconName="Settings" iconPosition="left">
                  System Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;