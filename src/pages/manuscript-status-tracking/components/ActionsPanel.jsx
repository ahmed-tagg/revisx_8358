import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FileUploadProgress from '../../../components/ui/FileUploadProgress';

const ActionsPanel = ({ manuscript, availableActions, onActionComplete }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [responseText, setResponseText] = useState('');

  const handleActionClick = (action) => {
    setActiveAction(action);
  };

  const handleUploadRevision = () => {
    if (uploadFiles.length > 0) {
      onActionComplete('upload_revision', { files: uploadFiles });
      setUploadFiles([]);
      setActiveAction(null);
    }
  };

  const handleRespondToReviewers = () => {
    if (responseText.trim()) {
      onActionComplete('respond_to_reviewers', { response: responseText });
      setResponseText('');
      setActiveAction(null);
    }
  };

  const handleWithdrawSubmission = () => {
    if (window.confirm('Are you sure you want to withdraw this submission? This action cannot be undone.')) {
      onActionComplete('withdraw_submission', {});
      setActiveAction(null);
    }
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'upload_revision':
        return 'Upload';
      case 'respond_to_reviewers':
        return 'MessageSquare';
      case 'withdraw_submission':
        return 'Trash2';
      case 'request_extension':
        return 'Clock';
      case 'contact_editor':
        return 'Mail';
      default:
        return 'Settings';
    }
  };

  const getActionVariant = (actionType) => {
    switch (actionType) {
      case 'withdraw_submission':
        return 'destructive';
      case 'upload_revision': case'respond_to_reviewers':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      {availableActions.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No actions available at this time</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3">
            {availableActions.map((action) => (
              <Button
                key={action.type}
                variant={getActionVariant(action.type)}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                className="justify-start h-auto p-4"
              >
                <Icon name={getActionIcon(action.type)} size={20} className="mr-3" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-sm opacity-80">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Action Modals/Forms */}
          {activeAction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
              <div className="bg-surface border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">
                      {activeAction.label}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setActiveAction(null)}
                    >
                      <Icon name="X" size={20} />
                    </Button>
                  </div>

                  {activeAction.type === 'upload_revision' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Upload your revised manuscript and any additional files requested by the reviewers.
                      </p>
                      <FileUploadProgress
                        files={uploadFiles}
                        onFilesChange={setUploadFiles}
                        maxFiles={5}
                        acceptedTypes={['.pdf', '.doc', '.docx', '.tex']}
                      />
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setActiveAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleUploadRevision}
                          disabled={uploadFiles.length === 0}
                        >
                          Upload Revision
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeAction.type === 'respond_to_reviewers' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Provide your response to the reviewer comments and explain the changes made.
                      </p>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Enter your response to reviewers..."
                        className="w-full p-3 border border-border rounded-md text-sm resize-none"
                        rows="8"
                      />
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setActiveAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleRespondToReviewers}
                          disabled={!responseText.trim()}
                        >
                          Send Response
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeAction.type === 'withdraw_submission' && (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-error/10 border border-error/20 rounded-lg">
                        <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-error mb-1">
                            Warning: This action cannot be undone
                          </p>
                          <p className="text-sm text-error/80">
                            Withdrawing your submission will permanently remove it from the review process. 
                            You will need to resubmit if you wish to continue.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setActiveAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleWithdrawSubmission}
                        >
                          Withdraw Submission
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeAction.type === 'request_extension' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Request an extension for your revision deadline. Please provide a reason for the extension.
                      </p>
                      <textarea
                        placeholder="Reason for extension request..."
                        className="w-full p-3 border border-border rounded-md text-sm resize-none"
                        rows="4"
                      />
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setActiveAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setActiveAction(null)}>
                          Request Extension
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeAction.type === 'contact_editor' && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Send a message directly to the journal editor regarding your submission.
                      </p>
                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full p-3 border border-border rounded-md text-sm"
                      />
                      <textarea
                        placeholder="Your message to the editor..."
                        className="w-full p-3 border border-border rounded-md text-sm resize-none"
                        rows="6"
                      />
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setActiveAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setActiveAction(null)}>
                          Send Message
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActionsPanel;