import { useState,useEffect } from 'react'
import {baseURL} from '../../data.json'

export default function Lobby(){
    let [users,setUsers] = useState([]);

    let roles = ['','Sales executive','accountant','clerk','supervisor','manager','Admin'];

    useEffect(()=>{
        fetch(`${baseURL}/lobby`).then(res=>res.json()).then(data=>{
            if(data.status === 'success'){
                setUsers(data.response)
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    },[])
    
    let submit = (e,id,choice)=>{
        e.preventDefault();
        fetch(`${baseURL}/admit?id=${id}&choice=${choice}`).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.status === 'success'){
                alert(`User ${data.response.user} ${choice=='yes'?"admitted":"denied"} for ${roles[data.response.role]} role`)
                //remove user from users
                let newUsers = users.filter(user=>user[0]!=id)
                setUsers(newUsers)
            }else if(data.status === 'error'){
                alert(data.response)
            }
        }).catch(err=>alert("server error"))
    }

    return(
        <div className="flex justify-center rounded overflow-x-scroll overflow-y-scroll">
            {
                users.length>0?
                <table className="lg:w-1/2 bg-gray-800 mx-auto text-sm text-left text-gray-400 table-auto">
                <thead className="text-xs border-b border-gray-700 text-gray-100 uppercase py-4 sticky top-0 bg-blue-900">
                    <tr>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='py-8'>
                    {
                        users.map((user,index)=>{
                            return(
                                <tr className="bg-gray-800 border-b border-gray-700 py-40">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {roles[user[1]]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user[2]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><button onClick={e=>submit(e,user[0],'yes')} className="w-full h-full hover:uppercase hover:text-green-600"> <img className="inline mx-2 w-4" src="/tick.svg" alt="" />Admit</button></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><button onClick={e=>submit(e,user[0],'no')} className="w-full h-full hover:uppercase hover:text-red-600"> <img className="inline mx-2 w-4" src="/x.svg" alt="" />Reject</button></td>
                                </tr>
                            )
                        })
                    }
                    {
                            10-users.length>0?
                            [...Array(10-users.length)].map((item,index)=>{
                                return(
                                    <tr className="bg-gray-800 border-b border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                    </tr>
                                )})
                            :null
                    }
                </tbody>
            </table>:
            <>
            <div className='flex flex-col'>
                <img className="w-96 mx-auto" src="/robot-happy.svg" alt="" />
                <p className="text-2xl mt-16 text-center font-semibold">No users in lobby</p>
            </div>
            </>
            }
        </div>
    )
}