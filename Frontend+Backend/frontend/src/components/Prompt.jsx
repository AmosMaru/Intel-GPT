import { useState, useContext, useEffect } from "react"
import { Context } from "../ContextProvider"
import {baseURL} from "../data.json"
import Upload from "./Upload"

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
    let [upload, setUpload] = useState(false)
    let [image, setImage] = useState(null)

    useEffect(()=>{
        fetch(`${baseURL}/getChats?id=12345`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setChats(data.response)
        })
        .catch((err) => console.log("server error"));
    },[])
    useEffect(() => {
        console.log("Clicked")
        if (upload) {
          document.getElementById("forms").style.visibility = "visible";
        } else {
          document.getElementById("forms").style.visibility = "hidden";
        }
      }, [upload]);

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
          if(data.image){
              setImage(<img className="w-4 h-4" src={'data:image/png;base64,'+data.image} alt="" />)
          }else{
            setImage(null)
          }
        })
        .catch((err) => {
            console.log("server error");
            setChats([...chats,{query:query,response:"Sorry, Server error"}])
        });
    }
    return(
    <div class="p-4 rounded-lg border-gray-700 mt-14 lg:mt-16 lg:overflow-y-none text-white">
        <div className="min-h-[90%]">
            {
                chats.map((chat)=>{
                    return(
                        <>
                        <Query text={chat.query}/>
                        <Response text={chat.response}/>
                        {image}
                        </>
                    )
                })
            }
        </div>
        <div className="flex justify-center">
            <button className="block w-6" onClick={e=>{setUpload(true)}}><img className="w-full" src="/upload.svg" alt="" /></button>
            <input className="text-black" type="text" placeholder="Enter query" value={query} onChange={e=>setQuery(e.target.value)} onKeyUp={e=>{if(e.key === "Enter")submit(e)}} />
            <button className="block w-6" onClick={e=>submit(e)}><img className="block w-full" src="/send.svg" alt="" /></button>
        </div>
        <div id="forms" className="bg-black bg-opacity-40 h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
            <Upload control={setUpload} />
        </div>
    </div>
    )
}