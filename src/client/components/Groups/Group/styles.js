import { css } from 'glamor' // eslint-disable-line
import glamorous from 'glamorous'
import constants from '../../../utils/constants'

const appear = css.keyframes({
	from: {
		opacity: 0,
	},
})

export const StyledGroup = glamorous.div({
	animation: `${appear} 0.2s ease-in-out`,
})

export const StyledGroupTitle = glamorous.h4({
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
