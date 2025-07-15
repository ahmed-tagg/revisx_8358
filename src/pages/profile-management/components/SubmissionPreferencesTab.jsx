import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubmissionPreferencesTab = ({ profile, onUpdate }) => {
  const [preferences, setPreferences] = useState({
    defaultManuscriptType: profile.defaultManuscriptType || 'research-article',
    preferredJournals: profile.preferredJournals || [],
    defaultKeywords: profile.defaultKeywords || [],
    autoSaveInterval: profile.autoSaveInterval || 5,
    emailNotifications: profile.emailNotifications || {
      statusUpdates: true,
      reviewerComments: true,
      deadlineReminders: true,
      coAuthorInvitations: true,
      journalUpdates: false,
      marketingEmails: false
    },
    collaborationSettings: profile.collaborationSettings || {
      allowCoAuthorSearch: true,
      shareContactInfo: false,
      autoAcceptInvitations: false,
      requireApprovalForSubmissions: true
    },
    privacySettings: profile.privacySettings || {
      profileVisibility: 'public',
      showPublications: true,
      showAffiliation: true,
      showContactInfo: false
    }
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const manuscriptTypes = [
    { value: 'research-article', label: 'Research Article' },
    { value: 'review', label: 'Review Article' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'short-communication', label: 'Short Communication' },
    { value: 'letter', label: 'Letter to Editor' },
    { value: 'editorial', label: 'Editorial' }
  ];

  const journalOptions = [
    { id: 1, name: 'Nature', category: 'Multidisciplinary' },
    { id: 2, name: 'Science', category: 'Multidisciplinary' },
    { id: 3, name: 'Cell', category: 'Life Sciences' },
    { id: 4, name: 'The Lancet', category: 'Medicine' },
    { id: 5, name: 'IEEE Transactions', category: 'Engineering' },
    { id: 6, name: 'PLOS ONE', category: 'Multidisciplinary' }
  ];

  const handlePreferenceChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSimplePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !preferences.defaultKeywords.includes(newKeyword.trim())) {
      setPreferences(prev => ({
        ...prev,
        defaultKeywords: [...prev.defaultKeywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setPreferences(prev => ({
      ...prev,
      defaultKeywords: prev.defaultKeywords.filter(k => k !== keyword)
    }));
  };

  const handleJournalToggle = (journal) => {
    const isSelected = preferences.preferredJournals.some(j => j.id === journal.id);
    if (isSelected) {
      setPreferences(prev => ({
        ...prev,
        preferredJournals: prev.preferredJournals.filter(j => j.id !== journal.id)
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        preferredJournals: [...prev.preferredJournals, journal]
      }));
    }
  };

  const handleSave = () => {
    onUpdate(preferences);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Submission Preferences</h2>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Icon name="Edit2" size={16} className="mr-2" />
            Edit Preferences
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="default" onClick={handleSave}>
              <Icon name="Check" size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <Icon name="X" size={16} className="mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Default Manuscript Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Default Manuscript Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Default Manuscript Type</label>
            <select
              value={preferences.defaultManuscriptType}
              onChange={(e) => handleSimplePreferenceChange('defaultManuscriptType', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
            >
              {manuscriptTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Auto-save Interval (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={preferences.autoSaveInterval}
              onChange={(e) => handleSimplePreferenceChange('autoSaveInterval', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Default Keywords</label>
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add default keyword"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleAddKeyword}>
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {preferences.defaultKeywords.length > 0 ? (
                preferences.defaultKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {keyword}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="text-primary hover:text-primary/70"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">No default keywords set</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preferred Journals */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="BookOpen" size={20} />
          Preferred Journals
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journalOptions.map(journal => (
            <div key={journal.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{journal.name}</p>
                <p className="text-sm text-muted-foreground">{journal.category}</p>
              </div>
              <Checkbox
                checked={preferences.preferredJournals.some(j => j.id === journal.id)}
                onChange={() => isEditing && handleJournalToggle(journal)}
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Bell" size={20} />
          Email Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Manuscript Status Updates</p>
              <p className="text-sm text-muted-foreground">Get notified when your manuscript status changes</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications.statusUpdates}
              onChange={(e) => isEditing && handlePreferenceChange('emailNotifications', 'statusUpdates', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Reviewer Comments</p>
              <p className="text-sm text-muted-foreground">Receive notifications for new reviewer feedback</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications.reviewerComments}
              onChange={(e) => isEditing && handlePreferenceChange('emailNotifications', 'reviewerComments', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Deadline Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminders for upcoming submission deadlines</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications.deadlineReminders}
              onChange={(e) => isEditing && handlePreferenceChange('emailNotifications', 'deadlineReminders', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Co-author Invitations</p>
              <p className="text-sm text-muted-foreground">Notifications for collaboration invitations</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications.coAuthorInvitations}
              onChange={(e) => isEditing && handlePreferenceChange('emailNotifications', 'coAuthorInvitations', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Journal Updates</p>
              <p className="text-sm text-muted-foreground">Updates from journals you've submitted to</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications.journalUpdates}
              onChange={(e) => isEditing && handlePreferenceChange('emailNotifications', 'journalUpdates', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Collaboration Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} />
          Collaboration Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Allow Co-author Search</p>
              <p className="text-sm text-muted-foreground">Let others find you for collaboration opportunities</p>
            </div>
            <Checkbox
              checked={preferences.collaborationSettings.allowCoAuthorSearch}
              onChange={(e) => isEditing && handlePreferenceChange('collaborationSettings', 'allowCoAuthorSearch', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Share Contact Information</p>
              <p className="text-sm text-muted-foreground">Share your contact details with co-authors</p>
            </div>
            <Checkbox
              checked={preferences.collaborationSettings.shareContactInfo}
              onChange={(e) => isEditing && handlePreferenceChange('collaborationSettings', 'shareContactInfo', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Require Approval for Submissions</p>
              <p className="text-sm text-muted-foreground">Require your approval before co-authors can submit</p>
            </div>
            <Checkbox
              checked={preferences.collaborationSettings.requireApprovalForSubmissions}
              onChange={(e) => isEditing && handlePreferenceChange('collaborationSettings', 'requireApprovalForSubmissions', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Profile Visibility</label>
            <select
              value={preferences.privacySettings.profileVisibility}
              onChange={(e) => isEditing && handlePreferenceChange('privacySettings', 'profileVisibility', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="academic">Academic Only - Visible to verified academics</option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show Publications</p>
              <p className="text-sm text-muted-foreground">Display your publication history on your profile</p>
            </div>
            <Checkbox
              checked={preferences.privacySettings.showPublications}
              onChange={(e) => isEditing && handlePreferenceChange('privacySettings', 'showPublications', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show Affiliation</p>
              <p className="text-sm text-muted-foreground">Display your institutional affiliation</p>
            </div>
            <Checkbox
              checked={preferences.privacySettings.showAffiliation}
              onChange={(e) => isEditing && handlePreferenceChange('privacySettings', 'showAffiliation', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPreferencesTab;