import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onAvatarChange, onBasicInfoEdit }) => {
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    title: profile.title,
    institution: profile.institution
  });

  const handleBasicInfoSave = () => {
    onBasicInfoEdit(basicInfo);
    setIsEditingBasic(false);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-background shadow-lg">
              <Image
                src={profile.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Basic Info Section */}
          <div className="flex-1">
            {!isEditingBasic ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-heading font-semibold text-foreground">
                    {profile.title} {profile.firstName} {profile.lastName}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingBasic(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="Edit2" size={16} />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Building" size={16} />
                  <span>{profile.institution}</span>
                  {profile.institutionVerified && (
                    <div className="flex items-center gap-1 text-success">
                      <Icon name="CheckCircle" size={14} />
                      <span className="text-xs">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Mail" size={16} />
                  <span>{profile.email}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                    <select
                      value={basicInfo.title}
                      onChange={(e) => setBasicInfo({...basicInfo, title: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                    <input
                      type="text"
                      value={basicInfo.firstName}
                      onChange={(e) => setBasicInfo({...basicInfo, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                    <input
                      type="text"
                      value={basicInfo.lastName}
                      onChange={(e) => setBasicInfo({...basicInfo, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Institution</label>
                    <input
                      type="text"
                      value={basicInfo.institution}
                      onChange={(e) => setBasicInfo({...basicInfo, institution: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" onClick={handleBasicInfoSave}>
                    <Icon name="Check" size={16} className="mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditingBasic(false)}>
                    <Icon name="X" size={16} className="mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 lg:text-right">
          <div className="text-center lg:text-right">
            <div className="text-2xl font-heading font-semibold text-foreground">{profile.manuscriptsSubmitted}</div>
            <div className="text-sm text-muted-foreground">Manuscripts</div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-2xl font-heading font-semibold text-foreground">{profile.publicationsCount}</div>
            <div className="text-sm text-muted-foreground">Publications</div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-2xl font-heading font-semibold text-foreground">{profile.reviewsCompleted}</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;