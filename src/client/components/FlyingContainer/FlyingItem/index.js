import React from 'react'
import { StyledFlyingItem } from './styles'
import Item from '../../Item'

export default item => (
	<StyledFlyingItem
		style={{ transform: `translate(${item.__left}rem, ${item.__top}rem)` }}
		flying={item.flying}
	>
		{/*<StyledFlyingItem style={{transform: 'trantop: `${item.__top}rem`, left: `${item.__left}rem`}}>*/}
		<Item {...item} />
	</StyledFlyingItem>
)
