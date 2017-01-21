chrome.tabs.getSelected(null, function (tab) {
    if (tab.url && tab.url.match(/https:\/\/.*\.facebook\.com\/.*/)) {
        $("#btn-toggle").prop('disabled', false);
    } else {
        $("#btn-toggle").prop('disabled', true);
    }
});

chrome.storage.local.get({ "isEnabled": true }, function ({ isEnabled }) {
    updateToggleButton(isEnabled);

    $("#btn-toggle").click(function () {
        isEnabled = !isEnabled;
        updateToggleButton(isEnabled);

        chrome.storage.local.set({ 'isEnabled': isEnabled }, function () {
            console.log('Settings saved');
        });

        // Refresh
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });
    });
});

function updateToggleButton(isEnabled) {
    $("#btn-toggle").text(isEnabled ? "Disable" : "Enable");
}
