import { useState, useContext, useEffect } from "react"
import { Context } from "../ContextProvider"
import {baseURL} from "../data.json"

function Response({text}){
    return(
        <div className="my-2">{text}</div>
    )
}
function Query({text}){
    return(
        <div className="float-right">{text}</div>
    )
}

export default function Prompt(){
    let { Chats } = useContext(Context);
    let [chats, setChats] = Chats;
    let [query, setQuery] = useState("")

    useEffect(()=>{
        fetch(`${baseURL}/getChats?id=12345`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setChats(data.response)
        })
        .catch((err) => console.log("server error"));
    },[])

    let submit=(e)=>{
        e.preventDefault()
        console.log(query)
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
          setChats([...chats,{query:query,response:data.response}])
        })
        .catch((err) => {
            console.log("server error");
            setChats([...chats,{query:query,response:"Sorry, Server error"}])
        });
    }
    return(
    <div className="text-white">
        <div className="min-h-[90%]">
            {
                chats.map((chat)=>{
                    return(
                        <>
                        <Query text={chat.query}/>
                        <Response text={chat.response}/>
                        </>
                    )
                })
            }
        </div>
        <div className="">
            <input className="text-black" type="text" placeholder="Enter query" value={query} onChange={e=>setQuery(e.target.value)} onKeyUp={e=>{if(e.key === "Enter")submit(e)}} />
            <button className="w-6" onClick={e=>submit(e)}><img className="block w-full" src="/send.svg" alt="" /></button>
        </div>
    </div>
    )
}