import { handleUploadingFile } from '../helpers';

const testPicture = new File([''], 'test');
const testEmptyPicture = undefined;

const mockUploadPlantImage = jest.fn(() => Promise.resolve('Image name'));

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
