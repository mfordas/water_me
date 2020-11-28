import axios from 'axios';

import {
  TYPES
} from './types';
import setHeaders from '../Utils/setHeaders';

export const getPlantsLists = () => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/plantsLists',
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.getPlantsLists,
        plantsLists: res.data
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.loginExternal,
        plantsLists: [],
      });
    }

  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.getPlantsLists,
      plantsLists: []
    });
  }
};

export const addPlantsList = (plantsListName) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/plantsLists',
      headers: setHeaders(),
      data: {
        userId: localStorage.getItem('id'),
        name: plantsListName
      }
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.addPlantsList,
        plantsListName: res.data.name
      });
    }

  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.addPlantsList,
      plantsListName: ''
    });
  }
};

export const getPlantsListsForUser = (userId) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plantsLists/${userId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.getPlantsLists,
        plantsLists: res.data
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.loginExternal,
        plantsLists: [],
      });
    }

  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.getPlantsLists,
      plantsLists: []
    });
  }
};