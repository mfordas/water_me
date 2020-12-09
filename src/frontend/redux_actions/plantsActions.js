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
}