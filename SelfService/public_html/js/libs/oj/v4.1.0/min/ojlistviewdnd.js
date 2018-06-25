/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojdnd","ojs/ojlistview"],function(a,g){a.ua=function(a){this.wa=a};o_("ListViewDndContext",a.ua,a);a.f.va(a.ua,a.f,"oj.ListViewDndContext");a.ua.pba=67;a.ua.SO=86;a.ua.UO=88;a.ua.EAa="cut";a.ua.AAa="copy";a.ua.KBa="paste";a.ua.EO="pasteBefore";a.ua.DO="pasteAfter";a.ua.prototype.reset=function(){this.T7();this.In=this.$M=this.lG=this.J$=null};a.ua.prototype.kO=function(a){var b=this.wa.Nc("dnd");return null!=b&&b[a]?b[a].items:null};a.ua.prototype.Aw=function(){return this.kO("drag")};
a.ua.prototype.tR=function(){return this.kO("drop")};a.ua.prototype.Tw=function(){return"enabled"==this.kO("reorder")};a.ua.prototype.Cv=function(){return"oj-listview-drag-handle"};a.ua.prototype.lO=function(){return"oj-listview-drag-image"};a.ua.prototype.nY=function(){return"oj-listview-drag-item"};a.ua.prototype.bH=function(){return"oj-listview-cut"};a.ua.prototype.hO=function(){return"oj-listview-"};a.ua.prototype.fh=function(a){return this.wa.cp(a)};a.ua.prototype.XR=function(){var a,b,d,e;a=
[];if(this.wa.Zc())for(b=this.wa.Nc("selection"),d=0;d<b.length;d++)e=this.wa.Zd(b[d]),null==e||this.wa.Pi(g(e))||a.push(e);else e=this.n2(),null!=e&&a.push(e);null!=this.Po&&0<this.Po.length&&-1==a.indexOf(this.Po.get(0))&&a.push(this.Po.get(0));return a};a.ua.prototype.n2=function(){return null==this.wa.ba?null:this.wa.ba.elem[0]};a.ua.prototype.GB=function(a){var b;g(a).hasClass(this.wa.Df())||(a=a.firstElementChild);a=g(a).find("."+this.Cv());null!=a&&0<a.length&&(b=a.attr("aria-labelledby"),
null==b?a.attr("aria-labelledby",this.wa.Mt("instr")):a.attr("aria-labelledby",b+" "+this.wa.Mt("instr")),this.wa.Bo()&&a.attr("draggable","true"))};a.ua.prototype.T7=function(){this.Hxa&&g.each(this.Hxa,function(a,b){g(b).removeClass("oj-draggable")})};a.ua.prototype.K5a=function(){var a=[],b,d,e;this.T7();b=this.wa.Nc("selection");for(d=0;d<b.length;d++)e=this.wa.Zd(b[d]),null==e||this.wa.Pi(g(e))||(a.push(e),g(e).addClass("oj-draggable"));this.Hxa=a};a.ua.prototype.Rra=function(a){var b;b=a.find("."+
this.Cv());if(null!=b&&0<b.length)return!0;a.addClass("oj-draggable");return!1};a.ua.prototype.yZa=function(a){a.removeClass("oj-draggable")};a.ua.prototype.Mra=function(a){var b,d;if(null!=this.Aw()||this.Tw()){b=this.Cv();if(a.hasClass(b))d=g(a);else if(a=this.fh(a),this.uX())d=a;else{if(null!=a&&(b=this.Rra(a)))return;b=this.XR();0<b.length&&(null!=a&&-1<b.indexOf(a[0])?d=a:g(b[0]).removeClass("oj-draggable"))}null!=d&&d.attr("draggable",!0)}};a.ua.prototype.wta=function(a){var b;if(null!=this.Aw()||
this.Tw())b=this.Cv(),a=a.hasClass(b)?g(a):this.fh(a),null!=a&&a.removeAttr("draggable")};a.ua.prototype.Np=function(c,b,d,e){var f;if(c="drag"===c?this.Aw():this.tR())if((b=c[b])&&"function"==typeof b)try{this.wa.fa.Y()?(b(d.originalEvent,e),d.originalEvent.defaultPrevented&&d.preventDefault()):(d.dataTransfer=d.originalEvent.dataTransfer,f=b(d,e))}catch(g){a.D.error("Error: "+g)}else f=-1;else f=-1;return f};a.ua.prototype.uXa=function(a,b,d){var e,f=[],g;for(e=0;e<d.length;e++)(g=this.wa.wka(d[e]))&&
(g.innerHTML&&g.tagName&&"LI"==g.tagName?f.push(g.innerHTML):f.push(g));return 0<f.length?(this.tXa(a.originalEvent,b,f),this.Hca(a.originalEvent,d),{items:f}):null};a.ua.prototype.tXa=function(a,b,d){var e;a=a.dataTransfer;d=JSON.stringify(d);if("string"==typeof b)a.setData(b,d);else if(b)for(e=0;e<b.length;e++)a.setData(b[e],d);a.setData(this.oY(),this.wa.element.get(0).id)};a.ua.prototype.Hca=function(a,b){var d,e,f=Number.MAX_VALUE,h,k,l,m=0,p=0;d=a.target;if(1<b.length){d=g(document.createElement("ul"));
d.get(0).className=this.wa.element.get(0).className;d.addClass(this.lO()).css({width:this.wa.element.css("width"),height:this.wa.element.css("height")});for(e=0;e<b.length;e++)f=Math.min(f,b[e].offsetTop);for(e=0;e<b.length;e++)h=b[e].offsetTop-f,k=b[e].offsetWidth,l=g(b[e].cloneNode(!0)),l.removeClass("oj-selected oj-focus oj-hover").css({position:"absolute",top:h,width:k}),d.append(l)}else g(d).hasClass(this.Cv())?(h=0,g.contains(b[0],d.offsetParent)&&(h=d.offsetTop),m=Math.max(0,d.offsetLeft-b[0].offsetLeft)+
d.offsetWidth/2,p=h+d.offsetHeight/2):(m=Math.max(0,a.offsetX),p=Math.max(0,a.offsetY)),l=g(b[0].cloneNode(!0)),l.removeClass("oj-selected oj-focus oj-hover").addClass("oj-drag"),d=g(document.createElement("ul")),d.get(0).className=this.wa.element.get(0).className,d.addClass(this.lO()).css({width:this.mO(b[0]),height:2*b[0].offsetHeight}).append(l);this.wa.Sh()&&d.addClass("oj-listview-card-layout");g("body").append(d);this.lG=d;a.dataTransfer.setDragImage(d.get(0),m,p)};a.ua.prototype.mO=function(){return this.wa.element.css("width")};
a.ua.prototype.Lba=function(){return"text/ojlistview-items-data"};a.ua.prototype.VJ=function(a){var b,d;b=this.Aw();if(null!=b||this.Tw())if(b=null!=b?b.dataTypes:this.Lba(),g(a.target).hasClass(this.Cv())||this.uX()?(d=[],d.push(this.fh(a.target)[0])):d=this.XR(),0<d.length)if(this.In=d,this.$M=g(d[0]),b=this.uXa(a,b,d)){if(a=this.Np("drag","dragStart",a,b),-1!==a)return a}else return!1};a.ua.prototype.uPa=function(a){return this.Np("drag","drag",a)};a.ua.prototype.NQ=function(){null!=this.lG&&(this.lG.remove(),
this.lG=null)};a.ua.prototype.S3=function(a){var b;if(null!=this.$M&&null!=this.In)for(this.$M.find("."+this.Cv()).removeAttr("draggable"),this.$M.removeClass("oj-drag oj-draggable").removeAttr("draggable"),b=0;b<this.In.length;b++)g(this.In[b]).removeClass(this.nY()).css("display","");this.NI();this.NQ();this.T7();this.Np("drag","dragEnd",a);this.J$=this.In;this.In=this.$M=this.lG=null};a.ua.prototype.l5=function(a){var b,d;if((b=this.tR())&&b.dataTypes)for(b=b.dataTypes,b="string"==typeof b?[b]:
b,a=a.originalEvent.dataTransfer.types,d=0;d<a.length;d++)if(0<=b.indexOf(a[d]))return!0;return!1};a.ua.prototype.yo=function(a,b,d){a=this.Np("drop",a,b,d);(void 0===a||-1===a)&&this.l5(b)&&b.preventDefault();return a};a.ua.prototype.Zha=function(a){var b;null==this.lm&&(b=g(a.get(0).cloneNode(!1)),b.addClass("oj-drop").removeClass("oj-drag oj-draggable oj-hover oj-focus oj-selected").css({display:"block",height:a.outerHeight(),width:a.outerWidth()}),this.lm=b);return this.lm};a.ua.prototype.vha=
function(){null!=this.pk&&-1===this.nG&&this.pk.children("."+this.wa.mg()).removeClass("oj-drop")};a.ua.prototype.uha=function(){null!=this.pk&&this.pk.hasClass(this.wa.IF())&&(this.pk.removeClass("oj-drop"),this.pk.get(0).textContent=this.wa.Dka())};a.ua.prototype.NI=function(){null!=this.lm&&(this.lm.css("height","0"),this.lm.remove(),this.lm=null);this.uha();this.vha()};a.ua.prototype.T3=function(a){var b;b=this.fh(a.target);a=this.yo("dragEnter",a,{item:b.get(0)});if(-1!=a)return a};a.ua.prototype.M6=
function(a){null!=this.pk&&this.pk.removeClass("oj-valid-drop oj-invalid-drop");this.pk=a;this.pk.addClass("oj-valid-drop")};a.ua.prototype.xra=function(a,b){var d;d=a.attr("aria-label");null==d&&(d=a.text());d=this.wa.fa.R("accessibleReorder"+b.charAt(0).toUpperCase()+b.substr(1)+"Item",{item:d});this.wa.wi(d)};a.ua.prototype.kHa=function(){null==this.cya&&this.wa.Bo()&&(this.wa.element.find("ul."+this.wa.Rg()).each(function(){g(this).attr("oldMaxHeight",g(this).css("maxHeight").toString());g(this).css("maxHeight",
1E4)}),this.cya="adjusted")};a.ua.prototype.cra=function(){this.wa.Bo()&&this.wa.element.find("ul."+this.wa.Rg()).each(function(){g(this).css("maxHeight",parseInt(g(this).attr("oldMaxHeight"),10));g(this).removeAttr("oldMaxHeight")});this.cya=null};a.ua.prototype.V3=function(a){var b,d,e,f;this.kHa();if(null!=this.In&&"none"!=g(this.In[0]).css("display")){if(b=g(this.In[0]),e=this.yo("dragOver",a,{item:b.get(0)}),-1===e&&this.Tw()||!1===e||a.isDefaultPrevented()){d=this.Zha(b);for(a=0;a<this.In.length;a++)g(this.In[a]).addClass(this.nY()).css("display",
"none");d.insertBefore(b);this.nG=d.index()}}else b=this.fh(a.target),null!=b&&0<b.length?(e=this.yo("dragOver",a,{item:b.get(0)}),-1===e&&this.Tw()||!1===e||a.isDefaultPrevented()?(b.hasClass(this.wa.Df())?(this.vha(),b.hasClass("oj-drop")||(d=this.Zha(b),f=b.index(),null==this.nG||this.nG<f?(d.insertAfter(b),this.mG="after"):(d.insertBefore(b),this.mG="before"),this.xra(b,this.mG),this.M6(b),this.nG=d.index())):(this.NI(),b.children("."+this.wa.mg()).addClass("oj-drop"),this.M6(b),this.nG=-1,this.mG=
"inside",this.xra(b,this.mG)),a.preventDefault()):g(a.target).hasClass(this.wa.Rg())||(b.addClass("oj-invalid-drop"),this.NI())):(b=this.wa.element.children("."+this.wa.IF()),null!=b&&0<b.length&&(b.addClass("oj-drop"),b.get(0).textContent="",this.M6(b),a.preventDefault()));return e};a.ua.prototype.MS=function(a,b){var d,e;d=b.getBoundingClientRect();e=a.originalEvent;return e.clientX>=d.left&&e.clientX<d.right&&e.clientY>=d.top&&e.clientY<d.bottom};a.ua.prototype.U3=function(a){var b,d;if(null!=
this.pk&&(b=this.fh(a.target),null!=b&&0<b.length?(b.removeClass("oj-valid-drop oj-invalid-drop"),d=this.yo("dragLeave",a,{item:b.get(0)}),this.MS(a,a.currentTarget)||(this.NI(),this.cra())):this.MS(a,a.currentTarget)||this.uha(),-1!=d))return d};a.ua.prototype.W3=function(a){var b,d;if(null!=this.pk&&(b=a.originalEvent.dataTransfer.getData(this.oY()),d=this.pk.hasClass(this.wa.IF())?{}:{item:this.pk.get(0),position:this.mG},this.Tw()&&b===this.wa.element.get(0).id?d.reorder=!0:d.reorder=!1,null!=
this.pk&&this.pk.removeClass("oj-valid-drop"),this.NI(),this.cra(),this.NQ(),b=this.yo("drop",a,d),d.reorder&&(d.items=null==this.In?this.J$:this.In,this.wa.Si("reorder",a,this.ZX(d.items,d.position,d.item)),a.preventDefault()),this.pk=null,this.nG=-1,this.J$=this.mG=null,-1!==b))return b};a.ua.prototype.ZX=function(a,b,d){return{items:a,position:b,reference:d}};a.ua.prototype.Qya=function(a){var b=this,d,e;this.Tw()&&(d=g(a),this.y$!=a&&(this.y$=a,"OJ-MENU"===a.tagName?(a.addEventListener("ojBeforeOpen",
this.fS.bind(this)),a.addEventListener("ojAction",this.Qj.bind(this))):(d.on("ojbeforeopen",this.fS.bind(this)),d.on("ojselect",this.Qj.bind(this)))),this.N$=e=this.nka(a,function(a,c){var d=b.Hl(c,a.tagName);"OJ-OPTION"===a.tagName?(a.innerHTML=d.get(0).innerHTML,g(a).attr("data-oj-command",d.attr("data-oj-command"))):(d.get(0).className=g(a).get(0).className,g(a).replaceWith(d))}),0<e.length&&d.data("oj-ojMenu")&&("OJ-MENU"===a.tagName?a.refresh():g(a).ojMenu("refresh")))};a.ua.prototype.Aka=function(){var a=
this,b="",d="cut copy paste paste-before paste-after pasteBefore pasteAfter".split(" ");this.Gxa||(d.forEach(function(e,f){b+="[data-oj-command\x3d"+a.hO()+e+"],";b+="[data-oj-command\x3d"+e+"]";f<d.length-1&&(b+=",")}),this.Gxa=b);return this.Gxa};a.ua.prototype.nka=function(c,b){var d,e;e=this;d=[];g(c).find(this.Aka()).each(function(){var c;0===g(this).children("a").length?0==g(this).attr("data-oj-command").indexOf(e.hO())&&(c=g(this).attr("data-oj-command").substring(e.hO().length),b&&b(this,
c)):(c=g(this).attr("data-oj-command"),c==a.ua.EO?c="paste-before":c==a.ua.DO&&(c="paste-after"));c&&d.push(c)});return d};a.ua.prototype.Hl=function(c,b){return"paste-before"===c?this.Eh(a.ua.EO,b):"paste-after"===c?this.Eh(a.ua.DO,b):this.Eh(c,b)};a.ua.prototype.Eh=function(a,b){var d=g(document.createElement(b));d.attr("data-oj-command",a);d.append(this.Ez(a));return d};a.ua.prototype.Ez=function(a){a="label"+a.charAt(0).toUpperCase()+a.slice(1);return g('\x3ca href\x3d"#"\x3e\x3c/a\x3e').text(this.wa.fa.R(a))};
a.ua.prototype.UJ=function(a){var b;null!=this.uq&&g(this.uq).removeClass(this.bH());b=this.Kba(a);this.wa.fa.element.focus();g(b).addClass(this.bH());this.uq=b;this.wa.Si("cut",a,{items:b})};a.ua.prototype.Kba=function(){return this.XR()};a.ua.prototype.sma=function(a){var b;null!=this.uq&&g(this.uq).removeClass(this.bH());this.uq=b=this.XR();this.wa.Si("copy",a,{items:b})};a.ua.prototype.XJ=function(a,b,d){this.wa.Si("paste",a,{item:b.get(0)});g(this.uq).removeClass(this.bH());this.wa.Si("reorder",
a,this.ZX(this.uq,d,b.get(0)));this.uq=null};a.ua.prototype.Qj=function(c,b){var d;if(null!=this.Po)switch(d=b?b.item:g(c.target),d.attr("data-oj-command")){case a.ua.EAa:this.UJ(c);break;case a.ua.AAa:this.sma(c);break;case a.ua.KBa:var e=!0;case a.ua.EO:var f=!0;case a.ua.DO:d="after",e?d="inside":f&&(d="before"),this.XJ(c,this.Po,d),this.Po=null}};a.ua.prototype.uI=function(c,b){null!=this.N$&&("paste-before"==b?b=a.ua.EO:"paste-after"==b&&(b=a.ua.DO),c.find("[data-oj-command\x3d'"+b+"']").removeClass("oj-disabled"))};
a.ua.prototype.fS=function(a,b){var d,e;d=g(a.target);d.find(this.Aka()).addClass("oj-disabled");e=b?b.openOptions.launcher:a.detail.openOptions.launcher;null==e||null==this.N$||0==this.N$.length?"OJ-MENU"!=d.get(0).tagName&&d.ojMenu("refresh"):(e.children().first().hasClass(this.wa.mg())?null!=this.uq&&this.uI(d,"paste"):(this.uI(d,"cut"),this.uI(d,"copy"),null!=this.uq&&(this.uI(d,"paste-before"),this.uI(d,"paste-after"))),"OJ-MENU"!=d.get(0).tagName&&d.ojMenu("refresh"),this.Po=e)};a.ua.prototype.fH=
function(c){var b,d,e;if(c.ctrlKey||c.metaKey)if(b=c.keyCode,b===a.ua.UO||b===a.ua.pba||a.ua.SO){if(!this.Tw())return!1;d=this.wa.fa.Wn();if(null==d)return!1;d=this.nka(d);if(0==d.length)return!1;if(b===a.ua.UO&&-1<d.indexOf("cut"))return this.UJ(c),!0;if(b===a.ua.pba&&-1<d.indexOf("copy"))return this.sma(c),!0;if(b===a.ua.SO&&null!=this.uq&&(b=g(this.n2()),b.children().first().hasClass(this.wa.mg())?-1<d.indexOf("paste")&&(e="inside"):-1<d.indexOf("paste-before")?e="before":-1<d.indexOf("paste-after")&&
(e="after"),null!=e))return this.XJ(c,b,e),!0}return!1};a.ua.prototype.uX=function(){return!1};a.ua.prototype.oY=function(){return"text/ojlistview-dragsource-id"}});