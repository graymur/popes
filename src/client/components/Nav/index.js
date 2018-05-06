import React from 'react'
import { StyledNav, StyledNavItem } from './styles'
import map from 'lodash/map'

export default ({ fields, currentKey, setCurrentGroupKey }) => (
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
