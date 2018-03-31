const apiBase = process.env.API_BASE_URL

const workflows = require('client/data/workflows.json')
const apps = require('client/data/apps.json')

export default {
	fetchWorkflows: async () => {
		return Promise.resolve(workflows)
	},
	fetchWorkflow: async workflowName => {
		return Promise.resolve(workflows.find(x => x.name === workflowName))
	},
	fetchApps: async () => {
		return Promise.resolve(apps)
	},
	fetchApp: async appName => {
		return Promise.resolve(apps.find(x => x.name === appName))
	},
}
