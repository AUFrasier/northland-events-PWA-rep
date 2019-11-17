import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss'

export default class EventsCalendar extends React.Component {

  calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true,
    calendarEvents: this.props.events,
    selectDate: '',
    viewTypeText: 'Weekend View'
  }
  
  onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      selectDate: value
    })
}
  render() {
    console.log(this.state.calendarEvents)
    return (
        <div className='calendar-page-wrapper'>
            <div className="find-date-container">
              <p>To go to a specific date (yyyy-mm-dd), enter in a date below and click 'GO TO DATE'</p>
              <input className="find-date-input" type="date" value={this.state.selectDate} onChange={this.onChange} name="select_date" />
              <Button className="find-date-button" onClick={ this.gotoDate }>GO TO DATE</Button>
            </div>
            <div className='calendar-top-container'>
              <Button onClick={ this.toggleWeekends }>{this.state.viewTypeText}</Button>
            </div>
            <div className='calendar'>
              <FullCalendar
                defaultView="dayGridMonth"
                header={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                plugins={[ dayGridPlugin ]}
                ref={ this.calendarComponentRef }
                weekends={ this.state.calendarWeekends }
                events={ this.state.calendarEvents }
              />
            </div>
        </div>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends,
      viewTypeText: 'Full Week View'
    })
  }

  gotoDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate(this.state.selectDate) // call a method on the Calendar object
  }



}