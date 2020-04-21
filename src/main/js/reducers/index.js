import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'
import encounterReducer from './encounterReducer'
import formManagerReducer from './formManagerReducer'
import pharmReducer from "./pharmacyReducer";
import laboratoryReducer from "./laboratoryReducer"
import consultationReducer from './consultationReducer'
import medicationReducer from './medicationReducer'

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
  pharmacy: pharmReducer,
  encounter: encounterReducer,
  laboratory: laboratoryReducer,
  formManager: formManagerReducer,
  consultations: consultationReducer,
  medication: medicationReducer
})

