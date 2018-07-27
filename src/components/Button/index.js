import React from 'react'
import withLoading from '../Loading'

const Button = ({ onClick, className = '', children }) =>
	<button
		onClick={onClick}
		className={className}
		type="button"
	>
		{children}
	</button>

const ButtonWithLoading = withLoading(Button)

export {Button, ButtonWithLoading}