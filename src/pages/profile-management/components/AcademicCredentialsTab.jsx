import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import FileUploadProgress from '../../../components/ui/FileUploadProgress';

const AcademicCredentialsTab = ({ profile, onUpdate }) => {
  const [isEditingOrcid, setIsEditingOrcid] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [orcidId, setOrcidId] = useState(profile.orcidId || '');
  const [researchInterests, setResearchInterests] = useState(profile.researchInterests || []);
  const [newInterest, setNewInterest] = useState('');
  const [cvFiles, setCvFiles] = useState([]);

  const handleOrcidSave = () => {
    onUpdate({ orcidId });
    setIsEditingOrcid(false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !researchInterests.includes(newInterest.trim())) {
      const updatedInterests = [...researchInterests, newInterest.trim()];
      setResearchInterests(updatedInterests);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    const updatedInterests = researchInterests.filter(item => item !== interest);
    setResearchInterests(updatedInterests);
  };

  const handleInterestsSave = () => {
    onUpdate({ researchInterests });
    setIsEditingInterests(false);
  };

  const publicationHistory = [
    {
      id: 1,
      title: "Machine Learning Applications in Biomedical Research",
      journal: "Nature Biotechnology",
      year: 2023,
      citations: 45,
      doi: "10.1038/nbt.2023.001",
      status: "Published"
    },
    {
      id: 2,
      title: "Deep Learning for Medical Image Analysis: A Comprehensive Review",
      journal: "IEEE Transactions on Medical Imaging",
      year: 2022,
      citations: 128,
      doi: "10.1109/TMI.2022.001",
      status: "Published"
    },
    {
      id: 3,
      title: "Novel Approaches to Cancer Detection Using AI",
      journal: "Journal of Clinical Oncology",
      year: 2024,
      citations: 12,
      doi: "10.1200/JCO.2024.001",
      status: "In Press"
    }
  ];

  const educationHistory = [
    {
      id: 1,
      degree: "Ph.D. in Computer Science",
      institution: "Stanford University",
      year: "2018",
      specialization: "Machine Learning and Artificial Intelligence"
    },
    {
      id: 2,
      degree: "M.S. in Computer Science",
      institution: "MIT",
      year: "2014",
      specialization: "Data Science"
    },
    {
      id: 3,
      degree: "B.S. in Computer Engineering",
      institution: "UC Berkeley",
      year: "2012",
      specialization: "Software Engineering"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Academic Credentials</h2>
      </div>

      {/* ORCID Integration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="Award" size={20} />
            ORCID Integration
          </h3>
          {!isEditingOrcid ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditingOrcid(true)}>
              <Icon name="Edit2" size={16} className="mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={handleOrcidSave}>
                <Icon name="Check" size={16} className="mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditingOrcid(false)}>
                <Icon name="X" size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        {!isEditingOrcid ? (
          <div className="flex items-center gap-4">
            {profile.orcidId ? (
              <>
                <div className="flex items-center gap-2">
                  <Icon name="ExternalLink" size={16} className="text-success" />
                  <span className="text-foreground font-medium">ORCID ID: {profile.orcidId}</span>
                  <div className="flex items-center gap-1 text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs">Verified</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Sync Publications
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">No ORCID ID connected</span>
                <Button variant="default" size="sm">
                  <Icon name="Link" size={16} className="mr-2" />
                  Connect ORCID
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="ORCID ID"
              value={orcidId}
              onChange={(e) => setOrcidId(e.target.value)}
              placeholder="0000-0000-0000-0000"
              description="Your unique ORCID identifier for academic publications"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Don't have an ORCID ID? <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Create one here</a></span>
            </div>
          </div>
        )}
      </div>

      {/* Research Interests */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="Lightbulb" size={20} />
            Research Interests
          </h3>
          {!isEditingInterests ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditingInterests(true)}>
              <Icon name="Edit2" size={16} className="mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={handleInterestsSave}>
                <Icon name="Check" size={16} className="mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditingInterests(false)}>
                <Icon name="X" size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {!isEditingInterests ? (
          <div className="flex flex-wrap gap-2">
            {researchInterests.length > 0 ? (
              researchInterests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">No research interests added</span>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add research interest"
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleAddInterest}>
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-primary hover:text-primary/70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Education History */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="GraduationCap" size={20} />
            Education History
          </h3>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Education
          </Button>
        </div>
        
        <div className="space-y-4">
          {educationHistory.map((education) => (
            <div key={education.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{education.degree}</h4>
                <p className="text-muted-foreground">{education.institution}</p>
                <p className="text-sm text-muted-foreground">{education.specialization}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{education.year}</span>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publication History */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center gap-2">
            <Icon name="BookOpen" size={20} />
            Publication History
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Sync from ORCID
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Publication
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {publicationHistory.map((publication) => (
            <div key={publication.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground flex-1 pr-4">{publication.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    publication.status === 'Published' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {publication.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Icon name="Edit2" size={14} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={14} />
                  {publication.journal}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {publication.year}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Quote" size={14} />
                  {publication.citations} citations
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ExternalLink" size={14} />
                  DOI: {publication.doi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CV Upload */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Curriculum Vitae
        </h3>
        
        <FileUploadProgress
          files={cvFiles}
          onFilesChange={setCvFiles}
          maxFiles={1}
          acceptedTypes={['.pdf', '.doc', '.docx']}
          maxFileSize={5 * 1024 * 1024} // 5MB
        />
        
        {profile.currentCv && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Current CV</p>
                <p className="text-sm text-muted-foreground">Uploaded on {profile.currentCv.uploadDate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Eye" size={16} className="mr-2" />
                Preview
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicCredentialsTab;