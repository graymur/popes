import toPairs from 'lodash/toPairs'
import groupBy from 'lodash/groupBy'
import identity from 'lodash/identity'
import constants from './constants'

const VALUE_KEY = '__value'
const defaultTopStep =
	constants.groupHeaderHeight + constants.itemHeight + constants.groupBottomPadding
const defaultLeftStep = constants.itemWidth + constants.itemMarginRight

const comparators = {
	asc: (a, b) => (Number(a[0]) > Number(b[0]) ? -1 : 1),
	desc: (a, b) => (Number(a[0]) < Number(b[0]) ? -1 : 1),
}

const defaultGroupTitleFn = x => x[0]

export const groupItems = (items, config, sort = null) => {
	const getter =
		config.getter instanceof Function ? config.getter : x => x[config.getter]

	items = items.map(x => ({ ...x, [VALUE_KEY]: getter(x) }))

	const groupTitleFn = config.groupTitle || defaultGroupTitleFn
	const groupsSortFn = config.sortGroups || identity

	return (
		toPairs(groupBy(items, getter))
			.sort(comparators[sort || config.defaultSort], '0')
			// sort groups
			.sort(groupsSortFn)
			// set group title
			.map(x => [groupTitleFn(x), x[1]])
	)
}

export const sortItems = (a, b) => (a['start'] > b['start'] ? 1 : -1)

export const isGroupActive = groupName => groupName !== 'undefined'

export const addPositions = (
	grouppedItems,
	leftStep = defaultLeftStep,
	topStep = defaultTopStep,
) =>
	grouppedItems.map((group, groupIndex) => [
		group[0],
		group[1].sort(sortItems).map((item, itemIndex) => ({
			...item,
			__left: isGroupActive(group[0]) ? itemIndex * leftStep : -100,
			__top: isGroupActive(group[0])
				? groupIndex * topStep + constants.groupHeaderHeight
				: -100,
			__active: isGroupActive(group[0]),
		})),
	])
