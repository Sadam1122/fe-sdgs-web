var g=function(n,f,a,t){var r=n.length,e=n.indexOf(f);return e===-1?!a&&t?n[r-1]:n[0]:(e+=a?1:-1,t&&(e=(e+r)%r),n[Math.max(0,Math.min(e,r-1))])};export{g};
