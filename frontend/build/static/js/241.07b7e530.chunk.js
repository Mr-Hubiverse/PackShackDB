"use strict";(self.webpackChunkpackshack_frontend=self.webpackChunkpackshack_frontend||[]).push([[241],{241:(e,o,a)=>{a.r(o),a.d(o,{default:()=>s});var n=a(483),t=a(826),d=a(723);const s=e=>{let{fileId:o,originalFilename:a}=e;const[s,l]=(0,n.useState)(!1),[r,i]=(0,n.useState)(0);return(0,d.jsxs)("div",{className:"download-button-container",children:[(0,d.jsx)("button",{onClick:async()=>{l(!0),i(0);try{const e=await(0,t.A)({url:`http://192.168.50.83:3001/api/download/${o}`,method:"GET",responseType:"blob",withCredentials:!0,onDownloadProgress:e=>{const o=Math.round(100*e.loaded/e.total);i(o)},headers:{"Content-Type":"application/json",Accept:"audio/*"}});if("application/json"===e.data.type){const o=new FileReader;return o.onload=()=>{const e=JSON.parse(o.result);throw new Error(e.message||"Download failed")},void o.readAsText(e.data)}const n=new Blob([e.data],{type:e.headers["content-type"]}),d=window.URL.createObjectURL(n),s=document.createElement("a"),l=e.headers["content-disposition"],r=l?decodeURIComponent(l.split('filename="')[1].split('"')[0]):a||"download";s.href=d,s.download=r,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(d)}catch(e){console.error("Download error:",e),alert(e.message||"Download failed. Please try again.")}finally{l(!1),i(0)}},disabled:s,className:"download-button "+(s?"downloading":""),children:s?`Downloading... ${r}%`:"Download"}),s&&r>0&&r<100&&(0,d.jsx)("div",{className:"progress-bar-container",children:(0,d.jsx)("div",{className:"progress-bar",style:{width:`${r}%`}})})]})}}}]);
//# sourceMappingURL=241.07b7e530.chunk.js.map