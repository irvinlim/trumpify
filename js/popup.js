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
            // Refresh
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
            });
        });

        // Refresh
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });

        // Set icon
        let iconName;
        if (isEnabled) {
            iconName = 'icon_16';
        } else {
            iconName = 'icon_16_disabled';
        }
        chrome.browserAction.setIcon({ path: '../img/icons/' + iconName + '.png' });
    });
});

function updateToggleButton(isEnabled) {
    $("#btn-toggle").text(isEnabled ? "Enabled" : "Disabled");

    // Update body class
    $("body").removeClass('disabled');
    if (!isEnabled) {
        $("body").addClass('disabled');
    }
}
