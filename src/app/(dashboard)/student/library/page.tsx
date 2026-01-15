"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";

// Define the type for a document source based on your API response
interface DocumentSource {
  id: string | number;
  title: string;
  description: string;
  tag?: string;
  tagColor?: string;
  minutesToRead?: number;
  issuedAt?: string;
  status?: string;
  lawTypeId?: number;
  [key: string]: any;
}

// Define pagination meta type
interface PaginationMeta {
  count: number;
  page: number;
  totalPages?: number;
  limit?: number;
}

export default function StudentSummariesLibraryPage() {
  const router = useRouter();
  const [summaries, setSummaries] = useState<DocumentSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(9); // Adjust based on your API or UI needs
  
  // Filter state
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get token from localStorage
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      try {
        console.log('=== TOKEN DEBUG START ===');
        console.log('LocalStorageKeys.UserAuth:', LocalStorageKeys.UserAuth);
        
        // Check ALL localStorage items
        const allKeys = Object.keys(localStorage);
        console.log('All localStorage keys:', allKeys);
        
        for (let i = 0; i < allKeys.length; i++) {
          const key = allKeys[i];
          const value = localStorage.getItem(key);
          console.log(`Key: ${key}, Value:`, value);
          
          if (value && (key.includes('auth') || key.includes('user') || key.includes('token'))) {
            try {
              const parsed = JSON.parse(value);
              console.log(`Parsed ${key}:`, parsed);
              
              // Check for token in various possible locations
              const token = 
                parsed.token || 
                parsed.accessToken || 
                parsed.access_token ||
                parsed.data?.token ||
                parsed.data?.accessToken;
                
              if (token) {
                console.log(`Found token in ${key}:`, token);
                return token;
              }
            } catch (e) {
              // If not JSON, maybe it's just a token string
              if (value.startsWith('ey') && value.includes('.')) {
                // Looks like a JWT token
                console.log(`Found JWT token string in ${key}`);
                return value;
              }
            }
          }
        }
        
        console.log('No token found in any localStorage item');
        console.log('=== TOKEN DEBUG END ===');
        return null;
      } catch (error) {
        console.error('Error in getAuthToken:', error);
        return null;
      }
    }
    return null;
  };

  // Define tag colors mapping
  const getTagColor = (tag: string = "General") => {
    const tagColors: Record<string, string> = {
      "Criminal Law": "bg-emerald-100 text-emerald-700",
      "Torts": "bg-emerald-100 text-emerald-700",
      "Contracts": "bg-amber-100 text-amber-700",
      "Constitutional": "bg-violet-100 text-violet-700",
      "Procedure": "bg-sky-100 text-sky-700",
      "Property Law": "bg-rose-100 text-rose-700",
      "General": "bg-slate-100 text-slate-700",
    };
    
    return tagColors[tag] || "bg-slate-100 text-slate-700";
  };

  // Map lawTypeId to tag names
  const lawTypeTags: Record<number, string> = {
    1: "Criminal Law",
    2: "Torts", 
    3: "Contracts",
    4: "Constitutional",
    5: "Procedure",
    6: "Property Law",
  };

  // Available tags for filtering (extracted from your data)
  const availableTags = Array.from(new Set(Object.values(lawTypeTags)));

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    const checkAuthAndFetch = async () => {
      console.log('=== AUTH CHECK START ===');
      const token = getAuthToken();
      console.log('Token found:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        setError("Please log in to access library");
        setTimeout(() => {
          router.push('/login?redirect=/student/library');
        }, 2000);
        setLoading(false);
        return;
      }
      
      console.log('Token found, fetching summaries...');
      await fetchSummaries(token, currentPage, selectedTag);
    };
    
    if (isClient) {
      checkAuthAndFetch();
    }
  }, [isClient, router, currentPage, selectedTag]);

  const fetchSummaries = async (token: string, page: number = 1, tag: string | null = null) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        role: 'Students',
        page: page.toString(),
        limit: itemsPerPage.toString(),
      });
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      if (tag) {
        // Find lawTypeId from tag
        const lawTypeId = Object.keys(lawTypeTags).find(
          key => lawTypeTags[parseInt(key)] === tag
        );
        if (lawTypeId) {
          params.append('lawTypeId', lawTypeId);
        }
      }
      
      console.log("Fetching with params:", params.toString());
      
      const response = await fetch(`/api/document-sources?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401 || data.clearAuth) {
          // Clear invalid auth data
          localStorage.removeItem(LocalStorageKeys.UserAuth);
          localStorage.removeItem('auth');
          setError("Your session has expired. Redirecting to login...");
          setTimeout(() => {
            router.push('/login?redirect=/student/library');
          }, 2000);
          return;
        }
        
        throw new Error(data.message || `Failed to fetch: ${response.status}`);
      }
      
      // Process data...
      const documents = data.data || [];
      
      // Handle empty data
      if (!documents || documents.length === 0) {
        setError("No document sources found.");
        setSummaries([]);
        setTotalItems(0);
        setTotalPages(1);
        return;
      }
      
      // Map the API response to your UI structure
      const mappedData = documents.map((item: any) => {
        const tag = lawTypeTags[item.lawTypeId] || "General";
        
        return {
          id: item.id,
          title: item.title?.en || item.title || `Document ${item.id}`,
          description: item.description?.en || item.description || "No description available.",
          tag: tag,
          tagColor: getTagColor(tag),
          minutesToRead: item.minutesToRead,
          issuedAt: item.issuedAt,
          status: item.status,
          lawTypeId: item.lawTypeId,
          // Add any other fields you might need
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      
      setSummaries(mappedData);
      
      // Update pagination info
      const meta: PaginationMeta = data.meta || { count: documents.length, page: 1 };
      setTotalItems(meta.count);
      setCurrentPage(meta.page || page);
      
      // Calculate total pages
      const calculatedTotalPages = Math.ceil(meta.count / itemsPerPage);
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
      
    } catch (err) {
      console.error("Error fetching summaries:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load summaries";
      setError(errorMessage);
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (token) {
      setCurrentPage(1); // Reset to first page when searching
      await fetchSummaries(token, 1, selectedTag);
    }
  };

  // Handle tag filter click
  const handleTagFilter = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // Clear filter if same tag clicked
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(1);
    
    // Calculate start and end of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    
    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - maxVisiblePages + 3);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if there is one
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return (
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentPage === 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          &lt;
        </button>
        
        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2">…</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentPage === page
                    ? 'bg-emerald-500 text-white'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentPage === totalPages
              ? 'text-slate-300 cursor-not-allowed'
              : 'hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };

  // Don't render until we're on client side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
                Legal Summaries Library
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto text-center mb-8">
                Loading summaries...
              </p>
            </div>
          </section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle error state
  if (error && summaries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
                Legal Summaries Library
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto text-center mb-8">
                {error}
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
                >
                  Retry
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="rounded-lg border border-emerald-500 px-6 py-3 text-emerald-500 font-semibold hover:bg-emerald-50"
                >
                  Login
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        {/* Hero / heading */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 text-center">
              Legal Summaries Library
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto text-center mb-8">
              Simplifying complex case law for easier studying. Browse our student-friendly
              database of summaries, specifically crafted for efficient revision.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex items-stretch rounded-full border border-slate-200 bg-slate-50 px-2 py-1 shadow-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases, statutes, or topics..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm md:text-base text-slate-800 placeholder-slate-400 outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Filters + cards */}
        <section className="py-8 md:py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Topic filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button 
                onClick={() => handleTagFilter('All Topics')}
                className={`inline-flex items-center rounded-full px-4 py-2 text-xs md:text-sm font-semibold shadow-sm ${
                  !selectedTag
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Topics
              </button>
              
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-xs md:text-sm font-semibold border ${
                    selectedTag === tag
                      ? `${getTagColor(tag)} border-transparent`
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                Showing {summaries.length} of {totalItems} summaries
                {selectedTag && ` in "${selectedTag}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Show message if no results */}
            {summaries.length === 0 && (searchQuery || selectedTag) && (
              <div className="text-center py-10">
                <p className="text-slate-600 mb-4">
                  No summaries found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedTag && ` in "${selectedTag}"`}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                    setCurrentPage(1);
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Cards grid */}
            {summaries.length > 0 && (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {summaries.map((summary) => (
                    <article
                      key={summary.id}
                      className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${summary.tagColor || getTagColor(summary.tag)}`}
                          >
                            {summary.tag || "General"}
                          </span>
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            aria-label="Save summary"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                              />
                            </svg>
                          </button>
                        </div>
                        <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-2 line-clamp-2">
                          {summary.title}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3 line-clamp-3">
                          {summary.description}
                        </p>
                        <div className="flex items-center text-xs text-slate-500 mt-2">
                          {summary.minutesToRead && (
                            <span className="mr-3">
                              📖 {summary.minutesToRead} min read
                            </span>
                          )}
                          {summary.issuedAt && (
                            <span>
                              📅 {new Date(summary.issuedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          console.log("Viewing summary:", summary.id);
                          router.push(`/student/library/${summary.id}`);
                        }}
                        className="mt-2 inline-flex items-center text-xs md:text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Read Summary
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14M13 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && renderPagination()}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}