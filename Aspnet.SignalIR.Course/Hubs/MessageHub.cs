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
    }
}
