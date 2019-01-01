$("#box").append("Welcome to DPSChat!<br>");
var socket = new WebSocket('ws://localhost:8080');
socket.onopen = function (event) {
    $("#box").append("Connection Succeed!<br>");
};
socket.onmessage = function (event) {
    console.log(event.data);
    $("#box").append(event.data + "<br>");
};
function submit() {
    var Value = $("#type").val();
    $("#type").val("");
    socket.send(Value);
}
$("#type").onkeyup(function (key) {
    if (key.keyCode === 13) submit();
});
