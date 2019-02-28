// The editor creator to use.
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Template from '@amazee/ckeditor5-template/src/template';
import Linkit from '@amazee/ckeditor5-drupal-linkit/src/linkit';
import DrupalMedia from '@amazee/ckeditor5-drupal-media/src/drupalmedia';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import Validation from '@amazee/ckeditor5-template/src/validation';
import ButtonElement from '@amazee/ckeditor5-drupal-linkit/src/elements/buttonelement';
import TemplateEditing from '@amazee/ckeditor5-template/src/templateediting';
import RemoteControl from '@amazee/ckeditor5-template/src/remotecontrol';
import TabsElement from '@amazee/ckeditor5-template/src/elements/tabselement';
import MergeEditing from '@amazee/ckeditor5-template/src/mergeediting';

import Placeholder from '@amazee/editor-components/components/placeholder/placeholder';

import '@amazee/editor-components/components/container/container';
import '@amazee/editor-components/components/gallery/gallery';
import '@amazee/editor-components/components/tabs/tabs';
import '@amazee/editor-components/components/text_conflict/text_conflict';
import '@amazee/editor-components/components/text_conflict/text_conflict_option/text_conflict_option';

export default class SectionsEditor extends BalloonEditorBase {}

class PlaceholderConfig extends Plugin {
	init() {
		const templates = this.editor.config.get( 'templates' );
		Placeholder.availableSections = Object.keys( templates )
			.map( id => ( { id, label: templates[ id ].label, icon: templates[ id ].icon } ) );
	}
}

// Plugins to include in the build.
SectionsEditor.builtinPlugins = [
	PlaceholderConfig,
	RemoteControl,
	Essentials,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	List,
	Paragraph,
	Table,
	TableToolbar,
	BlockToolbar,
	Template,
	Linkit,
	TemplateEditing,
	DrupalMedia,
	Validation,
	TabsElement,
	ButtonElement,
	MergeEditing
];

// Editor configuration.
SectionsEditor.defaultConfig = {
	templates: {
		root: {
			label: 'Root',
			template: '<div class="root" ck-type="container" ck-contains="text paragraph text_media gallery tabs columns"></div>',
		},
		paragraph: {
			label: 'Paragraph',
			icon: 'text',
			template:
				'<div class="paragraph__wrapper"><p class="paragraph" ck-type="text"></p></div>',
		},
		text: {
			label: 'Text',
			icon: 'text',
			template:
				'<div class="text" id="">' +
					'<h2 class="text__headline" ck-type="text" ck-plain="true">Insert a headline</h2>' +
					'<div class="text__content" ck-type="text"></div>' +
				'</div>',
		},
		text_media: {
			label: 'Text & Media',
			icon: 'text_media',
			template:
				'<div class="text-media" id="" data-layout="right">' +
					'<h2 class="text-media__headline" ck-type="text" ck-plain="true">Insert a headline</h2>' +
					'<div class="text-media__wrapper">' +
						'<div class="text-media__content" ck-type="text"></div>' +
						'<div class="text-media__media" ck-type="placeholder" ck-conversions="image"></div>' +
					'</div>' +
					'<div class="text-media__cta" ck-type="button">Call to action!</div>' +
				'</div>',
		},
		image: {
			label: 'Image',
			icon: 'image',
			template: '<div class="media-wrapper">' +
				'<div class="text-media__media" ck-type="drupal-media" data-media-type="image" data-media-uuid=""></div>' +
				'</div>',
		},
		video: {
			label: 'Image',
			icon: 'video',
			template: '<div class="media-wrapper">' +
				'<div class="text-media__media" ck-type="drupal-media" data-media-type="image" data-media-uuid=""></div>' +
				'</div>',
		},
		media: {
			label: 'Media',
			icon: 'misc',
			template: '<div class="media-item" ck-type="placeholder" ck-conversions="image video"></div>',
		},
		gallery: {
			label: 'Gallery',
			icon: 'carousel',
			template:
				'<div class="gallery_wrapper"><div class="gallery" ck-type="gallery" ck-contains="media"></div></div>',
		},
		columns: {
			label: 'Columns',
			icon: 'misc',
			template:
			'<div class="two-columns"><div class="two-col-wrapper">' +
				'<div class="column-a" ck-type="container" ck-contains="text media gallery"></div>' +
				'<div class="column-b" ck-type="container" ck-contains="text media gallery"></div>' +
			'</div></div>'
		},
		tabs: {
			label: 'Tabs',
			icon: 'misc',
			template:
				'<div class="tabs_wrapper"><div class="tabs" ck-type="tabs" ck-contains="tab"></div></div>',
		},
		tab: {
			label: 'Tab',
			template:
				'<div class="tab_wrapper" data-tab-title="" data-default-tab=""><div class="tab" ck-type="gallery" ck-contains="image"></div></div>',
		}
	},
	masterTemplate: 'root',
	templateAttributes: {
		'data-tab-title': {
			type: 'custom',
		},
		'data-default-tab': {
			type: 'custom',
		},
		'id': {
			type: 'textfield',
			label: 'HTML ID',
		},
		'data-layout': {
			type: 'dropdown',
			label: 'Layout',
			options: {
				left: 'Media on the left',
				right: 'Media on the right',
			}
		}
	},
	drupalMediaSelector: { callback: ( type, operation, callback ) => {
		callback( operation === 'add' ? '300' : '400' );
	} },
	drupalMediaRenderer: { callback: ( uuid, display, callback ) => {
		window.setTimeout( () => {
			callback( `<img src="https://picsum.photos/800/${ uuid }"/>` );
		}, 2000 );
	} },
	drupalLinkSelector: { callback: ( existingValues, callback ) => {
		callback( { href: 'http://www.drupal.org' } );
	} },
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'insertTable',
			'undo',
			'redo'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	blockToolbar: [ 'heading', 'insertTable' ],
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
