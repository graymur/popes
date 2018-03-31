import { css } from 'glamor' // eslint-disable-line
import glamorous from 'glamorous'

export const StyledNav = glamorous.nav({
	display: 'block',
	padding: '1rem 0 1rem 1rem',
})

export const StyledNavItem = glamorous.a(
	{
		padding: '1rem 1rem',
		fontSize: '1.6rem',
		display: 'inline-block',
		cursor: 'pointer',
		borderBottom: '2px solid transparent',
		transition: 'border-bottom-color 0.2s',
	},
	({ active }) =>
		active && {
			color: 'gray',
			cursor: 'text',
			borderBottomColor: 'black',
		},
)
