import { handleUploadingFile } from '../helpers';

const fileData = {
  target: {
    files: [
      {
        lastModified: 1611570711084,
        name: 'Display_products_component_design.png',
        size: 11122,
        type: 'image/png',
        webkitRelativePath: '',
      },
    ],
  },
  preventDefault: () => {},
};

const emptyFileData = {
  target: {
    files: [],
  },
  preventDefault: () => {},
};

const mockUploadPlantImage = jest.fn(() => 'Image name');
const mocksetPicture = jest.fn(() => console.log('Image filename set'));

describe('Uploading plant picture', () => {
  it('should upload plant picture with success', async () => {
    await handleUploadingFile(fileData, mockUploadPlantImage, mocksetPicture);

    expect(mockUploadPlantImage).toHaveBeenCalledTimes(1);
    expect(mocksetPicture).toHaveBeenCalledTimes(1);
  });

  it('should log an error if plant picture is not availabe', async () => {
    await handleUploadingFile(
      emptyFileData,
      mockUploadPlantImage,
      mocksetPicture
    );

    expect(mockUploadPlantImage).toHaveBeenCalledTimes(0);
    expect(mocksetPicture).toHaveBeenCalledTimes(0);
  });
});
