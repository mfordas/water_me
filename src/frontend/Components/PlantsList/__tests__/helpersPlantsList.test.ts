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

const testPicture = new File([''], 'test');
const testEmptyPicture = undefined;

const mockUploadPlantImage = jest.fn(() => 'Image name');

describe('Uploading plant picture', () => {
  it('should upload plant picture with success', async () => {
    await handleUploadingFile(testPicture, mockUploadPlantImage);

    expect(mockUploadPlantImage).toHaveBeenCalledTimes(1);
  });

  it('should log an error if plant picture is not availabe', async () => {
    await handleUploadingFile(testEmptyPicture, mockUploadPlantImage);

    expect(mockUploadPlantImage).toHaveBeenCalledTimes(0);
  });
});
