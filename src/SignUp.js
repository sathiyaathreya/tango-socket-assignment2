import React, { useState } from "react";
import { AjaxClient2 as AjaxClient } from "ajax-client";
import { useHistory } from "react-router-dom";

function SignUp() {
  const client = new AjaxClient();
  const history = useHistory();
  const [form, setForm] = useState({});
  const handleFormValues = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.post({
      url: "http://localhost:8080/register",
      contentType: "application/json",
      data: { form },
      dataType: "json",
      timeoutMillis: 5000,
    });
    history.push("/sign-in");
  };
  return (
    <form>
      <h3>Register</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => handleFormValues("email", e.target.value)}
          value={form.email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => handleFormValues("password", e.target.value)}
          value={form.password}
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-dark btn-lg btn-block"
        onClick={(e) => handleSubmit(e)}
      >
        Register
      </button>
      <p className="forgot-password text-right">
        Already Registered? <a href="#">log in</a>
      </p>
    </form>
  );
}

export default SignUp;
