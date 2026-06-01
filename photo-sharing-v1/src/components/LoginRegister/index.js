import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginRegister({ onLogin }) {
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const navigate = useNavigate();
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerUser,
    handleSubmit: handleRegisterUser,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
    watch,
  } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const res = await fetch(`https://nws8dc-8081.csb.app/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: data.login_name.trim(),
          password: data.password,
        }),
      });
      if (!res.ok) {
        setLoginError("Login failed");
        return;
      }
      const user = await res.json();
      localStorage.setItem("token", user.token);
      localStorage.setItem("curUser", JSON.stringify(user));
      onLogin && onLogin(user);
      navigate(`/users/${user._id}`);
    } catch (error) {
      setLoginError("Cannot connect to server");
      console.log("error:", error);
    }
  };

  const onSubmitRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      setRegisterError("Password do not match");
      return;
    }
    try {
      const res = await fetch(`https://x6vsmn-8081.csb.app/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: data.login_name.trim(),
          password: data.password,
          first_name: data.first_name.trim(),
          last_name: data.last_name.trim(),
          location: data.location,
          description: data.description,
          occupation: data.occupation,
        }),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        setRegisterError(errorMessage);
        return;
      }
      setRegisterSuccess("Register successful");
      resetRegisterForm();
    } catch (error) {
      console.log("Register error:", error);
      setRegisterError("Cannot connet to server");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Login name"
            {...loginRegister("login_name", { required: true })}
          />
          {loginErrors.login_name && (
            <span style={{ color: "red" }}>
              you have not provide login name
            </span>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <input
            type="password"
            placeholder="Password"
            {...loginRegister("password", { required: true })}
          />
          {loginErrors.password && (
            <span style={{ color: "red" }}>you have not provide password</span>
          )}
        </div>
        <br />
        <button type="submit">Login</button>
        {loginErrors && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
      <hr />
      <h2>Register</h2>
      <form onSubmit={handleRegisterUser(onSubmitRegister)}>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Login name"
            {...registerUser("login_name", { required: true })}
          />
          {registerErrors.login_name && (
            <span style={{ color: "red" }}>provide your login name</span>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <input
            type="password"
            placeholder="Password"
            {...registerUser("password", { required: true })}
          />
          {registerErrors.password && (
            <span style={{ color: "red" }}>provide your password</span>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <input
            type="password"
            placeholder="Confirm your pasword"
            {...registerUser("confirmPassword", {
              required: "confirm your password",
              validate: (value) =>
                value === watch("password") || "password do not match",
            })}
          />
          {registerErrors.confirmPassword && (
            <span style={{ color: "red" }}>
              {registerErrors.confirmPassword.message}
            </span>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="First Name"
            {...registerUser("first_name", { required: true })}
          />
          {registerErrors.first_name && (
            <span style={{ color: "red" }}>provide your first name</span>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Last name"
            {...registerUser("last_name", { required: true })}
          />
          {registerErrors.last_name && (
            <span style={{ color: "red" }}>provide your last name</span>
          )}
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Location"
            {...registerUser("location")}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Description"
            {...registerUser("description")}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Occupation"
            {...registerUser("occupation")}
          />
        </div>
        <br />
        <button type="submit">Register Me</button>

        {registerError && <p style={{ color: "red" }}>{registerError}</p>}
        {registerSuccess && <p style={{ color: "green" }}>{registerSuccess}</p>}
      </form>
    </div>
  );
}

export default LoginRegister;
