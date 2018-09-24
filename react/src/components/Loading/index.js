import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () =>
	<div>
		<FontAwesomeIcon icon="spinner" />
		<br />
		<br />
		LOADING...
	</div>

const withLoading = Component => ({ isLoading, ...rest }) =>
	isLoading
	? <Loading />
	: <Component { ...rest } />

export default withLoading