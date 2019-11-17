import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components';
import Moment from 'react-moment';

const EventListWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 80%;
`

const EventBox = styled.div`
	max-width: 100%;
	border: 5px solid #006226;
	padding: 15px;
	margin: 40px;
`

const TimeHeading = styled.span`
	text-align: center;
	font-size: 20px;
	display: block;
	padding-bottom: 10px;
	padding-top: 10px;
`

const EventImage = styled.img`
  max-width: 100%;
`

const EventList = () => {
    return(
        <StaticQuery query={graphql`
        {
					allInternalEvents {
						edges {
							node {
								id
								events {
									all_day
									alternative_id
									author
									cost
									slug
									start_date
									end_date
									categories {
										name
										slug
										taxonomy
										term_group
										term_taxonomy_id
										filter
										description
										count
										alternative_parent
										alternative_id
									}
									description
									excerpt
									date
									image {
										url
									}
									show_map
									show_map_link
									title
									url
									website
									venue {
										address
										alternative_id
										author
										city
										country
										slug
										url
										venue
										website
									}
								}
							}
						}
					}
				}
				
    `} render={props => (
        <EventListWrapper> 
            {props.allInternalEvents.edges[0].node.events.map(event => (
							
                <EventBox key={event.alternative_id}>
                    <h2 dangerouslySetInnerHTML={{__html: event.title}}/>
                    <EventImage src={event.image.url} alt="Event Thumbnail" />
										<br></br>
										<TimeHeading>Start Date</TimeHeading>
										<Moment className="start-date">{event.start_date}</Moment>
										<br></br>
										<TimeHeading>End Date</TimeHeading>
										<Moment className="end-date">{event.end_date}</Moment>
										<br></br>
										
                    <div className="cost" dangerouslySetInnerHTML={{__html: event.cost}}/>
										<div className="excerpt" dangerouslySetInnerHTML={{__html: event.excerpt}}/>
                    <Link to={`/${event.slug}`}>Learn More</Link>
                </EventBox>
            ))}
        </EventListWrapper>
    )} />
		)
}

export default EventList;