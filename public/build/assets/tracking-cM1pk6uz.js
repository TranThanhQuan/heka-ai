const ct=()=>{};var ae={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let a=e.charCodeAt(r);a<128?t[n++]=a:a<2048?(t[n++]=a>>6|192,t[n++]=a&63|128):(a&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(a=65536+((a&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=a>>18|240,t[n++]=a>>12&63|128,t[n++]=a>>6&63|128,t[n++]=a&63|128):(t[n++]=a>>12|224,t[n++]=a>>6&63|128,t[n++]=a&63|128)}return t},lt=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const a=e[n++];if(a<128)t[r++]=String.fromCharCode(a);else if(a>191&&a<224){const s=e[n++];t[r++]=String.fromCharCode((a&31)<<6|s&63)}else if(a>239&&a<365){const s=e[n++],i=e[n++],o=e[n++],c=((a&7)<<18|(s&63)<<12|(i&63)<<6|o&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const s=e[n++],i=e[n++];t[r++]=String.fromCharCode((a&15)<<12|(s&63)<<6|i&63)}}return t.join("")},Te={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let a=0;a<e.length;a+=3){const s=e[a],i=a+1<e.length,o=i?e[a+1]:0,c=a+2<e.length,l=c?e[a+2]:0,h=s>>2,u=(s&3)<<4|o>>4;let p=(o&15)<<2|l>>6,R=l&63;c||(R=64,i||(p=64)),r.push(n[h],n[u],n[p],n[R])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Ae(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):lt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let a=0;a<e.length;){const s=n[e.charAt(a++)],o=a<e.length?n[e.charAt(a)]:0;++a;const l=a<e.length?n[e.charAt(a)]:64;++a;const u=a<e.length?n[e.charAt(a)]:64;if(++a,s==null||o==null||l==null||u==null)throw new dt;const p=s<<2|o>>4;if(r.push(p),l!==64){const R=o<<4&240|l>>2;if(r.push(R),u!==64){const ot=l<<6&192|u;r.push(ot)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class dt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ut=function(e){const t=Ae(e);return Te.encodeByteArray(t,!0)},De=function(e){return ut(e).replace(/\./g,"")},ft=function(e){try{return Te.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt=()=>ht().__FIREBASE_DEFAULTS__,gt=()=>{if(typeof process>"u"||typeof ae>"u")return;const e=ae.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},mt=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&ft(e[1]);return t&&JSON.parse(t)},bt=()=>{try{return ct()||pt()||gt()||mt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Ce=()=>{var e;return(e=bt())==null?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function It(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function ve(){try{return typeof indexedDB=="object"}catch{return!1}}function Re(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(r);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var s;t(((s=a.error)==null?void 0:s.message)||"")}}catch(n){t(n)}})}function wt(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="FirebaseError";class D extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=_t,Object.setPrototypeOf(this,D.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$.prototype.create)}}class ${constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},a=`${this.service}/${t}`,s=this.errors[t],i=s?Et(s,r):"Error",o=`${this.serviceName}: ${i} (${a}).`;return new D(a,o,r)}}function Et(e,t){return e.replace(St,(n,r)=>{const a=t[r];return a!=null?String(a):`<${r}?>`})}const St=/\{\$([^}]+)}/g;function B(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const a of n){if(!r.includes(a))return!1;const s=e[a],i=t[a];if(se(s)&&se(i)){if(!B(s,i))return!1}else if(s!==i)return!1}for(const a of r)if(!n.includes(a))return!1;return!0}function se(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=1e3,Tt=2,Dt=14400*1e3,Ct=.5;function ie(e,t=At,n=Tt){const r=t*Math.pow(n,e),a=Math.round(Ct*r*(Math.random()-.5)*2);return Math.min(Dt,r+a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(e){return e&&e._delegate?e._delegate:e}class w{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new yt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:n});a&&r.resolve(a)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(r)return null;throw a}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Bt(t))try{this.getOrInitializeService({instanceIdentifier:_})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:a});r.resolve(s)}catch{}}}}clearInstance(t=_){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=_){return this.instances.has(t)}getOptions(t=_){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,i]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(s);r===o&&i.resolve(a)}return a}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),a=this.onInitCallbacks.get(r)??new Set;a.add(t),this.onInitCallbacks.set(r,a);const s=this.instances.get(r);return s&&t(s,r),()=>{a.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const a of r)try{a(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Rt(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=_){return this.component?this.component.multipleInstances?t:_:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rt(e){return e===_?void 0:e}function Bt(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new vt(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var d;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(d||(d={}));const Ot={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Mt=d.INFO,$t={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},Pt=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),a=$t[t];if(a)console[a](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ke{constructor(t){this.name=t,this._logLevel=Mt,this._logHandler=Pt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in d))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ot[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...t),this._logHandler(this,d.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...t),this._logHandler(this,d.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,d.INFO,...t),this._logHandler(this,d.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,d.WARN,...t),this._logHandler(this,d.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...t),this._logHandler(this,d.ERROR,...t)}}const Ft=(e,t)=>t.some(n=>e instanceof n);let oe,ce;function Nt(){return oe||(oe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Lt(){return ce||(ce=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Oe=new WeakMap,W=new WeakMap,Me=new WeakMap,L=new WeakMap,Z=new WeakMap;function xt(e){const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("success",s),e.removeEventListener("error",i)},s=()=>{n(b(e.result)),a()},i=()=>{r(e.error),a()};e.addEventListener("success",s),e.addEventListener("error",i)});return t.then(n=>{n instanceof IDBCursor&&Oe.set(n,e)}).catch(()=>{}),Z.set(t,e),t}function Ht(e){if(W.has(e))return;const t=new Promise((n,r)=>{const a=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",i),e.removeEventListener("abort",i)},s=()=>{n(),a()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",s),e.addEventListener("error",i),e.addEventListener("abort",i)});W.set(e,t)}let q={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return W.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Me.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Vt(e){q=e(q)}function jt(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(x(this),t,...n);return Me.set(r,t.sort?t.sort():[t]),b(r)}:Lt().includes(e)?function(...t){return e.apply(x(this),t),b(Oe.get(this))}:function(...t){return b(e.apply(x(this),t))}}function Ut(e){return typeof e=="function"?jt(e):(e instanceof IDBTransaction&&Ht(e),Ft(e,Nt())?new Proxy(e,q):e)}function b(e){if(e instanceof IDBRequest)return xt(e);if(L.has(e))return L.get(e);const t=Ut(e);return t!==e&&(L.set(e,t),Z.set(t,e)),t}const x=e=>Z.get(e);function $e(e,t,{blocked:n,upgrade:r,blocking:a,terminated:s}={}){const i=indexedDB.open(e,t),o=b(i);return r&&i.addEventListener("upgradeneeded",c=>{r(b(i.result),c.oldVersion,c.newVersion,b(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),o.then(c=>{s&&c.addEventListener("close",()=>s()),a&&c.addEventListener("versionchange",l=>a(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}const zt=["get","getKey","getAll","getAllKeys","count"],Wt=["put","add","delete","clear"],H=new Map;function le(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(H.get(t))return H.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=Wt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(a||zt.includes(n)))return;const s=async function(i,...o){const c=this.transaction(i,a?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(o.shift())),(await Promise.all([l[n](...o),a&&c.done]))[0]};return H.set(t,s),s}Vt(e=>({...e,get:(t,n,r)=>le(t,n)||e.get(t,n,r),has:(t,n)=>!!le(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Gt(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Gt(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const G="@firebase/app",de="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=new ke("@firebase/app"),Kt="@firebase/app-compat",Yt="@firebase/analytics-compat",Jt="@firebase/analytics",Xt="@firebase/app-check-compat",Zt="@firebase/app-check",Qt="@firebase/auth",en="@firebase/auth-compat",tn="@firebase/database",nn="@firebase/data-connect",rn="@firebase/database-compat",an="@firebase/functions",sn="@firebase/functions-compat",on="@firebase/installations",cn="@firebase/installations-compat",ln="@firebase/messaging",dn="@firebase/messaging-compat",un="@firebase/performance",fn="@firebase/performance-compat",hn="@firebase/remote-config",pn="@firebase/remote-config-compat",gn="@firebase/storage",mn="@firebase/storage-compat",bn="@firebase/firestore",yn="@firebase/ai",In="@firebase/firestore-compat",wn="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K="[DEFAULT]",_n={[G]:"fire-core",[Kt]:"fire-core-compat",[Jt]:"fire-analytics",[Yt]:"fire-analytics-compat",[Zt]:"fire-app-check",[Xt]:"fire-app-check-compat",[Qt]:"fire-auth",[en]:"fire-auth-compat",[tn]:"fire-rtdb",[nn]:"fire-data-connect",[rn]:"fire-rtdb-compat",[an]:"fire-fn",[sn]:"fire-fn-compat",[on]:"fire-iid",[cn]:"fire-iid-compat",[ln]:"fire-fcm",[dn]:"fire-fcm-compat",[un]:"fire-perf",[fn]:"fire-perf-compat",[hn]:"fire-rc",[pn]:"fire-rc-compat",[gn]:"fire-gcs",[mn]:"fire-gcs-compat",[bn]:"fire-fst",[In]:"fire-fst-compat",[yn]:"fire-vertex","fire-js":"fire-js",[wn]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k=new Map,En=new Map,Y=new Map;function ue(e,t){try{e.container.addComponent(t)}catch(n){m.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function S(e){const t=e.name;if(Y.has(t))return m.debug(`There were multiple attempts to register component ${t}.`),!1;Y.set(t,e);for(const n of k.values())ue(n,e);for(const n of En.values())ue(n,e);return!0}function P(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},y=new $("app","Firebase",Sn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new w("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw y.create("app-deleted",{appName:this._name})}}function Pe(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:K,automaticDataCollectionEnabled:!0,...t},a=r.name;if(typeof a!="string"||!a)throw y.create("bad-app-name",{appName:String(a)});if(n||(n=Ce()),!n)throw y.create("no-options");const s=k.get(a);if(s){if(B(n,s.options)&&B(r,s.config))return s;throw y.create("duplicate-app",{appName:a})}const i=new kt(a);for(const c of Y.values())i.addComponent(c);const o=new An(n,r,i);return k.set(a,o),o}function Tn(e=K){const t=k.get(e);if(!t&&e===K&&Ce())return Pe();if(!t)throw y.create("no-app",{appName:e});return t}function I(e,t,n){let r=_n[e]??e;n&&(r+=`-${n}`);const a=r.match(/\s|\//),s=t.match(/\s|\//);if(a||s){const i=[`Unable to register library "${r}" with version "${t}":`];a&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),a&&s&&i.push("and"),s&&i.push(`version name "${t}" contains illegal characters (whitespace or "/")`),m.warn(i.join(" "));return}S(new w(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn="firebase-heartbeat-database",Cn=1,v="firebase-heartbeat-store";let V=null;function Fe(){return V||(V=$e(Dn,Cn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(v)}catch(n){console.warn(n)}}}}).catch(e=>{throw y.create("idb-open",{originalErrorMessage:e.message})})),V}async function vn(e){try{const n=(await Fe()).transaction(v),r=await n.objectStore(v).get(Ne(e));return await n.done,r}catch(t){if(t instanceof D)m.warn(t.message);else{const n=y.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});m.warn(n.message)}}}async function fe(e,t){try{const r=(await Fe()).transaction(v,"readwrite");await r.objectStore(v).put(t,Ne(e)),await r.done}catch(n){if(n instanceof D)m.warn(n.message);else{const r=y.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});m.warn(r.message)}}}function Ne(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=1024,Bn=30;class kn{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mn(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const a=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=he();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:a}),this._heartbeatsCache.heartbeats.length>Bn){const i=$n(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){m.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=he(),{heartbeatsToSend:r,unsentEntries:a}=On(this._heartbeatsCache.heartbeats),s=De(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return m.warn(n),""}}}function he(){return new Date().toISOString().substring(0,10)}function On(e,t=Rn){const n=[];let r=e.slice();for(const a of e){const s=n.find(i=>i.agent===a.agent);if(s){if(s.dates.push(a.date),pe(n)>t){s.dates.pop();break}}else if(n.push({agent:a.agent,dates:[a.date]}),pe(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Mn{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ve()?Re().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await vn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return fe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return fe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function pe(e){return De(JSON.stringify({version:2,heartbeats:e})).length}function $n(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(e){S(new w("platform-logger",t=>new qt(t),"PRIVATE")),S(new w("heartbeat",t=>new kn(t),"PRIVATE")),I(G,de,e),I(G,de,"esm2020"),I("fire-js","")}Pn("");var Fn="firebase",Nn="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */I(Fn,Nn,"app");const Le="@firebase/installations",Q="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=1e4,He=`w:${Q}`,Ve="FIS_v2",Ln="https://firebaseinstallations.googleapis.com/v1",xn=3600*1e3,Hn="installations",Vn="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new $(Hn,Vn,jn);function je(e){return e instanceof D&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue({projectId:e}){return`${Ln}/projects/${e}/installations`}function ze(e){return{token:e.token,requestStatus:2,expiresIn:zn(e.expiresIn),creationTime:Date.now()}}async function We(e,t){const r=(await t.json()).error;return A.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function qe({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Un(e,{refreshToken:t}){const n=qe(e);return n.append("Authorization",Wn(t)),n}async function Ge(e){const t=await e();return t.status>=500&&t.status<600?e():t}function zn(e){return Number(e.replace("s","000"))}function Wn(e){return`${Ve} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=Ue(e),a=qe(e),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&a.append("x-firebase-client",l)}const i={fid:n,authVersion:Ve,appId:e.appId,sdkVersion:He},o={method:"POST",headers:a,body:JSON.stringify(i)},c=await Ge(()=>fetch(r,o));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ze(l.authToken)}}else throw await We("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=/^[cdef][\w-]{21}$/,J="";function Yn(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Jn(e);return Kn.test(n)?n:J}catch{return J}}function Jn(e){return Gn(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye=new Map;function Je(e,t){const n=F(e);Xe(n,t),Xn(n,t)}function Xe(e,t){const n=Ye.get(e);if(n)for(const r of n)r(t)}function Xn(e,t){const n=Zn();n&&n.postMessage({key:e,fid:t}),Qn()}let E=null;function Zn(){return!E&&"BroadcastChannel"in self&&(E=new BroadcastChannel("[Firebase] FID Change"),E.onmessage=e=>{Xe(e.data.key,e.data.fid)}),E}function Qn(){Ye.size===0&&E&&(E.close(),E=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="firebase-installations-database",tr=1,T="firebase-installations-store";let j=null;function ee(){return j||(j=$e(er,tr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(T)}}})),j}async function O(e,t){const n=F(e),a=(await ee()).transaction(T,"readwrite"),s=a.objectStore(T),i=await s.get(n);return await s.put(t,n),await a.done,(!i||i.fid!==t.fid)&&Je(e,t.fid),t}async function Ze(e){const t=F(e),r=(await ee()).transaction(T,"readwrite");await r.objectStore(T).delete(t),await r.done}async function N(e,t){const n=F(e),a=(await ee()).transaction(T,"readwrite"),s=a.objectStore(T),i=await s.get(n),o=t(i);return o===void 0?await s.delete(n):await s.put(o,n),await a.done,o&&(!i||i.fid!==o.fid)&&Je(e,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function te(e){let t;const n=await N(e.appConfig,r=>{const a=nr(r),s=rr(e,a);return t=s.registrationPromise,s.installationEntry});return n.fid===J?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function nr(e){const t=e||{fid:Yn(),registrationStatus:0};return Qe(t)}function rr(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const a=Promise.reject(A.create("app-offline"));return{installationEntry:t,registrationPromise:a}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=ar(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:sr(e)}:{installationEntry:t}}async function ar(e,t){try{const n=await qn(e,t);return O(e.appConfig,n)}catch(n){throw je(n)&&n.customData.serverCode===409?await Ze(e.appConfig):await O(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function sr(e){let t=await ge(e.appConfig);for(;t.registrationStatus===1;)await Ke(100),t=await ge(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await te(e);return r||n}return t}function ge(e){return N(e,t=>{if(!t)throw A.create("installation-not-found");return Qe(t)})}function Qe(e){return ir(e)?{fid:e.fid,registrationStatus:0}:e}function ir(e){return e.registrationStatus===1&&e.registrationTime+xe<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function or({appConfig:e,heartbeatServiceProvider:t},n){const r=cr(e,n),a=Un(e,n),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&a.append("x-firebase-client",l)}const i={installation:{sdkVersion:He,appId:e.appId}},o={method:"POST",headers:a,body:JSON.stringify(i)},c=await Ge(()=>fetch(r,o));if(c.ok){const l=await c.json();return ze(l)}else throw await We("Generate Auth Token",c)}function cr(e,{fid:t}){return`${Ue(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ne(e,t=!1){let n;const r=await N(e.appConfig,s=>{if(!et(s))throw A.create("not-registered");const i=s.authToken;if(!t&&ur(i))return s;if(i.requestStatus===1)return n=lr(e,t),s;{if(!navigator.onLine)throw A.create("app-offline");const o=hr(s);return n=dr(e,o),o}});return n?await n:r.authToken}async function lr(e,t){let n=await me(e.appConfig);for(;n.authToken.requestStatus===1;)await Ke(100),n=await me(e.appConfig);const r=n.authToken;return r.requestStatus===0?ne(e,t):r}function me(e){return N(e,t=>{if(!et(t))throw A.create("not-registered");const n=t.authToken;return pr(n)?{...t,authToken:{requestStatus:0}}:t})}async function dr(e,t){try{const n=await or(e,t),r={...t,authToken:n};return await O(e.appConfig,r),n}catch(n){if(je(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Ze(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await O(e.appConfig,r)}throw n}}function et(e){return e!==void 0&&e.registrationStatus===2}function ur(e){return e.requestStatus===2&&!fr(e)}function fr(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+xn}function hr(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function pr(e){return e.requestStatus===1&&e.requestTime+xe<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gr(e){const t=e,{installationEntry:n,registrationPromise:r}=await te(t);return r?r.catch(console.error):ne(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mr(e,t=!1){const n=e;return await br(n),(await ne(n,t)).token}async function br(e){const{registrationPromise:t}=await te(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(e){if(!e||!e.options)throw U("App Configuration");if(!e.name)throw U("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw U(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function U(e){return A.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="installations",Ir="installations-internal",wr=e=>{const t=e.getProvider("app").getImmediate(),n=yr(t),r=P(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},_r=e=>{const t=e.getProvider("app").getImmediate(),n=P(t,tt).getImmediate();return{getId:()=>gr(n),getToken:a=>mr(n,a)}};function Er(){S(new w(tt,wr,"PUBLIC")),S(new w(Ir,_r,"PRIVATE"))}Er();I(Le,Q);I(Le,Q,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M="analytics",Sr="firebase_id",Ar="origin",Tr=60*1e3,Dr="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",re="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=new ke("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},g=new $("analytics","Analytics",Cr);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(e){if(!e.startsWith(re)){const t=g.create("invalid-gtag-resource",{gtagURL:e});return f.warn(t.message),""}return e}function nt(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Rr(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Br(e,t){const n=Rr("firebase-js-sdk-policy",{createScriptURL:vr}),r=document.createElement("script"),a=`${re}?l=${e}&id=${t}`;r.src=n?n==null?void 0:n.createScriptURL(a):a,r.async=!0,document.head.appendChild(r)}function kr(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Or(e,t,n,r,a,s){const i=r[a];try{if(i)await t[i];else{const c=(await nt(n)).find(l=>l.measurementId===a);c&&await t[c.appId]}}catch(o){f.error(o)}e("config",a,s)}async function Mr(e,t,n,r,a){try{let s=[];if(a&&a.send_to){let i=a.send_to;Array.isArray(i)||(i=[i]);const o=await nt(n);for(const c of i){const l=o.find(u=>u.measurementId===c),h=l&&t[l.appId];if(h)s.push(h);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",r,a||{})}catch(s){f.error(s)}}function $r(e,t,n,r){async function a(s,...i){try{if(s==="event"){const[o,c]=i;await Mr(e,t,n,o,c)}else if(s==="config"){const[o,c]=i;await Or(e,t,n,r,o,c)}else if(s==="consent"){const[o,c]=i;e("consent",o,c)}else if(s==="get"){const[o,c,l]=i;e("get",o,c,l)}else if(s==="set"){const[o]=i;e("set",o)}else e(s,...i)}catch(o){f.error(o)}}return a}function Pr(e,t,n,r,a){let s=function(...i){window[r].push(arguments)};return window[a]&&typeof window[a]=="function"&&(s=window[a]),window[a]=$r(s,e,t,n),{gtagCore:s,wrappedGtag:window[a]}}function Fr(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(re)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr=30,Lr=1e3;class xr{constructor(t={},n=Lr){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const rt=new xr;function Hr(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Vr(e){var i;const{appId:t,apiKey:n}=e,r={method:"GET",headers:Hr(n)},a=Dr.replace("{app-id}",t),s=await fetch(a,r);if(s.status!==200&&s.status!==304){let o="";try{const c=await s.json();(i=c.error)!=null&&i.message&&(o=c.error.message)}catch{}throw g.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function jr(e,t=rt,n){const{appId:r,apiKey:a,measurementId:s}=e.options;if(!r)throw g.create("no-app-id");if(!a){if(s)return{measurementId:s,appId:r};throw g.create("no-api-key")}const i=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new Wr;return setTimeout(async()=>{o.abort()},Tr),at({appId:r,apiKey:a,measurementId:s},i,o,t)}async function at(e,{throttleEndTimeMillis:t,backoffCount:n},r,a=rt){var o;const{appId:s,measurementId:i}=e;try{await Ur(r,t)}catch(c){if(i)return f.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${i} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:s,measurementId:i};throw c}try{const c=await Vr(e);return a.deleteThrottleMetadata(s),c}catch(c){const l=c;if(!zr(l)){if(a.deleteThrottleMetadata(s),i)return f.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${i} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:s,measurementId:i};throw c}const h=Number((o=l==null?void 0:l.customData)==null?void 0:o.httpStatus)===503?ie(n,a.intervalMillis,Nr):ie(n,a.intervalMillis),u={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return a.setThrottleMetadata(s,u),f.debug(`Calling attemptFetch again in ${h} millis`),at(e,u,r,a)}}function Ur(e,t){return new Promise((n,r)=>{const a=Math.max(t-Date.now(),0),s=setTimeout(n,a);e.addEventListener(()=>{clearTimeout(s),r(g.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function zr(e){if(!(e instanceof D)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class Wr{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function qr(e,t,n,r,a){if(a&&a.global){e("event",n,r);return}else{const s=await t,i={...r,send_to:s};e("event",n,i)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gr(){if(ve())try{await Re()}catch(e){return f.warn(g.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return f.warn(g.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Kr(e,t,n,r,a,s,i){const o=jr(e);o.then(p=>{n[p.measurementId]=p.appId,e.options.measurementId&&p.measurementId!==e.options.measurementId&&f.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>f.error(p)),t.push(o);const c=Gr().then(p=>{if(p)return r.getId()}),[l,h]=await Promise.all([o,c]);Fr(s)||Br(s,l.measurementId),a("js",new Date);const u=(i==null?void 0:i.config)??{};return u[Ar]="firebase",u.update=!0,h!=null&&(u[Sr]=h),a("config",l.measurementId,u),l.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(t){this.app=t}_delete(){return delete C[this.app.options.appId],Promise.resolve()}}let C={},be=[];const ye={};let z="dataLayer",Jr="gtag",Ie,st,we=!1;function Xr(){const e=[];if(It()&&e.push("This is a browser extension environment."),wt()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,a)=>`(${a+1}) ${r}`).join(" "),n=g.create("invalid-analytics-context",{errorInfo:t});f.warn(n.message)}}function Zr(e,t,n){Xr();const r=e.options.appId;if(!r)throw g.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)f.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw g.create("no-api-key");if(C[r]!=null)throw g.create("already-exists",{id:r});if(!we){kr(z);const{wrappedGtag:s,gtagCore:i}=Pr(C,be,ye,z,Jr);st=s,Ie=i,we=!0}return C[r]=Kr(e,be,ye,t,Ie,z,n),new Yr(e)}function Qr(e=Tn()){e=Be(e);const t=P(e,M);return t.isInitialized()?t.getImmediate():ea(e)}function ea(e,t={}){const n=P(e,M);if(n.isInitialized()){const a=n.getImmediate();if(B(t,n.getOptions()))return a;throw g.create("already-initialized")}return n.initialize({options:t})}function X(e,t,n,r){e=Be(e),qr(st,C[e.app.options.appId],t,n,r).catch(a=>f.error(a))}const _e="@firebase/analytics",Ee="0.10.18";function ta(){S(new w(M,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),a=t.getProvider("installations-internal").getImmediate();return Zr(r,a,n)},"PUBLIC")),S(new w("analytics-internal",e,"PRIVATE")),I(_e,Ee),I(_e,Ee,"esm2020");function e(t){try{const n=t.getProvider(M).getImmediate();return{logEvent:(r,a,s)=>X(n,r,a,s)}}catch(n){throw g.create("interop-component-reg-failed",{reason:n})}}}ta();const na={apiKey:"AIzaSyBppSwQEO6I37LZVs9ZJ3dZpHWD-OnREow",authDomain:"testtracking-76a69.firebaseapp.com",projectId:"testtracking-76a69",storageBucket:"testtracking-76a69.firebasestorage.app",messagingSenderId:"787743860011",appId:"1:787743860011:web:f52283fcee96d4a74c116e",measurementId:"G-LV42Y5PZCH"},ra=Pe(na),Se=Qr(ra),aa=["splash_scr","goal_scr_item_click","goal_scr_next_click","sex_age_scr_next_click","activity_level_click","height_weight_next_click","goal_weight_next_click","review_scr_next_click","nutrition_scr_next_click"],it="tracked_events";function sa(){try{return JSON.parse(localStorage.getItem(it))||[]}catch{return[]}}function ia(e){localStorage.setItem(it,JSON.stringify(e))}function oa(e,t={}){const n=sa(),r=window.location.pathname,a=localStorage.getItem("payment_redirect_from");if(aa.includes(e)){if(n.includes(e))return;X(Se,e,t),axios.post("/event-tracking",{eventName:e,data:t,path:r,from:a}),n.push(e),ia(n)}else{if(X(Se,e,t),axios.post("/event-tracking",{eventName:e,data:t,path:r,from:a}),e==="iap_successfull"){const s=localStorage.getItem("session_id");fbq("track","Purchase",{value:0,currency:"USD",session_id:s})}e==="iap_btn_click"&&fbq("track","InitiateCheckout")}}export{Se as a,oa as e,X as l};
