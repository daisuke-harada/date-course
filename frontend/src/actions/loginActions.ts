import { client } from '../lib/api/client'
import { Dispatch } from 'redux'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (name: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const response = await client.post('login', {
      signInParams: { name, password }
    });

    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: response.data });
    }
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data : 'Unknown error' });
  }
}