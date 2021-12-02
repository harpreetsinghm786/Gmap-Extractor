chrome.browserAction.onClicked.addListener(function(activeTab){
	console.log("Function called");
	$box.simplePopup(chrome.runtime.getURL('/views/index.html'),'Title');
});


function scrapeEmails(){
	$box.getLocal(local=>{
		let timeDelay = 1000;
		local.collect.filter(x=>x.website).forEach((each,key)=>{
			timeDelay = 1000+ (key*1500);
			setTimeout(()=>{
				console.log("Sending request for "+each.website);
				$.ajax({
					url :each.website,
					complete :(r)=>{
						let text = r.responseText;
						let emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
						console.log("showing Emails");
						console.log(emails);
						local.collect[key].email = emails ? emails.join(',') : "No Email Found";
					}
				})
			},timeDelay);
		});
		
		// Save to local
		setTimeout(()=>{
			console.log("Saving to local");
			console.log(local.collect);
			$box.setLocal(local);
		},timeDelay+5000);
		
	});
}

$box.on((event,data)=>{
	
	console.log("Message received : "+event);
	
	if (event == "start") {
		console.log("Starting in background");
		$box.getLocal(local=>{
			TaskManager.gotoTask(local,'openMap');	
		});
	}
	
	if(event=="stop"){
		console.log("stop event called");
		TaskManager.container.stop();
	}
	
	if (event=="scrapeEmails") {
		scrapeEmails();
	}
	
});