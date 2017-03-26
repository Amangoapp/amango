document.getElementById("soundcloud").onclick = function() { soundcloud() };
document.getElementById("scratch").onclick = function() { scratch() };


function soundcloud() {
    document.getElementById("output").innerHTML = "<h1>Soundcloud</h1>";
}

function scratch() {
    document.getElementById("output").innerHTML = "<h1>Scratch</h1>";
}
