import React from 'react';

type Event = {
  target: Target;
  preventDefault: () => void;
};

type Target = {
  files: FileList | null;
};

export const createFileToUpload = (event: Event) => {
  event.preventDefault();

  const target = event.target as Target;
  const file: File = (target.files as FileList)[0];

  return file;
};

export const handleUploadingFile = async (
  file: File,
  uploadPlantImage: (photoData: FormData) => Promise<string>
): Promise<string | void> => {
  const photoData = new FormData();

  if (file) {
    photoData.append('image', file);
    const imageName = await uploadPlantImage(photoData);
    return imageName;
  } else {
    console.error('Image upload error');
  }
};
