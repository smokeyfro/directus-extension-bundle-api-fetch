import PanelComponent from './panel.vue';
import Preview from './preview.js';
export default {
	id: 'api-fetch-panel',
	name: 'API Fetch',
	icon: 'subscriptions',
	preview: Preview,
	description: 'Search for an item then click the button to add it to your collection',
	component: PanelComponent,
	options: [
		{
			field: 'collection',
			type: 'string',
			name: '$t:collection',
			meta: {
				interface: 'system-collection',
				options: {
					includeSystem: false,
					includeSingleton: false,
				},
				width: 'half',
			},
		},
		{
			field: 'responseFormat',
			name: 'Response',
			type: 'string',
			meta: {
				interface: 'system-display-template',
				options: {
					collectionField: 'collection',
					placeholder: '{{ field }}',
				},
				width: 'half',
			},
		},
	],
	minWidth: 20,
	minHeight: 15,
	skipUndefinedKeys: ['responseFormat'],
};
