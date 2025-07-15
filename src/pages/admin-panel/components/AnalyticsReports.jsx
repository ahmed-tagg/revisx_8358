import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import TrendChart from './TrendChart';

const AnalyticsReports = ({ analyticsData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('submissions');

  const periodOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  const metricOptions = [
    { value: 'submissions', label: 'Submissions' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'decisions', label: 'Editorial Decisions' },
    { value: 'users', label: 'User Registrations' }
  ];

  const reportTypes = [
    {
      id: 'submission_summary',
      title: 'Submission Summary Report',
      description: 'Comprehensive overview of all manuscript submissions',
      icon: 'FileText',
      color: 'text-blue-600'
    },
    {
      id: 'reviewer_performance',
      title: 'Reviewer Performance Report',
      description: 'Analysis of reviewer activity and response times',
      icon: 'Users',
      color: 'text-green-600'
    },
    {
      id: 'editorial_metrics',
      title: 'Editorial Metrics Report',
      description: 'Editorial decision patterns and processing times',
      icon: 'BarChart3',
      color: 'text-purple-600'
    },
    {
      id: 'financial_summary',
      title: 'Financial Summary Report',
      description: 'Revenue from submission fees and payment tracking',
      icon: 'DollarSign',
      color: 'text-orange-600'
    }
  ];

  const keyMetrics = [
    {
      label: 'Total Submissions',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase'
    },
    {
      label: 'Avg. Review Time',
      value: '18 days',
      change: '-2.3 days',
      changeType: 'decrease'
    },
    {
      label: 'Acceptance Rate',
      value: '34.2%',
      change: '+1.8%',
      changeType: 'increase'
    },
    {
      label: 'Active Reviewers',
      value: '89',
      change: '+7',
      changeType: 'increase'
    }
  ];

  const submissionTrendData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 },
    { name: 'Jul', value: 73 }
  ];

  const reviewTimeData = [
    { name: 'Week 1', value: 22 },
    { name: 'Week 2', value: 19 },
    { name: 'Week 3', value: 18 },
    { name: 'Week 4', value: 16 }
  ];

  const handleExportReport = (reportType) => {
    console.log('Exporting report:', reportType);
    // Simulate export functionality
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-full sm:w-40"
          />
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-full sm:w-48"
          />
        </div>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={() => handleExportReport('current_view')}
        >
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">{metric.label}</h4>
              <div className={`flex items-center space-x-1 ${
                metric.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span className="text-xs font-medium">{metric.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart
          title="Submission Trends"
          data={submissionTrendData}
          type="line"
          color="#1E3A8A"
        />
        <TrendChart
          title="Average Review Time"
          data={reviewTimeData}
          type="bar"
          color="#059669"
        />
      </div>

      {/* Report Generation */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Generate Reports</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create detailed reports for editorial board and stakeholders
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-muted ${report.color}`}>
                      <Icon name={report.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{report.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleExportReport(report.id)}
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Detailed Statistics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Submission Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Under Review</span>
                  <span className="font-medium text-foreground">342</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accepted</span>
                  <span className="font-medium text-foreground">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rejected</span>
                  <span className="font-medium text-foreground">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revision Requested</span>
                  <span className="font-medium text-foreground">67</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">User Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Authors</span>
                  <span className="font-medium text-foreground">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Reviewers</span>
                  <span className="font-medium text-foreground">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Registrations</span>
                  <span className="font-medium text-foreground">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Login Sessions</span>
                  <span className="font-medium text-foreground">2,567</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Processing Time</span>
                  <span className="font-medium text-foreground">18 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">First Response Time</span>
                  <span className="font-medium text-foreground">3 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Review Completion Rate</span>
                  <span className="font-medium text-foreground">94%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">System Uptime</span>
                  <span className="font-medium text-foreground">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;