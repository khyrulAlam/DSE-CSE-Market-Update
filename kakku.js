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
			lastTrade 		: arr[1],
			changeAmount 	: arr[2],
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
			name: td[0].innerText,
			f: td[1].innerText,
			l: td[2].innerText
		}
		data.push(obj);
	}

	return data;
}

// 2. Make view Template for DSE

// let obj = {
// 	data 		: '',
// 	class/ID 	: '',
// 	template 	: '',
// 	bg 			: '',
// 	color 		: '',
// 	speed 		: ''
// }

function TemplateDSE(obj=[]){
	if(obj.length === 0){
		console.log('Default Template')
	}else{
		console.log(obj)	
	}
}


// Task 
// 3. Make view Template for CSE
// 4. Make Function for any url data scraping
