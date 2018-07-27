import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import './index.css';
import {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HPP
} from '../../constants'
import Search from '../Search'
import Table from '../Table'
import { ButtonWithLoading } from '../Button'

/* eslint-disable */
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${PARAM_PAGE}&${DEFAULT_QUERY}`

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const updateSearchTopStoriesState = (hits, page) => prevState => {
	const { searchKey, results } = prevState
	const oldHits = results && results[searchKey] ? results[searchKey].hits : []
	const updatedHits = [...oldHits, ...hits]

	return {
		results: {
			...results,
			[searchKey]: { hits: updatedHits, page }
		},
		isLoading: false
	}
}

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: null,
			isLoading: false
		}
		this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
		this.setSearchTopStories = this.setSearchTopStories.bind(this)
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
		this.onSearchChange = this.onSearchChange.bind(this)
		this.onSearchSubmit = this.onSearchSubmit.bind(this)
		this.onDismiss = this.onDismiss.bind(this)
	}
	setSearchTopStories (result) {
		const { hits, page } = result
		this.setState(updateSearchTopStoriesState(hits, page))
	}
	needsToSearchTopStories (searchTerm) {
		return !this.state.results[searchTerm]
	}
	fetchSearchTopStories (searchTerm, page = 0) {
		this.setState({ isLoading: true })
		fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
			.then(response => response.json())
			.then(result => { console.log(result); this.setSearchTopStories(result) })
			.catch(err => { console.log(err); this.setState({ error: err }) })
	}
	componentDidMount () {
		const { searchTerm } = this.state
		this.setState(prevState => {
			const { searchTerm } = prevState
			return { searchKey: searchTerm }
		})
		this.fetchSearchTopStories(searchTerm)
	}
	onSearchChange (event) {
		this.setState({ searchTerm: event.target.value })
	}
	onSearchSubmit (event) {
		const { searchTerm } = this.state
		this.setState(prevState => {
			const { searchTerm } = prevState
			return { searchKey: searchTerm }
		})
		if (this.needsToSearchTopStories(searchTerm)) {
			this.fetchSearchTopStories(searchTerm)
		}
		event.preventDefault()
	}
	onDismiss (id) {
		this.setState(prevState => {
			const { searchKey, results } = prevState
			const { hits, page } = results[searchKey]

			const isNotId = item => item.objectID !== id
			const updatedHits = hits.filter(isNotId)

			return {
				results: {
					...results,
					[searchKey]: { hits: updatedHits, page }
				}
			}
		})
	}
	render() {
		const { searchTerm,  results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state
		const page = (results && results[searchKey] && results[searchKey].page) || 0
		const list = (results && results[searchKey] && results[searchKey].hits) || []
		return (
			<div className="page">
				<div className="interactions">
					<Search
						value={searchTerm}
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Search
					</Search>
				</div>
				{
					error ?
					<div className="interactions">
						<p>Something went wrong.</p>
					</div> :
					<Table
						list={list}
						onDismiss={this.onDismiss}
					/>
				}
				<div className="interactions">
					<ButtonWithLoading
						isLoading={isLoading}
						onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
						More
					</ButtonWithLoading>
				</div>
			</div>
		)
	}
}

// class Search extends Component {
// 	componentDidMount() {
// 		if (this.input) this.input.focus()
// 	}
// 	render() {
// 		const { value, onChange, onSubmit, children } = this.props
// 		return (
// 			<form onSubmit={onSubmit}>
// 				{children}<input
// 					type="text"
// 					value={value}
// 					onChange={onChange}
// 					ref={(node) => { this.input = node }}
// 				/>
// 				<button type="submit">{children}</button>
// 			</form>
// 		)
// 	}
// }

export default App