let TOTAL_AVATAR_COUNT = 21;

// Declare selectors
let selectorConfig = {

    profilePictureSelectors: [
        '.tickerActivityStories .tickerStoryBlock',
        '.userContentWrapper .clearfix > a',
        '.profilePic',
        'div[data-testid="chat_sidebar"] li a',
        '.uiContextualLayerPositioner td a',
        '.uiContextualLayerPositioner _dynamicHovercard__socialContextRow',
        '.fbTimelineComposerUnit .clearfix',
        '#fbNotificationsFlyout .anchorContainer .lfloat',
        '.jewelContent .MercuryThreadImage',
        '#fbRequestsList_wrapper .objectListItem',
        '.friendBrowserCheckboxContentGrid .friendBrowserExtraSpacing',
        '.friendBrowserPhotoCrop',
        '.ruProfilePicXLarge',
        // '.egoOrganicColumn .ego_section .ego_unit a[data-hovercard]',
        '[data-testid="friend_list_item"] a',
        '.fbTimelineUnit a[data-hovercard]',
        '#fbVideoChannelSidepaneDetailsFeedbackFormContainer .fbPhotosSnowliftFeedback .clearfix',
        '#facebar_typeahead_view_list [role="gridcell"] a',
        '#pages_navigation a[aria-label="Profile picture"]',
        '.UFIImageBlockImage',
        {
            name: 'currentUserProfilePicture',
            selectors: [
                '.fbxWelcomeBoxBlock',
                'div[role="navigation"] div[data-click="profile_icon"] a',
                '#feedx_container a',
                '.profilePicThumb',
                '.profileThumb',
            ],
            allRandom: false
        },
        {
            name: 'chatProfilePicture',
            selectors: [ '.conversationContainer a' ],
            allRandom: false
        },
    ],

};

// Global
let _previousRandom = null;
let _sameRandomDict = {};

// Method to set pictures, given a selector
let setPictures = (selector, allRandom=true, name) => {
    let selectedBlocks = document.querySelectorAll(selector);

    if (!name) {
        name = selector;
    }

    if (!selectedBlocks) {
        return;
    }

    for (let block of selectedBlocks) {
        let img = block.querySelector('img');

        if (img && !img.dataset.trumpify) {
            // Set flag
            img.dataset.trumpify = true;

            // Get random number
            let random;

            // Prevent images from being chosen consecutively
            if (allRandom || !_sameRandomDict[name]) {
                do {
                    random = Math.floor(Math.random() * TOTAL_AVATAR_COUNT) + 1;
                } while (random === _previousRandom);

                _previousRandom = random;
            } else {
                random = _sameRandomDict[name];
            }

            // Store random generated index for non-allRandom selectors
            if (!allRandom) {
                _sameRandomDict[name] = random;
            }

            // Update image src
            img.src = chrome.extension.getURL("img/avatars/" + random + ".jpg");
        }
    }
};

let trumpifyAvatars = () => {

    let { profilePictureSelectors } = selectorConfig;

    // Trumpify profile pictures
    for (let selectorGroup of profilePictureSelectors) {
        let selectors, allRandom, name;

        if (typeof selectorGroup === 'object') {
            ({ selectors, allRandom=true, name } = selectorGroup);
        } else {
            selectors = [ selectorGroup ];
            allRandom = true;
        }

        selectors.forEach(selector => {
            setPictures(selector, allRandom, name);
        });
    }

};

chrome.storage.local.get({ isEnabled: true, isAvatarsEnabled: true }, function ({ isEnabled, isAvatarsEnabled }) {
    if (!isEnabled || !isAvatarsEnabled) {
        return;
    }

    document.body.addEventListener('DOMNodeInserted', () => {
        // Don't observe so often
        if (window.__trumpifyPageJustLoaded) {
            return;
        }

        // Timeout to allow re-observing
        setTimeout(() => {
            window.__trumpifyPageJustLoaded = false;
        }, 500);

        trumpifyAvatars();
    });

});


