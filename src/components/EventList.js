import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components';

const EventListWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 80%;
`

const EventBox = styled.div`
  max-width: 100%;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`

const EventImage = styled.img`
  max-width: 100%;
`

const PortfolioItems = () => {
    return(
        <StaticQuery query={graphql`
        {
		  internalEvents {
			events {
			  all_day
			  alternative_id
			  author
			  categories {
				alternative_id
				alternative_parent
				count
				description
				filter
				name
				slug
				taxonomy
				term_group
				term_taxonomy_id
			  }
			  image {
				url
			  }
			  cost
			  date
			  date_utc
			  description
			  end_date
			  excerpt
			  featured
			  global_id
			  global_id_lineage
			  hide_from_listings
			  modified
			  website
			  venue {
				address
			  }
			  utc_start_date
			  utc_end_date
			  url
			  title
			  timezone_abbr
			  timezone
			  sticky
			  status
			  start_date
			  slug
			  show_map_link
			  show_map
			  rest_url
			  modified_utc
			}
		  }
		}
    `} render={props => (
        <EventListWrapper> 
            {props.internalEvents.events.map(event => (
                <EventBox key={event.alternative_id}>
                    <h2 dangerouslySetInnerHTML={{__html: event.title}}/>
                    <EventImage src={event.image.url} alt="Event Thumbnail" />
                    <div dangerouslySetInnerHTML={{__html: event.start_date}}/>
                    <div dangerouslySetInnerHTML={{__html: event.cost}}/>
                    <Link to={`/${event.slug}`}>Learn More</Link>
                </EventBox>
            ))}
        </EventListWrapper>
    )} />
    )
}

export default PortfolioItems;