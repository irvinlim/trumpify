let replacementJson;

// Load the replacement JSON
$.getJSON(chrome.extension.getURL('json/replacements.json'), json => {
    // Prepares the RegExp objects
    for (let obj of json) {
        obj.regex = new RegExp(obj.word, "g");
        obj.count = obj.replacements.length;
    }

    replacementJson = json;
});

function trumpifyNames() {
    if (!replacementJson) return;

    let elements = document.querySelectorAll('a,title,p,span,h1,h2,h3,h4,h5,h6,li,div');

    for (let element of elements) {
        if (element.dataset.trumpified) continue;

        // iterates through the element's nodes
        for (let node of element.childNodes) {
            if (node.nodeType === 3 && node.nodeName.indexOf("src") === -1) { // Text type, non-src
                let text = node.nodeValue;
                let replacedText = text;

                for (let obj of replacementJson) {
                    replacedText = replacedText.replace(
                        obj.regex,
                        obj.replacements[Math.floor(Math.random() * obj.count)]
                    );
                }

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                    element.dataset.trumpified = true;
                }
            }
        }
    }
}


chrome.storage.local.get({ isEnabled: true, isNamesEnabled: true }, function ({ isEnabled, isNamesEnabled }) {
    if (!isEnabled || !isNamesEnabled) {
        return;
    }

    $(document).bind("scroll", function () {
        if (!window.disabled) {
            trumpifyNames()
        }
    });

    $(document).ready(function () {
        trumpifyNames()
    });
});
