let tweetsJson;

// Load the replacement JSON
$.getJSON(chrome.extension.getURL('json/tweets.json'), json => {
    tweetsJson = json;
});

let addTrumpifyTweetsSelector = () => {
    $("#feedx_container > div > div:last-child > div > div:last-child").before('\
        <div class="trumpify_tweets_selector">\
            <span class="trumpify_tweets_label">Choose a tweet:</span>\
            <div class="trumpify_selector_container">\
                <span class="trumpify_selector_button">Select...</span>\
                <div class="trumpify_dropdown"></div>\
                <div class="trumpify_after">Now, click at the end of the text and press spacebar.</div>\
            </div>\
        </div>\
    ');

    tweetsJson.forEach(tweet => {
        $('.trumpify_tweets_selector .trumpify_dropdown').append('<span>' + tweet + '</span>');
    });

    $(".trumpify_selector_button").click(function() {
        $(".trumpify_dropdown").addClass('trumpify_visible');
    });

    $(".trumpify_selector_container").on('blur mouseleave', function() {
        $(".trumpify_dropdown").removeClass('trumpify_visible');
    });

    // $('div[role="combobox"]')[0].addEventListener("keypress", function(e) {
    //     console.log(e.target);
    // });

    $(".trumpify_tweets_selector .trumpify_dropdown span").click(function(e) {
        let text = $(e.target).html();
        let textarea = $('#feedx_container div[role="combobox"] span');
        textarea.html('<span data-text="true">' + text + '</span>');
        textarea.parentsUntil('[role="presentation"]').find('[id^="placeholder"]').parent().remove();
        $(".trumpify_dropdown").removeClass('trumpify_visible');
        $(".trumpify_after").addClass('trumpify_visible');

        $('div[role="combobox"]')[0].addEventListener("keypress", function(e) {
            $(".trumpify_after").removeClass('trumpify_visible');
        });

        // let event = new KeyboardEvent('keypress', {
        //     key: " ",
        //     code: 32,
        //     charCode: 32,
        //     keyCode: 32,
        //     which: 32,
        // });

        // for (let elem of $('#feedx_container *')) {
        //     elem.dispatchEvent(event);
        // }

        // let textarea = $('#feedx_container div[role="combobox"]');
        // text.split('').forEach((char, i) => {
        //     // var event = document.createEvent('HTMLEvents');
        //     // event.initEvent('keypress', true, true);
        //     // var target = $('#feedx_container div[role="combobox"]')[0];
        //     // target.dispatchEvent(event);

        //     // let event = new KeyboardEvent('keypress', {
        //     //     key: "Enter",
        //     //     isComposing: true,
        //     //     code: 40,
        //     //     charCode: 40,
        //     //     keyCode: 40,
        //     //     which: 40,
        //     // });
        //     // textarea.trigger(event);

        //     let event = document.createEvent('Events');
        //     event.initEvent('change', true, false);
        //     $('#feedx_container div[role="combobox"]')[0].dispatchEvent(event);
        // });
    });
};

$(document).ready(function() {
    let checkForActive = setInterval(function() {
        if (document.querySelector("#feedx_container form")) {
            return;
        }

        // Stop polling
        clearInterval(checkForActive);

        // Add selector
        addTrumpifyTweetsSelector();
    }, 100);
});
