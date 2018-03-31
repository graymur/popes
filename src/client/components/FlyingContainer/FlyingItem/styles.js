import { css } from 'glamor' // eslint-disable-line
import glamorous from 'glamorous'
import constants from '../../../utils/constants'

export const StyledFlyingItem = glamorous.div(
	{
		position: 'absolute',
		top: 0,
		left: 0,
	},
	({ flying }) => {
		return (
			flying && {
				transition: `transform ${constants.transitionSpeed}ms`,
			}
		)
	},
)
