// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

export default class SectionsEditor extends BalloonEditorBase {}

// Plugins to include in the build.
SectionsEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	Link,
	List,
	Paragraph,
	Table,
	TableToolbar
];

// Editor configuration.
SectionsEditor.defaultConfig = {
	templates: {
		root: {
			label: 'Root',
			template: '<div class="root" ck-type="container" ck-contains="text text-media gallery"></div>',
		},
		text: {
			label: 'Text',
			template:
				'<div class="text" id="">' +
					'<h2 class="text__headline" ck-type="text">Insert a headline</h2>' +
					'<div class="text__content" ck-type="text"></div>' +
				'</div>',
		},
		text_media: {
			label: 'Text & Media',
			template:
				'<div class="text-media" id="" data-layout="right">' +
					'<h2 class="text-media__headline" ck-type="text">Insert a headline</h2>' +
					'<div class="text-media__wrapper">' +
						'<div class="text-media__content" ck-type="text"></div>' +
						'<div class="text-media__media" ck-type="placeholder" ck-conversions="image"></div>' +
					'</div>',
				'</div>',
		},
		image: {
			label: 'Image',
			template: '<div class="text-media__media" ck-type="drupal-media" data-media-type="image" data-media-uuid=""></div>',
		},
		gallery: {
			label: 'Gallery',
			template:
				'<div class="gallery" ck-type="gallery" ck-contains="image"></div>',
		}
	},
	masterTemplate: 'root',
	templateAttributes: {
		'id': {
			type: 'textfield',
			label: 'HTML ID',
		},
		'data-layout': {
			type: 'dropdown',
			label: 'Layout',
			options: {
				left: 'Media on the left' ,
				right: 'Media on the right' ,
			}
		}
	},
	drupalMediaSelector( type, operation, callback ) {
		callback( operation === 'add' ? '300' : '400' );
	},
	drupalMediaRenderer( uuid, display, callback ) {
		window.setTimeout( () => {
			callback( `<img src="https://picsum.photos/800/${ uuid }"/>` );
		}, 2000 );
	},
	toolbar: {
		items: [
			'heading',
			'|',
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
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
