import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const AccountSecurityTab = ({ profile, onUpdate }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(profile.twoFactorEnabled || false);
  const [showQRCode, setShowQRCode] = useState(false);

  const loginActivity = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "San Francisco, CA",
      ipAddress: "192.168.1.100",
      timestamp: "2025-01-11 10:30:00",
      status: "Current Session"
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      ipAddress: "192.168.1.101",
      timestamp: "2025-01-10 15:45:00",
      status: "Active"
    },
    {
      id: 3,
      device: "Firefox on Mac",
      location: "Berkeley, CA",
      ipAddress: "10.0.0.50",
      timestamp: "2025-01-09 09:15:00",
      status: "Ended"
    },
    {
      id: 4,
      device: "Chrome on Android",
      location: "Oakland, CA",
      ipAddress: "192.168.2.25",
      timestamp: "2025-01-08 14:20:00",
      status: "Ended"
    }
  ];

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate password change
    onUpdate({ passwordChanged: true });
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
    alert('Password changed successfully');
  };

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      setTwoFactorEnabled(false);
      onUpdate({ twoFactorEnabled: false });
    }
  };

  const handleTwoFactorSetup = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    onUpdate({ twoFactorEnabled: true });
    alert('Two-factor authentication enabled successfully');
  };

  const handleLogoutDevice = (deviceId) => {
    alert(`Logged out device with ID: ${deviceId}`);
  };

  const handleLogoutAllDevices = () => {
    alert('Logged out of all devices except current session');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Current Session':
        return 'text-success';
      case 'Active':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) {
      return 'Smartphone';
    } else if (device.includes('Mac') || device.includes('Windows')) {
      return 'Monitor';
    }
    return 'Globe';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Account Security</h2>
      </div>

      {/* Password Management */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="Lock" size={20} />
            Password Management
          </h3>
          {!isChangingPassword && (
            <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
              <Icon name="Edit2" size={16} className="mr-2" />
              Change Password
            </Button>
          )}
        </div>

        {!isChangingPassword ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-foreground">Password last changed on December 15, 2024</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-foreground">Strong password requirements enabled</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              description="Must be at least 8 characters with uppercase, lowercase, number, and special character"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              required
            />
            <div className="flex gap-2">
              <Button variant="default" onClick={handlePasswordChange}>
                <Icon name="Check" size={16} className="mr-2" />
                Update Password
              </Button>
              <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                <Icon name="X" size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Two-Factor Authentication
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-success' : 'bg-muted'}`}></div>
              <div>
                <p className="font-medium text-foreground">
                  Two-Factor Authentication {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled 
                    ? 'Your account is protected with 2FA' :'Add an extra layer of security to your account'
                  }
                </p>
              </div>
            </div>
            <Button 
              variant={twoFactorEnabled ? "outline" : "default"}
              onClick={handleTwoFactorToggle}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>

          {showQRCode && (
            <div className="p-4 border border-border rounded-lg bg-muted/50">
              <h4 className="font-medium text-foreground mb-3">Setup Two-Factor Authentication</h4>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <ol className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Download an authenticator app like Google Authenticator or Authy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Scan the QR code with your authenticator app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <span>Enter the 6-digit code from your app below</span>
                    </li>
                  </ol>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 bg-white border border-border rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">QR Code</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Manual entry key:</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">ABCD EFGH IJKL MNOP</code>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Enter 6-digit code"
                  className="flex-1"
                />
                <Button variant="default" onClick={handleTwoFactorSetup}>
                  Verify & Enable
                </Button>
                <Button variant="outline" onClick={() => setShowQRCode(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {twoFactorEnabled && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-foreground">Backup codes generated and saved</span>
                <Button variant="ghost" size="sm">
                  <Icon name="Download" size={14} className="mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Smartphone" size={16} className="text-primary" />
                <span className="text-foreground">Authenticator app configured</span>
                <Button variant="ghost" size="sm">
                  <Icon name="RefreshCw" size={14} className="mr-1" />
                  Reconfigure
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="Activity" size={20} />
            Login Activity
          </h3>
          <Button variant="outline" onClick={handleLogoutAllDevices}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Logout All Devices
          </Button>
        </div>

        <div className="space-y-3">
          {loginActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <Icon name={getDeviceIcon(activity.device)} size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{activity.device}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      {activity.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Globe" size={12} />
                      {activity.ipAddress}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                {activity.status !== 'Current Session' && activity.status === 'Active' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLogoutDevice(activity.id)}
                  >
                    <Icon name="LogOut" size={14} className="mr-1" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-surface border border-error/20 rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-error mb-4 flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} />
          Danger Zone
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Delete Account</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
              All your manuscripts, reviews, and profile information will be permanently removed.
            </p>
            <Button variant="destructive">
              <Icon name="Trash2" size={16} className="mr-2" />
              Delete Account
            </Button>
          </div>
          
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Export Data</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of your account data including manuscripts, reviews, and profile information.
            </p>
            <Button variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Export My Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityTab;