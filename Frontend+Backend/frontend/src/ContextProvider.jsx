import { createContext, useState } from "react";
import { getWeeksOfMonth } from "./components/Calender";

export const Context = createContext();

export function ContextProvider({ children }) {
    //epoch is the date of the first sunday of the first week of current month
    let User = useState({
        username:"sam",
        email:"sam@me.com"
    })
    let Filters = useState({start:0,end:0,depth:[],epoch:(getWeeksOfMonth(new Date().getFullYear(),new Date().getMonth())[0].epoch),descending:true,sort:0,inventory:false})
    let HotelData = useState([])
    let Data = useState({columns:[],values:[]})
    let Chats = useState([
        {
            "query":"question",
            "response":"answer"
        }
    ])

    return (
        <Context.Provider value={{ User, Filters, HotelData, Data, Chats }}>
            {children}
        </Context.Provider>
    )
}