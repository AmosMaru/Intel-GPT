import { useState, useEffect, useContext } from "react"
import { Context } from "../../ContextProvider"
import Calender from "../Calender"
import {baseURL} from "../../data.json"

export function Input({variable, level}){
    let { HotelData } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [choice, setChoice] = variable;
    let [search,setSearch] = useState('');
    return(
        <>
        <div className="bg-gray-800 py-4 px-6 pb-8">
            <p className="text-2xl text-right font-semibold">{level}</p>
            {
                (level=="Hotel")?
                <button id="dropdownSearchButton" data-dropdown-toggle={level} data-dropdown-placement="bottom" className="my-4 text-white text-lg focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center bg-gray-800 hover:bg-gray-700 focus:ring-gray-800 w-full" type="button">
                    Select {level}
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                :
                <div className="py-4"></div>
            }

            <div id={level} className="z-10 hidden rounded-lg shadow w-60 bg-gray-900">
                <div className="p-3">
                <label for="input-group-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    </div>
                    <input type="search" id="input-group-search" className="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-gray-500 focus:border-gray-500" placeholder={`Search ${level}`} value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                </div>
                <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-200" aria-labelledby="dropdownSearchButton">
                    {
                        (level=="Hotel")?
                        [...new Set(hotelData.map(item => item[0]))].map((options, index) => {
                            if(options.toLowerCase().includes(search.toLowerCase())) return(<li>
                                <button className="w-full text-left py-2 ml-2 text-sm font-medium rounded text-gray-300 hover:bg-gray-600" value={options} onClick={e=>setChoice(e.target.value)}>{options}</button>
                            </li>)
                        })
                        :
                        null
                    }
                </ul>
            </div>
            <input className="w-full py-2 px-1 rounded-md bg-gray-300 text-black" type={level.includes('Hotel')?'text':'number'} name="" id="" placeholder={level} value={choice} onChange={e=>setChoice(e.target.value)} />
        </div>
        </>
    )
}

export default function Inventory(){// data entry component
    let Hotels = useState('')
    let Purchases = useState('')
    let Sales = useState('')
    let opening = useState('')
    let closing = useState('')
    let Datestamp = useState([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()])

    let submit = (e) => {
        e.preventDefault()
        fetch(`${baseURL}/setinventory`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                hotel:Hotels[0],
                purchases:Purchases[0],
                grossales:Sales[0],
                netsales:Sales[0]/1.18,
                opening:opening[0],
                closing:closing[0],
                datestamp:`${Datestamp[0][0]}-${(new Date(Datestamp[0][0],Datestamp[0][1],1)).toLocaleString('default', {month:'long'})}-${Datestamp[0][2]}`
            })
        }).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                alert('Inventory added successfully')
                Hotels[1]('')
                Purchases[1]('')
                Sales[1]('')
                opening[1]('')
                closing[1]('')
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }
    return(
        <div className="w-full flex flex-col lg:flex-row justify-evenly">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full lg:ml-8">
                <div className=" md:col-span-2 md:w-3/4 lg:w-1/2 md:mx-auto">
                    <Input variable={Hotels} level='Hotel'/>
                </div>
                <Input variable={Purchases} level='Purchases'/>
                <Input variable={Sales} level='Sales'/>
                <Input variable={opening} level='Opening Stock'/>
                <Input variable={closing} level='Closing Stock'/>
                <button className="md:col-span-2 flex lg:w-3/4 w-full mx-auto justify-center rounded-md bg-blue-800 px-3 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={e=>submit(e)}>Submit</button>   
            </div>
            <div className="w-full lg:mx-4">
                <Calender date={Datestamp}/>
            </div>
        </div>
    )
}