function colorify(obj,json){
	json=JSON.stringify(json,undefined,4).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
	var o=document.createElement("pre"),a=[];
	o.style="font-family: Consolas;font-size: 15px";
	json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[\,\s\[\]\{\}\(\)\:\;]+)/g,function (m){
		var c="darkorange",sp=false;
		if (/^"/.test(m)){
			if (/:$/.test(m)){
				c="red";
				sp=true;
			}
			else{
				c="green";
			}
		}
		else if (/true|false/.test(m)){
			c="blue";
		}
		else if (/null|undefined/.test(m)){
			c="magenta";
		}
		else if (/[\,\s\[\]\{\}\(\)\:\;]+/.test(m)){
			c="black";
		}
		m=m.replace(/\n/gm,"<br>");
		a.push([c,`<span style="color: ${c}">${sp==true?m.replace(":",""):m}</span>`]);
		if (sp==true){
			a.push(["black","<span style=\"color: black\">:</span>"]);
		}
	});
	for (var i=a.length-1;i>0;i--){
		if (a[i][0]==a[i-1][0]){
			a[i-1][1]=a[i-1][1].substring(0,a[i-1][1].length-7)+a[i][1].substring(22+a[i][0].length);
			a.splice(i,1);
		}
	}
	for (var k of a){
		o.innerHTML+=k[1];
	}
	obj.appendChild(o);
}
function init(){
	colorify(document.querySelector(".wr"),{"string":"value","number":0.30004,"boolean":false,"array":[],"object":{}});
}
document.addEventListener("DOMContentLoaded",init,false);
