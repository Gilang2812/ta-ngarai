'use client';

import { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register FilePond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface GalleryUploadProps {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function GalleryUpload({ images, setImages }: GalleryUploadProps) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    // Convert files to FilePond files
    if (images.length > 0 && files.length === 0) {
      setFiles(
        images.map((file) => ({
          source: file,
          options: {
            type: 'local'
          }
        }))
      );
    }
  }, [images]);

  const handleUpdateFiles = (fileItems: any[]) => {
    setFiles(fileItems);
    
    // Convert FilePond files to regular files
    const updatedFiles = fileItems.map(fileItem => fileItem.file);
    setImages(updatedFiles);
  };

  return (
    <div className="mt-1">
      {/* In a real implementation, we would add a proper file server endpoint */}
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        maxFiles={10}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        credits={false}
      />
    </div>
  );
}

