// Initialize CodeMirror editors
var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
    mode: "htmlmixed",
    lineNumbers: true,
    autoCloseTags: true,
    theme: "default",
    extraKeys: {"Ctrl-Space": "autocomplete"}
});

var cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
    mode: "css",
    lineNumbers: true,
    autoCloseBrackets: true,
    theme: "default",
    extraKeys: {"Ctrl-Space": "autocomplete"}
});

var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
    mode: "javascript",
    lineNumbers: true,
    autoCloseBrackets: true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
});

// Display the HTML editor by default
document.getElementById("b1").click();

// Function to update the preview
function updatePreview() {
    var htmlContent = htmlEditor.getValue();
    var cssContent = `<style>${cssEditor.getValue()}</style>`;
    var jsContent = `<script>${jsEditor.getValue()}<\/script>`;
    
    var previewFrame = document.getElementById("preview");
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    preview.open();
    preview.write(htmlContent + cssContent + jsContent);
    preview.close();
}

// Show HTML editor and hide others
document.getElementById("b1").addEventListener("click", function() {
    document.getElementById("html").classList.remove("d-none");
    document.getElementById("css").classList.add("d-none");
    document.getElementById("js").classList.add("d-none");
    htmlEditor.refresh();
});

// Show CSS editor and hide others
document.getElementById("b2").addEventListener("click", function() {
    document.getElementById("html").classList.add("d-none");
    document.getElementById("css").classList.remove("d-none");
    document.getElementById("js").classList.add("d-none");
    cssEditor.refresh();
});

// Show JS editor and hide others
document.getElementById("b3").addEventListener("click", function() {
    document.getElementById("html").classList.add("d-none");
    document.getElementById("css").classList.add("d-none");
    document.getElementById("js").classList.remove("d-none");
    jsEditor.refresh();
});

htmlEditor.on("change", updatePreview);
cssEditor.on("change", updatePreview);
jsEditor.on("change", updatePreview);

// Function to download the code as a .zip file
document.getElementById("download-btn").addEventListener("click", function() {
    var zip = new JSZip();
    zip.file("index.html", htmlEditor.getValue());
    zip.file("style.css", cssEditor.getValue());
    zip.file("script.js", jsEditor.getValue());

    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "code.zip");
    });
});
