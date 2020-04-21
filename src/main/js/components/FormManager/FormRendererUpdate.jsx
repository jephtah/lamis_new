import React from 'react';
import Page from 'components/Page';
import { Errors, Form } from 'react-formio';
import * as actions from "actions/formManager";
import {connect} from 'react-redux';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { toast } from 'react-toastify'
import { Card, Alert, CardBody, Spinner } from 'reactstrap'


Moment.locale('en')
momentLocalizer()

const FormRenderer = props => {
  const [form, setForm] = React.useState();
  const [formData, setFormData] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showLoadingEncounter, setShowLoadingEncounter] = React.useState(false)
  const [submission, setSubmission] = React.useState(props.submission)
  const [showLoadingForm, setShowLoadingForm] = React.useState(true)
  const onDismiss = () => setShowErrorMsg(false)
  const options = {}
  //extract the formData as an obj (if form data length is one) or an array
  const extractFormData = (formData) => {
    if(!formData){
        return null;
    }
    if(formData.length === 1){
        setFormData(formData[0]);
      return formData[0].data;
    }

    setFormData(formData);
    return formData.map(item => {
      return item.data;
    })
  }
  React.useEffect(() => {
    const onSuccess = () => {
      setShowLoadingForm(false)
      }
      const onError = errstatus => {
        setErrorMsg('Error loading form, something went wrong')
        setShowErrorMsg(true)
        setShowLoadingForm(false)
      }
    props.fetchForm(props.formCode, onSuccess, onError);
  }, [props.formCode]);
  React.useEffect(() => {
    // if(!props.form.resourceObject && !props.form.resourcePath){
    //     setErrorMsg('Form resource not found, please contact adminstration.')
    //     setShowErrorMsg(true)
    //     return;
    //   }
      setForm(props.form);
  },[props.form]);
  React.useEffect(() => {
    //verify that the encounter in the store is the same as the one passed in props
    if(props.encounterId){
      setShowLoadingEncounter(true);
    }
    if(props.encounter.encounterId === props.encounterId){
        setSubmission({data: extractFormData(props.encounter.formDataObj)});
        setShowLoadingEncounter(false);
    }
  }, [props.encounter]);
  

  const submitForm = ( submission) => {
   // e.preventDefault()
      const onSuccess = () => {
        setShowLoading(false)
        toast.success('Form saved successfully!', { appearance: 'success' })
      }
      const onError = errstatus => {
        setErrorMsg('Something went wrong, request failed! Please contact admin.')
        setShowErrorMsg(true)
        setShowLoading(false)
      }
      const data = {
          data: submission.data,
      }
      props.updateFormData(formData.id, data, 
        props.onSuccess ? props.onSuccess : onSuccess, 
        props.onError ? props.onError : onError);
  }
  return (
    <Page title="" >
      { (showLoadingForm) ? 
   <span className="text-center"><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> Loading form...</span>
:  
<div>
{ (showLoadingEncounter) ? 
  <span className="text-center"><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> Loading encounter information...</span>
:  
 
   <Card >
      <CardBody>
  <h4 class="text-capitalize">{'EDIT '}{props.title || props.form.name}</h4>
      <hr />
      {/* <Errors errors={props.errors} /> */}
      <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
          </Alert>
          
      <Form
          form={props.form.resourceObject}
          submission={submission}
          options={options}
          
          hideComponents={props.hideComponents}
          //onSubmit={props.onSubmit}
          onSubmit={(submission) => {
              if(props.onSubmit){
                  return props.onSubmit(submission);
              }

            return submitForm (submission);
            }}
        />
    </CardBody>
    </Card>
      } </div>  }
    </Page>
  );
}

const mapStateToProps = (state = {formManager: {}}) => {
  return {
    form: state.formManager.form,
    formEncounter: state.formManager.formEncounter,
    errors: state.formManager.errors,
    encounter: state.encounter.encounter
  }
}


const mapActionToProps = {
  fetchForm: actions.fetchById,
  updateFormData: actions.updateFormData
}

export default connect(mapStateToProps, mapActionToProps)(FormRenderer)

