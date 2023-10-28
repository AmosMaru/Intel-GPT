import { useState, useContext } from "react";
import { baseURL } from "./data.json";
import { Context } from "./ContextProvider";

export default function Login() {
  let { User } = useContext(Context);
  let [user, setUser] = User;
  let [signup, setSignup] = useState(false);
  let [username, setUsername] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState(1);
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");

  let login = (e) => {
    e.preventDefault();

    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log("login");
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.response.username,
              role: data.response.role,
              email: data.response.email,
            })
          );
          setUser({
            username: data.response.username,
            role: data.response.role,
            email: data.response.email,
          });
        } else if (data.status === "error") {
          alert(data.response);
        }
      })
      .catch((err) => alert("server error"));
  };
  let signUp = (e) => {
    e.preventDefault();
    console.log("signup");
    fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        email: email,
        role: role,
        phone: phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") setSignup(false);
        if (data.status === "failed") alert(data.message);
      })
      .catch((err) => alert("server error"));
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-800 text-gray-100">
      <div className="flex items-center justify-center">
        <img
          className="mx-auto h-24 w-auto"
          src="/logo.svg"
          alt="Your Company"
        />
        <span className="text-blue-500 font-bold text-4xl inline-block align-bottom ml-4">
          IntelGPT
        </span>
      </div>

      <div className="mt-10 sm:mx-auto w-full max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-geen-600 sm:text-sm sm:leading-6 text-black"
              />
            </div>
          </div>

          {signup && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="jane doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="mail"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    placeholder="0712345678"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="key"
                  className="block text-sm font-medium leading-6"
                >
                  Role
                </label>
                <select
                  className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-0 sm:text-sm sm:leading-6"
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <option value={1}>Sales executive</option>
                  <option value={3}>Clerk</option>
                  <option value={2}>Accountant</option>
                  <option value={4}>Supervisor</option>
                  <option value={5}>Manager</option>
                  <option value={6}>Admin</option>
                </select>
              </div>
            </>
          )}

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                {!signup && (
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-600"
                  >
                    Forgot password?{" "}
                  </a>
                )}
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={true ? "password" : "text"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-2 text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={(e) => (signup ? signUp(e) : login(e))}
              className="flex w-full justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {signup ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {signup ? "Already have an account?" : "Don't have an account?"}
          <a
            onClick={(e) => setSignup(!signup)}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            {signup ? " Sign in" : " Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
}
