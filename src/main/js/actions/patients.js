import axios from "axios";
import { url as baseUrl } from "../api";
import * as ACTION_TYPES from "./types";
import * as CODES from "api/codes";
import { toast } from "react-toastify";

/**
 * @Actions
 * CheckIn CRUD OPERATIONS
 * returns API response from server
 * =================================
 * fetchAll()
 * fetchById()
 * create()
 * update()
 * Delete()
 * fetchPatientVitals()
 * fetchPatientAllergies()
 * fetchPatientLatestVitalSigns()
 * fetchCountries()
 * @method GET => fetchPatientTestOrders()  get all patient's lab order encounter: params {patientId}{formName} || query {null}
 * @method GET => fetchPatientEncounters() get all patient's encounter: params{patientId, onSuccess, onError} || query{null}
 * @method GET => fetchPatientEncounterProgramCodeExclusionList() get all patient's encounter that is not general service: params{patientId, onSuccess, onError} || query{null}
 */

export const fetchAll = () => dispatch => {
  console.log(baseUrl);
  axios
    .get(`${baseUrl}patients/`)
    .then(response => {
      //console.log(response.data);
      dispatch({
        type: ACTION_TYPES.PATIENTS_FETCH_ALL,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      })
    );
};

export const fetchById = id => dispatch => {
  
  axios
    .get(`${baseUrl}patients/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_FETCH_BY_ID,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: error
      })
      
    );
    
};


export const create = data => dispatch => {
  console.log(data);
  axios
    .post(`${baseUrl}patients/`, data)
    .then(response => {

      dispatch({
        type: ACTION_TYPES.PATIENTS_CREATE,
        payload: response.data
      });
      console.log(response);
      toast.success("Patient Register Save Successfully!");
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: error.response.data.apierror.message
      });
      if(error.response.data.apierror.message===null || error.response.data.apierror.message===""){
        toast.error("Something went wrong");
      }else{
        toast.error(error.response.data.apierror.message);
      }
       
       //console.log(error.response.data.apierror.message);
    });
};

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}patients/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_UPDATE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

export const Delete = (id, onSuccess) => dispatch => {
  axios
    .delete(`${baseUrl}patients/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_DELETE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        types: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

// export const fetchPatientAllergies = id => dispatch => {
//   axios
//     .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/CONSULATION_FORM/`)
//     .then(response => {
//       dispatch({
//         type: ACTION_TYPES.PATIENT_ALLERGIES,
//         payload: response.data
//       })
//     })
//     .catch(error =>
//       dispatch({
//         type: ACTION_TYPES.PATIENTS_ERROR,
//         payload: 'Something went wrong, please try again'
//       })
      
//     )
   
// }



export const fetchPatientAllergies = id => dispatch => {
  axios
    .get(`${baseUrl}patients/${id}/encounters/d157d4e2-4031-499d-b32b-7562208a10cf/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENT_ALLERGIES,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: 'Something went wrong, please try again'
      })
      
    )
   
}


export const fetchPatientLatestVitalSigns = (id) => dispatch => {
 if(id){
  axios
    .get(`${baseUrl}patients/${id}/encounters/${CODES.VITAL_SIGNS_FORM}`, {limit: 1, sortField: "dateEncounter", sortOrder: "desc"} )
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENT_LATEST_VITAL_SIGNS,
        payload: response.data[0]
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: 'Something went wrong, please try again'
      })
      
    )
    }  
}


export const fetchPatientVitalSigns = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}patients/${id}/encounters/${CODES.VITAL_SIGNS_FORM}`)
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_VITAL_SIGNS,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }


 export const fetchPatientTestOrders = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}patients/${id}/encounters/${CODES.LAB_TEST_ORDER_FORM}`, {limit: 5, sortField: "dateEncounter", sortOrder: "desc"})
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_LAB_ORDERS,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }
 export const fetchPatientLatestMedicationOrder = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}patients/${id}/encounters/${CODES.DRUG_PRESCRIPTION_FORM}`, {limit: 5, sortField: "dateEncounter", sortOrder: "desc"} )
     .then(response => {
       onSuccess();
       dispatch({
         type: ACTION_TYPES.PATIENT_LATEST_MEDICATION_LIST,
         payload: response.data
       })
     })
     .catch(error => {
        onError();
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       
      }
     )
     }  
 }

 export const fetchPatientEncounters = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}encounters/${id}` )
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_ENCOUNTER_LIST,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }

 export const fetchByHospitalNumber = (id, onSuccess, onError) => dispatch => {
  axios
    .get(`${baseUrl}patients/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_FETCH_BY_ID,
        payload: response.data
      });
      onSuccess();
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      })
      onError();
    }
    );
};
 
export const fetchPatientEncounterProgramCodeExclusionList = (id, onSuccess, onError) => dispatch => {
  if(id){
    const exclusionList = [CODES.GENERAL_SERVICE];
   axios
     .get(`${baseUrl}patients/${id}/encounters/programCodeExclusionList?programCodeExclusionList=${exclusionList}` )
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_EXCLUSIVE_ENCOUNTER_LIST,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }

export const fetchCountries = () => dispatch => {
  axios(`${baseUrl}countries`)
    .then(response => {
      console.log(response)
      dispatch({
        type: ACTION_TYPES.FETCH_COUNTRIES,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: 'Something went wrong, please try again'
    })
  })
 }
