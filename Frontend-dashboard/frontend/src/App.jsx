import { useContext,useEffect,useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { Context } from "./ContextProvider"
import {baseURL} from "./data.json"

export default function App() {
  let { User } = useContext(Context);
  let [user, setUser] = User;
  let [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    localStorage.setItem('user',"{}")
    fetch(`${baseURL}/session`).then(res => res.json()).then(data => {
      if(data.status === 'success'){
        if(localStorage.getItem('user')=="{}"){
          localStorage.setItem('user',JSON.stringify({username:data.response.username,role:data.response.role,email:data.response.email}))
        }
        setUser({username:data.response.username,role:data.response.role,email:data.response.email})
      }else if(data.status === 'error'){
        setUser(null)
        if(JSON.parse(localStorage.getItem('user')).username) {
          alert(data.response);
          localStorage.removeItem('user')
        }
        setAuthorized(false);
      }
    }).catch(err => {alert('Server error, can\'t get session info')})
    if(user){
      setAuthorized(true)
    }
  }, [])
  useEffect(() => {
    setAuthorized(user ? true : false)
  }, [user])

  return (
    <>
      {
        authorized ? <Dashboard /> : <Login />
      }
    </>
  )
}