"use strict";(self.webpackChunkdatatlas=self.webpackChunkdatatlas||[]).push([[514],{7862:function(e,t,a){a.r(t),a.d(t,{default:function(){return ye}});var n=a(7294),r=a(8642),l=a(1944),i=a(5281),o=a(3320),c=a(3791),s=a(4477),d=a(1116),m=a(7517),u=a(5999),b=a(968),p=a(5936);var v="backToTopButton_SdI4",E="backToTopButtonShow_mWsi";function h(){var e=function(e){var t=e.threshold,a=(0,n.useState)(!1),r=a[0],l=a[1],i=(0,n.useRef)(!1),o=(0,b.Ct)(),c=o.startScroll,s=o.cancelScroll;return(0,b.RF)((function(e,a){var n=e.scrollY,r=null==a?void 0:a.scrollY;r&&(i.current?i.current=!1:n>=r?(s(),l(!1)):n<t?l(!1):n+window.innerHeight<document.documentElement.scrollHeight&&l(!0))})),(0,p.S)((function(e){e.location.hash&&(i.current=!0,l(!1))})),{shown:r,scrollToTop:function(){return c(0)}}}({threshold:300}),t=e.shown,a=e.scrollToTop;return n.createElement("button",{"aria-label":(0,u.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,r.Z)("clean-btn",i.k.common.backToTopButton,v,t&&E),type:"button",onClick:a})}var f=a(7394),_=a(7524),k=a(6668),g=a(5012),C=a(7462);function I(e){return n.createElement("svg",(0,C.Z)({width:"20",height:"20","aria-hidden":"true"},e),n.createElement("g",{fill:"#7a7a7a"},n.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),n.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}var S="collapseSidebarButton_Cq4q",Z="collapseSidebarButtonIcon_eHqP";function N(e){var t=e.onClick;return n.createElement("button",{type:"button",title:(0,u.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,u.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,r.Z)("button button--secondary button--outline",S),onClick:t},n.createElement(I,{className:Z}))}var x=a(9689),y=a(3366),T=a(9688),L=Symbol("EmptyContext"),A=n.createContext(L);function M(e){var t=e.children,a=(0,n.useState)(null),r=a[0],l=a[1],i=(0,n.useMemo)((function(){return{expandedItem:r,setExpandedItem:l}}),[r]);return n.createElement(A.Provider,{value:i},t)}var B=a(6043),w=a(8596),H=a(9960),P=a(2389),D=["item","onItemClick","activePath","level","index"];function F(e){var t=e.categoryLabel,a=e.onClick;return n.createElement("button",{"aria-label":(0,u.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:t}),type:"button",className:"clean-btn menu__caret",onClick:a})}function W(e){var t=e.item,a=e.onItemClick,l=e.activePath,o=e.level,s=e.index,d=(0,y.Z)(e,D),m=t.items,u=t.label,b=t.collapsible,p=t.className,v=t.href,E=(0,k.L)().docs.sidebar.autoCollapseCategories,h=function(e){var t=(0,P.Z)();return(0,n.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,c.Wl)(e):void 0}),[e,t])}(t),f=(0,c._F)(t,l),_=(0,w.Mg)(v,l),g=(0,B.u)({initialState:function(){return!!b&&(!f&&t.collapsed)}}),I=g.collapsed,S=g.setCollapsed,Z=function(){var e=(0,n.useContext)(A);if(e===L)throw new T.i6("DocSidebarItemsExpandedStateProvider");return e}(),N=Z.expandedItem,x=Z.setExpandedItem,M=function(e){void 0===e&&(e=!I),x(e?null:s),S(e)};return function(e){var t=e.isActive,a=e.collapsed,r=e.updateCollapsed,l=(0,T.D9)(t);(0,n.useEffect)((function(){t&&!l&&a&&r(!1)}),[t,l,a,r])}({isActive:f,collapsed:I,updateCollapsed:M}),(0,n.useEffect)((function(){b&&null!=N&&N!==s&&E&&S(!0)}),[b,N,s,S,E]),n.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemCategory,i.k.docs.docSidebarItemCategoryLevel(o),"menu__list-item",{"menu__list-item--collapsed":I},p)},n.createElement("div",{className:(0,r.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_})},n.createElement(H.Z,(0,C.Z)({className:(0,r.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!v&&b,"menu__link--active":f}),onClick:b?function(e){null==a||a(t),v?M(!1):(e.preventDefault(),M())}:function(){null==a||a(t)},"aria-current":_?"page":void 0,"aria-expanded":b?!I:void 0,href:b?null!=h?h:"#":h},d),u),v&&b&&n.createElement(F,{categoryLabel:u,onClick:function(e){e.preventDefault(),M()}})),n.createElement(B.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:I},n.createElement(X,{items:m,tabIndex:I?-1:0,onItemClick:a,activePath:l,level:o+1})))}var R=a(3919),q=a(2339),Y="menuExternalLink_iv3S",z=["item","onItemClick","activePath","level","index"];function V(e){var t=e.item,a=e.onItemClick,l=e.activePath,o=e.level,s=(e.index,(0,y.Z)(e,z)),d=t.href,m=t.label,u=t.className,b=t.autoAddBaseUrl,p=(0,c._F)(t,l),v=(0,R.Z)(d);return n.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemLink,i.k.docs.docSidebarItemLinkLevel(o),"menu__list-item",u),key:m},n.createElement(H.Z,(0,C.Z)({className:(0,r.Z)("menu__link",!v&&Y,{"menu__link--active":p}),autoAddBaseUrl:b,"aria-current":p?"page":void 0,to:d},v&&{onClick:a?function(){return a(t)}:void 0},s),m,!v&&n.createElement(q.Z,null)))}var G="menuHtmlItem_DqR3";function Q(e){var t=e.item,a=e.level,l=e.index,o=t.value,c=t.defaultStyle,s=t.className;return n.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemLink,i.k.docs.docSidebarItemLinkLevel(a),c&&[G,"menu__list-item"],s),key:l,dangerouslySetInnerHTML:{__html:o}})}var U=["item"];function K(e){var t=e.item,a=(0,y.Z)(e,U);switch(t.type){case"category":return n.createElement(W,(0,C.Z)({item:t},a));case"html":return n.createElement(Q,(0,C.Z)({item:t},a));default:return n.createElement(V,(0,C.Z)({item:t},a))}}var O=["items"];function J(e){var t=e.items,a=(0,y.Z)(e,O);return n.createElement(M,null,t.map((function(e,t){return n.createElement(K,(0,C.Z)({key:t,item:e,index:t},a))})))}var X=(0,n.memo)(J),j="menu_vPEQ",$="menuWithAnnouncementBar_qugZ";function ee(e){var t=e.path,a=e.sidebar,l=e.className,o=function(){var e=(0,x.nT)().isActive,t=(0,n.useState)(e),a=t[0],r=t[1];return(0,b.RF)((function(t){var a=t.scrollY;e&&r(0===a)}),[e]),e&&a}();return n.createElement("nav",{className:(0,r.Z)("menu thin-scrollbar",j,o&&$,l)},n.createElement("ul",{className:(0,r.Z)(i.k.docs.docSidebarMenu,"menu__list")},n.createElement(X,{items:a,activePath:t,level:1})))}var te="sidebar_oDHW",ae="sidebarWithHideableNavbar_eLdD",ne="sidebarHidden_Jvsw",re="sidebarLogo_IZVG";function le(e){var t=e.path,a=e.sidebar,l=e.onCollapse,i=e.isHidden,o=(0,k.L)(),c=o.navbar.hideOnScroll,s=o.docs.sidebar.hideable;return n.createElement("div",{className:(0,r.Z)(te,c&&ae,i&&ne)},c&&n.createElement(g.Z,{tabIndex:-1,className:re}),n.createElement(ee,{path:t,sidebar:a}),s&&n.createElement(N,{onClick:l}))}var ie=n.memo(le),oe=a(3102),ce=a(2961),se=function(e){var t=e.sidebar,a=e.path,l=(0,ce.e)();return n.createElement("ul",{className:(0,r.Z)(i.k.docs.docSidebarMenu,"menu__list")},n.createElement(X,{items:t,activePath:a,onItemClick:function(e){"category"===e.type&&e.href&&l.toggle(),"link"===e.type&&l.toggle()},level:1}))};function de(e){return n.createElement(oe.Zo,{component:se,props:e})}var me=n.memo(de);function ue(e){var t=(0,_.i)(),a="desktop"===t||"ssr"===t,r="mobile"===t;return n.createElement(n.Fragment,null,a&&n.createElement(ie,e),r&&n.createElement(me,e))}var be="expandButton_sRmC",pe="expandButtonIcon_YyMF";function ve(e){var t=e.toggleSidebar;return n.createElement("div",{className:be,title:(0,u.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,u.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t},n.createElement(I,{className:pe}))}var Ee="docSidebarContainer_otbp",he="docSidebarContainerHidden_Qnl4";function fe(e){var t,a=e.children,r=(0,d.V)();return n.createElement(n.Fragment,{key:null!=(t=null==r?void 0:r.name)?t:"noSidebar"},a)}function _e(e){var t=e.sidebar,a=e.hiddenSidebarContainer,l=e.setHiddenSidebarContainer,o=(0,f.TH)().pathname,c=(0,n.useState)(!1),s=c[0],d=c[1],m=(0,n.useCallback)((function(){s&&d(!1),l((function(e){return!e}))}),[l,s]);return n.createElement("aside",{className:(0,r.Z)(i.k.docs.docSidebarContainer,Ee,a&&he),onTransitionEnd:function(e){e.currentTarget.classList.contains(Ee)&&a&&d(!0)}},n.createElement(fe,null,n.createElement(ue,{sidebar:t,path:o,onCollapse:m,isHidden:s})),s&&n.createElement(ve,{toggleSidebar:m}))}var ke={docMainContainer:"docMainContainer_BYXc",docMainContainerEnhanced:"docMainContainerEnhanced_UZmb",docItemWrapperEnhanced:"docItemWrapperEnhanced_GQbK"};function ge(e){var t=e.hiddenSidebarContainer,a=e.children,l=(0,d.V)();return n.createElement("main",{className:(0,r.Z)(ke.docMainContainer,(t||!l)&&ke.docMainContainerEnhanced)},n.createElement("div",{className:(0,r.Z)("container padding-top--md padding-bottom--lg",ke.docItemWrapper,t&&ke.docItemWrapperEnhanced)},a))}var Ce="docPage_cDO8",Ie="docsWrapper_HdE8";function Se(e){var t=e.children,a=(0,d.V)(),r=(0,n.useState)(!1),l=r[0],i=r[1];return n.createElement(m.Z,{wrapperClassName:Ie},n.createElement(h,null),n.createElement("div",{className:Ce},a&&n.createElement(_e,{sidebar:a.items,hiddenSidebarContainer:l,setHiddenSidebarContainer:i}),n.createElement(ge,{hiddenSidebarContainer:l},t)))}var Ze=a(3161),Ne=a(3510);function xe(e){var t=e.versionMetadata;return n.createElement(n.Fragment,null,n.createElement(Ne.Z,{version:t.version,tag:(0,o.os)(t.pluginId,t.version)}),n.createElement(l.d,null,t.noIndex&&n.createElement("meta",{name:"robots",content:"noindex, nofollow"})))}function ye(e){var t=e.versionMetadata,a=(0,c.hI)(e);if(!a)return n.createElement(Ze.default,null);var o=a.docElement,m=a.sidebarName,u=a.sidebarItems;return n.createElement(n.Fragment,null,n.createElement(xe,e),n.createElement(l.FG,{className:(0,r.Z)(i.k.wrapper.docsPages,i.k.page.docsDocPage,e.versionMetadata.className)},n.createElement(s.q,{version:t},n.createElement(d.b,{name:m,items:u},n.createElement(Se,null,o)))))}}}]);