window.onload = function () {
    var converter = new showdown.Converter({'tables': true});
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    // set options for converter
    // showdown.setOption('tables', true);
    // converter.setOption('parseImgDimensions', true);
    // converter.setOption('ghCompatibleHeaderId', true);
    // showdown.setOption('tasklists', true);
    // converter.setOption('simpleLineBreaks', true);
    // converter.setOption('openLinksInNewWindow', true);
    // converter.setOption('emoji', true);

    // var text = "- [ ] task1";
    // console.log(converter.makeHtml(text));
    console.log(converter.getOptions());

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function () {
        var markdownText = pad.value;
        console.log(pad.innerHTML);
        // console.log(converter.getOptions());
        html = converter.makeHtml(markdownText);
        console.log(html);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function () {
        if (previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };

    setInterval(function () {
        if (didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    // ignore if on home page
    if (document.location.pathname.length > 1) {
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function (error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }

    convertTextAreaToMarkdown();
};