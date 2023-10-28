import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { Data } = useContext(Context);
    let [data, setData] = Data;

    return(
        <table className="w-full text-sm text-left text-gray-400 table-auto">
            <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                <tr>
                    {
                        data.columns.length==0?
                        [...Array(7)].map(i=>{
                            return(
                                <th scope="col" className="px-6 py-3">.</th>
                            )
                        })
                        :
                        data.columns.map((item,index)=>{
                            return(
                                <th scope="col" className="px-6 py-3">{item}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.values.map((item,index)=>{
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                {
                                    item.map((item,index)=>{
                                        return(
                                            <td className="px-6 py-4 whitespace-nowrap">{item}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                {
                    10-data.values.length>0?
                    [...Array((20-data.values.length))].map((item,index)=>{
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                {[...Array(data.columns)].map((item,index)=>{
                                    return(<td className="px-6 py-4 whitespace-nowrap"></td>)
                                })}
                            </tr>
                        )
                    }):
                    null
                }
            </tbody>
        </table>
    );
}