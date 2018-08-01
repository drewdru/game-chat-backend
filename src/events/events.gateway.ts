import { SubscribeMessage, WebSocketGateway, WebSocketServer,
        WsResponse } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { WsAdapter } from '@nestjs/websockets/adapters';
import { Server } from 'http';

@WebSocketGateway(8000)
export class EventsGateway extends WsAdapter {
  @WebSocketServer() server;
  players = {};

  afterInit() {
    setInterval(() => {
      if (this.server === undefined) return;
      if (typeof this.server.clients === undefined) return;
      this.server.clients.forEach((client) => {
        // filter disconnected clients
        if (client.readyState !== client.OPEN) return;
        // filter out current player by client.udid
        var otherPlayers = Object.keys(this.players).filter(
            udid => udid !== client.udid)
        // create array from the rest
        var otherPlayersPositions = otherPlayers.map(
            udid => this.players[udid])
        // send it
        client.send(JSON.stringify({players: otherPlayersPositions}))
      })
    }, 100);
  }

  async handleConnection(client) {
    client.on('message', (data) => {
      // get data from string
      var [udid, x, y, z] = data.toString().split('\t')
      // store data to players object
      this.players[udid] = {
        position: {
          x: parseFloat(x),
          y: parseFloat(y) + 1,
          z: parseFloat(z)
        },
        timestamp: Date.now()
      }
      // save player udid to the client
      client.udid = udid
    });
    client.on('error', () => console.log('errored'));

  }
  async handleDisconnect(client) {
    console.log('disconect user: ', client.udid);
    delete this.players[client.udid];
  }
}
