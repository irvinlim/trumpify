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

            // Update image src
            img.src = "https://lh5.googleusercontent.com/-Sv0q6lkSAGM/AAAAAAAAAAI/AAAAAAAAAYI/eE7kV9LMcnQ/s0-c-k-no-ns/photo.jpg";
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

// Use setInterval to repeatedly make Facebook great again and again and again...
// There is no easy way to detect page changes without access to the internal React code.
setInterval(trumpify, 50);
