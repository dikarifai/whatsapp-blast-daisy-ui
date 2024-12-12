"use client";

import useLogin from "./useLogin";

const Login = () => {
  const { username, password, handleLogin, setPasword, setUsername } =
    useLogin();

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-slate-300 h-96 w-96 pt-20 gap-10 rounded-2xl">
        <h2 className="text-3xl text-green-600">Whatsapp Blast</h2>
        <div className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="btn btn-success text-white w-full"
            >
              Success
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
