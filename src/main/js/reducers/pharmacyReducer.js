import * as ACTION_TYPES from "../actions/types";

const pharmReducer = (state = { allPrescriptions: [], patientPrescriptions: [] }, action) => {
  switch (action.type) {
    case ACTION_TYPES.PHARMACY_FETCH_PRESCRIPTIONS:
      return { ...state, allPrescriptions: [...action.payload] };
    case ACTION_TYPES.FETCH_PATIENT_PRESCRIPTIONS:
      return { ...state, patientPrescriptions: [...action.payload] };
    case ACTION_TYPES.UPDATE_PRESCRIPTION_STATUS:
      return { ...state, update: action.payload };
    default:
      return state;
  }
};

export default pharmReducer;

