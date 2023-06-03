import { SET_SIDO, SET_SIGUGUN, SET_DONG } from './mapActionType';
import {addressProps} from '../constant/interfaces'


export const setSido = (sido:addressProps) => ({
  type: SET_SIDO,
  payload: sido,
});

export const setSigugun = (sigugun:addressProps) => ({
  type: SET_SIGUGUN,
  payload: sigugun,
});

export const setDong = (dong:addressProps) => ({
  type: SET_DONG,
  payload: dong,
});

export const setMapValues = (sido: addressProps, sigugun: addressProps, dong: addressProps) => {
  return {
    type : 'SET_MAP_VALUES',
    payload : {sido, sigugun, dong},
  };
};