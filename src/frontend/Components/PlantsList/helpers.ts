import React from 'react';

type Event = {
  target: Target;
  preventDefault: () => void;
};

type Target = {
  files: FileList | null;
};

export const handleUploadingFile = async (
  event: Event,
  uploadPlantImage: (photoData: FormData) => Promise<string>,
  setPicture: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  const photoData = new FormData();

  const target = event.target as Target;
  const file: File = (target.files as FileList)[0];

  if (file) {
    photoData.append('image', file);
    const imageName = await uploadPlantImage(photoData);
    setPicture(imageName);
  } else {
    console.error('Image upload error');
  }
};
