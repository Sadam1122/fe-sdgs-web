import{P as t,j as r,r as l}from"./index-CRBSqi5w.js";import{p as d}from"./ProBadge-BkcPIT-x.js";import{C as i,a as h}from"./CCardBody-B7w4MLrN.js";import{C as m}from"./CCardHeader-CLBNG36G.js";import{C as x,a as j}from"./CRow-DA7FnHgP.js";import"./index.esm-Y-xtHiOh.js";var g=function(s){if(typeof s>"u")throw new TypeError("Hex color is not defined");if(s==="transparent")return"#00000000";var a=s.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!a)throw new Error("".concat(s," is not a valid rgb color"));var n="0".concat(parseInt(a[1],10).toString(16)),o="0".concat(parseInt(a[2],10).toString(16)),c="0".concat(parseInt(a[3],10).toString(16));return"#".concat(n.slice(-2)).concat(o.slice(-2)).concat(c.slice(-2))};const p=()=>{const[s,a]=l.useState("rgb(255, 255, 255)"),n=l.createRef();return l.useEffect(()=>{const o=n.current.parentNode.firstChild,c=window.getComputedStyle(o).getPropertyValue("background-color");a(c)},[n]),r.jsx("table",{className:"table w-100",ref:n,children:r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{className:"text-body-secondary",children:"HEX:"}),r.jsx("td",{className:"fw-semibold",children:g(s)})]}),r.jsxs("tr",{children:[r.jsx("td",{className:"text-body-secondary",children:"RGB:"}),r.jsx("td",{className:"fw-semibold",children:s})]})]})})},e=({className:s,children:a})=>{const n=d(s,"theme-color w-75 rounded mb-3");return r.jsxs(j,{xs:12,sm:6,md:4,xl:2,className:"mb-4",children:[r.jsx("div",{className:n,style:{paddingTop:"75%"}}),a,r.jsx(p,{})]})};e.propTypes={children:t.node,className:t.string};const w=()=>r.jsx(r.Fragment,{children:r.jsxs(i,{className:"mb-4",children:[r.jsx(m,{children:"Theme colors"}),r.jsx(h,{children:r.jsxs(x,{children:[r.jsx(e,{className:"bg-primary",children:r.jsx("h6",{children:"Brand Primary Color"})}),r.jsx(e,{className:"bg-secondary",children:r.jsx("h6",{children:"Brand Secondary Color"})}),r.jsx(e,{className:"bg-success",children:r.jsx("h6",{children:"Brand Success Color"})}),r.jsx(e,{className:"bg-danger",children:r.jsx("h6",{children:"Brand Danger Color"})}),r.jsx(e,{className:"bg-warning",children:r.jsx("h6",{children:"Brand Warning Color"})}),r.jsx(e,{className:"bg-info",children:r.jsx("h6",{children:"Brand Info Color"})}),r.jsx(e,{className:"bg-light",children:r.jsx("h6",{children:"Brand Light Color"})}),r.jsx(e,{className:"bg-dark",children:r.jsx("h6",{children:"Brand Dark Color"})})]})})]})});export{w as default};
