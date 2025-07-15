import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import LibraryToolbar from './components/LibraryToolbar';
import ManuscriptTable from './components/ManuscriptTable';
import ManuscriptGrid from './components/ManuscriptGrid';
import LibrarySidebar from './components/LibrarySidebar';
import LibraryPagination from './components/LibraryPagination';

const ManuscriptLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    journal: 'all',
    dateRange: 'all',
    coAuthors: 'all'
  });
  const [viewMode, setViewMode] = useState('table');
  const [selectedManuscripts, setSelectedManuscripts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Mock manuscript data
  const mockManuscripts = [
    {
      id: 1,
      title: "Machine Learning Approaches for Predicting Protein-Drug Interactions in Cancer Therapy",
      abstract: "This study presents novel machine learning algorithms for predicting protein-drug interactions with applications in personalized cancer treatment. Our approach combines deep learning with molecular dynamics simulations to achieve unprecedented accuracy in drug target identification.",
      journal: "Nature",
      submissionDate: "2024-06-15",
      status: "under-review",
      coAuthors: ["Dr. Michael Chen", "Dr. Sarah Williams", "Dr. James Rodriguez"],
      lastActivity: "2024-07-08",
      archived: false
    },
    {
      id: 2,
      title: "CRISPR-Cas9 Gene Editing for Treatment of Inherited Retinal Diseases",
      abstract: "We demonstrate the therapeutic potential of CRISPR-Cas9 gene editing in treating inherited retinal diseases through targeted correction of disease-causing mutations in photoreceptor cells.",
      journal: "Science",
      submissionDate: "2024-05-22",
      status: "revision-requested",
      coAuthors: ["Dr. Emily Johnson", "Dr. Robert Kim"],
      lastActivity: "2024-07-05",
      archived: false
    },
    {
      id: 3,
      title: "Quantum Computing Applications in Drug Discovery and Molecular Simulation",
      abstract: "This paper explores the application of quantum computing algorithms to accelerate drug discovery processes, focusing on molecular simulation and optimization of pharmaceutical compounds.",
      journal: "Cell",
      submissionDate: "2024-04-10",
      status: "accepted",
      coAuthors: ["Dr. Lisa Zhang", "Dr. David Thompson", "Dr. Maria Garcia", "Dr. John Wilson"],
      lastActivity: "2024-06-28",
      archived: false
    },
    {
      id: 4,
      title: "Biomarker Discovery for Early Detection of Alzheimer\'s Disease Using Multi-Omics Analysis",
      abstract: "We present a comprehensive multi-omics approach for identifying novel biomarkers that enable early detection of Alzheimer's disease, potentially revolutionizing diagnostic capabilities.",
      journal: "PLOS ONE",
      submissionDate: "2024-03-18",
      status: "published",
      coAuthors: ["Dr. Anna Petrov", "Dr. Mark Anderson"],
      lastActivity: "2024-06-20",
      archived: false
    },
    {
      id: 5,
      title: "Artificial Intelligence in Medical Imaging: Automated Diagnosis of Cardiovascular Diseases",
      abstract: "This research develops AI-powered diagnostic tools for cardiovascular disease detection using advanced image analysis techniques applied to echocardiograms and cardiac MRI scans.",
      journal: "JAMA",
      submissionDate: "2024-02-28",
      status: "accepted",
      coAuthors: ["Dr. Kevin Lee", "Dr. Rachel Brown", "Dr. Thomas Davis"],
      lastActivity: "2024-06-15",
      archived: false
    },
    {
      id: 6,
      title: "Nanotechnology-Based Drug Delivery Systems for Targeted Cancer Therapy",
      abstract: "We present innovative nanotechnology approaches for targeted drug delivery in cancer treatment, demonstrating improved therapeutic efficacy and reduced side effects.",
      journal: "Nature",
      submissionDate: "2024-01-15",
      status: "rejected",
      coAuthors: ["Dr. Sophie Miller", "Dr. Alex Turner"],
      lastActivity: "2024-05-30",
      archived: false
    },
    {
      id: 7,
      title: "Stem Cell Therapy for Spinal Cord Injury: Clinical Trial Results and Future Prospects",
      abstract: "This paper reports the results of a Phase II clinical trial investigating stem cell therapy for spinal cord injury treatment, showing promising outcomes for patient recovery.",
      journal: "New England Journal of Medicine",
      submissionDate: "2023-12-20",
      status: "published",
      coAuthors: ["Dr. Jennifer White", "Dr. Christopher Moore", "Dr. Amanda Taylor"],
      lastActivity: "2024-05-22",
      archived: false
    },
    {
      id: 8,
      title: "Personalized Medicine Approaches in Oncology: Genomic Profiling and Treatment Selection",
      abstract: "We explore personalized medicine strategies in oncology, focusing on genomic profiling techniques for optimal treatment selection and improved patient outcomes.",
      journal: "Science",
      submissionDate: "2023-11-30",
      status: "under-review",
      coAuthors: ["Dr. Brian Clark", "Dr. Nicole Harris"],
      lastActivity: "2024-05-18",
      archived: false
    },
    {
      id: 9,
      title: "Immunotherapy Combinations for Advanced Melanoma: Efficacy and Safety Analysis",
      abstract: "This study analyzes the efficacy and safety of novel immunotherapy combinations in treating advanced melanoma, providing insights for clinical practice optimization.",
      journal: "PLOS ONE",
      submissionDate: "2023-10-25",
      status: "accepted",
      coAuthors: ["Dr. Patricia Martinez", "Dr. Steven Jackson"],
      lastActivity: "2024-05-10",
      archived: false
    },
    {
      id: 10,
      title: "Microbiome Analysis in Inflammatory Bowel Disease: Therapeutic Implications",
      abstract: "We conduct comprehensive microbiome analysis in IBD patients to identify therapeutic targets and develop microbiome-based treatment strategies.",
      journal: "Cell",
      submissionDate: "2023-09-12",
      status: "published",
      coAuthors: ["Dr. Daniel Lewis", "Dr. Michelle Robinson", "Dr. Ryan Cooper"],
      lastActivity: "2024-04-28",
      archived: false
    }
  ];

  // Filter and search manuscripts
  const filteredManuscripts = mockManuscripts.filter(manuscript => {
    const matchesSearch = searchQuery === '' || 
      manuscript.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuscript.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manuscript.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedFilters.status === 'all' || manuscript.status === selectedFilters.status;
    const matchesJournal = selectedFilters.journal === 'all' || manuscript.journal.toLowerCase().includes(selectedFilters.journal.toLowerCase());
    
    // Simple date range filtering (can be enhanced)
    const matchesDateRange = selectedFilters.dateRange === 'all' || true; // Simplified for demo
    
    const matchesCoAuthors = selectedFilters.coAuthors === 'all' || 
      (selectedFilters.coAuthors === 'with-coauthors' && manuscript.coAuthors.length > 0) ||
      (selectedFilters.coAuthors === 'solo' && manuscript.coAuthors.length === 0);

    return matchesSearch && matchesStatus && matchesJournal && matchesDateRange && matchesCoAuthors;
  });

  // Sort manuscripts
  const sortedManuscripts = [...filteredManuscripts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedManuscripts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedManuscripts = sortedManuscripts.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on manuscripts:`, selectedManuscripts);
    // Implement bulk action logic here
    switch (action) {
      case 'archive':
        alert(`Archiving ${selectedManuscripts.length} manuscripts`);
        break;
      case 'export-csv':
        alert(`Exporting ${selectedManuscripts.length} manuscripts to CSV`);
        break;
      case 'batch-download':
        alert(`Downloading files for ${selectedManuscripts.length} manuscripts`);
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (action, manuscriptId) => {
    console.log(`Performing action: ${action} on manuscript:`, manuscriptId);
    // Implement quick action logic here
    switch (action) {
      case 'view':
        alert(`Viewing manuscript ${manuscriptId}`);
        break;
      case 'duplicate':
        alert(`Duplicating manuscript ${manuscriptId}`);
        break;
      case 'download':
        alert(`Downloading manuscript ${manuscriptId}`);
        break;
      case 'archive':
        alert(`Archiving manuscript ${manuscriptId}`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this manuscript?')) {
          alert(`Deleting manuscript ${manuscriptId}`);
        }
        break;
      default:
        break;
    }
  };

  const handleSavedSearchClick = (search) => {
    console.log('Applying saved search:', search);
    // Parse and apply the saved search query
    alert(`Applying saved search: ${search.name}`);
  };

  const handleExportClick = (format) => {
    console.log(`Exporting library to ${format}`);
    alert(`Exporting manuscript library to ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-60 pt-16">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Page Header */}
              <div className="p-6 border-b border-border bg-surface">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Manuscript Library</h1>
                    <p className="text-muted-foreground mt-1">
                      Manage your complete submission portfolio with advanced search and filtering
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {filteredManuscripts.length} of {mockManuscripts.length} manuscripts
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="p-6">
                <LibraryToolbar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onBulkAction={handleBulkAction}
                  selectedCount={selectedManuscripts.length}
                  totalCount={filteredManuscripts.length}
                />
              </div>

              {/* Content */}
              <div className="flex-1 px-6 pb-6 overflow-auto">
                {viewMode === 'table' ? (
                  <ManuscriptTable
                    manuscripts={paginatedManuscripts}
                    selectedManuscripts={selectedManuscripts}
                    onSelectionChange={setSelectedManuscripts}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onQuickAction={handleQuickAction}
                  />
                ) : (
                  <ManuscriptGrid
                    manuscripts={paginatedManuscripts}
                    selectedManuscripts={selectedManuscripts}
                    onSelectionChange={setSelectedManuscripts}
                    onQuickAction={handleQuickAction}
                  />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <LibraryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredManuscripts.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                )}
              </div>
            </div>

            {/* Right Sidebar - Hidden on mobile and tablet */}
            <div className="hidden xl:block">
              <LibrarySidebar
                onSavedSearchClick={handleSavedSearchClick}
                onExportClick={handleExportClick}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManuscriptLibrary;