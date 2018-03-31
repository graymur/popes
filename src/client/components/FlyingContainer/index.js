import React from 'react'
import { StyledFlyingContainer } from './styles'
import FlyingItem from './FlyingItem'

export default ({ items, flying }) => {
	return (
		<StyledFlyingContainer flying={flying}>
			{items.map(item => <FlyingItem key={item.id} {...item} flying={flying} />)}
		</StyledFlyingContainer>
	)
}
