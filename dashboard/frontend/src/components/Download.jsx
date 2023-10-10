import Table from "./display/Table"
import Filter from "./Filter"
import {baseURL} from "../data.json"

export default function Download(){
    let download = (e)=>{
        e.preventDefault();
        fetch(`${baseURL}/download/dailyreport`)
            .then(response => response.blob())
            .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'daily-report.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    }
    return(
        <div class="p-4 rounded-lg border-gray-700 pt-20 text-gray-300 overflow-y-hidden lg:max-h-screen">
            <div class="grid lg:grid-rows-3 lg:grid-flow-col gap-4 lg:grid-cols-3 grid-cols-1">
                <div class="row-span-3 lg:col-span-2 overflow-x-scroll overflow-y-scroll order-last md:order-first max-h-screen">
                    <Table/>
                </div>
                <button onClick={e=>download(e)} className="font-semibold text-xl bg-gray-800 hover:bg-gray-900 hover:scale-y-105 px-4 py-2 float-right rounded-2xl w-96 mx-auto h-80">
                    <img className="inline w-16 my-8" src="/download.svg" alt="" />
                    <div className="mb-4 text-2xl">Download report</div>
                </button>
                <Filter/>
            </div>
        </div>
    )
}