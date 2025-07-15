import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewComments = ({ comments, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [activeReply, setActiveReply] = useState(null);

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      onReply(commentId, replyText);
      setReplyText('');
      setActiveReply(null);
    }
  };

  const getReviewerColor = (reviewerId) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800'];
    return colors[reviewerId % colors.length];
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No review comments yet</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReviewerColor(comment.reviewerId)}`}>
                  {comment.reviewer}
                </span>
                <span className="text-sm text-muted-foreground">{comment.date}</span>
                {comment.isConfidential && (
                  <span className="bg-warning/20 text-warning px-2 py-1 rounded text-xs">
                    Confidential
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < comment.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-2">{comment.title}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
            </div>
            
            {comment.attachments && comment.attachments.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Attachments:</p>
                <div className="flex flex-wrap gap-2">
                  {comment.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-surface border border-border rounded px-2 py-1">
                      <Icon name="Paperclip" size={12} />
                      <span className="text-xs text-foreground">{attachment.name}</span>
                      <button className="text-xs text-primary hover:text-primary/80">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-4 border-l-2 border-border pl-4 space-y-3">
                {comment.replies.map((reply, index) => (
                  <div key={index} className="bg-surface rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{reply.author}</span>
                      <span className="text-xs text-muted-foreground">{reply.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
              >
                <Icon name="Reply" size={14} className="mr-1" />
                Reply
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="ThumbsUp" size={14} className="mr-1" />
                  Helpful
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Flag" size={14} className="mr-1" />
                  Report
                </Button>
              </div>
            </div>
            
            {activeReply === comment.id && (
              <div className="mt-4 p-3 bg-surface rounded border border-border">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-2 border border-border rounded text-sm resize-none"
                  rows="3"
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveReply(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReply(comment.id)}
                    disabled={!replyText.trim()}
                  >
                    Send Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewComments;