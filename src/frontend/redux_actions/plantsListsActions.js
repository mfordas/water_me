import axios from 'axios';

import { TYPES } from './types';
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
        plantsLists: res.data,
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
      plantsLists: [],
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
        name: plantsListName,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.addPlantsList,
        plantsListName: res.data.name,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.addPlantsList,
      plantsListName: '',
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
        plantsLists: res.data,
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
      plantsLists: [],
    });
  }
};

export const deletePlantsList = (userId, plantsListId) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'delete',
      url: `/api/plantsLists/${userId}/${plantsListId}`,
      headers: setHeaders(),
      data: {
        userId: userId,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.deletePlantsList,
        plantsListDeleted: true,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.deletePlantsList,
        plantsListDeleted: false,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.deletePlantsList,
      plantsListDeleted: false,
    });
  }
};

export const showPlantsList = (userId, plantsListId) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plants/${userId}/${plantsListId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.showPlantsList,
        plants: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.showPlantsList,
        plants: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.showPlantsList,
      plants: [],
    });
  }
};
