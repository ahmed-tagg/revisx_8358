import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInformationTab from './components/PersonalInformationTab';
import AcademicCredentialsTab from './components/AcademicCredentialsTab';
import SubmissionPreferencesTab from './components/SubmissionPreferencesTab';
import AccountSecurityTab from './components/AccountSecurityTab';
import ProfileSidebar from './components/ProfileSidebar';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'Dr.',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    alternateEmail: 'sarah.j.research@gmail.com',
    address: '123 Academic Lane',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94102',
    country: 'United States',
    institution: 'Stanford University',
    department: 'Computer Science',
    position: 'Associate Professor',
    officeAddress: 'Gates Building, Room 392',
    officePhone: '+1 (650) 723-2300',
    website: 'https://cs.stanford.edu/~sjohnson',
    linkedIn: 'https://linkedin.com/in/sarah-johnson-cs',
    twitter: '@SarahJohnsonCS',
    researchGate: 'https://researchgate.net/profile/Sarah-Johnson-42',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    manuscriptsSubmitted: 24,
    publicationsCount: 47,
    reviewsCompleted: 18,
    institutionVerified: true,
    emailVerified: true,
    phoneVerified: false,
    orcidId: '0000-0002-1825-0097',
    researchInterests: [
      'Machine Learning',
      'Artificial Intelligence',
      'Computer Vision',
      'Natural Language Processing',
      'Deep Learning',
      'Biomedical Informatics'
    ],
    currentCv: {
      filename: 'Sarah_Johnson_CV_2024.pdf',
      uploadDate: 'December 15, 2024'
    },
    defaultManuscriptType: 'research-article',
    preferredJournals: [
      { id: 1, name: 'Nature', category: 'Multidisciplinary' },
      { id: 3, name: 'Cell', category: 'Life Sciences' },
      { id: 5, name: 'IEEE Transactions', category: 'Engineering' }
    ],
    defaultKeywords: ['Machine Learning', 'AI', 'Computer Vision'],
    autoSaveInterval: 5,
    emailNotifications: {
      statusUpdates: true,
      reviewerComments: true,
      deadlineReminders: true,
      coAuthorInvitations: true,
      journalUpdates: false,
      marketingEmails: false
    },
    collaborationSettings: {
      allowCoAuthorSearch: true,
      shareContactInfo: false,
      autoAcceptInvitations: false,
      requireApprovalForSubmissions: true
    },
    privacySettings: {
      profileVisibility: 'public',
      showPublications: true,
      showAffiliation: true,
      showContactInfo: false
    },
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: 'User' },
    { id: 'academic', label: 'Academic Credentials', icon: 'GraduationCap' },
    { id: 'preferences', label: 'Submission Preferences', icon: 'Settings' },
    { id: 'security', label: 'Account Security', icon: 'Shield' }
  ];

  const handleProfileUpdate = (updates) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleAvatarChange = (newAvatar) => {
    setProfile(prev => ({
      ...prev,
      avatar: newAvatar
    }));
  };

  const handleBasicInfoEdit = (basicInfo) => {
    setProfile(prev => ({
      ...prev,
      ...basicInfo
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInformationTab
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'academic':
        return (
          <AcademicCredentialsTab
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'preferences':
        return (
          <SubmissionPreferencesTab
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'security':
        return (
          <AccountSecurityTab
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-60 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            onAvatarChange={handleAvatarChange}
            onBasicInfoEdit={handleBasicInfoEdit}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-surface border border-border rounded-lg mb-6">
                <div className="flex flex-wrap border-b border-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-surface border border-border rounded-lg p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <ProfileSidebar profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;