import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Eye } from 'lucide-react';
import { uploadDocumentApi, getDocumentByUserApi } from '../api/adduploads.api';

const DataUpload = ({ userId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [previousUploads, setPreviousUploads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await getDocumentByUserApi(userId);
      setPreviousUploads(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('purpose', data.purpose || 'No Name');

      await uploadDocumentApi(formData);
      fetchDocuments(); // Refresh uploaded documents
    } catch (error) {
      console.error('Upload failed:', error);
    }
    setLoading(false);
  };

  const file = watch('file');

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📤 Data Upload</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input {...register('purpose', { required: true })} placeholder="Purpose" className="input-field" />

          <div className="relative bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <input type="file" id="file-upload" {...register('file', { required: true })} className="hidden" />
            <label htmlFor="file-upload" className="cursor-pointer flex w-full justify-between">
              <span className="text-gray-500">{file?.[0]?.name || '📁 Choose File'}</span>
              <Eye size={18} className="text-blue-500" />
            </label>
            {errors.file && <p className="text-red-500 text-sm mt-1">File is required</p>}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Uploading...' : <><Upload size={18} /> Upload Data</>}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📂 Previous Uploads</h3>
          <div className="bg-gray-100 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
            {previousUploads.length > 0 ? (
              previousUploads.map((upload) => (
                <div key={upload._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 p-4">
                  <p className="text-sm text-gray-800">{upload.purpose}</p>
                  <a href={`http://localhost:3000/file/download/${upload.file._id}`} download rel="noopener noreferrer" className="text-blue-500 text-sm">Download</a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No uploads found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;