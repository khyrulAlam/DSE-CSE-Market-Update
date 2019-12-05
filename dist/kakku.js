"use strict";
/****************************************
 * #### Javascript-kakku.js v1.1 ####
 * Coded by Khyrul alam 2018.
 * https://github.com/khyrulAlam
 *****************************************/

//This url save your ass from cross orgin request.
/* you can change this url and make request from your server 
	example: make a foo.php file in your directory then copy this code and past in foo.php 

	###########
	if(!empty($_GET['url'])){
		$url = $_GET['url'];    
		print file_get_contents($url);
	  }else{
	   echo 'Something wrong with url';
	  }
	##########
	
	now your cross orgin url const is like:  const CROSSURL = 'foo.php';

*/
const CROSSURL = "https://peaceful-mountain-17529.herokuapp.com/";

const fetchDataFromUrl = async (uri, selector) => {
	let endPoint = CROSSURL + "?url=" + uri;
	let response = await fetch(endPoint).then(response => response.text());
	let documentObject = await new DOMParser().parseFromString(
		response,
		"text/html"
	);
	let node = await [...documentObject.querySelectorAll(selector)];
	return node;
};

// Dhaka Stock Exchange Real Time Data
async function kakkuGetDSE() {
	let tr = await fetchDataFromUrl(
		"https://www.dsebd.org",
		"#mq2 table tr td table tr td"
	);
	let data = [];

	if (tr.length > 0) {
		for (let i = 1; i <= tr.length - 1; i++) {
			let s = tr[i].innerText;
			let arr = s.split(/[\s]{1,}/);
			let obj = {
				name: arr[0],
				lastTrade: arr[1],
				changeAmount: arr[2],
				changePercent: arr[3]
			};
			data.push(obj);
		}
	} else {
		console.error(
			"something wrong!! plz send report to who write this code with your Curse"
		);
	}

	return data;
}

//Chittagong Stock Exchage Market Update
async function kakkuGetCSE() {
	let tr = await fetchDataFromUrl(
		"https://www.cse.com.bd/ticker2.php",
		"#mq2 table tbody tr .priceticker"
	);
	let data = [];

	if (tr.length > 0) {
		for (let i = 0; i <= tr.length - 1; i++) {
			let td = tr[i].querySelectorAll("td");
			let obj = {
				name: td[0].innerText,
				f: td[1].innerText,
				l: td[2].innerText
			};
			data.push(obj);
		}
	} else {
		console.error(
			"something wrong!! plz send report to who write this code with your Curse"
		);
	}
	return data;
}

//Dhaka Stock Exchage Total Data Table
async function kakkuGetDSEAll() {
	let tr = await fetchDataFromUrl(
		"https://www.dsebd.org/latest_share_price_all.php",
		"table tr"
	);
	let data = [];
	if (tr.length > 0) {
		for (let i = 1; i <= tr.length - 1; i++) {
			let td = tr[i].querySelectorAll("td");
			let obj = {
				no: td[0].innerText,
				tradingCode: td[1].innerText,
				ltp: td[2].innerText,
				high: td[3].innerText,
				low: td[4].innerText,
				closep: td[5].innerText,
				ycp: td[6].innerText,
				change: td[7].innerText,
				trade: td[8].innerText,
				value: td[9].innerText,
				volume: td[10].innerText
			};
			data.push(obj);
		}
	} else {
		console.error(
			"something wrong!! plz send report to who write this code with your Curse"
		);
	}
	return data;
}

//Chittogong Stock Exchage Total Data Table
async function kakkuGetCSEAll() {
	let tr = await fetchDataFromUrl(
		"https://www.cse.com.bd/market/current_price",
		"#dataTable tbody tr"
	);
	let data = [];

	if (tr.length > 0) {
		for (var i = 1; i <= tr.length - 1; i++) {
			let td = tr[i].querySelectorAll("td");
			let obj = {
				no: td[0].innerText,
				tradingCode: td[1].innerText,
				ltp: td[2].innerText,
				open: td[3].innerText,
				high: td[4].innerText,
				low: td[5].innerText,
				ycp: td[6].innerText,
				trade: td[7].innerText,
				value: td[8].innerText,
				volume: td[9].innerText
			};
			data.push(obj);
		}
	} else {
		console.error(
			"something wrong!! plz send report to who write this code with your Curse"
		);
	}
	return data;
}

//view Template for DSE
function TemplateDSE(obj = []) {
	if (obj.length === 0) return;
	if (obj.data == null || obj.data.length == 0) return;
	let viewDom = document.querySelector(obj.domEl);
	if (viewDom === null) {
		let mess = "Your Given ID/Class is Wrong";
		throw new Error(mess);
	}
	let speed = obj.scrolldelay ? obj.scrolldelay : 5;
	let bg = obj.bg ? obj.bg : "#49244e;";
	let textColor = obj.textColor ? obj.textColor : "#333";
	viewDom.innerHTML = `<div class="dsetem1" style="background: ${bg};color:${textColor}">
		<div class="dsetem-header">
			DSE
		</div>
		<marquee onMouseOver="this.stop()" onMouseOut="this.start()" loop="true" scrollamount="${speed}">
			${obj.data
			.map(v => {
				let heigh = v.changeAmount > 0 ? '<i class="upper">&#8679</i>' : "";
				let low = v.changeAmount < 0 ? '<i class="lower">&#8681</i>' : "";
				let middle =
					v.changeAmount == 0 ? '<i class="middle">&#8691</i>' : "";
				return `<span>
						${v.name} - ${v.lastTrade}
						<br> 
						<code>${v.changePercent}</code> 
						<code>${v.changeAmount}</code>
						${heigh} ${low} ${middle}
					</span>`;
			})
			.join("")}
		</marquee>
 	</div>`;
}

//view Template for CSE
function TemplateCSE(obj = []) {
	if (obj.length === 0) return;
	if (obj.data == null || obj.data.length == 0) return;
	let viewDom = document.querySelector(obj.domEl);
	if (viewDom === null) {
		let mess = "Your Given ID/Class is Wrong";
		throw new Error(mess);
	}
	let speed = obj.scrolldelay ? obj.scrolldelay : 5;
	let bg = obj.bg ? obj.bg : "#49244e;";
	let textColor = obj.textColor ? obj.textColor : "#333";
	viewDom.innerHTML = `<div class="dsetem1" style="background: ${bg};color:${textColor}">
		<div class="dsetem-header">
			CSE
		</div>
		<marquee onMouseOver="this.stop()" onMouseOut="this.start()" loop="true" scrollamount="${speed}">
			${obj.data
			.map(v => {
				return `<span>
						${v.name} ${v.f}
						<br> 
						<code>${v.l}</code>
					</span>`;
			})
			.join("")}
		</marquee>
 	</div>`;
}
