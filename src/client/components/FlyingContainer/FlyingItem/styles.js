import glamorous from 'glamorous'
import constants from 'client/utils/constants'

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
