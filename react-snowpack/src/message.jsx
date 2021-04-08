import React, { useEffect, useState } from "react";
import axios from "axios";

export const Pub = () => {
  const [message, setMessage] = useState("");

  const sending = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/send_msg", {
        msg: message,
      })
      .then((res) => {
        if (res.data.result) {
          alert("success");
        }
        setMessage("");
      });
  };

  return (
    <div className="container">
      <h1>Sending message</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sending}>send</button>
    </div>
  );
};

export const Sub = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/get_msg").then((res) => {
      if (res.data.result) {
        setMessage(res.data.result);
      }
    });
  }, []);
  return (
    <div>
      <h1>receive message</h1>
      <p>{message}</p>
    </div>
  );
};
