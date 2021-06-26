import axios from 'axios';

import {
    addPlantType,
    deletePlantType,
    updateLastWateringDateType,
    uploadImageType,
} from '../redux_actions/plantsTypes';
import { AppThunk, AppThunkWithReturn } from '../redux_store/reduxStore';
import { setHeaders } from '../Utils/setHeaders';
import { apiUrl } from '../Utils/apiUrl';
import { PLANTS_API_ADDRESS, PLANTS_IMAGE_API_ADDRESS } from './apiAddresses';

export type PlantData = {
  name: string;
  wateringCycle: number;
  pictureUrl: string;
  wateringCycleBeginingData: string;
  lastTimeWatered: string;
};

export const addPlantToList = (
    plantDataFromUser: PlantData,
    plantsListId: string
): AppThunk => async (dispatch) => {
    try {
        const res = await axios.post(
            `${apiUrl()}${PLANTS_API_ADDRESS}${plantsListId}`,
            plantDataFromUser,
            {
                headers: setHeaders(),
            }
        );

        if (res.status === 200) {
            dispatch({
                type: addPlantType,
                plantData: res.data,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        dispatch({
            type: addPlantType,
            plantData: {},
        });
    }
};

export const deletePlant = (plantId: number): AppThunk => async (dispatch) => {
    const userId = localStorage.getItem('id');
    try {
        const res = await axios.delete(
            `${apiUrl()}${PLANTS_API_ADDRESS}${userId}/${plantId}`,
            {
                headers: setHeaders(),
            }
        );

        if (res.status === 200) {
            dispatch({
                type: deletePlantType,
                plantDeleted: true,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        dispatch({
            type: deletePlantType,
            plantDeleted: false,
        });
    }
};

export const updateLastWateringDate = (
    plantId: number,
    lastWateringDate: string
): AppThunk => async (dispatch) => {
    const userId = localStorage.getItem('id');
    try {
        const res = await axios.patch(
            `${apiUrl()}${PLANTS_API_ADDRESS}${userId}/${plantId}`,
            {
                lastTimeWatered: lastWateringDate,
            },
            { headers: setHeaders() }
        );

        if (res.status === 200) {
            dispatch({
                type: updateLastWateringDateType,
                wateringDateUpdated: true,
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
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
        const res = await axios.post(`${apiUrl()}${PLANTS_IMAGE_API_ADDRESS}`, fileObject, {
            headers: setHeaders(),
        });

        if (res.status === 200) {
            dispatch({
                type: uploadImageType,
                imageName: res.data,
            });

            return res.data;
        }
    } catch (error) {
        dispatch({
            type: uploadImageType,
            imageName: '',
        });
        console.error('Error:', error.message);
    }
};
