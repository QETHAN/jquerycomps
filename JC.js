(function(a){if(window.JC&&window.JC.PATH){return}window.JC={PATH:"/js",compsDir:"/comps/",debug:false,use:function(g){if(!g){return}var b=this,d=[],c=a.trim(g).split(/[\s]*?,[\s]*/),e=/[\/\\]/,f=/\:\/\//,h=/(\\)\1|(\/)\2/g;a.each(c,function(m,k){var j=!e.test(k),l,i=/^\//.test(k);if(j&&window.JC[k]){return}if(JC.FILE_MAP&&JC.FILE_MAP[k]){d.push(JC.FILE_MAP[k]);return}l=k;j&&(l=printf("{0}{1}{2}/{2}.js",JC.PATH,JC.compsDir,k));!j&&!i&&(l=printf("{0}/{1}",JC.PATH,k));if(/\:\/\//.test(l)){l=l.split("://");l[1]=a.trim(l[1].replace(h,"$1$2"));l=l.join("://")}else{l=a.trim(l.replace(h,"$1$2"))}d.push(l)});JC.log(d);!JC.enableNginxStyle&&JC._writeNormalScript(d);JC.enableNginxStyle&&JC._writeNginxScript(d)},log:function(){if(!this.debug){return}console.log([].slice.apply(arguments).join(" "))},pathPostfix:"",enableNginxStyle:false,nginxBasePath:"",_writeNginxScript:function(e){if(!JC.enableNginxStyle){return}for(var d=0,c=e.length,f=[],b=[];d<c;d++){JC.log(e[d].slice(0,JC.nginxBasePath.length).toLowerCase(),JC.nginxBasePath.toLowerCase());if(e[d].slice(0,JC.nginxBasePath.length).toLowerCase()==JC.nginxBasePath.toLowerCase()){f.push(e[d].slice(JC.nginxBasePath.length))}else{b.push(e[d])}}var g=JC.pathPostfix?"?v="+JC.pathPostfix:"";f.length&&document.write(printf('<script src="{0}??{1}{2}"><\/script>',JC.nginxBasePath,f.join(","),g));b.length&&JC._writeNormalScript(b)},_writeNormalScript:function(d){var f=JC.pathPostfix?"?v="+JC.pathPostfix:"";for(var c=0,b=d.length,e;c<b;c++){e=d[c];JC.pathPostfix&&(e=add_url_params(e,{v:JC.pathPostfix}));d[c]=printf('<script src="{0}"><\/script>',e)}d.length&&document.write(d.join(""))},FILE_MAP:null};window.UXC=window.JC;if(!window.console){window.console={log:function(){window.status=[].slice.apply(arguments).join(" ")}}}JC.PATH=script_path_f()}(jQuery));