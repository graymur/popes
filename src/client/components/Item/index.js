import React from 'react'
import { Item, Container, Pic, Name, Rule } from './styles'
import { shouldUpdate } from 'recompose'

const Component = ({ name, imageSmall, startYear, endYear }) => (
	<Item>
		<Container>
			<Pic src={imageSmall} />
			<div>
				<Name>{name}</Name>
				<Rule>
					{startYear} - {endYear}
				</Rule>
			</div>
		</Container>
	</Item>
)

export default shouldUpdate((props, nextProps) => {
	return props.id !== nextProps.id
})(Component)
