"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentNavbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";

interface DocumentSource {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  lawTypeId: number;
  lawType?: {
    id: number;
    title: { en: string; ar: string };
  };
  issuedAt: string;
  status: string;
  minutesToRead: number;
  summary?: { en: string; ar: string };
  versionGroupId?: number;
  versionNo?: number;
  publishedBy?: {
    id: number;
    name: string;
    email: string;
    role: string;
    jobTitle?: string;
  };
  reviewedBy?: any;
  sections?: any[];
  tags?: any[];
  firm?: any;
  createdAt?: string;
  updatedAt?: string;
  sourceNumber?: string;
  effectiveAt?: string;
  officialUrl?: string;
  scope?: string;
  jurisdictionId?: number;
}

export default function SummaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState<DocumentSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      try {
        console.log('=== DETAIL PAGE TOKEN DEBUG START ===');
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
        console.log('=== DETAIL PAGE TOKEN DEBUG END ===');
        return null;
      } catch (error) {
        console.error('Error in getAuthToken:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchSummary = async () => {
      const token = getAuthToken();
      
      if (!token) {
        setError("Please log in to access this summary");
        setTimeout(() => {
          router.push('/login?redirect=/student/library');
        }, 2000);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/document-sources/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401 || data.clearAuth) {
            localStorage.removeItem(LocalStorageKeys.UserAuth);
            setError("Your session has expired. Redirecting to login...");
            setTimeout(() => {
              router.push('/login?redirect=/student/library');
            }, 2000);
            return;
          }
          throw new Error(data.message || `Failed to fetch: ${response.status}`);
        }

        setSummary(data);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError(err instanceof Error ? err.message : "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSummary();
    }
  }, [isClient, params.id, router]);

  const getTagColor = (lawTypeId: number) => {
    const tagColors: Record<number, string> = {
      1: "bg-emerald-100 text-emerald-700",
      2: "bg-emerald-100 text-emerald-700", 
      3: "bg-amber-100 text-amber-700",
      4: "bg-violet-100 text-violet-700",
      5: "bg-sky-100 text-sky-700",
      6: "bg-rose-100 text-rose-700",
    };
    return tagColors[lawTypeId] || "bg-slate-100 text-slate-700";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !summary) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Error</h1>
              <p className="text-slate-600 mb-6">{error}</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
                >
                  Retry
                </button>
                <button 
                  onClick={() => router.push('/student/library')}
                  className="rounded-lg border border-emerald-500 px-6 py-3 text-emerald-500 font-semibold hover:bg-emerald-50"
                >
                  Back to Library
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <StudentNavbar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">Summary Not Found</h1>
              <p className="text-slate-600 mb-6">The requested summary could not be found.</p>
              <button 
                onClick={() => router.push('/student/library')}
                className="rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600"
              >
                Back to Library
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <StudentNavbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => router.push('/student/library')}
              className="mb-6 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Back to Summaries
            </button>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getTagColor(summary.lawTypeId)}`}>
                      {summary.lawType?.title?.en || "General"}
                    </span>
                    <span className="text-sm text-slate-500">
                      {summary.minutesToRead} min read
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    {summary.title?.en || "Untitled Summary"}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Issued: {formatDate(summary.issuedAt)}</span>
                    <span>Effective: {summary.effectiveAt ? formatDate(summary.effectiveAt) : 'N/A'}</span>
                    <span>Status: {summary.status}</span>
                    {summary.versionNo && (
                      <span>Version: {summary.versionNo}</span>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                    </svg>
                  </button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-6 0 3 3 0 016 0zm-1.684 0c.114.404.316.86.316 1.342m0-2.684a3 3 0 116 0 3 3 0 01-6 0z" />
                    </svg>
                  </button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4 4l4-4m0 0l4 4m-4-4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {summary.description?.en || "No description available."}
              </p>
            </div>
          </div>

          {/* Author Info */}
          {summary.publishedBy && (
            <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">About this Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Published by</h4>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold">
                        {summary.publishedBy.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{summary.publishedBy.name}</p>
                      <p className="text-sm text-slate-600">{summary.publishedBy.jobTitle}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Summary Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-slate-600">Reading Time</dt>
                      <dd className="text-sm font-medium text-slate-900">{summary.minutesToRead} minutes</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-slate-600">Status</dt>
                      <dd className="text-sm font-medium text-slate-900">{summary.status}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-slate-600">Last Updated</dt>
                      <dd className="text-sm font-medium text-slate-900">{formatDate(summary.updatedAt)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
