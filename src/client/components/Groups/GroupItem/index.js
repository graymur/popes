import React from 'react'
import { StyledGroupItem } from './styles'

export default class extends React.Component {
	render() {
		const { children, flying, innerRef } = this.props

		return (
			<StyledGroupItem flying={flying} innerRef={innerRef}>
				{children}
			</StyledGroupItem>
		)
	}
}
