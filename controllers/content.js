$box.on((event, data) => {
	console.log("Message received : "+event);
	
	if(event=='stop'){
		console.log("Stopping");
		TaskManager.container.stop();
	}
	
});


/*-------------------------- On Load ------------------------*/
$(() => {
	console.log("Content.js loaded");
	$box.getLocal(local=>{
		// TaskManager.startPendingTask(local);
		console.log(local);
		if (local.status && location.href.includes('ref=extension')) {
			console.log("Starting Process");
			openEachStore();
		}
	});
});


function collectCid(){
	return Array.from($('[data-cid]').map((key,value)=>{
		return $(value).attr('data-cid');
	}));
}

function clickStore(cid){
	console.log($(`[data-cid="${cid}"]`));
	let selector = `[data-cid="${cid}"]`;
	console.log("Selector : "+selector);
	$(selector).length ? $(selector)[0].click() : console.log("Selector not found");
}

function openEachStore(){
	let list = collectCid();
	$box.getLocal(local=>{
		console.log("Opening Each Store");
		
		list = list.filter(cid=>{
			let index = _.findIndex(local.collect, { cid: cid });
			console.log("Index is "+index);
			if(index==-1){
				return true;
			}
			return false;
		});
		
		// Skip this page if all from this page is scraped
		list = list.length ? list : [1234];
		
		list.forEach((cid,key)=>{
			let timeDelay = (key*6000) + $fc.randBetween(100,2000);
			console.log("Time Delay : "+timeDelay);
			setTimeout(()=>{
				console.log("Clicking Store");
				clickStore(cid);
				setTimeout(()=>{
					console.log("Saving Data");
					
					saveData((local)=>{
						// If Last Element
						if($fc.isLast(list,cid)){
							console.log("This is last elment");
							if(hasNextPage()){
								console.log("New page found, going to new page");
								clickNextPage();
								setTimeout(()=>{
									openEachStore();
								},2*1000);
							}else{
								console.log("No more pages. Opening new search query");
								local.taskList.shift();
								$box.setLocal(local,{
									onSet : ()=>{
										console.log("Sendig send message");
										$box.send('start');
									}
								});
							}
						}
					});
					
				},3*1000);
				
			},timeDelay);
		});
		
	});
}

function clickNextPage(){
	if(hasNextPage()){
		let selector = $('td>a>span:contains("Next")');
		selector.click();
		return selector.length;
	}
	return false;
}

function hasNextPage(){
	return $('td>a>span:contains("Next")').length;
}

function saveData(callback){
	$box.getLocal(local=>{
		let data = scrapeData();
		if (data.company_name) {
			
			// Add data
			data.keyword = local.activeKeyword;
			data.location = local.activeLocation;
			
			local.collect.push(data);
			local.collect = _.uniqBy(local.collect,'cid');
			
			console.log("Saving Data");
			console.log(local.collect);
			
			// Open Login Modal
			if(!local._auth.hasValidKey && local.collect.length>=50){
				local.showLoginModal = true;
			}
			$box.setLocal(local,{
				onSet : ()=>{
					// If Guest User
					if(!local._auth.hasValidKey && local.collect.length>=50){
						$box.send('stop');
					}else{
						console.log("Calling callback");
						callback(local);
					}
				}
			});
		}else{
			console.log("Company Name not found");
			callback(local);
		}
	});
}

function scrapeData(){
	let data = {};
	let parent = $('.immersive-container');
	data.company_name = $(parent).find('[data-attrid="title"]').text();
	data.company_name = data.company_name ? data.company_name : "";
	
	data.website = $(parent).find('a:contains("Website")').attr('href');
	data.website = data.website ? data.website : "";
	
	data.cid = $(parent).find('div[data-cid]').attr('data-cid');
	data.cid = data.cid ? data.cid : "";
	
	data.review = $(parent).find('g-review-stars>span').attr('aria-label');
	data.review = data.review ? data.review : "";
	
	data.rating_count = $(parent).find('a>span:contains("Google reviews")').text();
	data.rating_count = data.rating_count ? parseInt(data.rating_count) : "";
	
	data.address = $(parent).find('[data-local-attribute="d3adr"]').text();
	data.address = data.address ? data.address.replace('Address: ','').trim() : "";
	
	data.pincode = data.address.match(/\b[1000-999999]+\b/g);
	data.pincode = data.pincode ? data.pincode : []; 
	data.pincode = data.pincode.length ? data.pincode.pop() : "";
	data.subtitle = $(parent).find('.YhemCb');
	
	data.subtitle = data.subtitle.length ? $(data.subtitle).text() : "";
	data.subtitle = data.subtitle.includes(" in ") && data.subtitle.includes(",") && data.subtitle.split(' in ')[1].includes(',') ? data.subtitle.split(' in ')[1].split(',') : ["",""]; 
	data.state = data.subtitle.pop().trim();
	data.city = data.subtitle.pop().trim();
	
	
	// Phone
	let tempCollect = [];
	$(parent).find('[data-local-attribute="d3ph"]').each((key,value)=>{
		let phone = $(value).text().replace('Phone:','').trim();
		if(tempCollect.indexOf(phone)==-1){
			data['phone'] = phone;
			tempCollect.push(phone);
		}
	});
	
	console.log("Scraping Data");
	console.log(data);
	return data;
}


/*-------------------------- On Load ------------------------*/


/*---------------------- Extension Toolbar ---------------------
$(function(){
	
	let extensionToolbar = {};
	extensionToolbar.height = "50px";
	extensionToolbar.url = chrome.extension.getURL("views/extensionToolbar.html"); 
	
	$('body').css('-webkit-transform','translateY('+extensionToolbar.height+')');
	$('html').append(`
	<iframe src="${extensionToolbar.url}" id="simple-chrome-extension-toolbar" style="height:${extensionToolbar.height};"></iframe>
	`);
	
});
---------------------- Extension Toolbar ---------------------*/
