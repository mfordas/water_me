import axios from 'axios';

import {
    addPlantsListType,
    getPlantsListsType,
    deletePlantsListType,
    showPlantsListType,
} from './plantsListsTypes';
import { AppThunk } from '../redux_store/reduxStore';
import { setHeaders } from '../Utils/setHeaders';
import { apiUrl } from '../Utils/apiUrl';
import { PLANTS_LISTS_API_ADDRESS, PLANTS_API_ADDRESS} from './apiAddresses';

export const addPlantsList = (plantsListName: string): AppThunk => async (
    dispatch
) => {
    try {
        const res = await axios.post(
            `${apiUrl()}${PLANTS_LISTS_API_ADDRESS}`,
            {
                userId: localStorage.getItem('id'),
                name: plantsListName,
            },
            {
                headers: setHeaders(),
            }
        );

        if (res.status === 200) {
            dispatch({
                type: addPlantsListType,
                plantsListName: res.data.name,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
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
        const res = await axios.get(`${apiUrl()}${PLANTS_LISTS_API_ADDRESS}${id}`, {
            headers: setHeaders(),
        });

        if (res.status === 200) {
            dispatch({
                type: getPlantsListsType,
                plantsLists: res.data,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
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
        const res = await axios.delete(
            `${apiUrl()}${PLANTS_LISTS_API_ADDRESS}${id}/${plantsListId}`,
            {
                headers: setHeaders(),
                data: {
                    userId: id,
                },
            }
        );

        if (res.status === 200) {
            dispatch({
                type: deletePlantsListType,
                plantsListDeleted: true,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
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
        const res = await axios.get(`${apiUrl()}${PLANTS_API_ADDRESS}${id}/${plantsListId}`, {
            headers: setHeaders(),
        });

        if (res.status === 200) {
            dispatch({
                type: showPlantsListType,
                plants: res.data,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        dispatch({
            type: showPlantsListType,
            plants: [],
        });
    }
};
