import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import QuickActionDropdown from '../../../components/ui/QuickActionDropdown';

const UserManagementTable = ({ users, onUserAction }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'author', label: 'Author' },
    { value: 'reviewer', label: 'Reviewer' },
    { value: 'editor', label: 'Editor' },
    { value: 'admin', label: 'Admin' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const getRoleBadge = (role) => {
    const roleConfig = {
      author: { color: 'bg-blue-100 text-blue-800', label: 'Author' },
      reviewer: { color: 'bg-green-100 text-green-800', label: 'Reviewer' },
      editor: { color: 'bg-purple-100 text-purple-800', label: 'Editor' },
      admin: { color: 'bg-red-100 text-red-800', label: 'Admin' }
    };

    const config = roleConfig[role] || roleConfig.author;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active', icon: 'CheckCircle' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive', icon: 'Circle' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: 'Clock' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended', icon: 'XCircle' }
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <div className="flex items-center space-x-1">
        <Icon name={config.icon} size={12} className={config.color.split(' ')[1]} />
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Users',
      icon: 'CheckCircle',
      variant: 'success',
      onClick: () => onUserAction('activate', selectedUsers)
    },
    {
      id: 'suspend',
      label: 'Suspend Users',
      icon: 'XCircle',
      variant: 'warning',
      onClick: () => onUserAction('suspend', selectedUsers)
    },
    { type: 'separator' },
    {
      id: 'export',
      label: 'Export Selected',
      icon: 'Download',
      onClick: () => onUserAction('export', selectedUsers)
    },
    {
      id: 'delete',
      label: 'Delete Users',
      icon: 'Trash2',
      variant: 'destructive',
      onClick: () => onUserAction('delete', selectedUsers)
    }
  ];

  const getUserActions = (user) => [
    {
      id: 'view',
      label: 'View Profile',
      icon: 'Eye',
      onClick: () => onUserAction('view', [user.id])
    },
    {
      id: 'edit',
      label: 'Edit User',
      icon: 'Edit',
      onClick: () => onUserAction('edit', [user.id])
    },
    {
      id: 'reset_password',
      label: 'Reset Password',
      icon: 'Key',
      onClick: () => onUserAction('reset_password', [user.id])
    },
    { type: 'separator' },
    {
      id: user.status === 'active' ? 'suspend' : 'activate',
      label: user.status === 'active' ? 'Suspend User' : 'Activate User',
      icon: user.status === 'active' ? 'XCircle' : 'CheckCircle',
      variant: user.status === 'active' ? 'warning' : 'success',
      onClick: () => onUserAction(user.status === 'active' ? 'suspend' : 'activate', [user.id])
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with filters and search */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={setRoleFilter}
              className="w-full sm:w-40"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full sm:w-48"
            />
          </div>
          
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedUsers.length} selected
              </span>
              <QuickActionDropdown
                actions={bulkActions}
                trigger="dots"
                position="bottom-right"
              />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">User</th>
              <th className="text-left p-4 font-medium text-foreground">Role</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Institution</th>
              <th className="text-left p-4 font-medium text-foreground">Last Active</th>
              <th className="text-left p-4 font-medium text-foreground">Manuscripts</th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {getRoleBadge(user.role)}
                </td>
                <td className="p-4">
                  {getStatusBadge(user.status)}
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{user.institution}</p>
                  <p className="text-xs text-muted-foreground">{user.department}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">
                    {new Date(user.last_active).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(user.last_active).toLocaleTimeString()}
                  </p>
                </td>
                <td className="p-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{user.manuscript_count}</p>
                    <p className="text-xs text-muted-foreground">Submitted</p>
                  </div>
                </td>
                <td className="p-4">
                  <QuickActionDropdown
                    actions={getUserActions(user)}
                    trigger="dots"
                    position="bottom-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'No users have been registered yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;