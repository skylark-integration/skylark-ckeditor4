﻿var PERFORMX=PERFORMX||{};PERFORMX.openaccess={info:{version:"1.0.1"}};
CKEDITOR.plugins.add("performx",{init:function(a){a.addCommand("pxTemplateDialog",new CKEDITOR.dialogCommand("pxTemplateDialog"));a.ui.addButton("pxTemplate",{label:"Editor content templates",command:"pxTemplateDialog",icon:this.path+"icons/pxtemplate.png"});CKEDITOR.dialog.add("pxTemplateDialog",this.path+"dialogs/pxtemplate.js");a.addCommand("pxTableDialog",new CKEDITOR.dialogCommand("pxTableDialog"));a.ui.addButton("pxTable",{label:"Table library",command:"pxTableDialog",icon:this.path+"icons/pxtable.png"});
CKEDITOR.dialog.add("pxTableDialog",this.path+"dialogs/pxtable.js");a.addCommand("pxAccessibilityDialog",new CKEDITOR.dialogCommand("pxAccessibilityDialog"));a.ui.addButton("pxAccessibility",{label:"Accessibility checker",command:"pxAccessibilityDialog",icon:this.path+"icons/pxaccessibility.png"});CKEDITOR.dialog.add("pxAccessibilityDialog",this.path+"dialogs/pxaccessibility.js");CKEDITOR.dialog.add("aboutDialog",this.path+"dialogs/about/about.js");CKEDITOR.dialog.add("helpDialog",this.path+"dialogs/about/help.js");
a.on("selectionChange",function(b){a.getSelection().getStartElement().getAscendant("table",!0)?(a.getCommand("pxTableDialog").disable(),a.getCommand("pxTemplateDialog").disable()):(a.getCommand("pxTableDialog").enable(),a.getCommand("pxTemplateDialog").enable())})}});
