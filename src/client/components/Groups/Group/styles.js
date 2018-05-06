import glamorous from 'glamorous'
import constants from 'client/utils/constants'
import appear from 'client/styles/keyframes'

export const StyledGroup = glamorous.div({
	animation: `${appear} 0.2s ease-in-out`,
})

export const StyledGroupTitle = glamorous.h4({
	animation: `${appear} 0.2s ease-in-out`,
	height: `${constants.groupHeaderHeight}rem`,
	padding: '0 0 0 1rem',
	margin: 0,
	display: 'flex',
	alignItems: 'center',
	fontSize: '1.6rem',
})

export const StyledGroupItems = glamorous.div({
	display: 'flex',
	paddingBottom: `${constants.groupBottomPadding}rem`,
})

export const StyledPlaceholder = glamorous.div({
	height: `${constants.itemHeight + constants.groupBottomPadding}rem`,
})
