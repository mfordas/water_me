import axios from 'axios';

import {
  addPlantsListType,
  getPlantsListsType,
  deletePlantsListType,
  showPlantsListType,
} from './plantsListsTypes';
import { AppThunk } from '../redux_store/reduxStore';
import setHeaders from '../Utils/setHeaders';

export const getPlantsLists = (): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/plantsLists',
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: getPlantsListsType,
        plantsLists: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: getPlantsListsType,
        plantsLists: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: getPlantsListsType,
      plantsLists: [],
    });
  }
};

export const addPlantsList = (plantsListName: string): AppThunk => async (
  dispatch
) => {
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
        type: addPlantsListType,
        plantsListName: res.data.name,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: addPlantsListType,
      plantsListName: '',
    });
  }
};

export const getPlantsListsForUser = (userId: string): AppThunk => async (
  dispatch
) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plantsLists/${userId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: getPlantsListsType,
        plantsLists: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: getPlantsListsType,
        plantsLists: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: getPlantsListsType,
      plantsLists: [],
    });
  }
};

export const deletePlantsList = (
  userId: string,
  plantsListId: number
): AppThunk => async (dispatch) => {
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
        type: deletePlantsListType,
        plantsListDeleted: true,
      });
    } else if (res.status === 404) {
      dispatch({
        type: deletePlantsListType,
        plantsListDeleted: false,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: deletePlantsListType,
      plantsListDeleted: false,
    });
  }
};

export const showPlantsList = (
  userId: string,
  plantsListId: number
): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plants/${userId}/${plantsListId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: showPlantsListType,
        plants: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: showPlantsListType,
        plants: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: showPlantsListType,
      plants: [],
    });
  }
};
