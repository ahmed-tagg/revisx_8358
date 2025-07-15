import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Communications = ({ communications }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const getEmailIcon = (type) => {
    switch (type) {
      case 'received':
        return { name: 'Mail', color: 'text-blue-600' };
      case 'sent':
        return { name: 'Send', color: 'text-green-600' };
      case 'system':
        return { name: 'Settings', color: 'text-purple-600' };
      default:
        return { name: 'Mail', color: 'text-muted-foreground' };
    }
  };

  const getEmailTypeColor = (type) => {
    switch (type) {
      case 'received':
        return 'bg-blue-100 text-blue-800';
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {communications.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No communications yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Email List */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground mb-3">Email History</h3>
            {communications.map((email) => {
              const emailIcon = getEmailIcon(email.type);
              const isSelected = selectedEmail?.id === email.id;
              
              return (
                <div
                  key={email.id}
                  className={`p-3 border border-border rounded-lg cursor-pointer transition-colors duration-200 ${
                    isSelected ? 'bg-primary/10 border-primary' : 'bg-surface hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={emailIcon.name} size={16} className={emailIcon.color} />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmailTypeColor(email.type)}`}>
                        {email.type}
                      </span>
                      {email.priority && email.priority !== 'normal' && (
                        <Icon name="AlertCircle" size={12} className={getPriorityColor(email.priority)} />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{email.date}</span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-1 truncate">
                    {email.subject}
                  </h4>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate">{email.from}</span>
                    {email.hasAttachments && (
                      <Icon name="Paperclip" size={12} />
                    )}
                  </div>
                  
                  {!email.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full absolute top-2 right-2" />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Email Detail */}
          <div className="bg-surface border border-border rounded-lg">
            {selectedEmail ? (
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {selectedEmail.subject}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <span className="font-medium w-16">From:</span>
                        <span>{selectedEmail.from}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">To:</span>
                        <span>{selectedEmail.to}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">Date:</span>
                        <span>{selectedEmail.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Reply" size={14} className="mr-1" />
                    Reply
                  </Button>
                </div>
                
                <div className="prose prose-sm max-w-none mb-4">
                  <div className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedEmail.content}
                  </div>
                </div>
                
                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium text-foreground mb-2">Attachments:</p>
                    <div className="space-y-2">
                      {selectedEmail.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center space-x-2">
                            <Icon name="Paperclip" size={14} />
                            <span className="text-sm text-foreground">{attachment.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({attachment.size})
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Icon name="Mail" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select an email to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Communications;