const amqp = require("amqplib/callback_api");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, ch) => {
    if (err) throw err;
    let queue = "web_msg";
    ch.assertQueue(queue, {
      durable: false,
    });

    app.post("/send_msg", async (req, res) => {
      try {
        let { msg } = req.body;
        const ok = await ch.sendToQueue(queue, Buffer.from(msg));
        if (ok) return res.status(200).json({ result: true });
        await conn.close();
      } catch (error) {}
    });

    app.get("/get_msg", async (req, res) => {
      try {
        ch.consume(
          queue,
          (msg) => {
            if (msg)
              return res.status(200).json({ result: msg.content.toString() });
            else return res.status(200).json({ result: "none" });
          },
          {
            noAck: true,
          }
        );
      } catch (error) {}
    });
  });
});

app.listen(8081);
