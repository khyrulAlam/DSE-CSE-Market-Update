/****************************************
* #### Javascript-kakku.js v1.0 ####
* Coded by Khyrul alam 2018.
* https://github.com/khyrulAlam
*****************************************/


//This url save your ass from cross orgin request. 
//** you can change this url and make request from your server **
const crossURL = 'http://khyrulalam.website/cross-origin-data.php'



//Dhaka Stock Exchage Market Update
async function kakkuGetDSEAll(){
	const url 	= crossURL+"?url="+'https://www.dsebd.org/latest_share_price_all.php';
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
			'volume'		: td[10].innerText,
		}
		data.push(obj);
	}
	return data;
}


//Chittagong Stock Exchage Market Update
async function kakkuGetCSE(){
	const url	= crossURL+"?url="+'http://www.cse.com.bd/';
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


// Task 
// 1. Make a Real time DSE Function
// 2. Make view Template for DSE
// 3. Make view Template for CSE
// 4. Make Function for any url data scraping
