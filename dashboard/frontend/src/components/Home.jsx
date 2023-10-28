import { useState, useEffect } from "react"
import {baseURL} from "../data.json"

import Bur from "./display/Bar"
import Lyn from "./display/Line"
import Pie from "./display/Pie"
import Donut from "./display/Donut"
import Table from "./display/Table"
import Stats from "./display/Stats"
import Upload from "./Upload"

export default function Home(){
    let [choice, setChoice] = useState("line");

    useEffect(() => {
    }, []);

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 lg:mt-16 lg:overflow-y-none">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className="flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                <Lyn />
                </div>
                <div className="flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                <Bur />
                </div>
                <div className="flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                <Lyn />
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-6">
                <div className="lg:col-span-2 flex rounded bg-gray-800 overflow-x-scroll overflow-y-scroll max-h-96">
                    <Table/>
                </div>
                <div className="flex items-center justify-center mb-4 rounded bg-gray-800 h-96">
                <Donut />
                </div>
            </div>
        </div>
    )
}