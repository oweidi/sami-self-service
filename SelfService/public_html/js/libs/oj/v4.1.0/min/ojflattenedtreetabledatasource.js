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
define(["ojs/ojcore","jquery","ojs/ojdatasource-common"],function(a,g){a.bc=function(c,b){b=b||{};if(!(c instanceof a.Fa))throw Error(a.ta.Ae._ERR_DATA_INVALID_TYPE_SUMMARY+"\n"+a.ta.Ae._ERR_DATA_INVALID_TYPE_DETAIL);this.p=c;this.Qf=[];this.oa=0;this.Tj=[];this.Tl=!0;null==this.p.DM("fetchSize")&&(this.p.Jo=function(){return-1});var d=this;this.p.kW=function(b,c,g){var k,l,m,p,t=[],s=[],n=[];for(c=0;c<g.getCount();c++){l=g.getData(c);p=g.getMetadata(c).key;m=b+c;d.Tj.splice(m,0,{});d.Tj[m].nodeSet=
g;d.Tj[m].startIndex=b;for(k=m+1;k<d.Tj.length;k++)d.Tj[k].startIndex+=1;t.push(d.ck(l));s.push(p);n.push(m);d.Oa.data.splice(m,0,l);d.Oa.keys.splice(m,0,p);d.Oa.indexes.splice(m,0,m)}d.dL();d.Tl=!0;a.ta.N.handleEvent.call(d,a.ta.ga.ADD,{data:t,keys:s,indexes:n})};this.p.lX=function(b){var c,g,k,l=[],m=[],p=[];for(c=b.length-1;0<=c;c--){k=b[c].index;l.push("");m.push(b[c].key);p.push(k);d.Tj.splice(k,1);for(g=k;g<d.Tj.length;g++)d.Tj[g].startIndex-=1;d.Oa.data.splice(k,1);d.Oa.keys.splice(k,1);d.Oa.indexes.splice(k,
1)}p=p.sort(function(a,b){return a-b});d.dL();d.Tl=!0;a.ta.N.handleEvent.call(d,a.ta.ga.REMOVE,{data:l,keys:m,indexes:p})};this.Init();if(null!=b&&("enabled"==b.startFetch||null==b.startFetch)||null==b)this.FL=!0};o_("FlattenedTreeTableDataSource",a.bc,a);a.f.va(a.bc,a.ta,"oj.FlattenedTreeTableDataSource");a.bc.prototype.Init=function(){a.bc.N.Init.call(this)};a.bc.prototype.getCapability=function(){return"full"};a.f.j("FlattenedTreeTableDataSource.prototype.getCapability",{getCapability:a.bc.prototype.getCapability});
a.bc.prototype.getWrappedDataSource=function(){return this.p};a.f.j("FlattenedTreeTableDataSource.prototype.getWrappedDataSource",{getWrappedDataSource:a.bc.prototype.getWrappedDataSource});a.bc.prototype.fetch=function(a){a=a||{};return"init"!=a.fetchType||this.FL?this.ki(a):Promise.resolve()};a.f.j("FlattenedTreeTableDataSource.prototype.fetch",{fetch:a.bc.prototype.fetch});a.bc.prototype.at=function(a){var b;b=0>a||a>=this.Oa.data.length?null:{data:this.Oa.data[a],index:a,key:this.Oa.keys[a]};
return new Promise(function(a){a(b)})};a.f.j("FlattenedTreeTableDataSource.prototype.at",{at:a.bc.prototype.at});a.bc.prototype.collapse=function(a){this.p.collapse(a)};a.f.j("FlattenedTreeTableDataSource.prototype.collapse",{collapse:a.bc.prototype.collapse});a.bc.prototype.expand=function(a){this.p.expand(a)};a.f.j("FlattenedTreeTableDataSource.prototype.expand",{expand:a.bc.prototype.expand});a.bc.prototype.get=function(a){var b=this.p.Bn(Object(a));a={data:this.ck(this.Oa.data[b]),key:a,index:b};
return Promise.resolve(a)};a.f.j("FlattenedTreeTableDataSource.prototype.get",{get:a.bc.prototype.get});a.bc.prototype.on=function(c,b){if("expand"==c||"collapse"==c)this.p.on(c,b);else a.bc.N.on.call(this,c,b)};a.f.j("FlattenedTreeTableDataSource.prototype.on",{on:a.bc.prototype.on});a.bc.prototype.off=function(c,b){"expand"==c||"collapse"==c?this.p.off(c,b):a.bc.N.off.call(this,c,b)};a.f.j("FlattenedTreeTableDataSource.prototype.off",{off:a.bc.prototype.off});a.bc.prototype.sort=function(c){null==
c?c=this.sortCriteria:this.sortCriteria=c;var b=this;c.axis="column";return new Promise(function(d,e){b.p.getWrappedDataSource().sort(c,{success:function(){setTimeout(function(){b.p.refresh();b.Oa=null;var e={header:c.key,direction:c.direction};a.ta.N.handleEvent.call(b,a.ta.ga.RESET,null);d(e)},0)}.bind(this),error:function(a){e(a)}.bind(this)})})};a.f.j("FlattenedTreeTableDataSource.prototype.sort",{sort:a.bc.prototype.sort});a.bc.prototype.totalSize=function(){return this.Tl?-1:this.Oa.data.length};
a.f.j("FlattenedTreeTableDataSource.prototype.totalSize",{totalSize:a.bc.prototype.totalSize});a.bc.prototype.totalSizeConfidence=function(){return this.Tl?"unknown":"actual"};a.f.j("FlattenedTreeTableDataSource.prototype.totalSizeConfidence",{totalSizeConfidence:a.bc.prototype.totalSizeConfidence});a.bc.prototype.JR=function(a){var b=this.Tj[a].nodeSet.getStart();return this.Tj[a].nodeSet.getMetadata(b+a-this.Tj[a].startIndex)};a.bc.prototype.ki=function(c){c=c||{};this.EL(c);this.oa=null==c.startIndex?
this.oa:c.startIndex;var b=Number.MAX_VALUE;this.Nb=null==c.pageSize?this.Nb:c.pageSize;null!=this.Nb&&(b=this.Nb);var d=this.oa;if(null!=this.Oa)if(null!=this.Nb){var e=this.Oa.data.length-1;if(this.oa+this.Nb-1<=e){var e=a.bc.wR(this.Oa,this.oa,this.Nb),b=[],d=[],f,g;for(f=this.oa;f<=e;f++)g=this.Oa.keys[f],b[f-this.oa]=this.ck(this.Oa.data[f]),d[f-this.oa]=g;e={data:b,keys:d,startIndex:this.oa};this.Gp(c,e,null);return Promise.resolve(e)}this.oa<=e&&(d=e+1)}else this.p.refresh(),this.Oa=null;else d=
0;var k={start:d,count:b},l=this;return new Promise(function(b,d){l.p.Su(k,{success:function(d){l.Z3(d);c.refresh=!0;d=a.bc.wR(l.Oa,l.oa,l.Nb);var e=[],f=[],g,h;for(g=l.oa;g<=d;g++)h=l.Oa.keys[g],e[g-l.oa]=l.ck(l.Oa.data[g]),f[g-l.oa]=h;l.Tl=0<e.length?null!=l.Nb&&e.length<l.Nb?!1:!0:!1;d={data:e,keys:f,startIndex:l.oa};l.Gp(c,d,null);b(d)}.bind(this),error:function(a){l.Gp(c,null,a);d(a)}.bind(this)})})};a.bc.prototype.Z3=function(c){var b=c.getStart(),d,e;for(d=0;d<c.getCount();d++)e=b+d,this.Tj[e]=
{},this.Tj[e].nodeSet=c,this.Tj[e].startIndex=b;this.Oa||(this.Oa={},this.Oa.data=[],this.Oa.keys=[],this.Oa.indexes=[]);a.bc.eE(c,this,this.Oa,b)};a.bc.prototype.EL=function(c){c.silent||a.ta.N.handleEvent.call(this,a.ta.ga.REQUEST,{startIndex:c.startIndex})};a.bc.prototype.Gp=function(c,b,d){null!=d?a.ta.N.handleEvent.call(this,a.ta.ga.ERROR,d):c.silent||a.ta.N.handleEvent.call(this,a.ta.ga.SYNC,b)};a.bc.wR=function(a,b,d){var e=a.data.length-1;0<d&&(e=b+d-1,e=e>a.data.length-1?a.data.length-1:
e);return e};a.bc.eE=function(a,b,d,e){for(b=0;b<a.getCount();b++){var f=a.getData(a.getStart()+b);d.data[e+b]=f;d.keys[e+b]=a.getMetadata(a.getStart()+b).key;d.indexes[e+b]=e+b}};a.bc.prototype.dL=function(){for(var a=0;a<this.Oa.data.length;a++)this.Oa.indexes[a]=a};a.bc.prototype.ck=function(c){var b=g.extend(!0,{},c),d,e=Object.keys(c);for(d=0;d<e.length;d++)a.bc.x1(b,c,e[d]);return b};a.bc.x1=function(a,b,d){Object.defineProperty(a,d,{get:function(){return b[d]},set:function(a){b[d]=a},enumerable:!0})}});