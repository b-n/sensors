(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){e.exports=a(300)},117:function(e,t,a){},285:function(e,t,a){},287:function(e,t,a){},289:function(e,t,a){},300:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(107),c=a.n(i),o=(a(117),a(16)),l={apiEndpoint:"https://bnb7g0g5g1.execute-api.eu-central-1.amazonaws.com/dev/thing/",chromeCastAppId:"95A6E974"},m=function(e){var t=e.thing,a=e.fromDate,n=e.toDate,r=new URL(t,l.apiEndpoint);return a&&r.searchParams.append("fromDate",a),n&&r.searchParams.append("toDate",n),fetch(r,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()})},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.fromDate,r=t.toDate,i=t.refreshDuration,c=Object(n.useState)(null),l=Object(o.a)(c,2),u=l[0],s=l[1];return Object(n.useEffect)(function(){i&&window.setInterval(function(){m({thing:e,fromDate:a,toDate:r}).then(function(e){s(e)})},i)},[]),Object(n.useEffect)(function(){m({thing:e,fromDate:a,toDate:r}).then(function(e){s(e)})},[a,r]),u},s=a(108),d=a.n(s),p=function(){var e=Object(n.useState)(window.innerWidth),t=Object(o.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)(function(){window.addEventListener("resize",d()(function(){r(window.innerWidth)},500))},[]),a},h=a(13),f=a(10),g=a(18),b=a(62),E=a(7),v=(a(298),function(e){var t=Object(n.useState)(e),a=Object(o.a)(t,2),r=a[0],i=a[1];return n.useEffect.apply(void 0,[function(){i(e)}].concat(Object(g.a)(e))),r}),O=function(e){var t=e.axisFn,a=e.scale,r=(e.range,e.ticks),i=e.tickFormat,c=Object(n.useRef)(null);return Object(n.useEffect)(function(){var e=t().scale(a);r&&e.ticks(r),i&&e.tickFormat(i),Object(E.c)(c.current).call(e)},[].concat(Object(g.a)(a.domain()),Object(g.a)(a.range()))),c},w=function(e){var t=e.chart,a=e.scale,n=e.gridlines,i=e.className,c=e.ticks,o=e.tickFormat,l=v([0,t.plotHeight]);a.range([0,t.plotWidth]);var m=O({axisFn:b.a,scale:a,ticks:c,tickFormat:o});return r.a.createElement(f.Group,{transform:{translate:l},className:i},n&&a.ticks().map(function(e){return a(e)>0&&r.a.createElement(f.Line,{key:e,x1:a(e)+.5,x2:a(e)+.5,y1:-t.plotHeight,y2:0,className:"gridline"})}),r.a.createElement("g",{ref:m}))},y=function(e){var t=e.chart,a=e.scale,n=e.gridlines,i=e.className,c=e.ticks,o=e.tickFormat,l=v([0,0]);a.range([t.plotHeight,0]);var m=O({axisFn:b.b,scale:a,ticks:c,tickFormat:o});return r.a.createElement(f.Group,{transform:{translate:l},className:i},n&&a.ticks().map(function(e){return r.a.createElement(f.Line,{key:e,x1:0,x2:t.plotWidth,y1:a(e)+.5,y2:a(e)+.5,className:"gridline"})}),r.a.createElement("g",{ref:m}))},j=a(26),k=a(39),x=(a(15),function(e){var t=e.height,a=e.width,n=e.marginTop,i=void 0===n?20:n,c=e.marginRight,o=void 0===c?20:c,l=e.marginBottom,m=void 0===l?20:l,u=e.marginLeft,s=void 0===u?20:u,d=e.children,p=e.className,h={height:t,width:a,marginTop:i,marginRight:o,marginBottom:m,marginLeft:s,plotHeight:t-i-m,plotWidth:a-s-o,clipPathId:"plotArea"};return r.a.createElement(f.Svg,{height:t,width:a,className:p},r.a.createElement(f.Group,{transform:{translate:[s,i]}},r.a.createElement("clipPath",{id:h.clipPathId},r.a.createElement(f.Rect,{width:h.plotWidth,height:h.plotHeight})),r.a.Children.map(d,function(e){return r.a.cloneElement(e,{chart:h})})))}),D=a(33),C=function(e){var t=e.domain,a=void 0===t?[]:t,r=e.interpolator,i=Object(D.c)(r).domain(a);return Object(n.useEffect)(function(){i.domain(a)},Object(g.a)(a)),i},I=a(2),S=function(e,t){return e.sort(function(e,a){return t(e)-t(a)}),{mean:Object(I.mean)(e,t),max:Object(I.quantile)(e,1,t),upper:Object(I.quantile)(e,.75,t),median:Object(I.quantile)(e,.5,t),lower:Object(I.quantile)(e,.25,t),min:Object(I.quantile)(e,0,t)}},N=a(111),F=function(e){var t=e.chart,a=e.yScale,i=e.xScale,c=e.colorScale,o=e.data,l=e.animate,m=e.measure,u=void 0===m?"co2":m,s="url(#".concat(t.clipPathId,")"),d=o.map(function(e){var t=e.key,a=e.date,n=Object(N.a)(e,["key","date"]);return Object(j.a)({key:t,date:a},n[u])}),p={median:a.domain()[0],upper:a.domain()[1],lower:a.domain()[0]};return console.log(),r.a.createElement(k.Collection,{data:d,nodeEnter:function(e){return Object(j.a)({},e,p)},animate:l},function(e){return e.map(function(e){var o=e.key,l=e.date,m=e.median,u=e.upper,d=e.lower,p=i(l);return p<0||p>t.plotWidth?null:r.a.createElement(n.Fragment,{key:o},r.a.createElement(f.Line,{x1:p,x2:p,y1:a(d),y2:a(u),clipPath:s,className:"iqr-line"}),r.a.createElement(f.Circle,{cx:p,cy:a(m),r:3,fill:c(m),stroke:"grey",strokeWidth:"1px",clipPath:s}))})})},P=function(e){var t=e.width,a=e.co2Scale,i=e.co2ColorScale,c=e.date,o=e.data,l=e.animate,m=function(e){var t=e.domain,a=Object(D.d)().domain(t);return Object(n.useEffect)(function(){a.domain(t)},Object(g.a)(t)),a}({domain:[Object(h.addHours)(c,6),Object(h.addHours)(c,20)]});return console.log(c),r.a.createElement(x,{width:t,height:200,marginLeft:50,marginTop:40},r.a.createElement(f.Text,{className:"title",x:10,y:-5},Object(h.format)(c,"ddd DD MMM")),r.a.createElement(y,{scale:a,gridlines:!0}),r.a.createElement(w,{scale:m,gridlines:!0}),r.a.createElement(F,{xScale:m,yScale:a,colorScale:i,data:o,accessor:function(e){return e.co2},animate:l}))},R=a(40),T=(a(285),function(e,t){var a=Object(o.a)(e,2),n=a[0],r=a[1];return[n-(r-n)*t,r+(r-n)*t]}),W=function(e){var t=e.data,a=e.width,i=e.animate,c=function(e){var t=e.data,a=e.interval,r=e.extentAccessor,i=void 0===r?function(e){return e.median}:r,c=Object(n.useState)({co2:[],temp:[],humidity:[],data:[]}),l=Object(o.a)(c,2),m=l[0],u=l[1],s=60*a;return Object(n.useEffect)(function(){var e={co2:[],temp:[],humidity:[]},a=Object.keys(t).map(function(a){var n=new Date(a+"T00:00:00"),r=t[a].reduce(function(e,t){var a=t.timestamp+Object(h.differenceInSeconds)(n,t.timestamp)%s*1e3;return e[a]||(e[a]=[]),e[a].push(t),e},{}),c=Object.keys(r).map(function(e){return{key:e,date:+e,co2:S(r[e],function(e){return e.ppm}),temp:S(r[e],function(e){return e.temp}),humidity:S(r[e],function(e){return e.humidity})}});return Object.keys(e).map(function(t){var a;return(a=e[t]).push.apply(a,Object(g.a)(Object(I.extent)(c.map(function(e){return e[t]}),i)))}),{date:n,data:c}}).sort(function(e,t){return t.date-e.date});Object.keys(e).map(function(t){return e[t]=Object(I.extent)(e[t])}),u(Object(j.a)({},e,{data:a}))},[t]),m}({data:t.data,interval:10}),l=c.co2,m=function(e){var t=e.domain,a=Object(D.a)().domain(t);return Object(n.useEffect)(function(){a.domain(t)},Object(g.a)(t)),a}({domain:T(l,.05)}),u=C({domain:[1200,400],interpolator:R.a});return r.a.createElement(r.a.Fragment,null,c.data.map(function(e,t){return r.a.createElement(P,{key:e.date,width:a,co2Scale:m,co2ColorScale:u,date:e.date,data:e.data,animate:i})}))},A=(a(287),function(e){var t=e.children;return r.a.createElement("table",{className:"info-legend"},r.a.createElement("tbody",null,t))}),L=function(e){var t=e.color,a=e.range,n=e.explanation;return r.a.createElement("tr",null,r.a.createElement("td",{className:"info-legend-range"},r.a.createElement("span",{className:"dot",style:{backgroundColor:t}}),a),r.a.createElement("td",{className:"info-legend-description"},n))},M=function(e){var t=e.onlySummary,a=C({interpolator:R.a,to:400,from:1200});return r.a.createElement("section",{className:"info-container"},r.a.createElement("h1",null,"Information"),!t&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"The graph to the left measures the average Carbon Dioxide (CO",r.a.createElement("sub",null,"2"),") concentration near the sensor in the office. The sensor reads the values in parts per million (ppm)."),r.a.createElement("p",null,"CO",r.a.createElement("sub",null,"2")," is a colorless gas with a density about 60% higher than that of dry air. The current global concentration is about 410 ppm, having risen from pre-industrial levels of 280 ppm. CO",r.a.createElement("sub",null,"2")," is produced by all aerobic organisms (things that breathe air) when they metabolize carbohydrates and lipids (fats etc) to produce energy by respiration."),r.a.createElement("p",null,"CO",r.a.createElement("sub",null,"2")," levels outside of buildings can range from 380-500ppm. At very high concentrations (10.000ppm), CO",r.a.createElement("sub",null,"2")," becomes toxic to animals. Raising the concentration to 10.000ppm for several hours will kill spider mites and whiteflies in a greenhouse.")),r.a.createElement("p",null,"A few studies have found linkages in increased CO",r.a.createElement("sub",null,"2"),"concentrations and an increase in impairment in cognitive abilities. Relative to 600 ppm, at 1.000 ppm CO",r.a.createElement("sub",null,"2"),", moderate and statistically significant decrements occurred in six of nine scales of decision-making performance",r.a.createElement("a",{href:"https://web.archive.org/web/20160305212909/http://ehp.niehs.nih.gov/wp-content/uploads/2012/09/ehp.1104789.pdf",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("sup",null,"[ref]")),". In a study of Volatile Organic Compound Exposure (VOC), of which CO",r.a.createElement("sub",null,"2"),"is one, average cognitive scores were 61% higher on the Green building day (~740ppm) and 101% higher on the two Green+ (~502ppm) building days than on the Conventional building day (~940ppm) ",r.a.createElement("a",{href:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4892924/",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("sup",null,"[ref]")),"."),r.a.createElement("h2",null,"Legend"),r.a.createElement(A,null,r.a.createElement(L,{color:a(500),range:"400-600",explanation:"Ideal"}),r.a.createElement(L,{color:a(700),range:"600-800",explanation:"Okay, mild cognitive impairment"}),r.a.createElement(L,{color:a(900),range:"800-1000",explanation:"Some cognitive impairment"}),r.a.createElement(L,{color:a(1100),range:"1000-1200",explanation:"Open some windows already"}),r.a.createElement(L,{color:a(1300),range:"1200+",explanation:"Illegal in South Netherlands (Belgium)"})),r.a.createElement("h2",null,"Data Info"),r.a.createElement("p",null,"Readings are taken every 1 minute from the device, and are comprised of average ppm over that 1 minute period. Values are summarised into 10 minute intervals, where the points represent the median value in that 10 minute1s. The black lines indicate the interquartile range (IQR) of the values in the 10 minute period to show the variablility in the readings."))},Y=(a(289),function(){!function(e){var t=e.appId;Object(n.useEffect)(function(){window.cast.framework.CastContext.getInstance().setOptions({receiverApplicationId:t,autoJoinPolicy:window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED})},[])}({appId:l.chromeCastAppId});var e=[u("breather",{refreshDuration:3e5,fromDate:Object(h.format)(Object(h.addDays)(new Date,-8),"YYYY-MM-DD")})],t=.65*p()*(1/e.length);return r.a.createElement(n.Fragment,null,e.map(function(e){return null!==e&&r.a.createElement("section",{key:e.thing,style:{width:t}},null!==e?r.a.createElement(W,{data:e,width:t,animate:!0}):null)}),r.a.createElement(M,{onlySummary:!1}))}),q=function(){Object(n.useEffect)(function(){var e=window.cast.framework.CastReceiverContext.getInstance(),t=new window.cast.framework.CastReceiverOptions;t.disableIdleTimeout=!0,e.start(t)},[]);var e=Object(h.format)(Object(h.addDays)(new Date,-3),"YYYY-MM-DD"),t=u("breather",{fromDate:e,refreshDuration:6e4}),a=.65*p()*(1/t.length);return r.a.createElement(n.Fragment,null,r.a.createElement("section",{style:{width:a}},null!==t?r.a.createElement(W,{data:t,width:a,animate:!0}):null),r.a.createElement(M,{onlySummary:!1}))},G=a(302),H=a(303),B=a(109),J=a.n(B),z=function(e){return r.a.createElement(G.a,{basename:"/sensors"},r.a.createElement("div",null,r.a.createElement(H.a,{exact:!0,path:"/",render:function(e){var t=e.history,a=e.location;return void 0!==J.a.parse(a.search).reciever?(t.push("/reciever"),null):r.a.createElement(Y,null)}}),r.a.createElement(H.a,{path:"/reciever",component:q})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[112,2,1]]]);
//# sourceMappingURL=main.61048359.chunk.js.map