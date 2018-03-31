import { css } from 'glamor' // eslint-disable-line
import glamorous from 'glamorous'
import constants from '../../utils/constants'

export const Item = glamorous.article({
	width: `${constants.itemWidth}rem`,
	height: `${constants.itemHeight}rem`,
	padding: '1rem',
	backgroundColor: 'white',
})

export const Container = glamorous.article({
	display: 'flex',
	alignItems: 'center',
	boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
	height: '100%',
	padding: '0 1rem',
})

export const Pic = glamorous.img({
	maxHeight: '70%',
	marginRight: '1rem',
	borderRadius: '100%',
})

export const Name = glamorous.h4({
	fontSize: '1.6rem',
	marginBottom: '0.5rem',
})

export const Rule = glamorous.div({
	// fontSize: '1.6rem'
})
