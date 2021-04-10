const express = require("express");
const app = express();
const cors = require("cors");
const mq = require("./utils/rabbitmq_api");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/send_msg", mq.send_message);
app.get("/get_msg", mq.recv_message);

app.listen(8081);
