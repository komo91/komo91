var p = document.getElementById('sample');

var result = document.evaluate('/html',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

var node;
while(node=result.iterateNext()) {
	console.log(node.id);
}


/*
var nodelist = document.getElementsByTagName('div');	//divの数
console.log(nodelist.length);
*/



/*
var newelement = document.createElement('p');
var newtextnode = document.createTextNode("new Text Node");
newelement.appendChild(newtextnode);
document.body.appendChild(newelement);
*/


/*
var newelement = document.createElement('p');
console.log(newelement);
document.body.appendChild(newelement);
*/



/*
var children = p.childNodes;
var textnode = children.item(0);
p.removeChild(textnode);	//hogehoge消去
p.removeChild(children.item(0));	//year消去
//children.item(0).nodeValue = "更新";
*/



/*
var children = p.childNodes;
var textnode = children.item(0);
console.log(textnode.nodeValue);
textnode.nodeValue = "書き間違えた";	hogehoge→書き間違えた
*/


/*
var children = p.childNodes;
console.log(children.length);
*/


/*
console.log(p.childNode);	//子ノード内容取得
*/

/*
console.log(p.parentNode.tagName);	//親ノードタグ取得
*/

/*
console.log(p.parentNode);	//親ノード内容取得
*/