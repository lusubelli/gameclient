

const HTTP_SERVER_URL = 'http://192.168.1.26:8080/games';
const WS_SERVER_URL = 'ws://192.168.1.26:8080/games';

export default class Network {

    websocket;

    createGame(type: string, playerCount: number) {
        let options = {method: 'post'}
        return fetch(HTTP_SERVER_URL + "?type=" + type + "&players=" + playerCount, options)
            .then((response) => response.json());
    }

    listGames() {
        return fetch(HTTP_SERVER_URL)
            .then((response) => response.json());
    }

    joinGame(gameId: string) {
        this.websocket = new WebSocket(WS_SERVER_URL + "/" + gameId);
        this.websocket.onopen = () => {
            // connection opened

        };
    }

    onmessage(method) {
        this.websocket.onmessage = (e) => {
            method(JSON.parse(e.data))
        };
        this.websocket.onerror = (e) => {
            // an error occurred
            console.error(e.message, e);
        };
        this.websocket.onclose = (e) => {
            // connection closed
            console.log(e);
        };
    }
}