// Declare specifications for containers to find images in, and containers to bind to to detect changes
var containerSpecs = [
    {
        selectors: [
            'div[role="navigation"] div[data-click="profile_icon"] a',
            '#feedx_container a'
        ]
    },
    {
        listenOn: '.tickerActivityStories',
        selectors: ['.tickerStoryBlock'],
    },
    {
        listenOn: 'div[id^="topnews_main_stream"]',
        selectors: ['a[data-hovercard]', '.UFIImageBlockImage', '.profilePic']
    },
    {
        listenOn: 'div[id^="more_pager_pagelet"]',
        selectors: ['a[data-hovercard]', '.UFIImageBlockImage', '.profilePic']
    },
    {
        listenOn: 'div[data-testid="chat_sidebar"] > div',
        selectors: ['li a'],
    },
    {
        listenOn: 'body',
        selectors: [
            '.uiContextualLayerPositioner a[data-hovercard]',
            '.uiContextualLayerPositioner .UFIImageBlockImage',
            '.uiContextualLayerPositioner td a',
            '.uiContextualLayerPositioner _dynamicHovercard__socialContextRow',
            '.uiContextualLayerPositioner .profilePic',
        ],
    },
];

// Method to set pictures, given an array of selectors
var setPictures = (selectors, enclosing = document) => {
    selectors.forEach(selector => {
        let blocks = enclosing.querySelectorAll(selector);

        if (!blocks) {
            return;
        }

        for (let block of blocks) {
            let img = block.querySelector('img');

            if (img) {
                img.src = "https://lh5.googleusercontent.com/-Sv0q6lkSAGM/AAAAAAAAAAI/AAAAAAAAAYI/eE7kV9LMcnQ/s0-c-k-no-ns/photo.jpg";
            }
        }
    });
};

// Bind event listeners
for (let containerSpec of containerSpecs) {
    let { selectors, listenOn } = containerSpec;

    if (!listenOn) {
        continue;
    }

    for (let listenContainer of document.querySelectorAll(listenOn)) {
        let timer;

        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    setPictures(selectors, node);
                });
            });
        });

        let observeConfig = {
            childList: true,
            subtree: true,
        };

        observer.observe(listenContainer, observeConfig);
    }
}

// Load immediately
for (let containerSpec of containerSpecs) {
    let { selectors, listenOn } = containerSpec;
    let containers;

    if (listenOn) {
        containers = document.querySelectorAll(listenOn);
    } else {
        containers = [document];
    }

    containers.forEach(container => {
        setPictures(selectors, container);
    });
}