'use client';

import { useState, useEffect } from 'react';
import { generateGbpPost, generateReelScript, generateCaseStudyOutline, generateLearnArticleOutline, generateLinkedInPost } from '@/lib/content/contentCalendarTemplates';
import { TrackingPresets, buildTrackingUrl } from '@/lib/analytics/trackingUrlBuilder';

export default function ContentCalendarClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterChannel, setFilterChannel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Stats
  const [stats, setStats] = useState({ total: 0, pending: 0, drafted: 0, published: 0 });

  useEffect(() => {
    fetchItems();
  }, [filterChannel, filterStatus]);

  async function fetchItems() {
    setLoading(true);
    let url = '/api/ops/content-calendar?limit=100';
    if (filterChannel) url += `&channel=${filterChannel}`;
    if (filterStatus) url += `&status=${filterStatus}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
      
      if (!filterChannel && !filterStatus) {
        setStats({
          total: data.length,
          pending: data.filter(d => d.privacy_review_status === 'pending').length,
          drafted: data.filter(d => d.status === 'drafted').length,
          published: data.filter(d => d.status === 'published').length
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  function openEditor(item = null) {
    if (item) {
      setCurrentItem({ ...item });
    } else {
      setCurrentItem({
        title: '',
        channel: 'website_proof',
        category: 'construction',
        target_area: '',
        status: 'idea',
        privacy_review_status: 'pending',
        planned_date: new Date().toISOString().split('T')[0]
      });
    }
    setIsEditorOpen(true);
  }

  async function saveItem(e) {
    e.preventDefault();
    try {
      const isNew = !currentItem.id;
      const url = isNew ? '/api/ops/content-calendar' : `/api/ops/content-calendar/${currentItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem)
      });

      if (res.ok) {
        setIsEditorOpen(false);
        fetchItems();
      } else {
        alert('Failed to save item');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving item');
    }
  }

  function handleGenerateContent() {
    if (!currentItem) return;
    const c = currentItem.channel;
    let content = '';

    if (c === 'google_business_profile') {
      content = generateGbpPost(currentItem);
      setCurrentItem({ ...currentItem, gbp_post_text: content, status: 'drafted' });
    } else if (c === 'instagram_reel' || c === 'youtube_short') {
      content = generateReelScript(currentItem);
      setCurrentItem({ ...currentItem, reel_script: content, status: 'drafted' });
    } else if (c === 'case_study') {
      content = generateCaseStudyOutline(currentItem);
      setCurrentItem({ ...currentItem, caption_long: content, status: 'drafted' });
    } else if (c === 'learn_article') {
      content = generateLearnArticleOutline(currentItem);
      setCurrentItem({ ...currentItem, caption_long: content, status: 'drafted' });
    } else if (c === 'linkedin_post') {
      content = generateLinkedInPost(currentItem);
      setCurrentItem({ ...currentItem, caption_long: content, status: 'drafted' });
    } else {
      alert('No template available for ' + c);
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <select 
            value={filterChannel} 
            onChange={e => setFilterChannel(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="">All Channels</option>
            <option value="website_proof">Website Proof</option>
            <option value="google_business_profile">Google Business Profile</option>
            <option value="instagram_reel">Instagram Reel</option>
            <option value="case_study">Case Study</option>
            <option value="learn_article">Learn Article</option>
            <option value="linkedin_post">LinkedIn Post</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="">All Statuses</option>
            <option value="idea">Idea</option>
            <option value="drafted">Drafted</option>
            <option value="approved">Approved</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button 
          onClick={() => openEditor()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + Add Content Item
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 font-semibold uppercase">Total Items</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-xs text-gray-500 font-semibold uppercase">Drafted</p>
          <p className="text-2xl font-bold">{stats.drafted}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
          <p className="text-xs text-gray-500 font-semibold uppercase">Privacy Pending</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500 font-semibold uppercase">Published</p>
          <p className="text-2xl font-bold">{stats.published}</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No content items found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Privacy</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.planned_date ? new Date(item.planned_date).toLocaleDateString() : 'TBD'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.title}
                    <div className="text-xs text-gray-500 font-normal">{item.target_area || 'Global'} | {item.category.replace(/_/g, ' ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.channel.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' :
                      item.status === 'approved' ? 'bg-indigo-100 text-indigo-800' :
                      item.status === 'drafted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.privacy_review_status === 'approved' ? (
                      <span className="text-green-600 font-medium">✓ Safe</span>
                    ) : item.privacy_review_status === 'rejected' ? (
                      <span className="text-red-600 font-medium">✗ Rejected</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">⚠ Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditor(item)} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && currentItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {currentItem.id ? 'Edit Content Item' : 'New Content Item'}
              </h3>
              <button onClick={() => setIsEditorOpen(false)} className="text-gray-400 hover:text-gray-500">
                ✕
              </button>
            </div>
            
            <div className="px-6 py-4 overflow-y-auto flex-1">
              <form id="editor-form" onSubmit={saveItem} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" required value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Date</label>
                    <input type="date" value={currentItem.planned_date?.split('T')[0] || ''} onChange={e => setCurrentItem({...currentItem, planned_date: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Channel</label>
                    <select value={currentItem.channel} onChange={e => setCurrentItem({...currentItem, channel: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                      <option value="website_proof">Website Proof</option>
                      <option value="google_business_profile">Google Business Profile</option>
                      <option value="instagram_reel">Instagram Reel</option>
                      <option value="case_study">Case Study</option>
                      <option value="learn_article">Learn Article</option>
                      <option value="linkedin_post">LinkedIn Post</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                      <option value="construction">Construction</option>
                      <option value="materials">Materials</option>
                      <option value="structural_audit">Structural Audit</option>
                      <option value="land_survey">Land Survey</option>
                      <option value="soil_testing">Soil Testing</option>
                      <option value="piling">Piling</option>
                      <option value="partner_project">Partner Project</option>
                      <option value="property_passport">Property Passport</option>
                      <option value="ai_tools">AI Tools</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select value={currentItem.status} onChange={e => setCurrentItem({...currentItem, status: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                      <option value="idea">Idea</option>
                      <option value="drafted">Drafted</option>
                      <option value="approved">Approved</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Privacy Review</label>
                    <select value={currentItem.privacy_review_status} onChange={e => setCurrentItem({...currentItem, privacy_review_status: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Area</label>
                    <input type="text" value={currentItem.target_area || ''} onChange={e => setCurrentItem({...currentItem, target_area: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" placeholder="e.g. Adyar" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Content Draft</h4>
                    <button 
                      type="button" 
                      onClick={handleGenerateContent}
                      className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 font-medium"
                    >
                      Generate Template
                    </button>
                  </div>
                  
                  {currentItem.channel === 'google_business_profile' && (
                    <textarea 
                      rows={5}
                      value={currentItem.gbp_post_text || ''} 
                      onChange={e => setCurrentItem({...currentItem, gbp_post_text: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                      placeholder="GBP Post Text (Max 700 chars)"
                    />
                  )}
                  
                  {(currentItem.channel === 'instagram_reel' || currentItem.channel === 'youtube_short') && (
                    <textarea 
                      rows={8}
                      value={currentItem.reel_script || ''} 
                      onChange={e => setCurrentItem({...currentItem, reel_script: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm font-mono text-xs"
                      placeholder="Reel Script & Hooks"
                    />
                  )}
                  
                  {['case_study', 'website_proof', 'learn_article', 'linkedin_post'].includes(currentItem.channel) && (
                    <textarea 
                      rows={10}
                      value={currentItem.caption_long || ''} 
                      onChange={e => setCurrentItem({...currentItem, caption_long: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm font-mono text-xs"
                      placeholder="Long form content / Outline"
                    />
                  )}
                </div>

                {currentItem.status === 'published' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Published URL / Source Asset Link</label>
                    <input type="url" value={currentItem.publish_url || ''} onChange={e => setCurrentItem({...currentItem, publish_url: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" placeholder="https://buildogram.in/..." />
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">UTM Tracking URL Generator</h4>
                      <p className="text-xs text-blue-700 mb-3">Generate a trackable link to use when posting this content on {currentItem.channel.replace(/_/g, ' ')}.</p>
                      <button 
                        type="button"
                        onClick={() => {
                          const baseUrl = currentItem.publish_url || 'https://buildogram.in';
                          const campaign = currentItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                          let tracked = '';
                          
                          if (currentItem.channel === 'google_business_profile') tracked = TrackingPresets.getGbpPost(baseUrl, campaign);
                          else if (currentItem.channel === 'instagram_reel') tracked = TrackingPresets.getInstagramReel(baseUrl, campaign);
                          else if (currentItem.channel === 'youtube_short') tracked = TrackingPresets.getYoutubeShort(baseUrl, campaign);
                          else if (currentItem.channel === 'linkedin_post') tracked = TrackingPresets.getLinkedInPost(baseUrl, campaign);
                          else tracked = buildTrackingUrl(baseUrl, { source: currentItem.channel, medium: 'social', campaign });

                          navigator.clipboard.writeText(tracked);
                          alert('Tracking URL copied to clipboard!\n\n' + tracked);
                        }}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700"
                      >
                        Copy Tracking URL
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsEditorOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" form="editor-form" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
