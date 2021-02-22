import React, { ChangeEvent } from 'react';

export const handleUploadingFile = async (
  event: ChangeEvent,
  uploadPlantImage: (photoData: FormData) => Promise<string>,
  setPicture: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  const photoData = new FormData();

  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  if (file) {
    photoData.append('image', file);
  }

  const imageName = await uploadPlantImage(photoData);

  setPicture(imageName);
};
