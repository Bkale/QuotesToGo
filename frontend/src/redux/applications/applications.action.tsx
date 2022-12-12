import { Dispatch } from "redux";
import { Application } from '../../../../shared-types';

export const addApplication = (applicationData: Application[], dispatch: Dispatch) => {
  try {
    console.log(applicationData)
    console.log(dispatch);
    
    dispatch({type: 'ADD_APPLICATION', payload: applicationData})
  } catch (error) {
    // Do something
  }
}

export const setApplications = (applicationData: Application[], dispatch: Dispatch) => {
  try {
    dispatch({type: 'SET_APPLICATIONS', payload: applicationData})
  } catch (error) {
    // Do something
  }
}

export const updateSelectedApp = (selectedAppId: string, dispatch: Dispatch) => {
  try {
    dispatch({type: 'UPDATE_SELECTED_APP', payload: selectedAppId})
  } catch (error) {
    // Do something
  }
}
