import axios from 'axios';

import {
  addPlantType,
  deletePlantType,
  updateLastWateringDateType,
  uploadImageType,
} from '../redux_actions/plantsTypes';
import { AppThunk, AppThunkWithReturn } from '../redux_store/reduxStore';
import setHeaders from '../Utils/setHeaders';

export type PlantData = {
  name: string;
  wateringCycle: number;
  pictureUrl: string;
  wateringCycleBeginingData: string;
  lastTimeWatered: string;
};

export const addPlantToList = (
  plantDataFromUser: PlantData,
  plantsListId: number
): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/api/plants/${plantsListId}`,
      headers: setHeaders(),
      data: plantDataFromUser,
    });

    if (res.status === 200) {
      dispatch({
        type: addPlantType,
        plantData: res.data,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: addPlantType,
      plantData: {},
    });
  }
};

export const deletePlant = (
  userId: string,
  plantId: number
): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      method: 'delete',
      url: `/api/plants/${userId}/${plantId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: deletePlantType,
        plantDeleted: true,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: deletePlantType,
      plantDeleted: false,
    });
  }
};

export const updateLastWateringDate = (
  userId: string,
  plantId: number,
  lastWateringDate: string
): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      method: 'patch',
      url: `/api/plants/${userId}/${plantId}`,
      headers: setHeaders(),
      data: {
        lastTimeWatered: lastWateringDate,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: updateLastWateringDateType,
        wateringDateUpdated: true,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: updateLastWateringDateType,
      wateringDateUpdated: false,
    });
  }
};

export const uploadPlantImage = (
  fileObject: FormData
): AppThunkWithReturn => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/api/plants/image`,
      headers: setHeaders(),
      data: fileObject,
    });

    if (res.status === 200) {
      dispatch({
        type: uploadImageType,
        imageName: res.data,
      });

      return res.data;
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: uploadImageType,
      imageName: '',
    });
  }
};
