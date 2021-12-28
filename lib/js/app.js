// Editor Settings (Provided by C9)
const codeEditor = document.getElementById('editor');
const checkbox = document.getElementById('input-checkbox');
const inHeading = document.querySelector('.input-heading');
const tc = document.getElementById('tc-editor');
const opHeading = document.querySelector('.output-heading');
const op = document.getElementById('op-editor');

var beautify = ace.require("ace/ext/beautify");
var editor = ace.edit("editor");
var tcEditor = ace.edit("tc-editor");
var opEditor = ace.edit("op-editor");


var path = 'lib/lang_default/';
var themeName = "dracula";

tcEditor.setTheme("ace/theme/".concat(themeName));
tcEditor.setShowPrintMargin(false);
tcEditor.clearSelection();
tcEditor.setFontSize(12);
tcEditor.session.setTabSize(4); 


opEditor.setTheme("ace/theme/".concat(themeName));
opEditor.setAutoScrollEditorIntoView(true);
opEditor.setShowPrintMargin(false);
opEditor.clearSelection();
opEditor.setFontSize(12);
opEditor.setReadOnly(true);
opEditor.setValue("Output : ",1);


editor.setAutoScrollEditorIntoView(true);
editor.setTheme("ace/theme/".concat(themeName));
editor.setShowPrintMargin(false);
editor.session.setMode("ace/mode/c_cpp");
editor.clearSelection();
editor.setFontSize(16);
editor.session.setTabSize(4); 
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    useSoftTabs: true
});
function changeDefaultText(file)
{
    if(fileExists(file))
    {
        fetch(file).then(x =>x.text()).then(data => {editor.setValue(data,1);});
        beautify.beautify(editor.session);
        editor.clearSelection();
    }
    else
    {
        console.log("File Not exits");
    }
}

changeDefaultText(path.concat("cpp.cpp"))

function changeLang() {
   	var x = document.getElementById("lang");
    var lang = x.options[x.selectedIndex].value;
    var langPath = path.concat(lang).concat('.').concat(lang);
    changeDefaultText(langPath);
    var mode;
    if(lang =="c" || lang == "cpp") mode = "c_cpp";
    else if(lang=="cs") mode = "csharp";
    else if(lang=="java") mode = "java";
    else if(lang=="py") mode = "python";
    else if(lang=="kt") mode = "kotlin";
    else if(lang=="rb") mode = "ruby";
    else if(lang=="swift") mode = "swift";
    editor.session.setMode("ace/mode/".concat(mode));
}

document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    // $('.selectpicker').selectpicker();
    // $('[data-toggle="tooltip"]').tooltip(); 
});



function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}
function changeFontSize()
{
    var size = parseInt(document.getElementById('fontSize').value);
    if (size >= 10 && size<=30)
        editor.setFontSize(size);
}
function changeTheme()
{
    themeName = document.getElementById('theme').value;
    editor.setTheme("ace/theme/".concat(themeName));
    tcEditor.setTheme("ace/theme/".concat(themeName));
}
function changeTabSize()
{
    var tabsize = parseInt(document.getElementById('tab-size').value);
    editor.session.setTabSize(tabsize); 
}
function toggleSettingMenu()
{
    document.querySelector('.setting-menu').classList.toggle("menu-active");
}
function runCode()
{
    console.log("run my code");
}
function submitCode()
{
    console.log("Need to submit");
}

function toggleInput()
{

    if(checkbox.checked)
    {
        tc.style.display = "block";
        inHeading.style.display = "block";
        op.style.display = "none";
        opHeading.style.display = "none";
    }
    else
    {
        op.style.display = "block";
        opHeading.style.display = "block";
        tc.style.display = "none";
        inHeading.style.display = "none";
    }
}
function runCode()
{
    var textCode = editor.getValue();
    var inp = tcEditor.getValue();
    console.log("Run my code!!");
    
}
