import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import Nav from './components/Nav'
import Groups from './components/Groups'
import FlyingContainer from './components/FlyingContainer'
import configs from './config'
import { groupItems, addPositions } from './utils/data'
import constants from './utils/constants'
import sortBy from 'lodash/sortBy'
import flatMap from 'lodash/flatMap'
import maxBy from 'lodash/maxBy'

class App extends Component {
	state = {
		flying: false,
	}

	componentDidMount() {
		this.setCurrentConfig('popes')
	}

	setCurrentConfig(key) {
		const config = configs[key]
		const currentSort = 'asc'
		const firstKey = Object.keys(config.fields)[0]

		fetch(config.dataUrl)
			.then(result => result.json())
			.then(items => {
				this.setState({
					config,
					items,
					currentSort,
				})

				this.setCurrentGroupKey(firstKey, false)
			})
	}

	setCurrentGroupKey = (key, useTransition = true) => {
		const { items, config, currentSort, currentKey } = this.state

		if (currentKey === key) {
			return false
		}

		const groupped = addPositions(groupItems(items, config.fields[key], currentSort))
		const sortedItems = sortBy(flatMap(groupped, group => group[1]), x => x.id)

		this.setState({
			currentKey: key,
			flying: true,
			groupped,
			sortedItems,
			maxTop: maxBy(sortedItems, x => x.__top).__top,
			groups: false,
		})

		clearTimeout(this.clearFlyingFlagTimeout)

		this.clearFlyingFlagTimeout = setTimeout(() => {
			this.setState({
				flying: false,
				groups: groupped,
			})
		}, useTransition ? constants.transitionSpeed + 150 : 10)
	}

	updatePos = items => {
		const { sortedItems } = this.state

		const newSortedItems = sortedItems.map(x => {
			const n = items.find(y => x.id === y.id)
			return n ? { ...x, __left: n.left } : x
		})

		this.setState({ sortedItems: newSortedItems })
	}

	renderPage() {
		const { config, groups, sortedItems, currentKey, flying, maxTop } = this.state

		return (
			<React.Fragment>
				<header className="app__header">
					<h1 className="app__title">{config.title}</h1>
				</header>
				<Nav
					fields={config.fields}
					currentKey={currentKey}
					setCurrentGroupKey={this.setCurrentGroupKey}
				/>
				<div className="data-container" style={{ height: `${maxTop + 10}rem` }}>
					{groups && (
						<Groups groups={groups} flying={flying} updatePos={this.updatePos} />
					)}
					<FlyingContainer active={true} items={sortedItems} flying={flying} />
				</div>
			</React.Fragment>
		)
	}

	render() {
		const loading = !Boolean(this.state.groupped)

		return <div className="App">{loading ? 'Loading...' : this.renderPage()}</div>
	}
}

export default App
