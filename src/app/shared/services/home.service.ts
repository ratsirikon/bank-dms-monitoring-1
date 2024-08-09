import { Injectable } from '@angular/core';
import { SocketHome } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private socket: SocketHome) { }

  async emitData() {
    return await this.socket.emit('sorting')
  }


}
