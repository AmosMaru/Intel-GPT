import { useContext, useState, useEffect } from "react"
import { Context } from "../ContextProvider"
import { getWeeksOfMonth } from "./Calender"

let toggler = (e,id) => {
    e.preventDefault()
    document.getElementById(id).classList.toggle('hidden')
}

export function Weeks(){
    let [calender, setCalender] = useState([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()])
    let {Filters} = useContext(Context);
    let [filter, setFilter] = Filters;

    let changeMonth = (e,operand)=>{
        e.preventDefault();
        calender[1]+=operand;
        if(calender[1]==-1){
            calender[0]-=1;
            calender[1]=11;
        }
        if(calender[1]==12){
            calender[0]+=1;
            calender[1]=0;
        }
        setCalender([calender[0],calender[1],calender[2]]);
    }
    return(
        <>
        <div className="flex ml-2">
            <button onClick={e=>changeMonth(e,-1)} aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400  text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                </svg>
            </button>
            <div className="text-center w-full">
                <div><span className="text-sm">{calender[0]}</span></div>
            </div>
            <button onClick={e=>changeMonth(e,1)} aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3  text-gray-100"> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                </svg>
            </button>
            <button onClick={e=>{toggler(e,"weeks")}} className="block font-semibold w-full pr-4 text-right">X</button>
        </div>
        {
            getWeeksOfMonth(calender[0], calender[1]).map((week,index)=>{
                return(
                    <button value={week.epoch} onClick={e=>{toggler(e,"weeks");setFilter({...filter,epoch:e.target.value})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">{`${week.sunday} - ${week.saturday}`}</button>
                )
            })
        }
        </>
    )
}

export default function Filter(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;
    let [search,setSearch] = useState('');

    console.log('filter :: ',filter);

    return(
        <>
        <div className="flex flex-col order-first lg:order-last  rounded bg-gray-800 text-gray-50 h-96 w-full md:w-2/3 lg:w-3/4 mx-auto relative px-2 overflow-y-scroll">
            <div className="flex my-4">
                <img className="w-4 mx-2" src="/filter.svg" alt="" />
                <h3 className="text-xl font-semibold">Filter</h3>
                <button className="mx-2 absolute right-1" onClick={e=>{toggler(e,"options")}}><img className="w-8" src="/options.svg" alt="" /></button>
                    <div id="options" className="hidden font-semibold origin-top-left absolute right-4 top-6 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={e=>{toggler(e,"options")}} className="block w-full pr-4 text-right">X</button>
                            <button onClick={e=>setFilter({start:0,end:0,depth:[],epoch:'20230601',descending:true,sort:0,inventory:false})} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem"><img className="inline w-4 mr-2" src="/clear-filter.svg" alt="" />Clear filters</button>
                            <button onClick={e=>setFilter({... filter, inventory:!filter.inventory})} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem"><img className="inline w-4 mr-2" src="/inventory.svg" alt="" />{filter.inventory?"Sales":"Inventory"}</button>
                        </div>
                    </div>
            </div>
            <div className="flex justify-around">
                <button onClick={e=>{toggler(e,"sort")}} className="w-full font-semibold py-4 hover:scale-105 hover:bg-gray-800"><img className="inline w-6 mx-2" src="/sort.svg" alt="" />Sort</button>
                    <div id="sort" className="z-10 hidden origin-top-right absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                        <div className="py-1 overflow-y-scroll max-h-40" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="flex my-2">
                                <button onClick={e=>setFilter({...filter, descending:!filter.descending})} className="flex">
                                    <img className="inline w-8 ml-2" src="/sort.svg" alt="" />
                                    <div className=" text-xs">{filter.descending?"A\nZ":"Z\nA"}</div>
                                </button>
                                <button onClick={e=>{toggler(e,"sort")}} className="block w-full pr-4 text-right">X</button>
                            </div>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:0})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Hotels</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:1})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Sections</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:2})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Supervisors</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:3})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Waitstuff</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:4})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Targets</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:5})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Sales</button>
                            <button onClick={e=>{toggler(e,"sort");setFilter({...filter, sort:6})}} className="block w-full text-left px-4 py-2 text-sm text-gray-50 hover:bg-gray-800" role="menuitem">Date</button>
                        </div>
                    </div>
                <button onClick={e=>{toggler(e,"weeks")}} className="w-full py-4 hover:scale-105 hover:bg-gray-800"><img className="inline w-6 mx-2" src="/date.svg" alt="" />Date</button>
                    <div id="weeks" className="hidden origin-top-left absolute left-4 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Weeks/>
                        </div>
                    </div>
            </div>
            <input className="bg-slate-600 w-3/4 mx-auto rounded-full px-4 py-2 my-2" type="search" placeholder="search" value={search} onChange={e=>setSearch(e.target.value)}/>
            <div className="flex justify-between">
                {
                    filter.depth.length > 0 ? <button className="ml-4 w-6" onClick={e=>{setFilter({...filter,depth:filter.depth.slice(0,-1)});setSearch('')}}><img className="w-full" src="/back.svg"/></button> : null
                }
            </div>
            <div className="divide-y font-semibold px-4">
                {
                    filter.depth.length==0?
                    ['Hotel','Section','Supervisor','waitstuff'].map((item,index)=>{
                        if(item.toLowerCase().includes(search.toLowerCase()))
                        return(
                            <button className="block w-full text-left text-lg py-4 hover:bg-gray-900" value={index} onClick={e=>setFilter({...filter,depth:[...filter.depth,parseInt(e.target.value)]})}>{item} <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                        )
                    }):
                    filter.depth.length==1?
                    [...new Set(hotelData.map(item=>item[filter.depth[0]]))].map((item,index)=>{
                        if(item.toLowerCase().includes(search.toLowerCase()))
                        return(
                            <button className="block w-full text-left text-lg py-4 hover:bg-gray-900" value={item} onClick={e=>setFilter({...filter,depth:[filter.depth[0],e.target.value]})}>{item} <img className="w-6 inline float-right" src="/right.svg" alt="" /></button>
                        )
                    }):
                    <p className="block w-full text-left text-lg py-4 hover:bg-gray-900">{filter.depth[1]}</p>
                }
                <p></p>
            </div>
        </div>
        </>
    )
}