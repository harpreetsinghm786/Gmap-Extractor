const a=['\x20~\x20Making\x20Chrome\x20Extension\x20easy\x20for\x20you!','Failed\x20to\x20load\x20Chrome\x20Box','browser_action','onSet','get','targetTab','substr','width','storage','localName','eachTab','includes','final','event','undefined','_box','name','onClicked','Chrome\x20Box','query','color:black;','$box\x20is\x20already\x20defined','localLogs','getBackgroundPage','getDefaultLocalModel','info','broadcastToContentScript','sendMessage','active','1.0','minimized','menuItemId','broadcast','replace','create','availHeight','default','scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\x0a\x09\x09width=','extension','tabs','%c\x20','closeTab','log','basic','default_icon','onChanged','forEach','local','data','stringify','listen','clearLogs','error','activeTab',',left=120,top=120\x0a\x09\x09directories=no,titlebar=no,toolbar=no,location=no,status=no','url','random','reason','popup','function','onInstalled','runtime','Local\x20data\x20is\x20undefined','availWidth','_local_','getManifest','ceil','color:red;','onMessage','setLocal','string','addListener','contextMenus','height','assign'];(function(b,e){const f=function(g){while(--g){b['push'](b['shift']());}};f(++e);}(a,0x12c));const b=function(c,d){c=c-0x0;let e=a[c];return e;};var $box=undefined;(function(){const c={'info':{'version':b('0x1d'),'name':b('0x12')},'manifest':chrome[b('0x3d')][b('0x41')](),'notify':d=>{let e={'type':b('0x2b'),'iconUrl':c['manifest'][b('0x2')][b('0x2c')],'title':'','message':d};if(typeof d==='object'){e={...e,...d};}let f=Math[b('0x42')](Math[b('0x38')]()*0x64)['toString']();chrome['notifications'][b('0x22')](f,e);},'getBackgroundPage':()=>{return chrome[b('0x26')][b('0x17')]();},'getDefaultLocalModel':()=>{return{};},'localName':chrome[b('0x3d')][b('0x41')]()[b('0x10')][b('0x21')](/ /g,'_')+b('0x40'),'getLocal':(d,e=b('0x24'))=>{e=$box[b('0x9')]+e;chrome[b('0x8')][b('0x2f')][b('0x4')](e,f=>{let g=f[e];g=g?g:$box[b('0x18')]();if(g){g[b('0x2a')]=h=>{console[b('0x2a')](h);h=typeof h===b('0x46')?h:JSON[b('0x31')](h);g[b('0xf')][b('0x16')]+=h;};g[b('0x33')]=()=>{g[b('0xf')][b('0x16')]='';};d(g);}else{console[b('0x2a')](b('0x3e'));d(undefined);}});},'setLocal':(d,e)=>{let f={'name':'default','onSet':undefined};e={...f,...e};let g=$box[b('0x9')]+e[b('0x10')];let h={};h[g]=d;if(typeof e[b('0x3')]===b('0x3b')){chrome[b('0x8')][b('0x2f')]['set'](h,e[b('0x3')]);}else{chrome[b('0x8')][b('0x2f')]['set'](h);}},'updateLocal':d=>{$box['getLocal'](e=>{let f=Object[b('0x4a')](e,d);$box['setLocal'](f);});},'flushLocal':d=>{$box[b('0x45')]({});},'onLocalChange':d=>{chrome[b('0x8')][b('0x2f')][b('0x2d')][b('0x47')](e=>{d(e);});},'addBadge':d=>{chrome['browserAction']['setBadgeText']({'text':d});},'broadcastToContentScript':d=>{let e={'listenFor':name};d={...e,...d};if(chrome[b('0x27')]){if(d[b('0x5')]==b('0x35')){chrome[b('0x27')]['query']({'currentWindow':!![],'active':!![]},f=>{chrome['tabs'][b('0x1b')](f[0x0]['id'],d);});}else{chrome[b('0x27')]['query']({},f=>{f['forEach'](g=>{chrome['tabs'][b('0x1b')](g['id'],d);});});}}},'listen':d=>{chrome[b('0x3d')][b('0x44')][b('0x47')](d);},'broadcast':d=>{chrome[b('0x3d')][b('0x1b')](d);$box[b('0x1a')](d);},'send':(d,e)=>{$box['broadcast']({'event':d,'data':e,'targetTab':b('0x1c')});},'sendToAll':(d,e)=>{$box[b('0x20')]({'event':d,'data':e,'targetTab':'all'});},'on':d=>{$box[b('0x32')](e=>{d(e[b('0xd')],e[b('0x30')]);});},'openURL':(d,e={'active':![]})=>{e={...e,...d};chrome[b('0x27')][b('0x22')]({'url':d,'active':e[b('0x1c')]});},'openPopup':(d,e,f={})=>{console[b('0x2a')](f);if(f['state']){let g=f[b('0x7')]?f[b('0x7')]:0x1b8;let i=f['height']?f[b('0x49')]:0xdc;let j=screen[b('0x7')]/0x2-g/0x2;let k=screen[b('0x49')]/0x2-i/0x2;f={...f,...{'width':g,'height':i,'left':j,'top':k}};}f={...{'url':d,'type':b('0x3a'),'state':b('0x1e')},...f};console['log'](f);console['log'](b('0xc'));if(typeof e==='function'){chrome['windows'][b('0x22')](f,e);}else{chrome['windows'][b('0x22')](f);}},'simplePopup':(d,e,f=b('0x25')+screen[b('0x3f')]+',height='+screen[b('0x23')]+b('0x36'))=>{open(d,e,f);},'createMenu':(d={'id':b('0x24'),'title':'I\x27m\x20Awesome','contexts':['page']})=>{chrome[b('0x48')][b('0x22')](d);},'onMenuClick':(d,e)=>{chrome[b('0x48')][b('0x11')][b('0x47')](function(f){if(f[b('0x1f')]==d){e();}});},'eachTab':(d,e={'currentWindow':![]})=>{chrome[b('0x27')]['query'](e,function(f){f[b('0x2e')](d);});},'activeTab':d=>{chrome[b('0x27')][b('0x13')]({'active':!![],'currentWindow':!![]},function(e){d(e[0x0]);});},'closeTab':(d,e)=>{if(typeof e==='function'){chrome[b('0x27')]['remove'](d['id'],e);}else{chrome['tabs']['remove'](d['id']);}},'closeTabIfIncludes':(d,e=b('0x37'))=>{$box[b('0xa')]((f,g,h)=>{if(f[e][b('0xb')](d)){$box[b('0x29')](f);}});},'log':d=>{if(typeof d===b('0x46')&&d[b('0x6')](0x0,0x1)=='!'){console[b('0x2a')]('%c'+d,b('0x43'));}else{console[b('0x2a')]('%c'+d,b('0x14'));}},'onInstall':d=>{chrome[b('0x3d')][b('0x3c')][b('0x47')](function(e){if(e[b('0x39')]=='install'){d(e);}});},'setUninstallUrl':d=>{chrome[b('0x3d')]['setUninstallURL'](d);}};$box=typeof $box===b('0xe')?c:console[b('0x34')](b('0x15'));}());if($box['info'][b('0x10')]){console[b('0x2a')](b('0x28')+$box[b('0x19')][b('0x10')]+'\x20v'+$box[b('0x19')]['version']+'\x20','background:#3B83C0;color:white;padding:5px;'+'border-radius:1.4em;',b('0x0'));}else{console[b('0x34')](b('0x1'));}