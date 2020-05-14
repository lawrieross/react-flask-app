import React from 'react'
import PropTypes from 'prop-types'

const JobListing = (props) => {
	const {
		jobs: {
			company,
			contract_time,
			created,
			label,
			icon,
			is_new,
			location,
			redirect_url,
			title,
		}
	} = props

	const showNewBadge = is_new && <span className="B-Listing__New">NEW!</span>
	const showNewBorder = is_new ? ' B-Listing--New' : ''
	const showContractTime = contract_time && <span className="B-Listing__Bullets">{contract_time}</span>

	return (
		<div className={`B-Listing${showNewBorder}`}>
			<div className="B-Listing__Details">
				<img src={require(`../images/${icon}.svg`)} className="B-Listing__Logo" alt="Logo of a briefcase" />
				<div className="B-Listing__Info">
					<div className="B-Listing__Heading">
						<h3 className="B-Listing__Company">{company}</h3>
						{showNewBadge}
					</div>
					<a href={redirect_url} className="B-Listing__Link">
						<h3 className="B-Listing__Title">{title}</h3>
					</a>
					<span className="B-Listing__Bullets">{created}</span>
					{showContractTime}
					<span className="B-Listing__Bullets">{location}</span>
				</div>
			</div>
			<hr />
			<div className="B-Keywords">
				<span className="B-Keywords__Tag">{label}</span>
			</div>
		</div>
	)
}

JobListing.propTypes = {
	jobs: PropTypes.shape({
		company: PropTypes.string.isRequired,
		created: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		redirect_url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
}

export default JobListing
