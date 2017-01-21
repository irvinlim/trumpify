function updateIcon() {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url && tab.url.match(/https:\/\/.*\.facebook\.com\/.*/)) {
            chrome.browserAction.setIcon({ path: '../img/icon_16.png', tabId: tab.id });
        } else {
            chrome.browserAction.setIcon({ path: '../img/icon_16_grey.png', tabId: tab.id });
        }
    });
}

chrome.tabs.onSelectionChanged.addListener(function (tabId, props) {
    updateIcon();
});

updateIcon();
