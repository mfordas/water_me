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

export const getPlantsListsForUser = (): AppThunk => async (
  dispatch
): Promise<void> => {
  const id = localStorage.getItem('id');
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plantsLists/${id}`,
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

export const deletePlantsList = (plantsListId: number): AppThunk => async (
  dispatch
) => {
  const id = localStorage.getItem('id');
  try {
    const res = await axios({
      method: 'delete',
      url: `/api/plantsLists/${id}/${plantsListId}`,
      headers: setHeaders(),
      data: {
        userId: id,
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

export const showPlantsList = (plantsListId: number): AppThunk => async (
  dispatch
) => {
  const id = localStorage.getItem('id');
  try {
    const res = await axios({
      method: 'get',
      url: `/api/plants/${id}/${plantsListId}`,
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
