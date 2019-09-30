import React from "react"
import Layout from "../components/layout"
import axios from "axios"
import styled from 'styled-components'
import '../styles/styles.scss'
 
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
const validFBRegex = RegExp(/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/);

const checkFormErrors = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class SubmitEventPage extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = { 
			// Error object for form validation (live and otherwise..)
			errors: {
				missing_fields: [],
				input_validation: [],
			},
			invalidSubmission: true,
			formData: {
				event_name: {field_name: 'event_name', value: '', title: 'Event Name'},
				event_date: {field_name: 'event_date', value: '', title: 'Event Date'},
				event_time_start: {field_name: 'event_time_start', value: '', title: 'Event Start Time'},
				event_time_end: {field_name: 'event_time_end', value: '', title: 'Event End Time'},
				event_location: {field_name: 'event_location', value: '', title: 'Event Location'}, 
				street_add: {field_name: 'street_add', value: '', title: 'Street Address'}, 
				city_add: {field_name: 'city_add', value: '', title: 'City'},
				state_add: {field_name: 'state_add', value: '', title: 'State'},
				zip_add: {field_name: 'zip_add', value: '', title: 'Zip'}, 
				first_name: {field_name: 'first_name', value: '', title: 'First Name'},
				last_name: {field_name: 'last_name', value: '', title: 'Last Name'},
				event_contact_phone: {field_name: 'event_contact_phone', value: '', title: 'Contact Phaone'}, 
				event_contact_email: {field_name: 'event_contact_email', value: '', title: 'Contact Email'},
				event_website: {field_name: 'event_website', value: '', title: 'Event Website'},
				event_FB: {field_name: 'event_FB', value: '', title: 'Facebook Page'},
				event_cost: {field_name: 'event_cost', value: '', title: 'Price'}, 
				event_picture: {field_name: 'event_picture', value: '', title: 'Event Picture'},
				event_description: {field_name: 'event_description', value: '', title: 'Event Description'},
				chosen_category: {value: '', title: 'Event Category'},
			},
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
                        value={this.state.categories[category]}
                        onChange={this.onCategoryChange.bind(this)}
                    />
                    {category}
                </span>
            )
        })
    }
	
	renderErrorList() {
		//console.log(this.state.errors)
		//console.log(this.state.errorList);
		var allErrors = this.state.errors;
		const errors = Object.values(allErrors);
		return errors.map((error) => {
				console.log(error)
				return Object.values(error).map((item, j) => {
					console.log(item)
					return (
						<li key={j}>{Object.values(item)[0].error}</li>
					)
				})
			})
    }
	
    onCategoryChange(e) {
        const val = e.target.checked;
        const name = e.target.name;
        let updatedCategories = Object.assign({}, this.state.categories, {[name]: val})
        this.setState({
            'categories': updatedCategories,
            chosen_category: name,
			formData: [{
				chosen_category: name
			}],
        })
    }
 
    onChange = (e) => {
        e.preventDefault();
				const { name, value } = e.target;
        this.setState({ 
					[name]: value,
				});
        console.log({[name]: value});
		}
		
		validateForm = (e) => {
			e.preventDefault();
		
			//Validation missing fields
			this.setState({
				formData: 
					{
						event_name: {value: e.target.event_name.value},
						event_date: {value: e.target.event_date.value},
						event_time_start: {value: e.target.event_time_start.value},
						event_time_end: {value: e.target.event_time_end.value},
						event_location: {value: e.target.event_location.value}, 
						street_add: {value: e.target.street_add.value}, 
						city_add: {value: e.target.city_add.value},
						state_add: {value: e.target.state_add.value},
						zip_add: {value: e.target.zip_add.value}, 
						first_name: {value: e.target.first_name.value},
						last_name: {value: e.target.last_name.value},
						event_contact_phone: {value: e.target.event_contact_phone.value}, 
						event_contact_email: {value: e.target.event_contact_email.value},
						event_website: {value: e.target.event_website.value},
						event_FB: {value: e.target.event_FB.value},
						event_cost: {value: e.target.event_cost.value}, 
						event_picture: {value: e.target.event_picture.value},
						event_description: {value: e.target.event_description.value},
					},
			});
			let missingFields = this.state.errors.missing_fields;
			let inputValidation = this.state.errors.input_validation;
			var formData = this.state.formData;
			const data = Object.values(formData);
			console.log(data)
			data.map((item, i) => {
				console.log(item)
				//CASES FOR VALIDATION
				switch (item.field_name) {
						case 'event_date': 
						var inputDate = item.value;
						inputDate = new Date(inputDate);
						if (item.value != '')
							inputValidation[i] = {
								event_date: {'error': inputDate > currentDate && "Date is not valid! Cannot be before today's date"}
							};
						break;
						case 'event_time_start': 
						if (item.value != '')
							inputValidation[i] = {
								event_time_start: {'error':  validTimeRegex.test(item.value) && 'Start time is not valid!'}
							};
						break;
						case 'event_time_end': 
						if (item.value != '')
							inputValidation[i] = {
								event_time_end: {'error': validTimeRegex.test(item.value) && 'End time is not valid!'}
							};
						break;
						case 'event_contact_phone': 
						if (item.value != '')
							inputValidation[i] = {
								event_contact_phone: {'error': validPhoneRegex.test(item.value) && 'Phone number is not valid!'}
							};
						break;
						case 'event_contact_email': 
						if (item.value != '')
							inputValidation[i] = {
								event_contact_email: {'error': validEmailRegex.test(item.value) && 'Email is not valid!'}
							};
						break;
						case 'event_website':  
						if (item.value != '')
							inputValidation[i] = {
								event_website: {'error': validUrlRegex.test(item.value) && 'URL is not valid! Protocol is required -- such as, "https://" or "http://"'}
							};
						break;
						case 'event_FB': 
						if (item.value != '')
							inputValidation[i] = {
								event_FB: {'error': validFBRegex.test(item.value) && 'Facebook page URL is not valid!'}
							};
						break;
						case 'event_cost': 
						if (item.value != '')
							inputValidation[i] = {
								event_cost: {'error': validCurrencyRegex.test(item.value) && 'Price is not valid! Must include decimal and commas when necessary.'}
							};
						break;
					default:
						break;
				}
				if (item.value == '') {
					missingFields[i] = {
						[item.field_name]: {'error': item.title + " is missing"}
					};
					console.log(missingFields[i])
				}
			})
			console.log(e.target.event_date.value)
			if (checkFormErrors(this.state.errors)) {
				console.info('Valid Form')
			} else {
				console.error('Invalid Form')
				console.log(missingFields)
				console.log(inputValidation)
				console.log(this.state.errors)
				console.log(this.state.errors.missing_fields.length)
				console.log(this.state.errors.input_validation.length)
				this.setState({
				  feedbackMsg: "We found some errors with your event submission.  The errors have been highlighted below. Please go through the form and try again.  Thanks!",
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
            url: "https://www.northlandevents.org/gravityformsapi/forms/1/submissions", 
            data: {
                "input_values": {
                    "input_1": this.state.event_name,
                    "input_2": this.state.event_date,
                    "input_3": this.state.event_time_start,
                    "input_22": this.state.event_time_end,
                    "input_21": this.state.chosen_category,
                    "input_23": this.state.event_location,
                    "input_18.1": this.state.street_add,
                    "input_18.3": this.state.city_add,
                    "input_18.4": this.state.state_add,
                    "input_18.5": this.state.zip_add,
                    "input_10.3": this.state.first_name,
                    "input_10.6": this.state.last_name,
                    "input_15": this.state.event_contact_phone,
                    "input_17": this.state.event_contact_email,
                    "input_30": this.state.event_website,
                    "input_29": this.state.event_FB,
                    "input_11": this.state.event_cost,
                    "input_28": this.state.event_picture,
                    "input_12": this.state.event_description
                    //"input_24": this.state.none
                }
            },
            auth: {
                //CONSUMER_KEY="ck_0c58f35888a2ddfec64e38b3835f689ad6b18d15"
                //CONSUMER_SECRET="cs_50274502a1213516c738c555f09e75c1a410f993"
                username: "ck_0c58f35888a2ddfec64e38b3835f689ad6b18d15",
                password: "cs_50274502a1213516c738c555f09e75c1a410f993"
              },
            headers: {
            //"Access-Control-Allow-Origin": "*",
            'Content-Type' : 'application/x-www-form-urlencoded'
            //"Access-Control-Allow-Headers": "Access-Control-Allow-Origin"
            }
        }).then(response => {
			  
			console.log(response);
			console.log(this.state);
			console.log(this.state.formData);
			
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
		const { errors } = this.state;
        return (
            <Layout>
                <EventFormWrapper>
                    <FormTitle>Submit Event</FormTitle>
                    {this.state.feedbackMsg && <p>{this.state.feedbackMsg}</p>}
										{this.state.invalidSubmission && <ul>{this.renderErrorList()}</ul>}
					<form className="submit_event_form" name="Submit Event Form" method="POST" onSubmit={this.validateForm} >
						<FormField className="required">
							<FieldLabel>Name of Event</FieldLabel>
							<input type="text" name="event_name" value={this.state.event_name} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_name') > 0 && <span className='error'>{errors.missing_fields.event_name}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Date of Event</FieldLabel>
							<input type="date" name="event_date"  value={this.state.event_date} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_date') > 0 && <span className='error'>{errors.missing_fields.event_date}</span>}
						</FormField>
						<FormField className="required"> 
							<FieldLabel>Time of Event: Start</FieldLabel>
							<input type="text" placeholder="HH:MM pm/am" name="event_time_start"  value={this.state.event_time_start} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_time_start') > 0 && <span className='error'>{errors.missing_fields.event_time_start}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Time of Event: End</FieldLabel>
							<input type="text" placeholder="HH:MM pm/am" name="event_time_end"  value={this.state.event_time_end} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_time_end') > 0 && <span className='error'>{errors.missing_fields.event_time_end}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Category</FieldLabel>
								{this.renderEventCategories()}
						</FormField>
						<FormField className="required">
							<FieldLabel>Name of Event Location</FieldLabel>
							<input type="text" name="event_location"  value={this.state.event_location} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_location') > 0 && <span className='error'>{errors.missing_fields.event_location}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Address</FieldLabel>
								<EventAddressFields className="event_address">
									<label htmlFor="street">Street Address</label>
									<input type="text" id="street" name="street_add"  value={this.state.street_add} onChange={this.onChange}  />
									{errors.missing_fields.includes('street_add') > 0 && <span className='error'>{errors.missing_fields.street_add}</span>}
									<label htmlFor="city">City</label>
									<input type="text" id="city" name="city_add"  value={this.state.city_add} onChange={this.onChange}  />
									{errors.missing_fields.includes('city_add') > 0 && <span className='error'>{errors.missing_fields.city_add}</span>}
									<label htmlFor="state">State</label>
									<input type="text" id="state" name="state_add"  value={this.state.state_add}  onChange={this.onChange}  />
									{errors.missing_fields.includes('state_add') > 0 && <span className='error'>{errors.missing_fields.state_add}</span>}
									<label htmlFor="zip">Zip Code</label>
									<input type="text" id="zip" name="zip_add"  value={this.state.zip_add} onChange={this.onChange}  />
									{errors.missing_fields.includes('zip_add') > 0 && <span className='error'>{errors.missing_fields.zip_add}</span>}
								</EventAddressFields>
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Name</FieldLabel>
								<ContactNameFields className="event_contact_name">
									<label htmlFor="first">First</label>
									<input type="text" id="first" name="first_name"  value={this.state.first_name}  onChange={this.onChange}  />
									{errors.missing_fields.includes('first_name') > 0 && <span className='error'>{errors.missing_fields.first_name}</span>}
									<label htmlFor="last">Last</label>
									<input type="text" id="last" name="last_name"  value={this.state.last_name}  onChange={this.onChange}  />
									{errors.missing_fields.includes('last_name') > 0 && <span className='error'>{errors.missing_fields.last_name}</span>}
								</ContactNameFields>
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Phone</FieldLabel>
							<input type="tel" name="event_contact_phone"  placeholder="###-###-####" value={this.state.event_contact_phone} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_contact_phone') > 0 && <span className='error'>{errors.missing_fields.event_contact_phone}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Contact Email</FieldLabel>
							<input type="text" name="event_contact_email"  placeholder="Enter your full email address" value={this.state.event_contact_email} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_contact_email') > 0 && <span className='error'>{errors.missing_fields.event_contact_email}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Website</FieldLabel>
							<input type="text" name="event_website"  value={this.state.event_website} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_website') > 0 && <span className='error'>{errors.missing_fields.event_website}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Facebook Page URL (if available)</FieldLabel>
							<input type="text" name="event_FB"  value={this.state.event_FB} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_FB') > 0 && <span className='error'>{errors.missing_fields.event_FB}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Cost of Event</FieldLabel>
							<FieldDescription>Please include a dollar sign ("$") in front of your entry.</FieldDescription>
							<input type="text" name="event_cost"  value={this.state.event_cost} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_cost') > 0 && <span className='error'>{errors.missing_fields.event_cost}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Picture</FieldLabel>
							<input type="file" name="event_picture"  value={this.state.event_picture} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_picture') > 0 && <span className='error'>{errors.missing_fields.event_name}</span>}
						</FormField>
						<FormField className="required">
							<FieldLabel>Event Description</FieldLabel>
							<input type="text" name="event_description"  value={this.state.event_description} onChange={this.onChange}  />
							{errors.missing_fields.includes('event_description') > 0 && <span className='error'>{errors.missing_fields.event_description}</span>}
						</FormField>
						<SubmitButton type="submit">Submit Event</SubmitButton>
					</form>
				</EventFormWrapper>
			</Layout>
		)
	}
}
 
export default SubmitEventPage