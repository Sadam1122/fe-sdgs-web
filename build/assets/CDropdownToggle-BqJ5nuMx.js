import{r as c,_ as M,R as t,f as p,g as V,P as r,z as ie,A as se}from"./index-CRBSqi5w.js";import{e as le,c as de}from"./index.esm-Y-xtHiOh.js";import{C as pe}from"./CConditionalPortal-BCy2K4uu.js";import{v as z}from"./ProBadge-BkcPIT-x.js";import{u as ce,i as ue}from"./isRTL-CCtE7Wo2.js";import{g as fe}from"./getNextActiveElement-A4UnslJ5.js";var me=function(e){var n=[];if(typeof e=="object")for(var o in e)n.push("dropdown-menu".concat(o==="xs"?"":"-".concat(o),"-").concat(e[o]));return typeof e=="string"&&n.push("dropdown-menu-".concat(e)),n},ve=function(e,n,o,i){var a=e;return n==="dropup"&&(a=i?"top-end":"top-start"),n==="dropup-center"&&(a="top"),n==="dropend"&&(a=i?"left-start":"right-start"),n==="dropstart"&&(a=i?"right-start":"left-start"),o==="end"&&(a=i?"bottom-start":"bottom-end"),a},S=c.createContext({}),G=c.forwardRef(function(e,n){var o,i=e.children,a=e.alignment,b=e.as,h=b===void 0?"div":b,l=e.autoClose,f=l===void 0?!0:l,R=e.className,y=e.container,k=e.dark,s=e.direction,m=e.offset,C=m===void 0?[0,2]:m,v=e.onHide,g=e.onShow,E=e.placement,D=E===void 0?"bottom-start":E,P=e.popper,T=P===void 0?!0:P,F=e.portal,X=F===void 0?!1:F,H=e.variant,x=H===void 0?"btn-group":H,j=e.visible,O=j===void 0?!1:j,Y=M(e,["children","alignment","as","autoClose","className","container","dark","direction","offset","onHide","onShow","placement","popper","portal","variant","visible"]),Z=c.useRef(null),w=c.useRef(null),d=c.useRef(null),$=z(n,Z),I=c.useState(O),L=I[0],A=I[1],B=ce(),_=B.initPopper,ee=B.destroyPopper,re=x==="nav-item"?"li":h;typeof a=="object"&&(T=!1);var ne={alignment:a,container:y,dark:k,dropdownToggleRef:w,dropdownMenuRef:d,popper:T,portal:X,variant:x,visible:L,setVisible:A},te={modifiers:[{name:"offset",options:{offset:C}}],placement:ve(D,s,a,ue(d.current))};c.useEffect(function(){A(O)},[O]),c.useEffect(function(){return L&&w.current&&d.current&&(w.current.focus(),T&&_(w.current,d.current,te),window.addEventListener("mouseup",U),window.addEventListener("keyup",K),w.current.addEventListener("keydown",q),d.current.addEventListener("keydown",q),g&&g()),function(){T&&ee(),window.removeEventListener("mouseup",U),window.removeEventListener("keyup",K),w.current&&w.current.removeEventListener("keydown",q),d.current&&d.current.removeEventListener("keydown",q),v&&v()}},[L]);var q=function(u){if(L&&d.current&&(u.key==="ArrowDown"||u.key==="ArrowUp")){u.preventDefault();var oe=u.target,ae=Array.from(d.current.querySelectorAll(".dropdown-item:not(.disabled):not(:disabled)"));fe(ae,oe,u.key==="ArrowDown",!0).focus()}},K=function(u){f!==!1&&u.key==="Escape"&&A(!1)},U=function(u){if(!(!w.current||!d.current)&&!w.current.contains(u.target)&&(f===!0||f==="inside"&&d.current.contains(u.target)||f==="outside"&&!d.current.contains(u.target))){setTimeout(function(){return A(!1)},1);return}};return t.createElement(S.Provider,{value:ne},x==="input-group"?t.createElement(t.Fragment,null,i):t.createElement(re,p({className:V(x==="nav-item"?"nav-item dropdown":x,(o={"dropdown-center":s==="center","dropup dropup-center":s==="dropup-center"},o["".concat(s)]=s&&s!=="center"&&s!=="dropup-center",o),R)},Y,{ref:$}),i))}),N=r.oneOf(["start","end"]);G.propTypes={alignment:r.oneOfType([N,r.shape({xs:N.isRequired}),r.shape({sm:N.isRequired}),r.shape({md:N.isRequired}),r.shape({lg:N.isRequired}),r.shape({xl:N.isRequired}),r.shape({xxl:N.isRequired})]),as:r.elementType,autoClose:r.oneOfType([r.bool,r.oneOf(["inside","outside"])]),children:r.node,className:r.string,dark:r.bool,direction:r.oneOf(["center","dropup","dropup-center","dropend","dropstart"]),offset:r.any,onHide:r.func,onShow:r.func,placement:ie,popper:r.bool,portal:r.bool,variant:r.oneOf(["btn-group","dropdown","input-group","nav-item"]),visible:r.bool};G.displayName="CDropdown";var J=c.forwardRef(function(e,n){var o=e.children,i=e.as,a=i===void 0?"a":i,b=e.className,h=M(e,["children","as","className"]);return t.createElement(le,p({className:V("dropdown-item",b),as:a},h,{ref:n}),o)});J.propTypes={as:r.elementType,children:r.node,className:r.string};J.displayName="CDropdownItem";var Q=c.forwardRef(function(e,n){var o=e.children,i=e.as,a=i===void 0?"ul":i,b=e.className,h=M(e,["children","as","className"]),l=c.useContext(S),f=l.alignment,R=l.container,y=l.dark,k=l.dropdownMenuRef,s=l.popper,m=l.portal,C=l.visible,v=z(n,k);return t.createElement(pe,{container:R,portal:m??!1},t.createElement(a,p({className:V("dropdown-menu",{show:C},f&&me(f),b),ref:v,role:"menu","aria-hidden":!C},!s&&{"data-coreui-popper":"static"},y&&{"data-coreui-theme":"dark"},h),a==="ul"?t.Children.map(o,function(g,E){if(t.isValidElement(g))return t.createElement("li",{key:E},t.cloneElement(g))}):o))});Q.propTypes={as:r.elementType,children:r.node,className:r.string};Q.displayName="CDropdownMenu";var W=function(e){var n=e.children,o=e.caret,i=o===void 0?!0:o,a=e.custom,b=e.className,h=e.navLink,l=h===void 0?!0:h,f=e.split,R=e.trigger,y=R===void 0?"click":R,k=M(e,["children","caret","custom","className","navLink","split","trigger"]),s=c.useContext(S),m=s.dropdownToggleRef,C=s.variant,v=s.visible,g=s.setVisible,E=p(p({},(y==="click"||y.includes("click"))&&{onClick:function(T){T.preventDefault(),g(!v)}}),(y==="focus"||y.includes("focus"))&&{onFocus:function(){return g(!0)},onBlur:function(){return g(!1)}}),D=p({className:V({"nav-link":C==="nav-item"&&l,"dropdown-toggle":i,"dropdown-toggle-split":f,show:v},b),"aria-expanded":v},!k.disabled&&p({},E)),P=function(){return a&&t.isValidElement(n)?t.createElement(t.Fragment,null,t.cloneElement(n,p(p({"aria-expanded":v},!k.disabled&&p({},E)),{ref:m}))):C==="nav-item"&&l?t.createElement("a",p({href:"#"},D,{role:"button",ref:m}),n):t.createElement(de,p({},D,{tabIndex:0},k,{ref:m}),n,f&&t.createElement("span",{className:"visually-hidden"},"Toggle Dropdown"))};return t.createElement(P,null)};W.propTypes={caret:r.bool,children:r.node,className:r.string,custom:r.bool,split:r.bool,trigger:se};W.displayName="CDropdownToggle";export{G as C,W as a,Q as b,J as c};
