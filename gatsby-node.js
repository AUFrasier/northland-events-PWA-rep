/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
 
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  //createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser:true, isPermanent: true })
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== EVENTS ====
    graphql(
      `
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

      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        // Create Page pages.
        const eventTemplate = path.resolve("./src/templates/event.js")
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.internalEvents.events, event => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          //console.log('-----------------');
          console.log(event.slug);
          //console.log('-----------------');
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${event.slug}/`,
            component: slash(eventTemplate),
            context: event,
          })
        })
      }) // EVENTS END
    resolve()
  })
}


