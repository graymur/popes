import { css } from 'glamor' // eslint-disable-line
import glamorous from 'glamorous'
import constants from 'client/utils/constants'

export const StyledGroupItem = glamorous.div(
	{
		flex: '0 0 auto',
		marginRight: `${constants.itemMarginRight}rem`,
		':last-child': {
			marginRight: '0',
		},
	},
	({ flying }) => flying && { opacity: 0 },
)
