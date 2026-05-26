import { useState, useEffect } from 'react';

export default function DocumentsTab({ lead }) {
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/documents?leadId=${lead.id}`).then(r => r.json()).then(d => {
      if (d.data) setDocs(d.data);
    });
  }, [lead.id]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('leadId', lead.id);
    formData.append('documentType', 'other');
    formData.append('uploadedByUserId', 'System Ops');
    formData.append('visibility', 'ops_only');

    try {
      const res = await fetch('/api/documents/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setDocs([data.data, ...docs]);
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      alert('Upload error');
    }
    setUploading(false);
  };

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Documents & Files</h3>
        <div>
          <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
            {uploading ? 'Uploading...' : 'Upload Document'}
            <input type="file" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>
      
      <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>File Name</th>
            <th style={{ padding: '10px' }}>Type</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Visibility</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {docs.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No documents uploaded yet.</td></tr>
          ) : (
            docs.map(doc => (
              <tr key={doc.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 10px', fontWeight: 600 }}>{doc.fileName}</td>
                <td style={{ padding: '12px 10px', textTransform: 'capitalize' }}>{doc.documentType.replace('_', ' ')}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-blue">{doc.status}</span></td>
                <td style={{ padding: '12px 10px' }}>{doc.visibility}</td>
                <td style={{ padding: '12px 10px' }}>
                  <a href={doc.fileUrl} target="_blank" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>View</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
