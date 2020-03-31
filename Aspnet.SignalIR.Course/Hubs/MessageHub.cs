using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aspnet.SignalIR.Course.Hubs
{
    public class MessageHub : Hub
    {
        public Task SendMesageToAll(string message)
        {
            return Clients.All.SendAsync("SendMessage", message);
        }
        public Task SendMesageToCaller(string message)
        {
            return Clients.Caller.SendAsync("SendMessage", message);
        }

        public Task SendMessageToÙser(string connectionId, string message)
        {
            return Clients.Client(connectionId).SendAsync("SendMessage", message);
        }

        public Task JoinGroup (string groupName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public Task SendMessageToGroup(string groupName, string message)
        {
            return Clients.Group(groupName).SendAsync("SendMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
