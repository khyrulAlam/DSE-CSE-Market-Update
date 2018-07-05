/****************************************
* #### Javascript-kakku.js v1.0 ####
* Coded by Khyrul alam 2018.
* https://github.com/khyrulAlam
*****************************************/


//This url save your ass from cross orgin request. 
//** you can change this url and make request from your server **
const CROSSURL = 'http://khyrulalam.website/cross-origin-data.php'


// Dhaka Stock Exchange Real Time Data
async function kakkuGetDSE(){
	const url 	= CROSSURL+"?url="+'https://www.dsebd.org';
	const res 	= await fetch(url).then(response => response.text());
	const html 	= await new DOMParser().parseFromString(res, 'text/html');
	const mq 	= await html.querySelector('#mq2');
	const tr 	= await [...mq.querySelectorAll(' table tr td table tr td')];
	let data = [];
	for (let i = 1; i <= tr.length - 1; i++) {
		let s = tr[i].innerText;
		let arr = s.split(/[\s]{1,}/);
		let obj = {
			name			: arr[0],
			lastTrade		: arr[1],
			changeAmount	: arr[2],
			changePercent	: arr[3]
		}
		data.push(obj);
	}
	return data;
}




//Dhaka Stock Exchage Total Data Table 
async function kakkuGetDSEAll(){
	const url 	= CROSSURL+"?url="+'https://www.dsebd.org/latest_share_price_all.php';
	const res 	= await fetch(url).then(response => response.text());
	const html 	= await new DOMParser().parseFromString(res, 'text/html');
	const tr 	= [...html.querySelectorAll('table tr')];
	let data = [];

	for (let i = 1; i <= tr.length - 1; i++) {
		let td = tr[i].querySelectorAll('td');
		let obj = {
			'no'			: td[0].innerText,
			'tradingCode'	: td[1].innerText,
			'ltp'			: td[2].innerText,
			'high'			: td[3].innerText,
			'low'			: td[4].innerText,
			'closep'		: td[5].innerText,
			'ycp'			: td[6].innerText,
			'change'		: td[7].innerText,
			'trade'			: td[8].innerText,
			'value'			: td[9].innerText,
			'volume'		: td[10].innerText
		}
		data.push(obj);
	}
	return data;
}


//Chittagong Stock Exchage Market Update
async function kakkuGetCSE(){
	const url	= CROSSURL+"?url="+'http://www.cse.com.bd/';
	const res 	= await fetch(url).then(response=> response.text());
	const html	= await new DOMParser().parseFromString(res, 'text/html');
	const tr 	= [...html.querySelectorAll('#mq22 table table table tr')];
	const data 	= [];

	for(let i = 0; i <= tr.length -1; i++) {
		let td = tr[i].querySelectorAll('td');
		let obj ={
			name	: td[0].innerText,
			f		: td[1].innerText,
			l		: td[2].innerText
		}
		data.push(obj);
	}

	return data;
}

//view Template for DSE
function TemplateDSE(obj=[]){
	if(obj.length === 0) return;
	if(obj.data == null || obj.data.length == 0) return ;
	let viewDom = document.querySelector(obj.domEl)
	if(viewDom === null){
		let mess = 'Your Given ID/Class is Wrong';
		throw new Error(mess);
	}
	let speed = (obj.scrolldelay) ? obj.scrolldelay : 5;
	let bg = (obj.bg) ? obj.bg : '#49244e;';
	let textColor = (obj.textColor) ? obj.textColor : '#333'; 
	viewDom.innerHTML = `<div class="tem1" style="background: ${bg};color:${textColor}">
		<div class="tem-header">
			DSE
		</div>
		<marquee onMouseOver="this.stop()" onMouseOut="this.start()" loop="true" scrollamount="${speed}">
			${obj.data.map(v=>{
				let heigh = (v.changeAmount > 0) ? '<i class="upper">&#8679</i>' : '';
				let low = (v.changeAmount < 0) ? '<i class="lower">&#8681</i>' : '';
				let middle = (v.changeAmount == 0) ? '<i class="middle">&#8691</i>' : '';
				return `<span>
						${v.name} - ${v.lastTrade}
						<br> 
						<code>${v.changePercent}</code> 
						<code>${v.changeAmount}</code>
						${heigh} ${low} ${middle}
					</span>`
			}).join('')}
		</marquee>
 	</div>`;
}


//view Template for CSE
function TemplateCSE(obj=[]){
	if(obj.length === 0) return;
	if(obj.data == null || obj.data.length == 0) return ;
	let viewDom = document.querySelector(obj.domEl)
	if(viewDom === null){
		let mess = 'Your Given ID/Class is Wrong';
		throw new Error(mess);
	}
	let speed = (obj.scrolldelay) ? obj.scrolldelay : 5;
	let bg = (obj.bg) ? obj.bg : '#49244e;';
	let textColor = (obj.textColor) ? obj.textColor : '#333'; 
	viewDom.innerHTML = `<div class="tem1" style="background: ${bg};color:${textColor}">
		<div class="tem-header">
			CSE
		</div>
		<marquee onMouseOver="this.stop()" onMouseOut="this.start()" loop="true" scrollamount="${speed}">
			${obj.data.map(v=>{
				let heigh = (parseInt(v.l) > 0) ? '<i class="upper">&#8679</i>' : '';
				let low = (parseInt(v.l) < 0) ? '<i class="lower">&#8681</i>' : '';
				let middle = (parseInt(v.l) == 0) ? '<i class="middle">&#8691</i>' : '';
				return `<span>
						${v.name}
						<br> 
						<code>${v.f}</code> 
						<code>${v.l}</code>
						${heigh} ${low} ${middle}
					</span>`
			}).join('')}
		</marquee>
 	</div>`;
}


// Task 
// 1. Make Function for any url data scraping
// 2. get all cse table data