import { useEffect, useState } from 'react';

export default function FileUpload({ onUploadComplete, label = 'Upload File', accept = 'image/*' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/config/features')
      .then(response => response.json())
      .then(features => { if (active) setAvailable(Boolean(features.cloudinaryUploads)); })
      .catch(() => { if (active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !available) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      onUploadComplete(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={uploading || !available}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-500/10 file:text-orange-500
            hover:file:bg-orange-500/20
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {uploading && (
          <div className="absolute right-4 top-2 text-sm text-orange-500 font-medium">
            Uploading...
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {!available && <p className="text-gray-500 text-sm mt-1">Uploads are not available in this environment.</p>}
    </div>
  );
}
