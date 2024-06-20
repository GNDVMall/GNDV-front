import { Client } from '@stomp/stompjs'
import { store } from '@/store/store';

export const stompClient = new Client({
  // brokerURL: 'ws://localhost:8080/api/v2/gndv-websocket',
  brokerURL: `ws://43.202.103.222:8080/gndv-websocket?token=${store.accessToken}`
})

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error)
}

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message'])
  console.error('Additional details: ' + frame.body)
}

export const connect = () => {
  console.log("connect")
  stompClient.activate()
}

export const disconnect = () => {
  stompClient.deactivate()
  console.log('Disconnected')
}

export default stompClient;