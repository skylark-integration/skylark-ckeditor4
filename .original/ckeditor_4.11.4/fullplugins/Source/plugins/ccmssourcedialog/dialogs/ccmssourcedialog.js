﻿/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'ccmssourcedialog', function( editor ) {
	var size = CKEDITOR.document.getWindow().getViewPaneSize();

	// Make it maximum 800px wide, but still fully visible in the viewport.
	var width = Math.min( size.width - 70, 800 );

	// Make it use 2/3 of the viewport height.
	var height = size.height / 1.5;

	// Store old editor data to avoid unnecessary setData.
	var oldData;

	return {
        title: editor.lang.ccmssourcedialog.title,
        minWidth: 100,
        minHeight: 100,

        onShow: function() {
            this.setValueOf('main', 'data', oldData = editor.getData());

            var currentDialog = CKEDITOR.dialog.getCurrent();
            currentDialog.parts.dialog.$.disabled = true;

        },

        onOk: (function() {
            function setData(dialog, newData) {
                // [IE8] Focus editor before setting selection to avoid setting data on
                // locked selection, because in case of inline editor, it won't be
                // unlocked before editable's HTML is altered. (#11585)
                dialog.hide();
                editor.focus();
            }

            return function(event) {
                // Remove CR from input data for reliable comparison with editor data.
                var newData = this.getValueOf('main', 'data').replace(/\r/g, ''),
                    that = this;

                // Avoid unnecessary setData. Also preserve selection
                // when user changed his mind and goes back to wysiwyg editing.
                if (newData === oldData)
                    return true;

                setTimeout(function() {
                    setData(that, newData);
                });

                // Don't let the dialog close before setData is over, to hide
                // from user blinking caused by selection restoring and setting new data.
                return false;
            };
        })(),

        contents: [
            {
                id: 'main',
                label: editor.lang.ccmssourcedialog.title,
                elements: [
                    {
                        type: 'textarea',
                        id: 'data',
                        dir: 'ltr',
                        inputStyle: 'cursor:auto;' +
                            'width:' + width + 'px;' +
                            'height:' + height + 'px;' +
                            'tab-size:4;' +
                            'text-align:left;',
                        'class': 'cke_source'
                    }
                ]
            }
        ],

        buttons: [
            CKEDITOR.dialog.okButton

       ]

};
} );
