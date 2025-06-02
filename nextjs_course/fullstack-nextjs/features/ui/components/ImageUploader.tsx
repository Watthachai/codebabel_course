import { cn } from '@/features/shadcn/utils';
import { ACCEPTED_IMAGE_TYPES } from '@/features/shared/validators/image';
import Image from 'next/image';
import { type ChangeEventHandler, useState } from 'react';

interface ImageUploaderProps {
  defaultImage: string;
  onImageChanged: (file: File) => void;
  error?: string | undefined;
  rounded?: boolean;
}

const ImageUploader = ({
  defaultImage,
  onImageChanged,
  error,
  rounded,
}: ImageUploaderProps) => {
  const [image, setImage] = useState(defaultImage);

  const previewImage = (image: string) => {
    setImage(image);
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const image = URL.createObjectURL(file);

    previewImage(image);
    onImageChanged(file);
  };

  return (
    <div className="mx-auto w-48 rounded-lg bg-white px-4 py-5 text-center shadow-lg">
      <div className="mb-4">
        <Image
          priority
          className={cn(
            'mx-auto w-auto object-cover object-center',
            rounded && 'rounded-full',
          )}
          src={image}
          alt="Image Upload"
          width={100}
          height={100}
        ></Image>
        <label className="mt-6 cursor-pointer">
          <span className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm leading-normal text-white">
            Select Image
          </span>
          <input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(', ')}
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <div className="mt-2 text-sm text-red-500">{error}</div>
      </div>
    </div>
  );
};

export default ImageUploader;
