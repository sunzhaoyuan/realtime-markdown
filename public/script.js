window.onload = function () {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function () {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
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