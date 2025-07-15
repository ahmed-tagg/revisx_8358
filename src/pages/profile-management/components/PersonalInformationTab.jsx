import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInformationTab = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: profile.email,
    phone: profile.phone,
    alternateEmail: profile.alternateEmail,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipCode: profile.zipCode,
    country: profile.country,
    department: profile.department,
    position: profile.position,
    officeAddress: profile.officeAddress,
    officePhone: profile.officePhone,
    website: profile.website,
    linkedIn: profile.linkedIn,
    twitter: profile.twitter,
    researchGate: profile.researchGate
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      email: profile.email,
      phone: profile.phone,
      alternateEmail: profile.alternateEmail,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      zipCode: profile.zipCode,
      country: profile.country,
      department: profile.department,
      position: profile.position,
      officeAddress: profile.officeAddress,
      officePhone: profile.officePhone,
      website: profile.website,
      linkedIn: profile.linkedIn,
      twitter: profile.twitter,
      researchGate: profile.researchGate
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Personal Information</h2>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Icon name="Edit2" size={16} className="mr-2" />
            Edit Information
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="default" onClick={handleSave}>
              <Icon name="Check" size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <Icon name="X" size={16} className="mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="User" size={20} />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Primary Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Alternate Email"
            type="email"
            value={formData.alternateEmail}
            onChange={(e) => handleInputChange('alternateEmail', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            disabled={!isEditing}
            placeholder="https://your-website.com"
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPin" size={20} />
          Address Information
        </h3>
        <div className="space-y-4">
          <Input
            label="Street Address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="State/Province"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="ZIP/Postal Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <Input
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Building" size={20} />
          Professional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Position/Title"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Office Address"
            value={formData.officeAddress}
            onChange={(e) => handleInputChange('officeAddress', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Office Phone"
            type="tel"
            value={formData.officePhone}
            onChange={(e) => handleInputChange('officePhone', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Social Media & Professional Networks */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Globe" size={20} />
          Professional Networks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn Profile"
            value={formData.linkedIn}
            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
            disabled={!isEditing}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="Twitter Handle"
            value={formData.twitter}
            onChange={(e) => handleInputChange('twitter', e.target.value)}
            disabled={!isEditing}
            placeholder="@username"
          />
          <Input
            label="ResearchGate Profile"
            value={formData.researchGate}
            onChange={(e) => handleInputChange('researchGate', e.target.value)}
            disabled={!isEditing}
            placeholder="https://researchgate.net/profile/username"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationTab;