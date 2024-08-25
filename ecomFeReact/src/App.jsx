import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");

  const [myCommands, setMyCommands] = useState([]);

  const getCommands = () => {
    fetch("http://localhost:1337/product", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((responseData) => setMyCommands(responseData.data))
    );
  };

  const submitData = () => {
    const data = { name: name, phone, wilaya };
    fetch("http://localhost:1337/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json().then((data) => console.log(data)));
  };

  return (
    <>
      <div>
        <div className="md:flex justify-between">
          <div>
            <img
              className="w-full h-full"
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="text-left p-4">
            <h3 className="text-xl font-bold my-4">Smart watch</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              molestiae rem rerum corrupti id! Neque doloremque eius unde totam
              placeat?
            </p>
          </div>
        </div>
        <div className="my-12 pb-4 border-2 border-gray-400 md:w-3/5 mx-auto">
          <div className="flex flex-col justify-center items-center pt-8 ">
            <p>fill ur info</p>
            <input
              className="border-2 w-3/5 my-2 p-2 border-blue-500"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border-2 w-3/5 my-2 p-2 border-blue-500"
              type="number"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="border-2 w-3/5 my-2 p-2 border-blue-500"
              type="text"
              placeholder="wilaya"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
            />
            <button
              onClick={submitData}
              className="bg-blue-500 text-white font-semibold pb-4"
            >
              Commander
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold">My commands</h2>
        <button
          onClick={getCommands}
          className="bg-green-400 text-white text-xl"
        >
          fetch data
        </button>
        {myCommands.map((command, index) => {
          return (
            <div
              key={index}
              className="my-4 py-4 border-2 border-blue-500 w-3/5 mx-auto rounded-xl"
            >
              <p>name : {command.name} </p>
              <p>phone : {command.phone} </p>
              <p>wilaya : {command.wilaya} </p>
              <p>time : {command.orderTime} </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
