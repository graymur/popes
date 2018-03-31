import React from 'react'
import { StyledNav, StyledNavItem } from './styles'
import map from 'lodash/map'

export default class Nav extends React.Component {
	render() {
		const { fields, currentKey, setCurrentGroupKey } = this.props

		return (
			<StyledNav>
				{map(fields, (item, key) => (
					<StyledNavItem
						key={key}
						active={key === currentKey}
						onClick={() => setCurrentGroupKey(key)}
					>
						{item.title}
					</StyledNavItem>
				))}
			</StyledNav>
		)
	}
}
