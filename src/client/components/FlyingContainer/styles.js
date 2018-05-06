import glamorous from 'glamorous'

export const StyledFlyingContainer = glamorous.div(
	{
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		opacity: 0,
		pointerEvents: 'none',
		transitionDelay: '150ms',
		zIndex: 2,
	},
	({ flying }) => {
		return (
			flying && {
				transitionDelay: '0s',
				opacity: 1,
			}
		)
	},
)
