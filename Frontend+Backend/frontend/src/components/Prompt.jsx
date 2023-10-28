import { useState, useContext, useEffect } from "react";
import { Context } from "../ContextProvider";
import { baseURL } from "../data.json";
import Upload from "./Upload";

function Response({ text }) {
  return (
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p class="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}
function Query({ text }) {
  return (
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p class="text-sm">{text}</p>
        </div>
      </div>

      <img src="/logo.svg" alt="" class="w-12 h-12 rounded-full" />
    </div>
  );
}

export default function Prompt() {
  let { Chats } = useContext(Context);
  let [chats, setChats] = Chats;
  let [query, setQuery] = useState("");
  let [upload, setUpload] = useState(false);
  let [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/getChats?id=12345`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChats(data.response);
      })
      .catch((err) => console.log("server error"));
  }, []);
  useEffect(() => {
    console.log("Clicked");
    if (upload) {
      document.getElementById("forms").style.visibility = "visible";
    } else {
      document.getElementById("forms").style.visibility = "hidden";
    }
  }, [upload]);

  let submit = (e) => {
    e.preventDefault();
    console.log(query);
    fetch(`${baseURL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChats([...chats, { query: query, response: data.response }]);
        if (data.image) {
          setImage(
            <img
              className="w-10 h-10"
              src={"data:image/png;base64," + data.image}
              alt=""
            />
          );
        } else {
          setImage(null);
        }
      })
      .catch((err) => {
        console.log("server error");
        setChats([...chats, { query: query, response: "Sorry, Server error" }]);
      });
  };
  return (
    <>
      <div class="flex flex-col items-center justify-center  min-h-screen bg-gray-100 text-gray-800 p-10">
        <div class="flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chats.map((chat) => {
              return (
                <>
                  <Query text={chat.query} />
                  {image}
                  <Response text={chat.response} />
                </>
              );
            })}
          </div>
          <div>
            <p className="text-center quicksand">
              For graph start with 1{" "}
              <span className="italic">
                e.g 1. Plot a graph of the happiest countries
              </span>
            </p>
            <p className="text-center quicksand">
              For chatting with data start with 2{" "}
              <spa className="italic">
                e.g. 2. Which is the happiest country?
              </spa>
            </p>
            <div class="bg-gray-300 p-4 flex">
              <button
                className="block w-10 animate-bounce"
                onClick={(e) => {
                  setUpload(true);
                }}
              >
                <img className="w-full" src="/upload.svg" alt="" />
              </button>
              <input
                class="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Enter query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") submit(e);
                }}
              />
              <button className="block w-10" onClick={(e) => submit(e)}>
                <img className="block w-full" src="/send.svg" alt="" />
              </button>
            </div>
          </div>

          <div
            id="forms"
            className="bg-black bg-opacity-40 h-screen w-screen absolute top-0 left-0 flex justify-center items-center"
          >
            <Upload control={setUpload} />
          </div>
        </div>
      </div>
    </>
  );
}
