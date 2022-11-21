let page = {
    urls: {
        getLyrics: location.origin + "/api/lyrics"
    },
    element: {},
    commands: {},
    loadData: {},
    dialogs: {
        element: {},
        commands: {}
    }
}
let lyrics = [];
let currentLine = 0;
let spanNumber = 1;
let lyricHeight = $(".lyrics").height();

page.loadData.getLyrics = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getLyrics,
    }).done((data) => {
        lyrics = data;
        page.commands.generate();
    }).fail((err) => {
        console.log(err);
    })
}

page.commands.align = () => {
    const a = $(".highlighted").height();
    const c = $(".content").height();
    const d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    const e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

page.commands.generate = () => {
    let html = "";

    for (let i = 0; i < lyrics.length; i++) {
        if (i === 0)
            html += `<div class="highlighted">`;
        else if (lyrics[i].line !== lyrics[i - 1].line)
            html += '</div><div >';

        html +=  lyrics[i].text === "" ? "<span>• • •</span>" : `<span data-id=${lyrics[i].time}>${lyrics[i].text}</span>`;
    };
    html += '</div>';

    $(".lyrics").html(html);
    page.commands.align();
}

page.commands.textAnimation = (selector, timeAnimation) => {
    const strText = selector.text();
    const splitText = strText.split("");

    let str = "";
    for (let i = 0; i < splitText.length; i++) {
        str += "<em>" + splitText[i] + "</em>"
    }
    selector.html(str);

    let char = 1;
    let timer = setInterval(onTick, timeAnimation);

    function onTick() {
        const em = selector.children(`em:nth-child(${char})`);
        em.addClass('fade');
        char++;
        if (char > splitText.length) {
            complete();
            return;
        }
    }

    function complete() {
        clearInterval(timer);
        timer = null;
    }
}

page.initializeEventControl = () => {
    $(window).on("resize", function() {
        if ($(".lyrics").height() !== lyricHeight) {
            lyricHeight = $(".lyrics").height();
            page.commands.align();
        }
    });

    $(document).ready(function() {
        $("video").on('timeupdate', function(e) {
            let time = this.currentTime;
            let past = lyrics.filter(function(item) {
                return item.time < time;
            });

            if (past.length) {
                let lastLine = past[past.length - 1].line;
                if (lastLine !== currentLine) {
                    currentLine = lastLine;
                    $('.lyrics div').removeClass('highlighted');
                    $('.lyrics div span em').removeClass('fade');
                    // $('.lyrics div span').removeClass('fade');
                    $(`.lyrics div:nth-child(${currentLine + 1})`).addClass('highlighted');
                    page.commands.textAnimation($(`.highlighted span:nth-child(1)`), 50);
                    // $(`.highlighted span:nth-child(1)`).addClass('fade');
                    spanNumber = 1;
                    page.commands.align();
                } else {
                    let nextTime = $(`.highlighted span:nth-child(${spanNumber + 1})`).data('id');
                    if (time >= nextTime) {
                        let currentSpan = $(`.highlighted span:nth-child(${++spanNumber})`);
                        page.commands.textAnimation(currentSpan, 50);
                        // currentSpan.addClass('fade');
                    }
                }
            }
        });
    });

}

$(() => {
    page.loadData.getLyrics();

    page.initializeEventControl();
})