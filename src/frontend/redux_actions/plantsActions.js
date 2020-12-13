import axios from 'axios';

import {
  TYPES
} from './types';
import setHeaders from '../Utils/setHeaders';

export const addPlantToList = (plantDataFromUser, plantsListId) => async (dispatch) => {
    try {
        const res = await axios({
          method: 'post',
          url: `/api/plants/${plantsListId}`,
          headers: setHeaders(),
          data: plantDataFromUser
        });
    
        if (res.status === 200) {
          dispatch({
            type: TYPES.addPlant,
            plantData: res.data
          });
        }
    
      } catch (error) {
        console.error('Error:', error.response.data);
        dispatch({
          type: TYPES.addPlant,
          plantData: {}
        });
      }
};

export const deletePlant = (userId, plantId) => async (dispatch) => {
  try {
      const res = await axios({
        method: 'delete',
        url: `/api/plants/${userId}/${plantId}`,
        headers: setHeaders(),
      });
  
      if (res.status === 200) {
        dispatch({
          type: TYPES.deletePlant,
          plantDeleted: true,
        });
      }
  
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: TYPES.deletePlant,
        plantDeleted: false,
      });
    }
};

export const updateLastWateringDate = (userId, plantId, lastWateringDate) => async (dispatch) => {
  try {
      const res = await axios({
        method: 'patch',
        url: `/api/plants/${userId}/${plantId}`,
        headers: setHeaders(),
        data: {
          lastTimeWatered: lastWateringDate,
        }
      });
  
      if (res.status === 200) {
        dispatch({
          type: TYPES.updateLastWateringDate,
          plantDeleted: true,
        });
      }
  
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: TYPES.updateLastWateringDate,
        plantDeleted: false,
      });
    }
};

export const uploadPlantImage = (fileObject) => async (dispatch) => {
  try {
      const res = await axios({
        method: 'post',
        url: `/api/plants/image`,
        headers: setHeaders(),
        data: fileObject
      });

      if (res.status === 200) {
        dispatch({
          type: TYPES.uploadImage,
          imageName: res.data
        });

        return res.data;
      }
  
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: TYPES.uploadImage,
        imageName: ''
      });
    }
};