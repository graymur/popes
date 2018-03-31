import React from 'react'
import { StyledGroup, StyledGroupTitle, StyledGroupItems } from './styles'
import GroupItem from '../GroupItem'
import Item from '../../Item'
import debounce from 'lodash/debounce'
import { Scrollbars } from 'react-custom-scrollbars'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.handleScroll = debounce(this.handleScroll, 100)
		this.itemNodes = []
		this.groupNode = undefined
	}

	addNodeRef = node => this.itemNodes.push(node)

	handleScroll = e => {
		const { group, updatePos } = this.props

		const parentRect = this.groupNode.getBoundingClientRect()
		const positions = this.itemNodes.map((x, index) => {
			const rect = x.getBoundingClientRect()
			return {
				id: group[1][index].id,
				left: (rect.left - parentRect.left) / 10,
			}
		})

		updatePos(positions)
	}

	render() {
		const { group, flying } = this.props

		this.items = group[1].map((item, itemIndex) => (
			<GroupItem key={itemIndex} flying={flying} innerRef={this.addNodeRef}>
				<Item {...item} />
			</GroupItem>
		))

		return (
			<StyledGroup
				onScroll={this.handleScroll}
				innerRef={el => (this.groupNode = el)}
			>
				<StyledGroupTitle>{group[0]}</StyledGroupTitle>
				<Scrollbars autoHeight>
					<StyledGroupItems>{this.items}</StyledGroupItems>
				</Scrollbars>
			</StyledGroup>
		)
	}
}
