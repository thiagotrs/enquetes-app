(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[973],{8758:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/questionarios/add",function(){return n(2190)}])},1596:function(e,t,n){"use strict";var i=n(5893),r=n(3321),o=n(1664),s=n.n(o);n(7294);var a=n(1023);let c=e=>{let{to:t}=e;return(0,i.jsx)(r.Z,{LinkComponent:s(),variant:"outlined",sx:{mb:3},startIcon:(0,i.jsx)(a.Z,{}),href:t,children:"Voltar"})};t.Z=c},3232:function(e,t,n){"use strict";var i=n(5893),r=n(9008),o=n.n(r);n(7294);let s=e=>{let{title:t}=e;return(0,i.jsxs)(o(),{children:[(0,i.jsx)("title",{children:t}),(0,i.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]})};t.Z=s},3505:function(e,t,n){"use strict";var i=n(5893),r=n(7357),o=n(3321);n(7294);var s=n(3540);let a=e=>{let{onLogOut:t}=e;return(0,i.jsx)(r.Z,{sx:{height:200,bgcolor:"indigo",display:"flex",justifyContent:"flex-end",alignItems:"start"},children:(0,i.jsx)(o.Z,{variant:"contained",sx:{bgcolor:"white",color:"indigo",m:3},startIcon:(0,i.jsx)(s.Z,{}),onClick:t,children:"Sair"})})};t.Z=a},1943:function(e,t,n){"use strict";var i=n(5893),r=n(9520),o=n(629);n(7294);let s=e=>{let{children:t,size:n="md"}=e;return(0,i.jsx)(r.Z,{component:"main",maxWidth:n,children:(0,i.jsx)(o.Z,{variant:"outlined",sx:{mt:-6,mb:{xs:3,md:6},p:{xs:2,md:3},position:"relative"},children:t})})};t.Z=s},2459:function(e,t,n){"use strict";var i=n(5893),r=n(9520),o=n(5861);n(7294);var s=n(6517);let a=()=>(0,i.jsxs)(r.Z,{component:"main",sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh"},children:[(0,i.jsx)(o.Z,{component:"p",variant:"h1",children:(0,i.jsx)(s.Z,{fontSize:"large"})}),(0,i.jsx)(o.Z,{component:"h1",variant:"h3",children:"Autenticando..."})]});t.Z=a},4345:function(e,t,n){"use strict";var i=n(5893),r=n(5861);n(7294);let o=e=>{let{children:t}=e;return(0,i.jsx)(r.Z,{component:"h1",variant:"h3",children:t})};t.Z=o},3557:function(e,t,n){"use strict";var i=n(1163),r=n.n(i),o=n(7294),s=n(1876).Buffer;let a=e=>{if(!/^(?:[\w-]*\.){2}[\w-]*$/.test(e))return!0;let t=JSON.parse(s.from(e.split(".")[1],"base64").toString("utf8")),n=Math.floor(Date.now()/1e3);return n>t.exp};t.Z=function(){let{redirectTo:e="",redirectIfFound:t=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[n,i]=(0,o.useState)({isLoggedIn:!1,isLoading:!0});(0,o.useEffect)(()=>{if(null===sessionStorage.getItem("token")||a(sessionStorage.getItem("token"))){i({isLoading:!1,isLoggedIn:!1});return}i({isLoading:!1,isLoggedIn:!0})},[]);let s=()=>{sessionStorage.removeItem("token"),i({isLoading:!1,isLoggedIn:!1})};return(0,o.useEffect)(()=>{e&&!n.isLoading&&(e&&!t&&!n.isLoggedIn||t&&n.isLoggedIn)&&r().push(e)},[n,t,e]),{auth:n,logOff:s}}},7410:function(e,t,n){"use strict";n.d(t,{e:function(){return o}});var i=n(8945);let r=i.Z.create({baseURL:"https://enquetes-function-t4ptokxoba-uc.a.run.app"});r.defaults.headers.common["Content-Type"]="application/json",r.defaults.headers.common["Access-Control-Allow-Origin"]="*",t.Z=r;let o=e=>i.Z.isAxiosError(e)&&e.response&&401===e.response.status?e.response.data.message:e.message},7529:function(e,t,n){"use strict";n.d(t,{H4:function(){return s},Th:function(){return r},qu:function(){return o}});var i=n(7410);let r=async e=>{let{nome:t,descricao:n,perguntas:r}=e;return i.Z.post("/questionario",{nome:t,descricao:n,perguntas:r},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})},o=async e=>{let{id:t,nome:n,descricao:r,perguntas:o}=e;return i.Z.put("/questionario/".concat(t),{nome:n,descricao:r,perguntas:o},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})},s=async e=>{let{id:t,respostaPerguntas:n}=e;return i.Z.post("/questionario/".concat(t,"/resposta"),{respostaPerguntas:n},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})}},2190:function(e,t,n){"use strict";n.r(t);var i=n(5893),r=n(5568),o=n(99),s=n(5861),a=n(6886),c=n(3321),l=n(1163),u=n(7294),d=n(6281),m=n(3557),h=n(1596),x=n(3505),g=n(3232),f=n(1943),p=n(4345),Z=n(1733),v=n(2459),j=n(7529),b=n(7410);let I=e=>{let{auth:t,logOff:n}=(0,m.Z)({redirectTo:"/"}),[I,w]=(0,u.useState)({nome:"",descricao:""}),[C,k]=(0,u.useState)([]),L=(0,l.useRouter)(),[S,y]=(0,u.useState)(null),q=C.some(e=>""===e.descricao.trim())||0===C.length||""===I.nome.trim(),E=()=>{let e={id:(0,d.Vj)(),descricao:""};k([...C,e])},_=e=>{k([...C.filter(t=>t.id!==e)])},P=e=>{k([...C.map(t=>t.id===e.id?e:t)])},N=()=>{(0,j.Th)({nome:I.nome,descricao:I.descricao,perguntas:C.map(e=>e.descricao)}).then(e=>{L.replace("/questionarios")}).catch(e=>{e instanceof Error&&y((0,b.e)(e))})};return t.isLoading||!t.isLoggedIn?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.Z,{title:"Enquetes App"}),(0,i.jsx)(v.Z,{})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.Z,{title:"Enquetes App - Novo Questionario"}),(0,i.jsx)(x.Z,{onLogOut:n}),(0,i.jsxs)(f.Z,{children:[(0,i.jsx)(h.Z,{to:"/questionarios"}),(0,i.jsx)(p.Z,{children:"Novo Question\xe1rio"}),S&&(0,i.jsx)(r.Z,{severity:"error",sx:{my:1},onClose:()=>y(null),children:S}),(0,i.jsx)(o.Z,{error:""===I.nome.trim(),required:!0,id:"nome",name:"nome",label:"Nome",fullWidth:!0,autoComplete:"given-name",variant:"standard",sx:{mb:2},value:I.nome,onChange:e=>w({...I,nome:e.target.value})}),(0,i.jsx)(o.Z,{id:"descricao",name:"descricao",label:"Descri\xe7\xe3o",multiline:!0,fullWidth:!0,rows:3,variant:"standard",sx:{mb:2},value:I.descricao,onChange:e=>w({...I,descricao:e.target.value})}),(0,i.jsx)(s.Z,{component:"h2",variant:"h5",my:3,children:"Perguntas"}),C.map(e=>(0,i.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(a.ZP,{item:!0,flexGrow:1,children:(0,i.jsx)(o.Z,{error:""===e.descricao.trim(),required:!0,label:"Pergunta",fullWidth:!0,autoComplete:"given-name",variant:"standard",sx:{mb:2},value:e.descricao,onChange:t=>P({id:e.id,descricao:t.target.value})})}),(0,i.jsx)(a.ZP,{item:!0,children:(0,i.jsx)(c.Z,{variant:"outlined",color:"error",startIcon:(0,i.jsx)(Z.Z,{}),onClick:()=>_(e.id),children:"Excluir"})})]},e.id)),(0,i.jsxs)(a.ZP,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[(0,i.jsx)(a.ZP,{item:!0,children:(0,i.jsx)(c.Z,{fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},onClick:E,children:"Nova Pergunta"})}),(0,i.jsx)(a.ZP,{item:!0,children:(0,i.jsx)(c.Z,{disabled:q,fullWidth:!0,variant:"contained",color:"secondary",sx:{mt:3,mb:2},onClick:N,children:"Salvar question\xe1rio"})})]})]})]})};t.default=I}},function(e){e.O(0,[889,99,903,251,774,888,179],function(){return e(e.s=8758)}),_N_E=e.O()}]);