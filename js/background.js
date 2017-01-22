function updateIcon() {
    chrome.storage.local.get({ "isEnabled": true }, function ({ isEnabled }) {
        chrome.tabs.getSelected(null, function (tab) {
            if (!tab.url || !tab.url.match(/https:\/\/.*\.facebook\.com\/.*/)) {
                chrome.browserAction.setIcon({ path: '../img/icons/icon_16_grey.png', tabId: tab.id });
            } else if (!isEnabled) {
                chrome.browserAction.setIcon({ path: '../img/icons/icon_16_disabled.png', tabId: tab.id });
            } else {
                chrome.browserAction.setIcon({ path: '../img/icons/icon_16.png', tabId: tab.id });
            }
        });
    });
}

chrome.tabs.onSelectionChanged.addListener(function (tabId, props) {
    updateIcon();
});

updateIcon();

// Google Analytics
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-90668173-1']);

// Send one page view per browser session in the background
_gaq.push(['_trackPageview']);
