(function framework7ComponentLoader(e,o){void 0===o&&(o=!0);var t=e.$,a=e.utils,r=e.getDevice,p=(e.getSupport,e.Class,e.Modal),s=(e.ConstructorMethods,e.ModalMethods),l=a.extend;class n extends p{constructor(e,o){const a=l({on:{}},e.params.popover,o);super(e,a);const p=this,s=r(),n=getWindow(),i=getDocument();let d;if(p.params=a,d=p.params.el?t(p.params.el).eq(0):t(p.params.content).filter((e=>1===e.nodeType)).eq(0),d&&d.length>0&&d[0].f7Modal)return d[0].f7Modal;const c=t(p.params.targetEl).eq(0);if(0===d.length)return p.destroy();let m;const h=p.params.backdrop&&e.$el.find(".popover.modal-in").filter((e=>e!==d[0])).length>0;let f;p.params.backdrop&&p.params.backdropEl?m=t(p.params.backdropEl):p.params.backdrop&&(p.params.backdropUnique||h?(m=t('<div class="popover-backdrop popover-backdrop-unique"></div>'),m[0].f7PopoverRef=p,p.$containerEl.append(m)):m=p.$containerEl.children(".popover-backdrop"),0===m.length&&(m=t('<div class="popover-backdrop"></div>'),p.$containerEl.append(m))),0===d.find(".popover-angle").length?(f=t('<div class="popover-angle"></div>'),d.prepend(f)):f=d.find(".popover-angle");const v=p.open;function g(){p.resize()}l(p,{app:e,$el:d,el:d[0],$targetEl:c,targetEl:c[0],$angleEl:f,angleEl:f[0],$backdropEl:m,backdropEl:m&&m[0],type:"popover",forceBackdropUnique:h,open(){for(var e=arguments.length,o=new Array(e),a=0;a<e;a++)o[a]=arguments[a];let[r,s]=o;return"boolean"==typeof o[0]&&([s,r]=o),r&&(p.$targetEl=t(r),p.targetEl=p.$targetEl[0]),v.call(p,s)}}),p.on("popoverOpen",(()=>{p.resize(),e.on("resize",g),t(n).on("keyboardDidShow keyboardDidHide",g),p.on("popoverClose popoverBeforeDestroy",(()=>{e.off("resize",g),t(n).off("keyboardDidShow keyboardDidHide",g)}))}));let u=null;function k(e){u=e.target}function b(e){const o=e.target,a=t(o);if(!(!s.desktop&&s.cordova&&(n.Keyboard&&n.Keyboard.isVisible||n.cordova.plugins&&n.cordova.plugins.Keyboard&&n.cordova.plugins.Keyboard.isVisible))&&0===a.closest(p.el).length)if(p.params.closeByBackdropClick&&p.params.backdrop&&p.backdropEl&&p.backdropEl===o&&u===o)p.close();else if(p.params.closeByOutsideClick&&u===o){const e=a.hasClass("popover-backdrop-unique")&&o.f7PopoverRef!==p||a.hasClass("popover-backdrop")&&o!==p.backdropEl,t=o.closest(".popover")&&o.closest(".popover")!==p.$el[0];e||t||p.close()}}function y(e){27===e.keyCode&&p.params.closeOnEscape&&p.close()}return p.params.closeOnEscape&&(p.on("popoverOpen",(()=>{t(i).on("keydown",y)})),p.on("popoverClose",(()=>{t(i).off("keydown",y)}))),p.on("popoverOpened",(()=>{(p.params.closeByOutsideClick||p.params.closeByBackdropClick)&&(e.on("touchstart",k),e.on("click",b))})),p.on("popoverClose",(()=>{(p.params.closeByOutsideClick||p.params.closeByBackdropClick)&&(e.off("touchstart",k),e.off("click",b))})),d[0].f7Modal=p,p}resize(){const e=this,{app:o,$el:a,$targetEl:r,$angleEl:p}=e,{targetX:s,targetY:l}=e.params;a.css({left:"",top:""});const[n,i]=[a.width(),a.height()];let d,c,m,h,f,v,g=0;"ios"===o.theme||"aurora"===o.theme?(p.removeClass("on-left on-right on-top on-bottom").css({left:"",top:""}),g=p.width()/2):a.removeClass("popover-on-left popover-on-right popover-on-top popover-on-bottom popover-on-middle").css({left:"",top:""});let u=parseInt(t("html").css("--f7-safe-area-top"),10),k=parseInt(t("html").css("--f7-safe-area-left"),10),b=parseInt(t("html").css("--f7-safe-area-right"),10);if(Number.isNaN(u)&&(u=0),Number.isNaN(k)&&(k=0),Number.isNaN(b)&&(b=0),r&&r.length>0){m=r.outerWidth(),h=r.outerHeight();const e=r.offset();f=e.left-o.left,v=e.top-o.top;const t=r.parents(".page");t.length>0&&(v-=t[0].scrollTop)}else void 0!==s&&"undefined"!==l&&(f=s,v=l,m=e.params.targetWidth||0,h=e.params.targetHeight||0);let[y,E,C]=[0,0,0],M="md"===o.theme?"bottom":"top";if("md"===o.theme){let e;i<o.height-v-h?(M="bottom",E=v+h):i<v-u?(E=v-i,M="top"):(M="middle",E=h/2+v-i/2),E=Math.max(8,Math.min(E,o.height-i-8)),f<o.width/2?(e="right",y="middle"===M?f+m:f):(e="left",y="middle"===M?f-n:f+m-n),y=Math.max(8,Math.min(y,o.width-n-8-b),k),a.addClass(`popover-on-${M} popover-on-${e}`)}else i+g<v-u?E=v-i-g:i+g<o.height-v-h?(M="bottom",E=v+h+g):(M="middle",E=h/2+v-i/2,C=E,E=Math.max(5,Math.min(E,o.height-i-5)),C-=E),"top"===M||"bottom"===M?(y=m/2+f-n/2,C=y,y=Math.max(5,Math.min(y,o.width-n-5)),k&&(y=Math.max(y,k)),b&&y+n>o.width-5-b&&(y=o.width-5-b-n),"top"===M&&p.addClass("on-bottom"),"bottom"===M&&p.addClass("on-top"),C-=y,d=n/2-g+C,d=Math.max(Math.min(d,n-2*g-13),13),p.css({left:`${d}px`})):"middle"===M&&(y=f-n-g,p.addClass("on-right"),(y<5||y+n+b>o.width||y<k)&&(y<5&&(y=f+m+g),y+n+b>o.width&&(y=o.width-n-5-b),y<k&&(y=k),p.removeClass("on-right").addClass("on-left")),c=i/2-g+C,c=Math.max(Math.min(c,i-2*g-13),13),p.css({top:`${c}px`}));a.css({top:`${E}px`,left:`${y}px`})}}var i={name:"popover",params:{popover:{backdrop:!0,backdropEl:void 0,backdropUnique:!1,closeByBackdropClick:!0,closeByOutsideClick:!0,closeOnEscape:!1,containerEl:null}},static:{Popover:n},create(){const e=this;e.popover=l(s({app:e,constructor:n,defaultSelector:".popover.modal-in"}),{open(o,a,r){let p=t(o);if(p.length>1){const e=t(a).parents(".page");e.length&&p.each((o=>{const a=t(o);a.parents(e)[0]===e[0]&&(p=a)}))}p.length>1&&(p=p.eq(p.length-1));let s=p[0].f7Modal;const l=p.dataset();return s||(s=new n(e,Object.assign({el:p,targetEl:a},l))),s.open(a,r)}})},clicks:{".popover-open":function(e,o){void 0===o&&(o={});this.popover.open(o.popover,e,o.animate)},".popover-close":function(e,o){void 0===o&&(o={});this.popover.close(o.popover,o.animate,e)}}};if(o){if(e.prototype.modules&&e.prototype.modules[i.name])return;e.use(i),e.instance&&(e.instance.useModuleParams(i,e.instance.params),e.instance.useModule(i))}return i}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))