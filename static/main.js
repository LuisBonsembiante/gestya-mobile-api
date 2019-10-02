const app = new Vue({
    el: "#app",
    data: {
        title: "Nestjs Websockets Chat",
        name: "",
        text: "",
        room: "",
        messages: [],
        socket: null,
    },
    methods: {
        sendMessage() {

                if (this.validateInput()) {
                    const message = {
                        name: this.name,
                        text: this.text,
                    };
                    this.socket.emit("msgToServer", message);
                    this.text = "";
                }

        },
        receivedMessage(message) {
            this.messages.push(message);
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0;
        },
    },
    created() {
        this.socket = io("http://localhost:5001/group", { query: {
                token: "luis",
            } });
        this.socket.on("msgToClient", (message) => {
            this.receivedMessage(message);
        });
    },
});
