let TOTAL_AVATAR_COUNT = 11;

// Declare selectors
let selectorConfig = {

    profilePictureSelectors: [
        'div[role="navigation"] div[data-click="profile_icon"] a',
        '#feedx_container a',
        '.tickerActivityStories .tickerStoryBlock',
        'a[data-hovercard]',
        '.UFIImageBlockImage',
        '.profilePic',
        '.profilePicThumb',
        'div[data-testid="chat_sidebar"] li a',
        '.uiContextualLayerPositioner td a',
        '.uiContextualLayerPositioner _dynamicHovercard__socialContextRow',
    ],

};

// Global
let _previousRandom = null;

// Method to set pictures, given a selector
let setPictures = (selector) => {
    let selectedBlocks = document.querySelectorAll(selector);

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

            do {
                random = Math.floor(Math.random() * TOTAL_AVATAR_COUNT) + 1;
            } while (random === _previousRandom);

            _previousRandom = random;

            // Update image src
            img.src = chrome.extension.getURL("img/avatars/" + random + ".jpg");
        }
    }
};

let trumpify = () => {

    let { profilePictureSelectors } = selectorConfig;

    // Trumpify profile pictures
    for (let selector of profilePictureSelectors) {
        setPictures(selector);
    }

};

document.body.addEventListener('DOMNodeInserted', () => {
    // Don't observe so often
    if (window.__trumpifyPageJustLoaded) {
        return;
    }

    // Timeout to allow re-observing
    setTimeout(() => {
        window.__trumpifyPageJustLoaded = false;
    }, 500);

    trumpify();
});
