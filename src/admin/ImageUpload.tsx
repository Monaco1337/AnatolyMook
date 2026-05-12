import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  label?: string;
  bucket?: string;
  path?: string;
}

export default function ImageUpload({ currentImage, onImageChange, label = 'Bild', bucket = 'home-images', path }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadImage(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await uploadImage(files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien hochladen!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Datei ist zu groß! Maximum 5MB.');
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path ? `${path}/${filePath}` : filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path ? `${path}/${filePath}` : filePath);

      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Fehler beim Upload!');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">{label}</label>

      {previewUrl ? (
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
            ${isUploading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="space-y-3">
            {isUploading ? (
              <>
                <div className="mx-auto w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-600">Wird hochgeladen...</p>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  {isDragging ? (
                    <Upload size={32} className="text-blue-500" />
                  ) : (
                    <ImageIcon size={32} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {isDragging ? 'Bild hier ablegen' : 'Bild hochladen'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Drag & Drop oder klicken zum Auswählen
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF, WEBP bis zu 5MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
