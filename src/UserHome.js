import React, { useEffect, useState } from "react";
import { AjaxClient2 as AjaxClient } from "ajax-client";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const UserHome = () => {
  const client = new AjaxClient();
  const [state, setState] = useState({});
  const [userForms, setUserForms] = useState([]);
  const handleFormValues = (key, value) => {
    setState({ ...state, [key]: value });
  };
  const socket = socketIOClient("http://127.0.0.1:8080");
  useEffect(() => {
    socket.on("FormSubmitted", (data) => {
      setUserForms((old) => [...old, data]);
    });
    return () => socket.disconnect();
  }, []);
  const { email } = useParams();
  const admin = email == "admin@tango";

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      userName: "",
      email: "",
      mobile: "",
    });
    client.post({
      url: `http://localhost:8080/formsubmit`,
      contentType: "application/json",
      data: state,
      dataType: "json",
      timeoutMillis: 5000,
    });
  };
  return (
    <div>
      {!admin && (
        <form>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={state.userName}
              onChange={(e) => handleFormValues("userName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile"
              onChange={(e) => handleFormValues("mobile", e.target.value)}
              value={state.mobile}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => handleFormValues("email", e.target.value)}
              value={state.email}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      )}
      {admin && (
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">User name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {userForms.map((each, index) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{each.userName}</td>
                  <td>{each.mobile}</td>
                  <td>{each.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserHome;
