var ngApp = angular.module("popupApp",[]).config(function($sceProvider) {
    $sceProvider.enabled(false);
});

var columnList = ["keyword","location","company_name","website","phone","email_1","email_2","email_3","address","city","state","pincode","rating_count","review","cid"];

ngApp.controller("indexController", function($scope, $http,$sce) {
    
    $scope.developer = DEVELOPER_INFO;
    $scope.manifest = chrome.runtime.getManifest();
    $scope.welcome = WelcomeController.model;
    $scope.Tabs = Tabs;
    $scope.$fc = FoxCommon;
    $scope.$auth = Auth;
    $scope.$config = Config;
    
    $scope.isCheckingLicense = false;
    
    /* ------------------------------- Login Page ------------------------------- */
    $scope.loginPage = {
        email : "",
        password : "",
        isLoading : false,
    };
    
    /* ---------------------------------- Local --------------------------------- */
    $scope.local = $box.getDefaultLocalModel();
    
    /* ----------------------------- On Local Change ---------------------------- */
    $box.onLocalChange(data => {
        $box.getLocal(local => {
            $scope.$apply(() => {
                console.log("Data changed");
                $scope.local = local;
                insertIntoDataTable(local);
            });
        });
    });
    /* ----------------------------- On Local Change ---------------------------- */
    
    /* ------------------------------- Init Local ------------------------------- */
    $box.getLocal(local => {
        $scope.$apply(() => {
            $scope.local = { ...$scope.local, ...local };
        });
        
        /* Get the active tab URL*/
        
        $box.activeTab(tab => {
            $scope.$apply(() => {
                $scope.local.activeTabUrl = tab.url;
            });
        });
    });
    /* ------------------------------- Init Local ------------------------------- */
    
    /*	Toggle Tab*/
    
    $scope.toggleTab = tab => {
        $scope.local.activeTab = tab;
        $scope.saveLocal();
        $scope.initiMaterialDesignComponents();
    };
    
    $scope.saveLocal = function() {
        $box.setLocal($scope.local);
    };
    
    $scope.sendMessage = function(action, data = {}) {
        console.log("Message sent");
        console.log(action);
        $box.sendToAll(action, data);
    };
    
    
    /* URL List */
    $scope.saveAsList = ()=>{
        $scope.local.keywordList = $scope.local.keywordTextarea.split('\n').filter(x=>x.length);
        $scope.local.locationList = $scope.local.locationTextarea.split('\n').filter(x=>x.length);
        $scope.local.blackList = $scope.local.blackListTextarea.split('\n').filter(x=>x.length);
        let collect = [];
        $scope.local.keywordList.forEach((keyword)=>{
            $scope.local.locationList.forEach((location)=>{
                collect.push(`${keyword}~in~${location}`);
            });
        });
        $scope.local.taskList = collect;
        console.log($scope.local.taskList);
        console.log($scope.local);
        $scope.saveLocal($scope.local);
    };
    
    
    /* Scrape EmailList from website */
    $scope.scrapeEmails =()=>{
        if($scope.local.isScrapingEmail){
            $scope.local.isScrapingEmail = false;
            $scope.saveLocal();
            location.reload();
        }
        // $box.send('scrapeEmails');
        let timeDelay = 1000;
        $scope.local.collect.filter(x=>x.website && !x.email).forEach((each,key)=>{
            timeDelay = 1000+ (key*1500);
            let tempCollect = [];
            setTimeout(()=>{
                console.log("Sending request for "+each.website);
                $.ajax({
                    url :each.website,
                    complete :(r)=>{
                        let text = r.responseText;
                        let emailList = text ? text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) : ["Can't Access Website"];
                        emailList = emailList ? emailList : ["No Email found"];
                        emailList = _.uniq(emailList);
                        $scope.$apply(()=>{
                            let index = _.findIndex($scope.local.collect, { 'cid': each.cid});
                            emailList.forEach((email,key)=>{
                                $scope.local.collect[index]['email_'+(key+1)] = $scope.local.blackList.indexOf(email)==-1 ? email : "Blacklisted Email";
                            });
                            $scope.saveLocal();
                            updateDataTable($scope.local);
                        });
                    }
                })
            },timeDelay);
        });
        
        // Save to local
        setTimeout(()=>{
            $scope.$apply(()=>{
                $scope.local.isScrapingEmail = false;
            });
        },timeDelay+5000);
    };
    
    $scope.emailFiltered = ()=>{
        return $scope.local.collect.filter(x=>!x.email_1 && x.website).length;
    }
    
    $scope.download = ()=>{
        if($scope.local._auth.hasValidKey){
            $fc.downloadAs.CSV($scope.local.collect,`Google Maps Data`,columnList);   
        }else{
            $scope.local.showLoginModal = true;
            $scope.saveLocal();
        }
    }
    
    $scope.countOf = (targetKey)=>{
        let tempCollect = [];
        $scope.local.collect.forEach(each=>{
            let value = each[targetKey];
            if(tempCollect.indexOf(each[targetKey])==-1 && value){
                tempCollect.push(each[targetKey]);
            }
        });
        return tempCollect.length;
    }
    
    /* -------------------------------- Material Design -------------------------------- */
    $scope.initiMaterialDesignComponents = () => {
        MaterialDesignLite.init();
    };
    $scope.initiMaterialDesignComponents();
    /* -------------------------------- Material Design -------------------------------- */
    
    /* ---------------------------------- Login --------------------------------- */
    $scope.login = ()=>{
        $scope.isCheckingLicense = true;
        Auth.login($scope.licenseKey,{
            authSuccess : (response)=>{
                // $scope.toggleTab('home');
                $scope.local._auth.licenseKey = $scope.licenseKey;
                $scope.local._auth.hasValidKey = true;
                $scope.local.showLoginModal = false;
                $scope.saveLocal();
                $scope.snackbar.show("License Key is valid");
            },
            authFailed : (response)=>{
                $scope.snackbar.show("Invalid License key");                
            },
            error : ()=>{
                $scope.snackbar.show("Error connecting");
            },
            complete : ()=>{
                $scope.$apply(()=>{
                    $scope.isCheckingLicense = false;
                });
            }
        });
    };
    /* ---------------------------------- Login --------------------------------- */
    
    $scope.logout = ()=>{
        Auth.logout();
    };
    
    /* -------------------------------- Snackbar -------------------------------- */
    $scope.snackbar = {
        isShown : false,
        text: '',
        show:(text,closeAfterSec=3)=>{
            $scope.snackbar.text = text;
            $scope.snackbar.isShown = true;
            $scope.snackbar.closeAfter(closeAfterSec);
        },
        hide:()=>{
            $scope.snackbar.isShown = false;
        },
        closeAfter :(closeAfterSec)=>{
            setTimeout(()=>{
                $scope.$apply(()=>{
                    $scope.snackbar.isShown = false;
                });
            },closeAfterSec*1000);
        }
    };
    /* -------------------------------- Snackbar -------------------------------- */
    
    
    $scope.init = ()=>{
        
        setTimeout(()=>{
            // Auth Check
            Auth.check({
                authFailed : (response)=>{
                    $scope.snackbar.show("Invalid License key");                
                }
            });            
        },$fc.randBetween(300,700)); 
        
        setTimeout(()=>{     
            $scope.$apply(()=>{
                $scope.local.isScrapingEmail = false;
                $scope.local.status = false;
                $scope.sendMessage('stop');
                $scope.showItemExtensionFooter = true;
            });
        },200);
        
    };
    
    $scope.refreshTable = ()=>{
        setTimeout(()=>{
            buildDataTable();
        },800);
    };
    
    $scope.percentComplete = ()=>{
        let data = {};
        data.total = $scope.local.keywordTextarea.split('\n').filter(x=>x.length).length*$scope.local.locationTextarea.split('\n').filter(x=>x.length).length;  
        data.completed = data.total - $scope.local.taskList.length;
        data.percent = ( (data.completed/data.total)*100);
        return data;
    };
    $scope.pagePercent = ()=>{
        let data = {};
        data.total = 20;  
        data.completed = $scope.local.collect.length;
        data.percent = ""+ (data.completed/data.total).toFixed(2);
        console.log(data);
        data.percent = data.percent.split('.')[1];
        console.log(data);
        return data;
    };
    
    
    
    $scope.init();
    
});


// Jquery Data Table
var dataGrid = null;
var productsStore  = null;
var lastCollectDataCount = 0;

function insertIntoDataTable(local){
    if(local.collect.length!=lastCollectDataCount){
        lastCollectDataCount = local.collect.length;   
        local.collect.forEach(each=>{
            productsStore.push([{ type: "insert", data: each }]);
        });
    }
}

function updateDataTable(local){
    local.collect.forEach(each=>{
        productsStore.push([{ type: "update", key:each.cid, data: each }]);
    });
}

function buildDataTable(){
    $box.getLocal(local=>{
        
        productsStore = new DevExpress.data.ArrayStore({
            key: "cid",
            data: local.collect
        });
        
        console.log("Local Is started");
        dataGrid  = $("#gridContainer").dxDataGrid({
            
            showBorders: true,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: "Search..."
            },
            headerFilter: {
                visible: true
            },
            paging: {
                enable : true,
                pageSize: 25,
            },
            pager: {
                showPageSizeSelector: true,
                showNavigationButtons: true,
                allowedPageSizes: [25, 50, 100],
                showInfo: true
            },
            dataSource: {
                store : productsStore,
                reshapeOnPush: true
            },
            allowColumnResizing: true,
            showBorders: true,
            columnMinWidth: 50,
            columnAutoWidth: true,
            columns: columnList.map(each=>{
                return {dataField:each,width:180,allowResizing: true}
            }),
            columnResizingMode :"widget",
            bindingOptions: {
                columnResizingMode: "columnResizingMode",
            }
        }).dxDataGrid("instance");  
        
    });
}

// On Window Load
$(()=>{    
    buildDataTable();
    
    // Add Results Per Page Text
    setInterval(()=>{
        let selector = $('.dx-page-sizes');
        let text = selector.text();
        console.log(text);
        if(!text.includes("Results per page")){
            $('.dx-page-sizes').prepend('Results per page : ');
        }
    },600);
    
});