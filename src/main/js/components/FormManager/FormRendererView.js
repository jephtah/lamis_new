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
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showLoadingEncounter, setShowLoadingEncounter] = React.useState(false)
  const [submission, setSubmission] = React.useState(props.submission)
  const [showLoadingForm, setShowLoadingForm] = React.useState(true)
  const onDismiss = () => setShowErrorMsg(false)
  const options = {
    readOnly: true
    }
  //extract the formData as an obj (if form data length is one) or an array
  const extractFormData = (formData) => {
    if(!formData){
        return null;
    }
    if(formData.length === 1){
      return formData[0].data;
    }
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
      setShowLoadingEncounter(true);
    if(props.encounter.encounterId === props.encounterId){
        console.log(props.encounter)
        setShowLoadingEncounter(false);
        const extractedData = extractFormData(props.encounter.formDataObj);
        if(!extractedData){
            setErrorMsg('Could not load form information');
            setShowErrorMsg(true);
            return;
        }
        setSubmission({data: extractedData});
        
        console.log(submission)
    }
  }, [props.encounter]);
  
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
  <h4 class="text-capitalize">{'VIEW '}{props.title || props.form.name}</h4>
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
}

export default connect(mapStateToProps, mapActionToProps)(FormRenderer)

