import{r as n,j as e}from"./index-BdPC6ybd.js";import{p as C,q as D}from"./ProBadge-00v0fX7j.js";import"./index.esm-CNbaXT2N.js";import{C as h,a as g}from"./CCardBody-BwvR7COJ.js";const y=()=>{const[S,p]=n.useState({datasets:[]}),[f,j]=n.useState([]),[o,m]=n.useState("");n.useEffect(()=>{C.get("https://api.sdgstelkomuniversity.my.id/model/get-sdgs-count").then(s=>{const c=(s.data.available_years||[]).sort((d,t)=>t-d);j(c),c.length>0&&m(c[0])}).catch(s=>{console.error("There was an error fetching the available years!",s)})},[]),n.useEffect(()=>{o&&C.get(`https://api.sdgstelkomuniversity.my.id/model/get-sdgs-count?Tahun=${o}`).then(s=>{const l=s.data.sdgs_count,d=Array.from({length:17},(a,r)=>`SDGS${r+1}`).filter(a=>l.hasOwnProperty(a)&&l[a]>0).sort((a,r)=>parseInt(a.replace("SDGS",""))-parseInt(r.replace("SDGS",""))),t=d.map(a=>`SDGS ${a.replace("SDGS","")}`),u=d.map(a=>l[a]),i=["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#FF9F40","#FFCD56","#4BC0C0","#36A2EB","#FF6384","#FFCE56","#F1C40F","#E67E22","#2ECC71","#1F77B4","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F","#BCBD22"],F=i.slice(0,t.length);if(t.length>i.length){const a=[];for(let r=0;r<t.length;r++)a.push(i[r%i.length]);p({labels:t,datasets:[{data:u,backgroundColor:a,borderWidth:1}]})}else p({labels:t,datasets:[{data:u,backgroundColor:F,borderWidth:1}]})}).catch(s=>{console.error("There was an error fetching the data!",s)})},[o]);const x=s=>{m(s.target.value)};return e.jsxs(e.Fragment,{children:[e.jsx(h,{children:e.jsxs(g,{children:[e.jsx("h1",{children:"SDGS"}),e.jsx("p",{children:"Pemetaan 17 Bidang Tujuan Pembangunan Berkelanjutan (SDGs) Dosen Telkom University"}),e.jsx("img",{src:"https://dinaspmd.kalselprov.go.id/wp-content/uploads/2023/11/SDGs-Indonesia.jpg",alt:"Kumpulan data sdgs",className:"img-fluid"})]})}),e.jsx(h,{className:"mt-3 mb-3",children:e.jsxs(g,{children:[e.jsx("h4",{children:"Select Year"}),e.jsx("select",{onChange:x,value:o,className:"form-control w-25",children:f.map(s=>e.jsx("option",{value:s,children:s},s))})]})}),e.jsx(h,{className:"mt-3 mb-5",children:e.jsxs(g,{children:[e.jsx("h3",{children:"Penyebaran SDGS"}),e.jsx(D,{options:{responsive:!0,aspectRatio:1,maintainAspectRatio:!1,plugins:{legend:{position:"top"}}},height:350,data:S})]})})]})};export{y as default};
