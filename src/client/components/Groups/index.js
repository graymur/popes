import React from 'react'
import { StyledGroups } from './styles'
import Group from './Group'

export default ({ groups, flying, updatePos }) => (
	<StyledGroups>
		{groups.map((group, index) => (
			<Group key={group[0]} group={group} flying={flying} updatePos={updatePos} />
		))}
	</StyledGroups>
)
