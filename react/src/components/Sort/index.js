import React from 'react'
import classNames from 'classnames'
import { Button } from '../Button'

let up = true

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
	const sortClass = classNames(
		'button-inline',
		{ 'button-active': sortKey === activeSortKey }
	)
	return (
		<Button
			onClick={() => {
				onSort(sortKey)
				up = !up
			}}
			className={sortClass}
		>
			{children}
		</Button>
	)
}

export default Sort