chrome.tabs.getSelected(null, function (tab) {
    $("body").removeClass('inactive');

    if (!tab.url || !tab.url.match(/https:\/\/.*\.facebook\.com\/.*/)) {
        $("body").addClass('inactive');
    }
});

chrome.storage.local.get({
    isEnabled: true,
    isAvatarsEnabled: true,
    isNamesEnabled: true,
    isHairEnabled: false,
    isTweetsEnabled: true,
}, function (result) {
    let { isEnabled, isAvatarsEnabled, isNamesEnabled, isHairEnabled, isTweetsEnabled } = result;

    // Update enabled button from local state
    updateToggleButton(isEnabled);
    updateSwitch('avatars', isAvatarsEnabled);
    updateSwitch('names', isNamesEnabled);
    updateSwitch('hair', isHairEnabled);
    updateSwitch('tweets', isTweetsEnabled);

    // Bind enabled button
    $("#btn-toggle").click(function () {
        isEnabled = !isEnabled;
        updateToggleButton(isEnabled);
        updateLocalStorage({ 'isEnabled': isEnabled });

        // Set icon
        let iconName;
        if (isEnabled) {
            iconName = 'icon_16';
        } else {
            iconName = 'icon_16_disabled';
        }
        chrome.browserAction.setIcon({ path: '../img/icons/' + iconName + '.png' });
    });

    // Bind switches
    $('.switch .toggle').click(function(e) {
        e.stopPropagation();
        $(this).parent().find('input[type=checkbox]').click();
    });

    $("[type=checkbox]").click(function() {
        let classMap = {
            avatars: 'isAvatarsEnabled',
            names: 'isNamesEnabled',
            hair: 'isHairEnabled',
            tweets: 'isTweetsEnabled',
        };

        let id = $(this).attr('id');
        let option = classMap[id];

        if (!option) {
            return;
        }

        let options = {};
        options[option] = !result[option];
        updateLocalStorage(options);
        updateSwitch(id, !result[option]);
    });
});

function updateToggleButton(isEnabled) {
    $("#btn-toggle").text(isEnabled ? "Trumpified" : "Obamaized");

    // Update body class
    $("body").removeClass('disabled');
    if (!isEnabled) {
        $("body").addClass('disabled');
    }
}

function updateSwitch(switchId, isToggled) {
    $(".switch input#" + switchId).prop('checked', isToggled);
}

function updateLocalStorage(options) {
    chrome.storage.local.set(options, function () {
        // Refresh
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });
    });
}
