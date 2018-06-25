<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page contentType="text/html;charset=UTF-8"%>

<html dir="ltr" lang="en-US">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <link rel="icon" href="css/images/SAMI.png"/>
        <title>Sami Self Service</title>

        <!--  JET start -->
        <script type="text/javascript" src="js/libs/require/require.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script src="jquery-1.9.0.min.js" type="text/javascript"></script>


        <!-- This is the main css file for the default Alta theme -->
        <!-- injector:theme -->
            <link rel="stylesheet" href="css/libs/oj/v4.1.0/alta/oj-alta.css" type="text/css"/>
        <!-- endinjector -->

        <!-- Font awesome-->
        <link rel="stylesheet" href="css/libs/fa/font-awesome.min.css" type="text/css"/>
        <!-- This contains icon fonts used by the starter template -->
        <link rel="stylesheet" href="css/demo-alta-site-min.css" type="text/css" />

        <!-- This is where you would add any app specific styling -->
        <link rel="stylesheet" href="css/override.css" type="text/css" />
        <link rel="stylesheet" href="css/helper.css" type="text/css" />
        <link rel="stylesheet" href="css/navigationbar.css" type="text/css" />

        <!-- JET end  -->
    </head>

    <body class="oj-web-applayout-body">
        <div class="se-pre-con"></div>
        <!-- Template for rendering navigation items -->
        <script type="text/html" id="navTemplate">
            <li data-bind="attr:{ id : $data['id']}">
                <a href="#">
                    <span data-bind="css: $data['iconClass']" style="color: white !important;"></span>
                    <span data-bind="text: $data['name']" style="color: white !important;"></span>
                    <!-- ko if: $data['id'] === 'notifications' -->
                    <span class="button__badge" data-bind="text : $parent.noOfNotification()"></span>
                    <!--/ko-->
                </a>
            </li>
        </script>
        <!-- Template for rendering navigation items with icons -->
        <script type="text/html" id="navTemplateIcons">
            <li>
                <a href="#">
                    <span data-bind="css: $data['iconClass']"></span>
                    <!-- ko text: $data['name'] --> <!--/ko-->
                </a>
            </li>
        </script>
        
        
        <div id="preloader" class="preloader-container oj-sm-hide oj-flex">
            <div class="preloader oj-sm-align-self-center"></div>
        </div>
        <!--<div id="globalBody" class="oj-offcanvas-outer-wrapper oj-offcanvas-page">-->
        <div id="globalBody" class="oj-offcanvas-outer-wrapper">
            <div id="navDrawer" class="oj-contrast-marker oj-web-applayout-offcanvas oj-offcanvas-start">
                <div id="animatableCard" class="nav-container">
                    <!-- back face of card -->
                    <div class="cardface backside oj-animation-backface" data-bind="click: buttonClick">
                        <div class="oj-flex">
                            <h5><b data-bind="text: name_lng() + ': '"> Name : </b><span data-bind="text: personDetails().displayName"></span> </h5>
                            <h5><b data-bind="text: managerName_lng() + ': '"> Manager: </b><span data-bind="text:  personDetails().managerName"></span> </h5>
                            <h5><b data-bind="text: position_lng() + ': '"> Position : </b><span data-bind="text:  personDetails().positionName"></span> </h5>
                            <h5><b data-bind="text: personNumber_lng() + ': '"> Person Number : </b><span data-bind="text:  personDetails().personNumber"></span> </h5>

                        </div>                                        
                        <div class="oj-flex">
                            <h5><b data-bind="text: department_lng() + ': '"> Department : </b><span data-bind="text:  personDetails().departmentName"></span> </h5>
                            <h5><b data-bind="text: grade_lng() + ': '"> Grade : </b><span data-bind="text:  personDetails().grade"></span> </h5>
                        </div>
                    </div>                                
                    <!-- front face of card -->
                    <div class="cardface" data-bind="click: buttonClick">
                        <img id="profilepic" src="css/images/avatar_24px.png" alt="User" style="border-radius:75px; width:180px;height: 180px;  display:block;  margin-left: auto; margin-right: auto;margin-left: auto ;margin-right: auto; " class="profilepic">
                    </div>    
                </div>
                <div data-bind="ojComponent: {component: 'ojNavigationList',
                                                navigationLevel: 'application',
                                                item: {template: 'navTemplateIcons'}, data: navDataSourceLeft,
                                                selection: router.stateId, edge: 'start'}">
                </div>
            </div>

            <div id="navRightDrawer" class="oj-contrast-marker oj-web-applayout-offcanvas oj-offcanvas-end" style="z-index: 9999999;">
                <div data-bind="ojComponent: {component: 'ojNavigationList',
                                                navigationLevel: 'application',
                                                item: {template: 'navTemplateIcons'}, data: navDataSourceTop,
                                                selection: router.stateId, edge: 'start'}">
                </div>
            </div>                               

            <!-- <div id="globalBody" class="oj-offcanvas-outer-wrapper oj-offcanvas-page"> -->

            <div id="pageContent" class="oj-web-applayout-page">
                <!-- ko ifnot: hasErrorOccured() -->
                <header role="banner" class="textwhite demo-oracleui oj-web-applayout-header" data-bind="css: !isUserLoggedIn() ? 'oj-sm-hide' : ''">
                    <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
                        <!-- Offcanvas toggle button -->
                        <div class="oj-flex-bar-start oj-lg-hide">
                            <button id="drawerToggleButton" class="oj-button-lg" data-bind="click: toggleDrawer,
                ojComponent: {component:'ojButton', label: 'Application Navigation',
                chroming: 'half', display: 'icons', icons: {start: 'oj-web-applayout-offcanvas-icon'}}">
                            </button>
                        </div>
                        <!--<div data-bind="css: smScreen() ? 'oj-flex-bar-center-absolute' : 'oj-flex-bar-middle oj-sm-align-items-baseline'">
                            <span role="img" class="oj-icon demo-conduent-icon" data-bind="css: isScreenSMorMD() ? 'oj-sm-hide' : ''" style="width: 253px;height:50px;
                                  content:url(&quot;./images/logo.png&quot;);" title="AppsPro Logo" alt="AppsPro Logo"></span> &nbsp; &nbsp; &nbsp;

                        </div>-->



                        <div class="oj-flex-bar-end">
                            <div id='menubutton-container'>
                                <oj-menu-button id="menuButton" chroming = "half">
                                    <span data-bind='text: userLogin()' class="textwhite"></span>
                                    <!-- To handle menu item selection, use an action listener as shown, not a click listener. -->
                                    <oj-menu id="myMenu" slot="menu" style="display:none">
                                        <oj-option id="pref" value="Preferences">
                                            <span class="fa fa-cog" aria-hidden="true" slot="startIcon"></span><span data-bind="text: preferences_lng"></span>
                                        </oj-option>
                                        <oj-option id="help" value="Help">
                                            <span class="demo-icon-font demo-chat-icon-24" slot="startIcon"></span><span data-bind="text: help_lng"></span>
                                        </oj-option>
                                        <oj-option id="about" value="About">
                                            <span class="demo-icon-font demo-info-icon-24" slot="startIcon"></span><span data-bind="text: about_lng"></span>
                                        </oj-option>
                                        <oj-option id="out" value="Sign Out" data-bind="click:function(){window.location.href = '/SamiSelfService/logout';}">
                                            <span class="demo-icon-font demo-signout-icon-24" slot="startIcon" ></span><span data-bind="text: signOut_lng"></span>
                                        </oj-option>
                                    </oj-menu>
                                </oj-menu-button>
                            </div>
                            <!-- Responsive Toolbar -->
                            <!-- Offcanvas toggle button -->
                            <div class="oj-md-hide">
                                <button id="rightDrawerToggleButton" class="oj-button-lg" data-bind="click: toggleRightDrawer,
                    ojComponent: {component:'ojButton', label: 'Application Navigation',
                    chroming: 'half', display: 'icons', icons: {start: 'oj-web-applayout-offcanvas-icon'}}">
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- ko if: windowSize() !== 'SM' -->
                    <div id="tabbarcontainer" style=" max-width: 650px;float: right;" class="oj-md-condense oj-md-justify-content-flex-end">
                        <oj-tab-bar 
                          selection="{{router.stateId}}"
                          display="[[display]]"
                          data="[[navDataSourceTop]]"
                          edge="[[edge]]"
                          item.renderer="[[oj.KnockoutTemplateUtils.getRenderer('navTemplate', true)]]">
                        </oj-tab-bar>
                    </div>
                    <!-- /ko -->
                </header>
                <!-- /ko -->
                
                <!-- ko if: isUserLoggedIn() && hasErrorOccured() -->
                <div class="oj-flex">
                    <div id="mainContent" role="main" class="oj-sm-12 oj-flex-item"
                         data-bind="ojModule: router.moduleConfig">
                    </div>
                </div>
                <!-- /ko -->
                
                <!-- ko if: isUserLoggedIn() && !hasErrorOccured() -->
                <div role="main" class="oj-web-applayout-max-width oj-web-applayout-content">
                    <div class="oj-md-odd-rows-2">       
                        <div class="oj-flex">
                            <div class="oj-flex-item oj-lg-12" data-bind="css: { 'display-none' : isScreenSMorMD() }">
                                <div class="oj-panel oj-margin ">
                                    <div class="oj-flex">
                                        <div class="oj-flex-item oj-margin">
                                            <img id="profilepic" src="css/images/avatar_24px.png" alt="User" style="border-radius:75px; width:180px;height: 180px;  display:block;  margin-left: auto; margin-right: auto;margin-left: auto ;margin-right: auto; " class="profilepic">
                                        </div>
                                        <div class="oj-flex-item oj-margin">
                                            <h5><b data-bind="text: name_lng() + ': '"> Name : </b><span data-bind="text: personDetails().displayName"></span> </h5>
                                           <h5><b data-bind="text: managerName_lng() + ': '"> Manager: </b><span data-bind="text:  personDetails().managerName"></span> </h5>
                                            <h5><b data-bind="text: position_lng() + ': '"> Position : </b><span data-bind="text:  personDetails().positionName"></span> </h5>
                                            <h5><b data-bind="text: personNumber_lng() + ': '"> Person Number : </b><span data-bind="text:  personDetails().personNumber"></span> </h5>
                                        </div>
                                        <div class="oj-flex-item oj-margin">
                                            <h5><b data-bind="text: department_lng() + ': '"> Department : </b><span data-bind="text:  personDetails().departmentName"></span> </h5>
                                            <h5><b data-bind="text: grade_lng() + ': '"> Grade : </b><span data-bind="text:  personDetails().grade"></span> </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="oj-flex-item" > 
                                <div data-bind="css: { 'oj-margin oj-panel' : !isScreenSMorMD() }">
                                    <div class="oj-flex">
                                        <div class=" oj-margin oj-flex-item oj-md-flex-initial"  data-bind="ojComponent: {component: 'ojNavigationList',
                                                                navigationLevel: 'application', display: smScreen() ? 'icons' : 'all',
                                                                item: {template: 'navTemplateIcons'}, data: navDataSourceLeft,
                                                                selection: router.stateId, edge: 'start'},
                                                                css: isScreenSMorMD() ? 'display-none' : 'oj-panel oj-md-condense oj-md-justify-content-flex-end'">
                                        </div>
                                        <div class="oj-flex-item" style="max-width:846px;">
                                            <div id="mainContent" role="main" class="oj-flex-item"
                                                 data-bind="ojModule: router.moduleConfig, css: { 'oj-margin oj-panel' : !isScreenSMorMD() }">
                                            </div>
                                        </div>                                              
                                    </div>
                                </div>                                               
                            </div>
                        </div>
                    </div>


                </div>
                <!-- /ko -->
                <!-- ko ifnot: isUserLoggedIn() -->
                <div class="demo-oracleui oj-web-applayout-content oj-flex oj-sm-align-items-center">
                    <div class="oj-margin-lg-top oj-sm-12 oj-flex-item">
                        <div class="oj-flex oj-margin-lg-bottom oj-sm-justify-content-center">
                            <img data-bind="css: windowSize() === 'SM' ? 'login-form-logo-sm' : 'login-form-logo-lg'" src="css/images/SAMI.png" alt="Nadec">
                        </div>
                        <div class="oj-flex oj-sm-justify-content-center">
                            <input id="userName" type="text" data-bind="ojComponent: {
                                                            component: 'ojInputText',
                                                            placeholder: userNameLabel,
                                                            value: userName,
                                                            invalidComponentTracker: tracker,
                                                            required: true,
                                                            rootAttributes: {style:'max-width:250px'} ,
                                                            translations: {'required': {
                                                                messageDetail: 'Please enter a valid user name'}}
                            }" />
                        </div>
                        <div class="oj-flex oj-sm-justify-content-center">
                            <input id="password" type="password" data-bind="ojComponent: {
                                                            component: 'ojInputPassword',
                                                            placeholder: passwordLabel,
                                                            value: password,
                                                            invalidComponentTracker: tracker,
                                                            required: true,
                                                            rootAttributes: {style:'max-width:250px'} ,
                                                            translations: {'required': {
                                                                messageDetail: 'Please enter a valid password'}}
                            }" />
                        </div>
                        <div class="oj-flex oj-sm-justify-content-center" data-bind="visible: loginFailureText() !== ''">
                            <span class="error-message-text text-align-center" data-bind="text: loginFailureText"></span> 
                        </div>
                        <div class="oj-margin-top oj-flex oj-sm-justify-content-center">
                            <button class="oj-margin-horizontal oj-button-confirm" 
                                    data-bind="click: onLogin,
                                                ojComponent: {
                                                    component: 'ojButton',
                                                    label: loginLabel,
                                                    chrome: 'full'
                            }"></button>
                            <button class="oj-margin-horizontal" 
                                    data-bind="click: onReset,
                                                ojComponent: {
                                                    component: 'ojButton',
                                                    label: resetLabel,
                                                    chrome: 'full'
                            }"></button>
                        </div>
                    </div>
                </div>
                <!-- /ko -->
                <!-- ko ifnot: hasErrorOccured() -->
                <footer class="demo-oracleui oj-web-applayout-footer" role="contentinfo" style="width: 100%;">
                    <div class="oj-web-applayout-footer-item oj-web-applayout-max-width">
                        <ul>
                            <!-- ko foreach: footerLinks -->
                            <li><a data-bind="text : name, attr : {id: linkId, href : linkTarget}"></a></li>
                            <!-- /ko -->
                        </ul>
                        <a class="oj-margin-horizontal" data-bind="click: switchLanguage, text: languageSwitch_lng">Switch</a>
                    </div>
                    <div class="oj-web-applayout-footer-item oj-web-applayout-max-width oj-text-secondary-color oj-text-sm">
                        COPYRIGHT (C) 2015 All rights reserved.
                    </div>
                </footer>
                <!-- /ko -->
            </div>
        </div>
        <script src="helper.js" type="text/javascript"></script>
    </body>

</html>
