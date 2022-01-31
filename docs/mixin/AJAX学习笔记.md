---
title: AJAX学习笔记
date: 2021-12-05 14:21:58
tags: 
- AJAX
- JavaScript
categories: 网络
---

{% alert warning %}
本文大部分摘抄自[菜鸟教程](https://www.runoob.com/ajax/)，仅作学习使用。
{% endalert %}

## AJAX简介

{%note info%}

- AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。  
- AJAX 不是新的编程语言，而是一种使用现有标准的新方法。  
- AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。  
- AJAX 不需要任何浏览器插件，但需要用户允许JavaScript在浏览器上执行。  
{%endnote%}

![ajax.png](https://s2.loli.net/2021/12/05/1UKmAWpJhS7Ebex.png)
<!--more-->

## ajax使用

### ajax基本使用

{% color rgb(101,220,45) 'ajax基本使用分为四步：'%}

#### 创建XMLHttpRequest对象

> XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
> 所有现代浏览器都支持XMLHttpRequest对象。

```javascript
var XHR = new XMLHttpRequest();
```

#### 向服务器发送请求

如需将请求发送到服务器，需使用 XMLHttpRequest 对象的 open() 和 send() 方法：

```javascript
XHR.open("GET","ajax_info.txt",true);
XHR.send();
```

|方法|作用|
|:---:|:---:|
|open(method,url,async)|规定请求的类型、URL 以及是否异步处理请求。<br>method：请求的类型；GET 或 POST<br>url：文件在服务器上的位置<br>async：true（异步）或 false（同步）|
|send(string)|将请求发送到服务器。<br>string：仅用于 POST 请求|

##### get和post的选择

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。  
然而，在以下情况中，请使用 POST 请求：

- 不愿使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

#### 获取服务器响应

{% pullquote information %}
如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。
{% endpullquote %}

|属性|描述|
|:---:|:---:|
|responseText|获得字符串形式的响应数据。|
|responseXML|获得 XML 形式的响应数据。|

您可以将获取的数据写入html：

```javascript
document.querySelector(".box").innerText = XHR.responseText;
```

#### onreadystatechange 事件

> 当请求被发送到服务器时，我们需要执行一些基于响应的任务。  
> 每当 readyState 改变时，就会触发 onreadystatechange 事件。  
> readyState 属性存有 XMLHttpRequest 的状态信息。  

下面是 XMLHttpRequest 对象的三个重要的属性：

|属性|描述|
|:---:|---|
|onreadystatechange|存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。|
|readyState|存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。<br>0: 请求未初始化<br>1: 服务器连接已建立<br>2: 请求已接收<br>3: 请求处理中<br>4: 请求已完成，且响应已就绪|
|status|200: "OK"<br>404: 未找到页面|

在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。  
当 readyState 等于 4 且 status 为 200 时，表示响应已就绪；

我们可以将第三步的代码

```javascript
document.querySelector(".box").innerText = XHR.responseText;
```

改一下：

```javascript
const box = document.querySelector(".box");
XHR.onreadystatechange=function()
{
    if (XHR.readyState==4 && XHR.status==200)
    {
        box.innerText = XHR.responseText;
    }
}
```

{% note primary %}
注意： onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。
{% endnote %}

{% color red 到此基本的ajax已完成！ %}

#### 使用回调函数

回调函数是一种以参数形式传递给另一个函数的函数。

如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。

该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（{% color #aaa 例子来自菜鸟教程 %}）：

```html
<!DOCTYPE html>
<html>
<head>
<script>
var xmlhttp;
function loadXMLDoc(url,cfunc){
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{// IE6, IE5 代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
function myFunction(){
    loadXMLDoc("https://www.runoob.com/try/ajax/ajax_info.txt",function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    });
}
</script>
</head>
<body>

<div id="myDiv"><h2>使用 AJAX 修改文本内容</h2></div>
<button type="button" onclick="myFunction()">修改内容</button>

</body>
</html>
```

### ASP/PHP

即在调用`open()`函数的时候，传入的`url`参数后面加上`?q=`，再加个变量：

```javascript
str = 'a';
xmlhttp.open("GET",'gethint.php?q='+str,true);
```

{% collapse info 'xmlhttp.status的值及解释' xhr %}
菜鸟教程网友补充: https://www.runoob.com/ajax/ajax-asp-php.html<br>
xmlhttp.readyState的值及解释：<br>
0：请求未初始化（还没有调用 open()）。<br>
1：请求已经建立，但是还没有发送（还没有调用 send()）。<br>  
2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。<br>  
3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。<br>  
4：响应已完成；您可以获取并使用服务器的响应了。<br>  
xmlhttp.status的值及解释：<br>  
100——客户必须继续发出请求 <br> 
101——客户要求服务器根据请求转换HTTP协议版本<br>  
200——交易成功  <br>
201——提示知道新文件的URL  <br>
202——接受和处理、但处理未完成  <br>
203——返回信息不确定或不完整  <br>
204——请求收到，但返回信息为空  <br>
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件  <br>
206——服务器已经完成了部分用户的GET请求  <br>
300——请求的资源可在多处得到  <br>
301——删除请求数据  <br>
302——在其他地址发现了请求数据  <br>
303——建议客户访问其他URL或访问方式  <br>
304——客户端已经执行了GET，但文件未变化  <br>
305——请求的资源必须从服务器指定的地址得到  <br>
306——前一版本HTTP中使用的代码，现行版本中不再使用  <br>
307——申明请求的资源临时性删除  <br>
400——错误请求，如语法错误  <br>
401——请求授权失败  <br>
402——保留有效ChargeTo头响应 <br> 
403——请求不允许  <br>
404——没有发现文件、查询或URl  <br>
405——用户在Request-Line字段定义的方法不允许<br>  
406——根据用户发送的Accept拖，请求资源不可访问  <br>
407——类似401，用户必须首先在代理服务器上得到授权  <br>
408——客户端没有在用户指定的饿时间内完成请求  <br>
409——对当前资源状态，请求不能完成  <br>
410——服务器上不再有此资源且无进一步的参考地址  <br>
411——服务器拒绝用户定义的Content-Length属性请求  <br>
412——一个或多个请求头字段在当前请求中错误  <br>
413——请求的资源大于服务器允许的大小  <br>
414——请求的资源URL长于服务器允许的长度  <br>
415——请求资源不支持请求项目格式  <br>
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段  <br>
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求<br>
500——服务器产生内部错误  <br>
501——服务器不支持请求的函数  <br>
502——服务器暂时不可用，有时是为了防止发生系统过载  <br>
503——服务器过载或暂停维修  <br>
504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长  <br>
505——服务器不支持或拒绝支请求头中指定的HTTP版本  <br>
1xx:信息响应类，表示接收到请求并且继续处理  <br>
2xx:处理成功响应类，表示动作被成功接收、理解和接受  <br>
3xx:重定向响应类，为了完成指定的动作，必须接受进一步处理  <br>
4xx:客户端错误，客户请求包含语法错误或者是不能正确执行  <br>
5xx:服务端错误，服务器不能正确执行一个正确的请求  <br>
xmlhttp.readyState==4 && xmlhttp.status==200的解释：请求完成并且成功返回。<br>
{% endcollapse %}

### AJAX 可用来与数据库进行动态通信

其实就是通过PHP文件与数据库进行交互。

### 使用 AJAX 来读取来自 XML 文件的信息

菜鸟教程上的例子：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
table,th,td {
  border : 1px solid black;
  border-collapse: collapse;
}
th,td {
  padding: 5px;
}
</style>
</head>
<body>

<h1>XMLHttpRequest 对象</h1>

<button type="button" onclick="loadXMLDoc()">获取我收藏的 CD</button>
<br><br>
<table id="demo"></table>

<script>
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "cd_catalog.xml", true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}
</script>

</body>
</html>
```

- [ajax示例](https://www.runoob.com/ajax/ajax-examples.html)
- [AJAX进阶-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)

## Fetch API

{% alert secondary %}
这部分笔记来自[阮一峰的网络日志](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)
{% endalert %}
[【MDN - Fetch API】](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)  
{% note success %}
`fetch()`是 `XMLHttpRequest` 的升级版，用于在 `JavaScript` 脚本里面发出 HTTP 请求。  
浏览器原生提供这个对象。
{% endnote %}

### 基本用法

fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异：

{% blockquote 阮一峰 https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html Fetch API 教程 %}
1、`fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
2、`fetch()`采用模块化设计，API 分散在多个对象上（`Response 对象`、`Request 对象`、`Headers 对象`），更合理一些；相比之下，`XMLHttpRequest` 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
3、`fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHttpRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
{% endblockquote %}

在用法上，fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。

```javascript
fetch(url)
  .then(...)
  .catch(...)
```

例子，从服务器获取json：

```javascript
fetch('https://api.github.com/users/can-dy-jack')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log('Request Failed', error));
```

`fetch()`接收到的`response`是一个 `Stream 对象`，`response.json()`是一个`异步操作`，取出所有内容，并将其转为 JSON 对象。

注：Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

Promise 可以使用 await 语法改写，使得语义更清晰。

```javascript
async function getJSON() {
    let url = 'https://api.github.com/users/ruanyf';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
}
console.log(getJSON()); // 调用getJSON()，并输出获取到的Promise
```

**await语句必须放在try...catch里面，这样才能捕捉异步操作中可能发生的错误。**

### Response 对象

> Response 对象：处理 HTTP 回应。

#### Response 对象的同步属性

fetch()请求成功以后，得到的是一个 Response 对象。它对应服务器的 HTTP 回应。

`Response`包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。  
示例：

```javascript
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}
```

`response.status`和`response.statusText`就是 `Response` 的同步属性，可以立即读取。

标头信息属性有下面这些（more: [MDN-API/Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) | [Response 对象](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)）：

- Response.ok
- Response.statusText
- Response.status
- Response.url
- Response.type
- ... ...

#### 判断请求是否成功

fetch()发出请求以后，只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 `4xx` 或 `5xx`，fetch()也不会报错（即 Promise 不会变为 `rejected状态`）。

只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。

```javascript
async function fetchText() {
  let response = await fetch('https://api.github.com/users/can-dy-jack');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

_另一种方法是判断`Response.oK`是否为true。_

#### Response.headers 属性

Response 对象还有一个Response.headers属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。

Headers 对象可以使用`for...of`循环进行遍历。

```javascript
async function test(){
    const response = await fetch('https://api.github.com/users/ruanyf');
    for (let [key, value] of response.headers) { 
        console.log(`${key} : ${value}`);  
    }
    // 或者
    /*
    for (let [key, value] of response.headers.entries()) { 
    console.log(`${key} : ${value}`);  
    }
    */
}
test();
```

**Headers 对象提供了以下方法，用来操作标头。**

#### 读取内容的方法

Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

- response.text()：得到文本字符串。
- response.json()：得到 JSON 对象。
- response.blob()：得到二进制 Blob 对象。
- response.formData()：得到 FormData 表单对象。
- response.arrayBuffer()：得到二进制 ArrayBuffer 对象。

{% note %}
上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
{% endnote %}

{% color red 'Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。' %}

Response 对象提供Response.clone()方法，创建Response对象的副本，实现多次读取。

#### Response.body 属性

`Response.body`属性是 Response 对象暴露出的底层接口，返回一个 `ReadableStream 对象`，供用户操作。

它可以用来分块读取内容，应用之一就是[**显示下载的进度**]()。

### fetch()的第二个参数：定制 HTTP 请求

fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```javascript
fetch(url, optionObj)
```

HTTP 请求的方法、标头、数据体都在这个对象里面设置。

#### Post请求

```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

#### 提交json数据

```javascript
const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```

#### 提交表单

```javascript
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

#### 文件上传

```javascript
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

#### 直接上传二进制文件

```javascript
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

### fetch()第二个参数配置对象的完整 API

```javascript
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```
