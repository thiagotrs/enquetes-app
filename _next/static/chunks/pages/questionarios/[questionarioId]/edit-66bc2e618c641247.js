(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[869],{8358:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/questionarios/[questionarioId]/edit",function(){return n(885)}])},1596:function(e,t,n){"use strict";var r=n(5893),i=n(3321),o=n(1664),s=n.n(o);n(7294);var a=n(1023);let c=e=>{let{to:t}=e;return(0,r.jsx)(i.Z,{LinkComponent:s(),variant:"outlined",sx:{mb:3},startIcon:(0,r.jsx)(a.Z,{}),href:t,children:"Voltar"})};t.Z=c},3232:function(e,t,n){"use strict";var r=n(5893),i=n(9008),o=n.n(i);n(7294);let s=e=>{let{title:t}=e;return(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:t}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]})};t.Z=s},3505:function(e,t,n){"use strict";var r=n(5893),i=n(7357),o=n(3321);n(7294);var s=n(3540);let a=e=>{let{onLogOut:t}=e;return(0,r.jsx)(i.Z,{sx:{height:200,bgcolor:"indigo",display:"flex",justifyContent:"flex-end",alignItems:"start"},children:(0,r.jsx)(o.Z,{variant:"contained",sx:{bgcolor:"white",color:"indigo",m:3},startIcon:(0,r.jsx)(s.Z,{}),onClick:t,children:"Sair"})})};t.Z=a},1943:function(e,t,n){"use strict";var r=n(5893),i=n(9520),o=n(629);n(7294);let s=e=>{let{children:t,size:n="md"}=e;return(0,r.jsx)(i.Z,{component:"main",maxWidth:n,children:(0,r.jsx)(o.Z,{variant:"outlined",sx:{mt:-6,mb:{xs:3,md:6},p:{xs:2,md:3},position:"relative"},children:t})})};t.Z=s},2459:function(e,t,n){"use strict";var r=n(5893),i=n(9520),o=n(5861);n(7294);var s=n(6517);let a=()=>(0,r.jsxs)(i.Z,{component:"main",sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh"},children:[(0,r.jsx)(o.Z,{component:"p",variant:"h1",children:(0,r.jsx)(s.Z,{fontSize:"large"})}),(0,r.jsx)(o.Z,{component:"h1",variant:"h3",children:"Autenticando..."})]});t.Z=a},4345:function(e,t,n){"use strict";var r=n(5893),i=n(5861);n(7294);let o=e=>{let{children:t}=e;return(0,r.jsx)(i.Z,{component:"h1",variant:"h3",children:t})};t.Z=o},3557:function(e,t,n){"use strict";var r=n(1163),i=n.n(r),o=n(7294),s=n(1876).Buffer;let a=e=>{if(!/^(?:[\w-]*\.){2}[\w-]*$/.test(e))return!0;let t=JSON.parse(s.from(e.split(".")[1],"base64").toString("utf8")),n=Math.floor(Date.now()/1e3);return n>t.exp};t.Z=function(){let{redirectTo:e="",redirectIfFound:t=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},[n,r]=(0,o.useState)({isLoggedIn:!1,isLoading:!0});(0,o.useEffect)(()=>{if(null===sessionStorage.getItem("token")||a(sessionStorage.getItem("token"))){r({isLoading:!1,isLoggedIn:!1});return}r({isLoading:!1,isLoggedIn:!0})},[]);let s=()=>{sessionStorage.removeItem("token"),r({isLoading:!1,isLoggedIn:!1})};return(0,o.useEffect)(()=>{e&&!n.isLoading&&(e&&!t&&!n.isLoggedIn||t&&n.isLoggedIn)&&i().push(e)},[n,t,e]),{auth:n,logOff:s}}},714:function(e,t,n){"use strict";n.d(t,{i:function(){return o}});var r=n(9734),i=n(7410);function o(e){let{data:t,error:n,mutate:o,isLoading:s}=(0,r.ZP)(e,async e=>{let t=await i.Z.get(e,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}});return t.data});return{data:t,error:n,isLoading:s,mutate:o}}},7410:function(e,t,n){"use strict";n.d(t,{e:function(){return o}});var r=n(8945);let i=r.Z.create({baseURL:"https://enquetes-function-t4ptokxoba-uc.a.run.app"});i.defaults.headers.common["Content-Type"]="application/json",i.defaults.headers.common["Access-Control-Allow-Origin"]="*",t.Z=i;let o=e=>r.Z.isAxiosError(e)&&e.response&&401===e.response.status?e.response.data.message:e.message},7529:function(e,t,n){"use strict";n.d(t,{H4:function(){return s},Th:function(){return i},qu:function(){return o}});var r=n(7410);let i=async e=>{let{nome:t,descricao:n,perguntas:i}=e;return r.Z.post("/questionario",{nome:t,descricao:n,perguntas:i},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})},o=async e=>{let{id:t,nome:n,descricao:i,perguntas:o}=e;return r.Z.put("/questionario/".concat(t),{nome:n,descricao:i,perguntas:o},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})},s=async e=>{let{id:t,respostaPerguntas:n}=e;return r.Z.post("/questionario/".concat(t,"/resposta"),{respostaPerguntas:n},{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("token"))}})}},885:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return S}});var r=n(5893),i=n(5568),o=n(99),s=n(5861),a=n(6886),c=n(3321),l=n(1163),u=n(7294),d=n(6281),m=n(3557),h=n(1596),x=n(3505),g=n(3232),p=n(1943),f=n(4345),Z=n(1733),j=n(7469),v=n(7357);let b=e=>{let{ask:t,open:n,onYes:i,onNo:o}=e;return(0,r.jsx)(j.Z,{open:n,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,r.jsxs)(v.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:[(0,r.jsx)(s.Z,{id:"modal-modal-title",variant:"h6",component:"h2",children:t}),(0,r.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,r.jsx)(a.ZP,{item:!0,flexGrow:1,children:(0,r.jsx)(c.Z,{variant:"contained",color:"secondary",sx:{mt:3,mb:2},onClick:i,children:"Sim"})}),(0,r.jsx)(a.ZP,{item:!0,children:(0,r.jsx)(c.Z,{variant:"contained",color:"secondary",sx:{mt:3,mb:2},onClick:o,children:"N\xe3o"})})]})]})})};var k=n(2459),q=n(7529),w=n(7410),I=n(714),y=n(9734);let C=()=>{let{auth:e,logOff:t}=(0,m.Z)({redirectTo:"/"}),[n,j]=(0,u.useState)(!1),v=(0,l.useRouter)(),{questionarioId:C}=v.query,{data:S}=(0,I.i)("/questionario/".concat(C)),[L,P]=(0,u.useState)(""),[E,_]=(0,u.useState)(null);if(e.isLoading||!e.isLoggedIn||!S)return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{title:"Enquetes App"}),(0,r.jsx)(k.Z,{})]});let A=S.perguntas.some(e=>""===e.descricao.trim())||0===S.perguntas.length||""===S.nome.trim(),N=e=>{P(e),j(!0)},G=()=>{j(!1),P("")},J=e=>{(0,y.JG)("/questionario/".concat(C),{...S,nome:e},!1)},W=e=>{(0,y.JG)("/questionario/".concat(C),{...S,descricao:e},!1)},z=()=>{let e={id:(0,d.Vj)(),descricao:""};(0,y.JG)("/questionario/".concat(C),{...S,perguntas:[...S.perguntas,e]},!1)},B=()=>{(0,y.JG)("/questionario/".concat(C),{...S,perguntas:[...S.perguntas.filter(e=>e.id!==L)]},!1),G()},O=e=>{(0,y.JG)("/questionario/".concat(C),{...S,perguntas:[...S.perguntas.map(t=>t.id===e.id?e:t)]},!1)},T=()=>{(0,q.qu)({id:C,nome:S.nome,descricao:S.descricao,perguntas:S.perguntas.map(e=>e.descricao)}).then(e=>{v.replace("/questionarios")}).catch(e=>{e instanceof Error&&_((0,w.e)(e))})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(g.Z,{title:"Enquetes App - Editar Questionario"}),(0,r.jsx)(x.Z,{onLogOut:t}),(0,r.jsxs)(p.Z,{children:[(0,r.jsx)(h.Z,{to:"/questionarios"}),(0,r.jsx)(f.Z,{children:"Editar Question\xe1rio"}),E&&(0,r.jsx)(i.Z,{severity:"error",sx:{my:1},onClose:()=>_(null),children:E}),(0,r.jsx)(o.Z,{required:!0,id:"nome",name:"nome",label:"Nome",fullWidth:!0,autoComplete:"given-name",variant:"standard",sx:{mb:2},value:S.nome,onChange:e=>J(e.target.value)}),(0,r.jsx)(o.Z,{id:"descricao",name:"descricao",label:"Descri\xe7\xe3o",multiline:!0,fullWidth:!0,rows:3,variant:"standard",sx:{mb:2},value:S.descricao,onChange:e=>W(e.target.value)}),(0,r.jsx)(s.Z,{component:"h2",variant:"h5",my:3,children:"Perguntas"}),S.perguntas.map(e=>(0,r.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,r.jsx)(a.ZP,{item:!0,flexGrow:1,children:(0,r.jsx)(o.Z,{error:""===e.descricao.trim(),required:!0,label:"Pergunta",fullWidth:!0,autoComplete:"given-name",variant:"standard",sx:{mb:2},value:e.descricao,onChange:t=>O({id:e.id,descricao:t.target.value})})}),(0,r.jsx)(a.ZP,{item:!0,children:(0,r.jsx)(c.Z,{variant:"outlined",color:"error",startIcon:(0,r.jsx)(Z.Z,{}),onClick:()=>N(e.id),children:"Excluir"})})]},e.id)),(0,r.jsxs)(a.ZP,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[(0,r.jsx)(a.ZP,{item:!0,children:(0,r.jsx)(c.Z,{fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},onClick:()=>z(),children:"Nova Pergunta"})}),(0,r.jsx)(a.ZP,{item:!0,children:(0,r.jsx)(c.Z,{disabled:A,fullWidth:!0,variant:"contained",color:"secondary",sx:{mt:3,mb:2},onClick:()=>T(),children:"Salvar question\xe1rio"})})]})]}),(0,r.jsx)(b,{ask:"Deseja excluir a pergunta?",open:n,onYes:B,onNo:G})]})};var S=C}},function(e){e.O(0,[889,99,903,734,251,774,888,179],function(){return e(e.s=8358)}),_N_E=e.O()}]);