import { SET_SIDO, SET_SIGUGUN, SET_DONG, SET_MAP_VALUES } from '../action/mapActionType'

interface Action {
  type: string;
  payload : any;
}

const initialState = {
  sido: '',
  sigugun: '',
  dong: '',
};

const addressReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_SIDO:
      return {
        ...state,
        sido: action.payload,
        sigugun: '',
        dong: '',
      };
    case SET_SIGUGUN:
      return {
        ...state,
        sigugun: action.payload,
        dong: '',
      };
    case SET_DONG:
      return {
        ...state,
        dong: action.payload,
      };
    case SET_MAP_VALUES:
      return {
        ...state,
        sido : action.payload.sido,
        sigugun : action.payload.sigugun,
        dong: action.payload.dong,
      };
    default:
      return state;
  }
};

export default addressReducer;
