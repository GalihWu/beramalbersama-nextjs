import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';

interface ImageUploadProps {
  label: string;
  image: File | null | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onChange,
  label,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange(e);
    }
  };
  return (
    <div>
      <label className="form-label" htmlFor="upload">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer relative">
        {image ? (
          typeof image === 'string' ? (
            <Image
              src={image}
              width={500}
              height={500}
              alt="Uploaded preview"
              className="w-full h-auto mb-4"
            />
          ) : (
            <Image
              width={500}
              height={500}
              src={previewUrl || ''}
              alt="Uploaded preview"
              className="w-full h-auto mb-4"
            />
          )
        ) : (
          <FaFileUpload className="text-gray-300 text-6xl mb-4" />
        )}
        <span className="text-gray-400">
          {image ? 'Change image' : 'Click to upload image'}
        </span>
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
