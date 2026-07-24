'use client';
import { useEffect, useState } from 'react';

export default function OpsBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', excerpt:'', content:'', tags:'', is_published:false });
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/blog').then(r=>r.json()).then(d=>{setPosts(d.posts||[]);setLoading(false);});
  useEffect(()=>{load();},[]);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const create = async (e) => {
    e.preventDefault();
    const body = {...form, tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean)};
    const r = await fetch('/api/blog',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.ok){setMsg('Post created!');setShowForm(false);setForm({title:'',excerpt:'',content:'',tags:'',is_published:false});load();}
  };

  if(loading) return <div className="flex-center" style={{height:'60vh'}}><div className="spinner"/></div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>Blog CMS</h1><p className="text-muted mt-2">{posts.length} published posts</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="btn btn-primary">+ New Post</button>
      </div>
      {msg && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',color:'var(--success)',fontSize:'14px'}}>{msg}</div>}

      {showForm && (
        <div className="card mb-6">
          <h3 style={{fontSize:'16px',marginBottom:'16px'}}>New Blog Post</h3>
          <form onSubmit={create} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div className="input-group"><label>Title *</label><input className="input" required value={form.title} onChange={e=>set('title',e.target.value)} placeholder="How to Build a 1000 sqft House in Chennai"/></div>
            <div className="input-group"><label>Excerpt</label><input className="input" value={form.excerpt} onChange={e=>set('excerpt',e.target.value)} placeholder="Short description for SEO and previews"/></div>
            <div className="input-group"><label>Tags (comma separated)</label><input className="input" value={form.tags} onChange={e=>set('tags',e.target.value)} placeholder="construction, Chennai, BOQ"/></div>
            <div className="input-group"><label>Content (Markdown) *</label><textarea className="input" required style={{minHeight:'200px',fontFamily:'monospace',fontSize:'13px'}} value={form.content} onChange={e=>set('content',e.target.value)} placeholder="Write your blog post in markdown..."/></div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <input type="checkbox" id="pub" checked={form.is_published} onChange={e=>set('is_published',e.target.checked)} style={{width:'16px',height:'16px'}}/>
              <label htmlFor="pub" style={{fontSize:'14px',cursor:'pointer'}}>Publish immediately</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">Save Post</button>
              <button type="button" onClick={()=>setShowForm(false)} className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {posts.map(p=>(
          <div key={p.id} className="card" style={{padding:'16px 20px'}}>
            <div className="flex-between">
              <div>
                <div style={{fontWeight:'600',fontSize:'15px',marginBottom:'4px'}}>{p.title}</div>
                <div className="text-muted text-xs">{p.excerpt}</div>
              </div>
              <div className="flex gap-2">
                {p.tags?.map(t=><span key={t} className="badge badge-gray">{t}</span>)}
                <span className={`badge ${p.is_published?'badge-green':'badge-gray'}`}>{p.is_published?'Published':'Draft'}</span>
              </div>
            </div>
          </div>
        ))}
        {!posts.length && <div className="empty-state"><div className="empty-icon">📝</div><p>No blog posts yet. Create your first post to improve SEO.</p></div>}
      </div>
    </div>
  );
}
