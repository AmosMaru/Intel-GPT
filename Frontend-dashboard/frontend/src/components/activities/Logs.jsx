import { useEffect, useState } from 'react'
import {baseURL} from '../../data.json'

export default function Logs(){
    let [logs,setLogs] = useState([]);
    useEffect(()=>{
        fetch(`${baseURL}/logs`).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                console.log(data.response)
                setLogs(data.response)
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])
    return(
        <div className="flex justify-center rounded overflow-x-scroll overflow-y-scroll">
            <table className="lg:w-1/2 bg-gray-800 mx-auto text-sm text-left text-gray-400 table-auto">
                <thead className="text-xs border-b border-gray-700 text-gray-100 uppercase py-4 sticky top-0 bg-blue-900">
                    <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Data Modified</th>
                        <th>Timestamp</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                {
                    10-logs.length>0?
                    [...Array(10-logs.length)].map((item,index)=>{
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                            </tr>
                        )})
                    :null
                }
                </tbody>
            </table>
        </div>
    )
}