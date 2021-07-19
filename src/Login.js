import React, { useState, useEffect } from "react";
import { AjaxClient2 as AjaxClient } from "ajax-client";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

function Login() {
  const client = new AjaxClient();
  const history = useHistory();
  const [state, setState] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [name, setName] = useState("");
  const socket = socketIOClient("http://127.0.0.1:8080");

  useEffect(() => {
    socket.on("FormSubmitted", (data) => setName(data.name));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let login = await client.get({
      url: `http://localhost:8080/login?email=${encodeURIComponent(
        state.email
      )}&password=${encodeURIComponent(state.password)}`,
      contentType: "application/json",
      dataType: "json",
      timeoutMillis: 5000,
    });
    socket.emit("Submit", state);
    if (login.data) {
      setLoginSuccess(true);
      setTimeout(() => {
        history.push(`/user-home/${state.email}`);
      }, 1500);
    } else {
      setLoginSuccess(false);
      setTimeout(() => setLoginSuccess(true), 5000);
    }
  };
  return (
    <form>
      <h3>Log in</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={state.userName}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </button>
      </div>
      {loginSuccess === false && <div>Invalid Credentials!</div>}
      {loginSuccess && <div>{name}</div>}
    </form>
  );
}

export default Login;
