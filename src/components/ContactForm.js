import React from "react"
import axios from "axios"
import styled from 'styled-components'
import '../styles/styles.scss'
import SuccessModal from '../components/SuccessModal'
 
const ContactUsFormWrapper = styled.div`
    display: block;
    margin: 0 auto;
    width: 80%;
`
const FormField = styled.div`
    display: grid;
`
const FieldLabel = styled.span`
    font-size: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-weight: bolder;
`
const FieldDescription = styled.p`
    font-size: 14px;
    padding-top: 3px;
    padding-bottom: 3px;
`
const SubmitButton = styled.button`
    text-align: center;
    background-color: #006226;
    border: none;
    color: white;
    font-size: 23px;
    font-weight: bold;
    padding: 12px;
    margin-top: 30px;
`
const ContactNameFields = styled.div`
    display: inline-grid;
`;

const FormTitle = styled.h1`
    text-align: center;
    margin-top: 20px;
`;


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPhoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const checkFormErrors = (errorObj) => {
	//console.log(errorObj)
	let valid = true;
	Object.values(errorObj).forEach((val) => {
		//console.log(val)
		val.length > 0 && (valid = false)
	});
	return valid;
}

// Object declarations
// Error objects for form validation (live and otherwise..)
var missingFieldsCollection = {};
var liveErrorsCollection = {};

class ContactUsForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
					validSubmission: null,
					errorsPresent: null,
					requestStatusData: {},
					requestObjectData: {},
					feedbackMsg: '',
					first_name: '',
					last_name: '',
                    phone: '', 
					email: '',
					comments: '',
			}
    }
     
	renderErrorList(errorObj) {
		return Object.values(errorObj).map((error, i) => {
			console.log(error)
			if (error != '') {
				return (
					<li key={i}>{error}</li>
				)
			}
		})
	}

    onChange = (e) => {
        e.preventDefault();
				const { name, value, id } = e.target;
        //console.log({[name]: value});
		//CASES FOR LIVE VALIDATION
		switch (name) {
			case 'phone': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validPhoneRegex.test(value) ? '' : 'Phone number is not valid!'
				}
			break;
			case 'email': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validEmailRegex.test(value) ? '' : 'Email is not valid!'
				}
			break;
		default:
			break;
		}

		this.setState({
			[name]: value
		})
		//console.log(this.state.errors.live_validation)
		//console.log(this.state.formData)
	}
	
	validateForm = (e) => {
		e.preventDefault();

		//Validation missing fields
		let formData = Object.values(e.target)
		formData.map((item) => {
			if (item.tagName == "INPUT" && item.type != "checkbox") {
				missingFieldsCollection[item.name] = item.value == '' && item.id == 'required'
				? item.title + ' is missing' 
				: '';
			}
		})

		console.log(missingFieldsCollection)
		console.log(liveErrorsCollection)

		if (checkFormErrors(missingFieldsCollection) && checkFormErrors(liveErrorsCollection)) {
			console.info('Valid Form')
			this.setState({
				feedbackMsg: "Thank you for your submission!  We will review your advertisement request and get back to your shortly.",
				validSubmission: true
			});
			this.handleSubmit(e)
		} else {
			console.error('Invalid Form')
			//console.log(missingFields)
			//console.log(inputValidation)
			//console.log(this.state.errors)
			//console.log(this.state.errors.missing_fields.length)
			//console.log(this.state.errors.input_validation.length)
			this.setState({
				feedbackMsg: "We found some errors with your event submission.  The errors have been highlighted. Please go through the form and try again.  Thanks!",
				validSubmission: false,
				errorsPresent: true
			});
			
		}
	}
 
    handleSubmit = (e) => {
        e.preventDefault();
		
        // Submit to Gravity Forms API. Upon success, set the feedback message and clear all
        // the fields within the form. Upon failure, keep the fields as they are,
        // but set the feedback message to show the error state.
        axios({
            method: 'post',
            url: process.env.GATSBY_CONTACT_FORM_API_ENPOINT, 
            data: {
                "input_values": {
					"input_1_3": this.state.first_name,
					"input_1_6": this.state.last_name,
					"input_1": this.state.first_name + " " + this.state.last_name,
                    "input_2": this.state.phone,
                    "input_3": this.state.email,
                    "input_4": this.state.comments,
                }
            },
            auth: {
                username: process.env.GATSBY_CONTACT_CONSUMER_KEY,
                password: process.env.GATSBY_CONTACT_CONSUMER_SECRET
              },
            headers: {
            //"Access-Control-Allow-Origin": "*",
            'Content-Type' : 'application/x-www-form-urlencoded'
            //"Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
            }
        }).then(response => {
			  
			console.log(response);
			console.log(this.state);
			
			this.setState({
			  //feedbackMsg: "Form submitted successfully!",
			  requestObjectData: JSON.parse(response.config.data),
			  requestStatusData: response.data
			})
			
			console.log(this.state.requestObjectData);
			console.log(this.state.requestStatusData);
			
			
		  }).catch(error => {
			  
			console.log(error);
			this.setState({
			  feedbackMsg: "Form could not be submitted.",
			})
			
		  })
		  
    }
       
 
    render() {
        return (
                <ContactUsFormWrapper> 
                    <FormTitle>Contact Us</FormTitle>
                    <p>Please let us know know how we can help.</p>
					{this.state.validSubmission && <div className="success">{<SuccessModal/>}</div>}
					{this.state.errorsPresent && <ul>{this.renderErrorList(missingFieldsCollection)}</ul>}
					{this.state.errorsPresent && <ul>{this.renderErrorList(liveErrorsCollection)}</ul>}
					{/*!checkFormErrors(this.state.errors) && <ul>{this.renderErrorList()}</ul>*/}
					<form className="submit_event_form" name="Submit Event Form" method="POST" onSubmit={this.validateForm} >
						<FormField className="required">
							<FieldLabel>Name</FieldLabel>
								<ContactNameFields className="contact_name">
									<label htmlFor="first">First</label>
									<input type="text" id="required" title="First Name" name="first_name"  value={this.state.first_name}  onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('first_name') && <span className='error'>{missingFieldsCollection.first_name}</span>}
									<label htmlFor="last">Last</label>
									<input type="text" id="required" title="Last Name" name="last_name"  value={this.state.last_name}  onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('last_name') && <span className='error'>{missingFieldsCollection.last_name}</span>}
								</ContactNameFields>
						</FormField>
						<FormField className="required">
							<FieldLabel>Phone</FieldLabel>
							<FieldDescription>Full 10-digit phone number, with or without dashes.</FieldDescription>
							<input type="tel" name="phone" id="required" title="Contact Phone" placeholder="###-###-####" value={this.state.phone} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('phone') && <span className='error'>{missingFieldsCollection.phone}</span>}
							{liveErrorsCollection.hasOwnProperty('phone') && <span className='error'>{liveErrorsCollection.phone}</span>}
						</FormField>
                        <FormField className="required">
							<FieldLabel>Email</FieldLabel>
							<input type="text" name="email" id="required" title="Contact Email" placeholder="Enter your full email address" value={this.state.email} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('email') && <span className='error'>{missingFieldsCollection.email}</span>}
							{liveErrorsCollection.hasOwnProperty('email') && <span className='error'>{liveErrorsCollection.email}</span>}
						</FormField>
						<FormField>
							<FieldLabel>Comment or Questions?</FieldLabel>
							<textarea type="text" name="comments" title="Additional Information" value={this.state.comments} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('comments') && <span className='error'>{missingFieldsCollection.comments}</span>}
						</FormField>
						<SubmitButton type="submit">Submit</SubmitButton>
					</form>
				</ContactUsFormWrapper>
		)
	}
}
 
export default ContactUsForm