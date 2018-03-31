const sortIntDesc = (a, b) => (Number(a[0]) > Number(b[0]) ? -1 : 1)
const sortIntAsc = (a, b) => (Number(a[0]) > Number(b[0]) ? 1 : -1)
const sortDateDesc = (a, b) => (new Date(a[0]) > new Date(b[0]) ? -1 : 1)
const sortDateAsc = (a, b) => (new Date(a[0]) > new Date(b[0]) ? 1 : -1)
const sortGroupSizeDesc = (a, b) => (a[1].length > b[1].length ? -1 : 1)
const sortGroupSizeAsc = (a, b) => (a[1].length > b[1].length ? 1 : -1)

export default {
	dataUrl: '/data/popes.json',
	title: 'Popes',
	fields: {
		ageStart: {
			getter: 'ageStart',
			title: 'Age start',
			defaultSort: 'desc',
			sortGroups: sortIntDesc,
		},
		ageEnd: {
			getter: 'ageEnd',
			title: 'Age end',
			defaultSort: 'desc',
			sortGroups: sortIntDesc,
		},
		startYear: {
			getter: 'startYear',
			title: 'Rule start',
			defaultSort: 'desc',
			sortGroups: sortIntDesc,
		},
		endYear: {
			getter: 'endYear',
			title: 'Rule end',
			defaultSort: 'desc',
			sortGroups: sortIntDesc,
		},
		duration: {
			getter: x => new Date(x.end).getFullYear() - new Date(x.start).getFullYear(),
			title: 'Rule duration',
			defaultSort: 'desc',
			sortGroups: sortIntDesc,
		},
		nationality: {
			getter: 'nationality',
			title: 'Nationality',
			defaultSort: 'asc',
			groupTitle: x => `${x[0]} (${x[1].length})`,
			sortGroups: sortGroupSizeDesc,
		},
	},
}
