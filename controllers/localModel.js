$box.getDefaultLocalModel =  () => {
  let data = {
    
    _box : {
      localLogs : ""
    },
    
    _auth : {
      hasValidKey : true,
      licenseKey : ""
    },
    
    _stats : {
      appOpenCount : 0,
      tabsOpenCount : {},
    },
    
    _notifications : {
      last_show_notification_hash : "",
      list : []
    },
    
    _taskManager : {
      isWorking : false,
      activeTask : false
    },
    
    _googleForm : {
      actionUrl : "",
      inputs : []
    },
    
    activeTabUrl: "",
    activeTab: "home",
    
    status : true,
    
    swipeDirection :"right",
    delayLower : 10,
    delayUpper : 15,    
    delayTime : 10,
    
    collect : [],
    keywordList : [],
    locationList : [],
    taskList:[],
    blackList : [],
    
    isScrapingEmail : false,
    
    keywordTextarea : "",
    locationTextarea : "",
    activeQuery: "",
    activeKeyword : "",
    activeLocation : "",
    blackListTextarea : "",
    
    showLoginModal : false,
    
  };
  return data;
};