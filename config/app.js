const DEVELOPER_INFO = {
	name: "Chandrabhan Singh",
	github: "https://github.com/chandusingh",
	fiverr: "https://www.fiverr.com/users/chandudhakad",
	linkedin: "https://www.linkedin.com/in/chandrabhan-singh-6232b1150/",
	website: "https://marketingtech.in/",
	facebook: "https://www.facebook.com/digitechtech/",
	mail: "info@marketingtech.in"
};

const Config = {};

Config.itemId = 6;
Config.itemUrl =  `http://foxoyo.store/item/${Config.itemId}`;
Config.apiUrl = `${Config.itemUrl}/api`;

Config.itemAboutPage = Config.itemUrl+'/about';
Config.itemNotificationsPage = Config.itemUrl+'/notifications';
Config.itemFeedbackPage = Config.itemUrl+'/feedback';
Config.itemHelpPage = Config.itemUrl+'/help';
Config.itemContactPage = Config.itemUrl+'/contact';
Config.itemsSignupPage = Config.itemUrl+'/signup';
Config.itemExtensionFooter = Config.itemUrl+'/extension-footer?item_version='+$box.manifest.version;
Config.installUrl = `${Config.itemUrl}/install`;
Config.uninstallUrl = `${Config.itemUrl}/uninstall?item_id=${Config.itemId}&item_version=${$box.manifest.version}`;
