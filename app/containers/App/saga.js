/**
 * Gets the repositories of the user from Github
 */
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { mergeAQIData } from './actions';

function createChannel() {
  return eventChannel(emitter => {
    const client = new W3CWebSocket('wss://city-ws.herokuapp.com');
    client.onmessage = message => {
      const data = JSON.parse(message.data);
      emitter(data);
    };
    return () => client.close();
  });
}

export default function* listenToDataSource() {
  const channel = createChannel();
  while (true) {
    try {
      const response = yield take(channel);
      yield put(mergeAQIData(response));
    } catch (error) {
      console.log('err', error);
    }
  }
}
