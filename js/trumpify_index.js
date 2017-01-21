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
