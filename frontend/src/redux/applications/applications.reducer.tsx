import { Application } from '../../../../shared-types';

interface ApplicationsState {
  applications: Application[],
  selectedAppId: string,
}

const INITIAL_STATE = {
  applications: [],
  selectedAppId: "",
}
 const applicationReducer = (state: ApplicationsState = INITIAL_STATE, action: { type: string; payload: any; }) => {
  switch (action.type) {
    case "ADD_APPLICATION":
      return {
        ...state,
        applications: [...state.applications, action.payload]
      }
    case "UPDATE_SELECTED_APP":
      return {
        ...state,
        selectedAppId: action.payload
      }
    default:
      return state;
  }
}

export default applicationReducer;