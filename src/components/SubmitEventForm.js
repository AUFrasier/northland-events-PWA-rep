import React from "react"
import axios from "axios"
import styled from 'styled-components'
import '../styles/styles.scss'
import SuccessModal from '../components/SuccessModal'
 
const EventFormWrapper = styled.div`
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
const CategoryCheckbox = styled.input`
    margin-right: 15px;
`;

const EventAddressFields = styled.div`
    display: inline-grid;
`;

const ContactNameFields = styled.div`
    display: inline-grid;
`;

const FormTitle = styled.h1`
    text-align: center;
    margin-top: 20px;
`;


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPhoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const currentDate = new Date();
const validTimeRegex = RegExp(/^\d{1,2}:\d{2}([ap]m)?$/);
const validCurrencyRegex = RegExp(/(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/);
const validUrlRegex = RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
//const validFBRegex = RegExp(/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/);

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

class SubmitEventForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
					validSubmission: null,
					errorsPresent: null,
					requestStatusData: {},
					requestObjectData: {},
					feedbackMsg: '',
					event_name: '',
					event_date: '',
					event_time_start: '',
					event_time_end: '',
					//checkboxes start
					'categories': {
							'Arts & Culture': false,
							'Festivals': false, 
							'Educational': false,
							'Sports': false,
							'Political': false,   
							'Religious': false,
							'Food': false,
							'Health & Wellness': false,
					},
					chosen_category: null,
					//checkboxes end
					event_location: '', 
					street_add: '', 
					city_add: '',
					state_add: '',
					zip_add: '', 
					first_name: '',
					last_name: '',
					event_contact_phone: '', 
					event_contact_email: '',
					event_website: '',
					event_FB: '',
					event_cost: '', 
					event_picture: '',
					event_description: '',
			}
    }
     
    renderEventCategories() {
        const categories = ['Arts & Culture', 'Festivals', 'Educational', 'Sports', 'Political', 'Religious', 'Food', 'Health & Wellness']
        return categories.map((category, i) => {
            return (
                <span key={i}>
					<CategoryCheckbox 
                        type="checkbox"
												name={category}
												id="category"
                        value={this.state.categories[category]}
                        onChange={this.onCategoryChange.bind(this)}
                    />
                    {category}
                </span>
            )
        })
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

    onCategoryChange(e) {
        const val = e.target.checked;
				const name = e.target.name;
				const id = e.target.id;
        let updatedCategories = Object.assign({}, this.state.categories, {[name]: val})
        this.setState({
            'categories': updatedCategories,
            chosen_category: name,
				})
    }
 
    onChange = (e) => {
        e.preventDefault();
				const { name, value, id } = e.target;
        //console.log({[name]: value});
		//CASES FOR LIVE VALIDATION
		switch (name) {
			case 'event_date': 
				var inputDate = value;
				inputDate = new Date(inputDate);
				if (value != '') {
					liveErrorsCollection[name] = inputDate > currentDate ? '' : "Date is not valid! Cannot be before today's date"
				}
			break;
			case 'event_time_start': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validTimeRegex.test(value) ? '' : 'Start time is not valid!'
				}
				//console.log(liveErrorsCollection[name])
			break;
			case 'event_time_end': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validTimeRegex.test(value) ? '' : 'End time is not valid!'
				}
			break;
			case 'event_contact_phone': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validPhoneRegex.test(value) ? '' : 'Phone number is not valid!'
				}
			break;
			case 'event_contact_email': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validEmailRegex.test(value) ? '' : 'Email is not valid!'
				}
			break;
			case 'event_website': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validUrlRegex.test(value) ? '' : 'URL is not valid! Full URL is required.'
				}
			break;
			case 'event_FB': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validUrlRegex.test(value) ? '' : 'Facebook page is not valid! Full URL is required.'
				}
			break;
			case 'event_cost': 
				if (value != '' && id == "required") {
					liveErrorsCollection[name] = validCurrencyRegex.test(value) ? '' : 'Price is not valid! Must include decimal and commas when necessary.'
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
				feedbackMsg: "Thank you for your submission!  We will review your event and get back to your shortly.",
				validSubmission: true
			});
			this.handleSubmit(e)
		} else {
			console.error('Invalid Form')
			this.setState({
				feedbackMsg: "We found some errors with your event submission.  The errors have been highlighted below. Please go through the form and try again.  Thanks!",
				validSubmission: false,
			});
			
		}
		window.scrollTo(0, 0);
	}
 
    handleSubmit = (e) => {
        e.preventDefault();
		
        // Submit to Gravity Forms API. Upon success, set the feedback message and clear all
        // the fields within the form. Upon failure, keep the fields as they are,
        // but set the feedback message to show the error state.
        axios({
            method: 'post',
            url: process.env.GATSBY_EVENT_FORM_API_ENPOINT, 
            data: {
                "input_values": {
                    "input_1": this.state.event_name,
                    "input_2": this.state.event_date,
                    "input_3": this.state.event_time_start,
                    "input_22": this.state.event_time_end,
                    "input_21_1": this.state.chosen_category,
                    "input_23": this.state.event_location,
                    "input_18_1": this.state.street_add,
                    "input_18_3": this.state.city_add,
                    "input_18_4": this.state.state_add,
                    "input_18_5": this.state.zip_add,
                    "input_10_3": this.state.first_name,
                    "input_10_6": this.state.last_name,
                    "input_15": this.state.event_contact_phone,
                    "input_17": this.state.event_contact_email,
                    "input_30": this.state.event_website,
                    "input_29": this.state.event_FB,
                    "input_11": this.state.event_cost,
                    //"input_28": this.state.event_picture,
                    "input_12": this.state.event_description
                }
            },
            auth: {
				username: process.env.GATSBY_EVENT_CONSUMER_KEY,
                password: process.env.GATSBY_EVENT_CONSUMER_SECRET
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
           
                <EventFormWrapper>
                    <FormTitle>Submit Event</FormTitle>
					{this.state.validSubmission && <div className="success">{<SuccessModal/>}</div>}
					{this.state.errorsPresent && <ul>{this.renderErrorList(missingFieldsCollection)}</ul>}
					{this.state.errorsPresent && <ul>{this.renderErrorList(liveErrorsCollection)}</ul>}
					<form className="submit_event_form" name="Submit Event Form" method="POST" onSubmit={this.validateForm} >
						<FormField className="required">
							<FieldLabel>Name of Event</FieldLabel>
							<input type="text" name="event_name" id="required" title="Event Name" value={this.state.event_name} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_name') && <span className='error'>{missingFieldsCollection.event_name}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Date of Event</FieldLabel>
							<input type="date" name="event_date" id="required" title="Event Date" value={this.state.event_date} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_date') && <span className='error'>{missingFieldsCollection.event_date}</span>}
							{liveErrorsCollection.hasOwnProperty('event_date') && <span className='error'>{liveErrorsCollection.event_date}</span>}
						</FormField>
						<FormField className="required"> 
							<FieldLabel>Time of Event: Start</FieldLabel>
							<FieldDescription>Must be in format: "hh:mm(pm/am)"</FieldDescription>
							<input type="text" placeholder="HH:MMpm/am" id="required" title="Event Start Time" name="event_time_start"  value={this.state.event_time_start} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_time_start') && <span className='error'>{missingFieldsCollection.event_time_start}</span>}
							{liveErrorsCollection.hasOwnProperty('event_time_start') && <span className='error'>{liveErrorsCollection.event_time_start}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Time of Event: End</FieldLabel>
							<FieldDescription>Must be in format: "hh:mm(pm/am)"</FieldDescription>
							<input type="text" placeholder="HH:MMpm/am" id="required" title="Event End Time" name="event_time_end"  value={this.state.event_time_end} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_time_end') && <span className='error'>{missingFieldsCollection.event_time_end}</span>}
							{liveErrorsCollection.hasOwnProperty('event_time_end') && <span className='error'>{liveErrorsCollection.event_time_end}</span>}
						</FormField>
						<FormField>
							<FieldLabel>Event Category</FieldLabel>
								{this.renderEventCategories()}
						</FormField>
						<FormField className="required">
							<FieldLabel>Name of Event Location</FieldLabel>
							<input type="text" name="event_location" id="required" title="Event Location" value={this.state.event_location} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_location') && <span className='error'>{missingFieldsCollection.event_location}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Address</FieldLabel>
								<EventAddressFields className="event_address">
									<label htmlFor="street">Street Address</label>
									<input type="text" id="street" id="required" title="Street" name="street_add"  value={this.state.street_add} onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('street_add') && <span className='error'>{missingFieldsCollection.street_add}</span>}
									<label htmlFor="city">City</label>
									<input type="text" id="city" id="required" title="City" name="city_add"  value={this.state.city_add} onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('city_add') && <span className='error'>{missingFieldsCollection.city_add}</span>}
									<label htmlFor="state">State</label>
									<input type="text" id="state" id="required" title="State" name="state_add"  value={this.state.state_add}  onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('state_add') && <span className='error'>{missingFieldsCollection.state_add}</span>}
									<label htmlFor="zip">Zip Code</label>
									<input type="text" id="zip" id="required" title="Zip Code" name="zip_add"  value={this.state.zip_add} onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('zip_add') && <span className='error'>{missingFieldsCollection.zip_add}</span>}
								</EventAddressFields>
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Name</FieldLabel>
								<ContactNameFields className="event_contact_name">
									<label htmlFor="first">First</label>
									<input type="text" id="first" id="required" title="First Name" name="first_name"  value={this.state.first_name}  onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('first_name') && <span className='error'>{missingFieldsCollection.first_name}</span>}
									<label htmlFor="last">Last</label>
									<input type="text" id="last" id="required" title="Last Name" name="last_name"  value={this.state.last_name}  onChange={this.onChange}  />
									{missingFieldsCollection.hasOwnProperty('last_name') && <span className='error'>{missingFieldsCollection.last_name}</span>}
								</ContactNameFields>
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Phone</FieldLabel>
							<FieldDescription>Full 10-digit phone number, with or without dashes.</FieldDescription>
							<input type="tel" name="event_contact_phone" id="required" title="Contact Phone" placeholder="###-###-####" value={this.state.event_contact_phone} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_contact_phone') && <span className='error'>{missingFieldsCollection.event_contact_phone}</span>}
							{liveErrorsCollection.hasOwnProperty('event_contact_phone') && <span className='error'>{liveErrorsCollection.event_contact_phone}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Email</FieldLabel>
							<input type="text" name="event_contact_email" id="required" title="Contact Email" placeholder="Enter your full email address" value={this.state.event_contact_email} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_contact_email') && <span className='error'>{missingFieldsCollection.event_contact_email}</span>}
							{liveErrorsCollection.hasOwnProperty('event_contact_email') && <span className='error'>{liveErrorsCollection.event_contact_email}</span>}
						</FormField>
						<FormField>
							<FieldLabel>Website</FieldLabel>
							<input type="text" name="event_website" title="Event Website" value={this.state.event_website} onChange={this.onChange}  />
							{liveErrorsCollection.hasOwnProperty('event_website') && <span className='error'>{liveErrorsCollection.event_website}</span>}
						</FormField>
						<FormField>
							<FieldLabel>Facebook Page URL (if available)</FieldLabel>
							<input type="text" name="event_FB" title="Facebook Page" value={this.state.event_FB} onChange={this.onChange}  />
							{liveErrorsCollection.hasOwnProperty('event_FB') && <span className='error'>{liveErrorsCollection.event_FB}</span>}
						</FormField>
						<FormField>
							<FieldLabel>Cost of Event</FieldLabel>
							<FieldDescription>Please include a dollar sign ("$") in front of your entry.  If event is free, enter "0" or leave blank.</FieldDescription>
							<input type="text" name="event_cost" title="Price" value={this.state.event_cost} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_cost') && <span className='error'>{missingFieldsCollection.event_cost}</span>}
							{liveErrorsCollection.hasOwnProperty('event_cost') && <span className='error'>{liveErrorsCollection.event_cost}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Description</FieldLabel>
							<input type="text" name="event_description" id="required" title="Event Description" value={this.state.event_description} onChange={this.onChange}  />
							{missingFieldsCollection.hasOwnProperty('event_description') && <span className='error'>{missingFieldsCollection.event_description}</span>}
						</FormField>
						<SubmitButton type="submit">Submit Event</SubmitButton>
					</form>
				</EventFormWrapper>
			
		)
	}
}
 
export default SubmitEventForm