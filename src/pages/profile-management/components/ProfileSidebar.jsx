import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const ProfileSidebar = ({ profile }) => {
  const profileCompletionItems = [
    { label: 'Basic Information', completed: true, weight: 20 },
    { label: 'Academic Credentials', completed: profile.orcidId ? true : false, weight: 25 },
    { label: 'Research Interests', completed: profile.researchInterests?.length > 0, weight: 15 },
    { label: 'Publication History', completed: true, weight: 20 },
    { label: 'CV Upload', completed: profile.currentCv ? true : false, weight: 10 },
    { label: 'Preferences Set', completed: true, weight: 10 }
  ];

  const completedWeight = profileCompletionItems
    .filter(item => item.completed)
    .reduce((sum, item) => sum + item.weight, 0);

  const verificationStatus = [
    { 
      label: 'Email Verified', 
      status: profile.emailVerified ? 'verified' : 'pending',
      icon: 'Mail'
    },
    { 
      label: 'Institution Verified', 
      status: profile.institutionVerified ? 'verified' : 'pending',
      icon: 'Building'
    },
    { 
      label: 'ORCID Connected', 
      status: profile.orcidId ? 'verified' : 'not-connected',
      icon: 'Award'
    },
    { 
      label: 'Phone Verified', 
      status: profile.phoneVerified ? 'verified' : 'pending',
      icon: 'Phone'
    }
  ];

  const quickLinks = [
    { label: 'Submit New Manuscript', path: '/manuscript-submission', icon: 'FileText' },
    { label: 'View My Manuscripts', path: '/manuscript-status-tracking', icon: 'Files' },
    { label: 'Browse Library', path: '/manuscript-library', icon: 'Library' },
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'not-connected':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'not-connected':
        return 'AlertCircle';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} />
          Profile Completion
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-medium text-foreground">{completedWeight}%</span>
          </div>
          
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completedWeight}%` }}
            />
          </div>
          
          <div className="space-y-2">
            {profileCompletionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={item.completed ? 'CheckCircle' : 'Circle'} 
                    size={14} 
                    className={item.completed ? 'text-success' : 'text-muted-foreground'}
                  />
                  <span className={item.completed ? 'text-foreground' : 'text-muted-foreground'}>
                    {item.label}
                  </span>
                </div>
                <span className="text-muted-foreground">{item.weight}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Verification Status
        </h3>
        
        <div className="space-y-3">
          {verificationStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name={item.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon 
                  name={getStatusIcon(item.status)} 
                  size={14} 
                  className={getStatusColor(item.status)}
                />
                <span className={`text-xs capitalize ${getStatusColor(item.status)}`}>
                  {item.status === 'not-connected' ? 'Not Connected' : item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Zap" size={20} />
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center gap-3 p-3 rounded-lg text-sm text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name={link.icon} size={16} className="text-muted-foreground" />
              <span>{link.label}</span>
              <Icon name="ChevronRight" size={14} className="ml-auto text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Activity" size={20} />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-foreground">Profile updated</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-foreground">New manuscript submitted</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-foreground">Review invitation received</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            <Icon name="Eye" size={16} className="mr-2" />
            View All Activity
          </Button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="HelpCircle" size={20} />
          Help & Support
        </h3>
        
        <div className="space-y-3">
          <Button variant="ghost" size="sm" fullWidth className="justify-start">
            <Icon name="Book" size={16} className="mr-2" />
            Profile Guide
          </Button>
          
          <Button variant="ghost" size="sm" fullWidth className="justify-start">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Contact Support
          </Button>
          
          <Button variant="ghost" size="sm" fullWidth className="justify-start">
            <Icon name="FileText" size={16} className="mr-2" />
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;