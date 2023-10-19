import { useState, useEffect } from "react"
import {baseURL} from "../data.json"

import Bur from "./display/Bar"
import Lyn from "./display/Line"
import Pie from "./display/Pie"
import Donut from "./display/Donut"
import Table from "./display/Table"
import Stats from "./display/Stats"
import Filter from "./Filter"

export default function Home(){
    let [choice, setChoice] = useState("line");

    useEffect(() => {
    }, []);

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 lg:mt-16 lg:overflow-y-none">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className="lg:col-span-2 flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                    {choice === "bar" ? <Bur /> : null}
                    {choice === "line" ? <Lyn /> : null}
                    {choice === "pie" ? <Pie /> : null}
                    {choice === "donut" ? <Donut /> : null}
                    {choice === "stats" ? <Stats /> : null}
                </div>
                <div className="grid grid-cols-2 lg:order-first gap-4 mb-4">
                {
                    [
                        <button onClick={e=>setChoice('line')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Total sales</p>
                            <img className="block w-7 md:w-8 lg:w-10 mx-auto pb-4 lg:pb-0" src="/linechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('stats')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Stats</p>
                            <p className="text-2xl block w-7 md:w-8 lg:w-10 mx-auto pb-4 lg:pb-0">O</p>
                        </button>,
                        <button onClick={e=>setChoice('bar')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Variance</p>
                            <img className="block w-7 md:w-8 lg:w-10 mx-auto pb-4 lg:pb-0" src={`/barchart.svg`} alt="" />
                        </button>,
                        <button onClick={e=>setChoice('pie')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">% Performance</p>
                            <img className="block w-7 md:w-8 lg:w-10 mx-auto pb-4 lg:pb-0" src="/piechart.svg" alt="" />
                        </button>,
                        <button onClick={e=>setChoice('donut')} className="flex flex-col rounded bg-gray-800 hover:scale-105 hover:bg-gray-900">
                            <p className="text-gray-100 text-left font-semibold py-4 lg:py-8 lg:text-xl text-sm pl-4">Avg. Sales</p>
                            <img className="block w-7 md:w-8 lg:w-10 mx-auto pb-4 lg:pb-0" src="/donutchart.svg" alt="" />
                        </button>
                    ].map((item, index) => {
                        if(index!=['line','stats','bar','pie','donut'].indexOf(choice))  return item
                    })
                }
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-6">
                <div className="lg:col-span-2 flex rounded bg-gray-800 overflow-x-scroll overflow-y-scroll max-h-96">
                    <Table/>
                </div>
                <Filter/>
            </div>
        </div>
    )
}