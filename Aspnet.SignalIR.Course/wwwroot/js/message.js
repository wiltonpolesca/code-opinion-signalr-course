'use strinct'


let connection = new signalR.HubConnectionBuilder()
    .withUrl("/messages")
    .build();

connection.on("SendMessage", function (message) {

    const msg = message.replace(/&/g, "&amp")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const div = document.createElement("div");
    div.innerHTML = msg + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.start()
    .catch(function (err) {
        return console.log(err);
    });

document.getElementById("sendButton").addEventListener("click", function (e) {
    const msg = document.getElementById("message").value;

    // SendMesageToAll = Name of the method
    connection.invoke("SendMesageToAll", msg).catch(function (err) {
        console.error(err)
    });
});