﻿/**
 * Block Widget
 *
 * @author Ayhan Akilli
 */
'use strict';

(function (CKEDITOR) {
    /**
     * DTD
     */
    CKEDITOR.dtd.block = {};
    CKEDITOR.dtd.$block.block = 1;
    CKEDITOR.dtd.$empty.block = 1;
    CKEDITOR.dtd.body.block = 1;

    /**
     * Plugin
     */
    CKEDITOR.plugins.add('block', {
        requires: 'api,dialog,widget',
        icons: 'block',
        hidpi: true,
        lang: 'de,en',
        init: function (editor) {
            /**
             * Widget
             */
            editor.widgets.add('block', {
                button: editor.lang.block.title,
                dialog: 'block',
                template: '<div data-block=""></div>',
                allowedContent: {
                    block: {
                        attributes: {id: true},
                        requiredAttributes: {id: true}
                    }
                },
                requiredContent: 'block[id]',
                defaults: {
                    content: '',
                    id: ''
                },
                upcast: function (el, data) {
                    if (el.name !== 'block') {
                        return false;
                    }

                    data.id = el.attributes.id || '';
                    data.content = get(editor.config.blockApi, data.id);
                    var newEl = new CKEDITOR.htmlParser.element('div', {'data-block': data.id});
                    el.replaceWith(newEl);

                    return newEl;
                },
                downcast: function () {
                    if (!!this.data.id && (!editor.config.blockApi || !!this.data.content)) {
                        return new CKEDITOR.htmlParser.element('block', {'id': this.data.id});
                    }

                    return new CKEDITOR.htmlParser.text('');
                },
                data: function () {
                    this.element.setAttribute('data-block', this.data.id);
                    this.element.setHtml(this.data.content);
                }
            });

            /**
             * Dialog
             */
            CKEDITOR.dialog.add('block', this.path + 'dialogs/block.js');
        },
        onLoad: function () {
            CKEDITOR.addCss(
                'div[data-block]:empty {line-height: 6rem;text-align: center;background: #ffa500;}'+
                'div[data-block]:empty::after {content: "Block-ID: " attr(data-block) " ";}'
            );
        }
    });

    /**
     * Dialog definition
     */
    CKEDITOR.on('dialogDefinition', function (ev) {
        if (ev.data.name !== 'block') {
            return;
        }

        /**
         * ID input
         */
        var id = ev.data.definition.contents[0].elements[0];
        id.onLoad = function () {
            var dialog = this.getDialog();
            this.getInputElement().$.addEventListener('change', function () {
                var content = get(ev.editor.config.blockApi, this.value);
                dialog.getContentElement('info', 'content').setValue(content);
            });
        };

        /**
         * Browse button
         */
        if (!!ev.editor.plugins.browser && typeof ev.editor.config.blockBrowser === 'string' && !!ev.editor.config.blockBrowser) {
            var browse = ev.data.definition.contents[0].elements[1];
            browse.hidden = false;
            browse.browser = function (data) {
                if (!!data.id) {
                    var dialog = this.getDialog();
                    ['id', 'content'].forEach(function (item) {
                        dialog.getContentElement('info', item).setValue(data[item] || '');
                    });
                }
            };
            browse.browserUrl = ev.editor.config.blockBrowser;
        }
    }, null, null, 1);

    /**
     * Returns content from API
     *
     * @param {String} url
     * @param {String} id
     *
     * @return {String}
     */
    function get(url, id) {
        if (typeof url === 'function' && !!id) {
            return CKEDITOR.api.xhr.get(url(id)) || '';
        }

        return '';
    }
})(CKEDITOR);
