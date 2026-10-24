import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const source=await readFile(new URL('./competition-center-ui.tsx',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true,target:ts.ScriptTarget.ES2020}}).outputText;
const ready={source:{commit:'eac0a7b9d3fa8a7321a06711b1bbb3130b6506b3',tree:'04669c707f27e3dba5a2fcc9d2a20c5e61872872'},mode:'local',lanSupported:false,busy:false,checked:true,configured:true,owned:true,url:'http://127.0.0.1:3047/',checks:[],lan:{status:'NOT_CONFIGURED',addresses:[],message:''}};
function harness({states=[],rejectAction=false,pendingAction=false,confirmed=false}={}){
 const values=[{...ready},'','local',3,false,false],refs=[],timers=[],redirects=[];let hook=0,ref=0,root,actions=0,accept;
 const React={createElement:(type,props,...children)=>({type,props:props||{},children}),useState(initial){const i=hook++;if(!(i in values))values[i]=initial;return[values[i],value=>{values[i]=typeof value==='function'?value(values[i]):value;}];},useRef(initial){const i=ref++;return refs[i]||(refs[i]={current:initial});},useEffect(){}};
 const form={setFieldsValue(){},setFieldValue(){}};
 const antd=new Proxy({Form:Object.assign('Form',{useForm:()=>[form],useWatch:()=>confirmed}),Typography:{Text:'Text',Title:'Title',Paragraph:'Paragraph'}},{get:(object,key)=>object[key]||key});
 // Form has static hooks in Ant Design; a callable stub keeps those properties.
 antd.Form=Object.assign(()=>null,{useForm:()=>[form],useWatch:()=>confirmed,Item:'Form.Item'});
 vm.runInNewContext(compiled,{exports:{},require:name=>name==='react'?React:name==='react-dom/client'?{createRoot:()=>({render:element=>{root=element;}})}:name==='antd'?antd:name.includes('KnowledgeThemeProvider')?{KnowledgeThemeProvider:'Theme'}:{},location:{origin:'http://127.0.0.1:52602',hash:''},history:{replaceState(){}},sessionStorage:{getItem:()=> 'synthetic-capability',setItem(){},removeItem(){}},document:{querySelector:()=>null,getElementById:()=>({})},window:{location:{assign:url=>redirects.push(url)}},URL,Date,Promise,setInterval(){},clearInterval(){},setTimeout:resolve=>timers.push(resolve),fetch:async(_route,options)=>{
  if(options.method==='POST'){
   actions++;if(pendingAction)await new Promise(resolve=>{accept=resolve;});
   if(rejectAction)return{ok:false,json:async()=>({error:'Synthetic startup rejected'})};
   return{ok:true,json:async()=>({accepted:true})};
  }
  assert(states.length,'Unexpected state request');return{ok:true,json:async()=>states.shift()};
 }});
 function find(element,predicate){if(!element||typeof element!=='object')return; if(predicate(element))return element;for(const child of (element.children||[]).flat(Infinity)){const result=find(child,predicate);if(result)return result;}}
 const Center=find(root,element=>typeof element.type==='function'&&element.type.name==='Center').type;
 function render(){hook=0;ref=0;return Center();}
 const button=()=>find(render(),element=>element.type==='Button'&&element.children.some(x=>typeof x==='string'&&(x==='启动 UED Asset Hub'||x==='正在启动，成功后打开浏览器')));
 return{values,redirects,timers,button,setupButton:()=>find(render(),element=>element.type==='Button'&&element.children.some(x=>x==='确认新建并设置管理员'||x==='正在初始化，请等待')),get actions(){return actions;},accept:()=>accept(),tick:()=>timers.shift()()};
}
const flush=async()=>{for(let n=0;n<20;n++)await Promise.resolve();};
{
 const h=harness({pendingAction:true,states:[{...ready,busy:true},{...ready,busy:false}]});
 h.button().props.onClick();h.button().props.onClick();
 assert.equal(h.actions,1);assert.equal(h.button().props.loading,true);assert.equal(h.button().props.disabled,true);assert.deepEqual(h.redirects,[]);
 h.accept();await flush();assert.deepEqual(h.redirects,[],'Old URL must not redirect while startup is busy');
 h.tick();await flush();assert.deepEqual(h.redirects,[],'Ready startup must not navigate across ports in the renderer');assert.equal(h.values[5],false);
}
for(const state of [{...ready,error:'Synthetic startup failed'},{...ready,owned:false},{...ready,url:'https://untrusted.test/'}]){
 const h=harness({states:[state]});h.button().props.onClick();await flush();assert.deepEqual(h.redirects,[]);assert(h.values[1]);assert.equal(h.values[5],false);
}
{
 const h=harness({rejectAction:true});h.button().props.onClick();await flush();assert.deepEqual(h.redirects,[]);assert.equal(h.values[5],false);assert.match(h.values[1],/rejected/);
}
{
 const h=harness({states:[ready]});h.button().props.onClick();await flush();assert.deepEqual(h.redirects,[],'Native opener owns successful navigation, including fast startup');
}
console.log('PASS: immediate loading, duplicate-click guard, stale URL during delayed startup, failure stays in center, fast success, native-opener handoff and URL boundary without renderer navigation. No services or business data used.');

{
 const h=harness({confirmed:true});h.values[0]={...ready,configured:false,owned:false,checked:true,busy:false};h.values[3]=1;
 assert.equal(h.setupButton().props.disabled,false);
 h.values[0]={...h.values[0],busy:true,status:'正在准备全新外置数据及管理员；不安装依赖'};assert.equal(h.setupButton().props.loading,true);assert.equal(h.setupButton().props.disabled,true);assert(h.setupButton().children.includes('正在初始化，请等待'));
 h.values[0]={...h.values[0],busy:false,error:'该目录已存在。不会覆盖。'};assert.equal(h.setupButton().props.disabled,false,'Rejected input keeps corrected initialization retry available');assert.equal(h.setupButton().props.loading,false);
}
console.log('PASS: initialization has visible loading and corrected input can retry after a validation rejection.');
