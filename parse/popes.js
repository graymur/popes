const cheerio = require('cheerio')
const fetch = require('node-fetch')
const fs = require('fs')
const _ = require('lodash')

const getName = cells => cells.eq(3).find('B A').text().replace(/\s+/g, ' ')

const getImage = cells => cells
	.eq(2)
	.find('IMG')
	.attr('srcset')
	.split(' ')
	.filter(x => _.startsWith(x, '//'))

const getNationality = cells => {
	const r = /(\.|\;|\()/

	let nationality = cells.last().find('P').text().split(r)[0]
		|| cells.last().text().split(r)[0]

	if (nationality.match(/Although/)) {
		nationality = cells.last().text().split(r)[0]
	}

	if (nationality.match(/Historicity/)) {
		nationality = 'Greek'
	}

	if (_.startsWith(nationality, 'Motto')) {
		nationality = 'Unkown'
	}

	const m = nationality.match(/(first and only|first|only|imperial|early)\s*(\w+)/i)

	if (m && m[2]) {
		nationality = m[2]
	}

	return _.trim(nationality)
}

const getAge = cells => {

	let age = cells.eq(6)
		.text()
		.replace(/(\(.*\))/g, '')
		.replace(/(\[.*\])/g, '')
		.split(/\s+\/\s+/)
		.map(_.trim)
		.map(x => x.split('-')[0])
		.map(x => Number(x) || 'Unknown')

	if (age.length === 1) {
		age = [age[0], age[0]]
	}

	return age
}

const getRuleYears = cells =>
	cells.eq(1)
		.remove('SPAN')
		.text()
		.replace(/(\(.*\))/g, '')
		.replace(/(\[.*\])/g, '')
		.replace(/\s+/g, ' ')
		.split(/–|-/)
		.map(_.trim)
		.map((x, i) => {
			x = x.replace(/\s\d{1}$/g, '')

			if (x.includes('/')) {
				x = x.split('/')[0]
				x = i ? `31 Dec ${x}` : `1 Jan ${x}`
			}

			return x
		})
		.map(x => {
			const [_1, _2, year] = x.split(' ')
			const date = new Date(x)

			if (Number(year) < 100) {
				date.setFullYear(year)
			}

			return date
		})


;(async () => {
	// const html = await fetch('https://en.wikipedia.org/wiki/List_of_popes')
	// 	.then(response => response.text());

	try {
		const html = fs.readFileSync('1.html').toString('utf-8')
		const $ = cheerio.load(html)

		const rows = $('.wikitable TR')

		const result = []
		let number = 1;

		rows.map(function () {
			const row = $(this)
			const cells = row.find('TD')

			if (cells.length !== 8) {
				return false;
			}

			const name = getName(cells)

			if (!name) {
				return false;
			}

			const images = getImage(cells)
			const text = cells.last().html()
			const nationality = getNationality(cells)
			const rule = getRuleYears(cells)
			const age = getAge(cells)

			const item = {
				id: number++,
				name,
				nationality,
				text,
				start: rule[0],
				startYear: new Date(rule[0]).getFullYear(),
				end: rule[1],
				endYear: new Date(rule[1]).getFullYear(),
				ageStart: age[0],
				ageEnd: age[1],
				imageSmall: images[0],
				imageBig: images[1],
			}

			result.push(item)
		})

		console.log(JSON.stringify(result, null, 4))
	} catch (e) {
		console.error(e)
	}

	process.exit()
})()

