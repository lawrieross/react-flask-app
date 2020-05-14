import React, { useEffect, useState } from 'react'
import JobListing from './components/JobListing'
import ReactAnimatedEllipsis from 'react-animated-ellipsis'
import './App.scss'

const App = () => {
	const [listings, setListings] = useState(<h3 className="B-Loading">Fetching results<ReactAnimatedEllipsis /></h3>)

	useEffect(() => {
		fetch('/jobs').then(res => res.json()).then(data => {
			const { results } = data
			const listings = results && results.map(e => <JobListing key={e.id} jobs={e} />)
			setListings(listings)
		})
	}, [])

	return (
		<div className="App">
			<header className="B-Header">
				<div className="Container">
					<div className="Grid Align-Center">
						<h1 className="B-Header__Title">Job Listings AU</h1>
					</div>
				</div>
			</header>
			<main className="B-Main">
				<div className="Container">
					<div className="Grid">
						{listings}
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
