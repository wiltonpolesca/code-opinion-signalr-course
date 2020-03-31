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

connection.on("UserConnected", function (connectionId) {
    const groupElement = document.getElementById("group");
    const option = document.createElement("option");
    option.text = connectionId;
    option.value = connectionId;
    groupElement.add(option);
});

connection.on("UserDisconnected", function (connectionId) {
    const groupElement = document.getElementById("group");
    for (var i = 0; i < groupElement.length; i++) {
        if (groupElement.options[i].value === connectionId) {
            groupElement.remove(i);
        }
    }
    const option = doicument.createElement("option");
    option.text = connectionId;
    option.value = connectionId;
    groupElement.add(option);
});

connection.start()
    .catch(function (err) {
        return console.log(err);
    });

document.getElementById("sendButton").addEventListener("click", function (e) {
    const msg = document.getElementById("message").value;

    const groupElement = document.getElementById("group");
    const groupValue = groupElement.options[groupElement.selectedIndex].value;

    if (groupValue === "All" || groupValue === "Myself") {

        // SendMesageToAll and SendMesageToCaller = Names of the methods
        let method = groupValue === "All" ? "SendMesageToAll" : "SendMesageToCaller";
        connection.invoke(method, msg).catch(function (err) {
            console.error(err)
        });
    } else if (groupValue === "PrivateGroup") {
        connection.invoke("SendMessageToGroup", "PrivateGroup", msg).catch(function (err) {
            console.error(err)
        });
    } else {
        connection.invoke("SendMessageToÙser", groupValue, msg).catch(function (err) {
            console.error(err)
        });
    }

    e.preventDefault();
});

document.getElementById("joinToGroup").addEventListener("click", function (e) {
    connection.invoke("JoinGroup", "PrivateGroup").catch(function (err) {
        console.error(err)
    });
    e.preventDefault();
});
