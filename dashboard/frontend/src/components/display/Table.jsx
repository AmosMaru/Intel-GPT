import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function Table(){
    let { HotelData, Filters } = useContext(Context);
    let [hotelData, setHotelData] = HotelData;
    let [filter, setFilter] = Filters;

    console.log(hotelData.length)

    let compute = ()=>{//creates new 2d array with the required data
        let sum = (selection,date)=>{
            let targets = 0
            let actuals = 0
            hotelData.forEach(row => {
                if(row[filter.depth[0]]==selection && row[row.length-1]==date){
                    targets+=row[4]
                    actuals+=row[5]
                }
            });
            let variance = actuals-targets
            let performance = (actuals/(targets==0?1:targets) * 100).toFixed(2)+'%'
            return [targets,actuals,variance,performance]
        }
        let dates = [...new Set(hotelData.map(item=>item[item.length-1]))];
        let items = filter.depth.length==1?[...new Set(hotelData.map(item=>item[filter.depth[0]]))]:[filter.depth[1]];
        let data = [];
        for(let i=0;i<items.length;i++){
            for(let j=0;j<dates.length;j++){
                data.push([items[i],...sum(items[i],dates[j]),dates[j]]);
            }
        }
        return data
    }

    return(
        <table className="w-full text-sm text-left text-gray-400 table-auto">
            <thead className="text-xs text-gray-100 uppercase bg-blue-900 sticky top-0">
                {
                    !filter.inventory?
                    <tr>
                        {
                            filter.depth.length==0?
                            ["Hotel","Section","Supervisor","waitstuff"].map((col)=>{return(
                                <th scope="col" className="px-6 py-3">
                                    {col}
                                </th>
                            )}):
                            <th scope="col" className="px-6 py-3">
                                {["Hotel","Section","Supervisor","waitstuff"][filter.depth[0]]}
                            </th>

                        }
                        {
                            ["Target","Actual","Variance","% Performance","Date"].map((col)=>{return(
                                <th scope="col" className="px-6 py-3">
                                    {col}
                                </th>
                            )})
                        }
                    </tr>
                    :
                    <tr>
                        {
                            ["Hotel","Purchases","Gross sales","Net sales","Opening Stock","Closing Stock","Date"].map((col)=>{return(
                                <th scope="col" className="px-6 py-3">
                                    {col}
                                </th>
                            )})
                        }
                    </tr>
                }
            </thead>
            <tbody>
                {
                    !filter.inventory
                    ?//sales
                    filter.depth.length==0?
                    [...hotelData].sort((a,b)=>
                        typeof(a[filter.sort])=='string'?
                        filter.descending?a[filter.sort].localeCompare(b[filter.sort]):b[filter.sort].localeCompare(a[filter.sort])
                        :
                        filter.descending?a[filter.sort]-b[filter.sort]:b[filter.sort]-a[filter.sort]
                    ).map(row=>{
                        row.length<9?row.splice(6,0,...[(row[5]-row[4]),(row[5]/row[4]*100).toFixed(2)+'%']):row
                        return(
                         <tr className="bg-gray-800 border-b border-gray-700">
                             {row.map(col=>{
                                    return(
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {col}
                                        </td>
                                    )
                             })}
                         </tr>
                        )
                    })
                    :
                    compute().map(row=>{
                        return(
                         <tr className="bg-gray-800 border-b border-gray-700">
                             {row.map(col=>{
                                    return(
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {col}
                                        </td>
                                    )
                             })}
                         </tr>
                        )
                    })
                    ://inventory
                    [...hotelData].sort((a,b)=>
                        typeof(a[filter.sort])=='string'?
                        filter.descending?a[filter.sort].localeCompare(b[filter.sort]):b[filter.sort].localeCompare(a[filter.sort])
                        :
                        filter.descending?a[filter.sort]-b[filter.sort]:b[filter.sort]-a[filter.sort]
                    ).map(row=>{
                        return(
                         <tr className="bg-gray-800 border-b border-gray-700">
                             {row.map(col=>{
                                    return(
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {col}
                                        </td>
                                    )
                             })}
                         </tr>
                        )
                    })
                }
                {
                    10-hotelData.length>0?
                    [...Array((20-hotelData.length))].map((item,index)=>{
                        console.log(index)
                        return(
                            <tr className="bg-gray-800 border-b border-gray-700">
                                {[...Array((filter.depth.length==0?9:6))].map((item,index)=>{
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