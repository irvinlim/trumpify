// Declare specifications for containers to find images in, and containers to bind to to detect changes
var containerSpecs = [
  {
    listenOn: '.tickerActivityStories',
    selectors: [ '.tickerStoryBlock' ],
  },
  {
    listenOn: 'div[id^="topnews_main_stream"] div',
    selectors: [ 'a[data-hovercard]', '.UFIImageBlockImage' ]
  },
  {
    listenOn: 'div[id^="more_pager_pagelet"] div',
    selectors: [ 'a[data-hovercard]', '.UFIImageBlockImage' ]
  },
  {
    listenOn: 'div[data-testid="chat_sidebar"] > div > ul',
    selectors: [ '*' ],
  }
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

  for (let listenContainer of document.querySelectorAll(listenOn)) {
    let timer;

    let observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          console.log(node);
          setPictures(selectors, node);
        });
      });
    });

    let observeConfig = {
      childList: true,
    };

    observer.observe(listenContainer, observeConfig);
  }
}

// Load immediately
for (let containerSpec of containerSpecs) {
  let { selectors, listenOn } = containerSpec;

  document.querySelectorAll(listenOn).forEach(container => {
    setPictures(selectors, container);
  });
}