import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const API = process.env.REACT_APP_API_URL;

export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const submit = (payload) => {
    fetch(`${API}/user/signup/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate("/login");
          return;
        } else {
          setError(Object.values(data)?.map((error) => error[0]));
        }
      });
  };
  return { error, submit };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const submit = (payload) => {
    fetch(`${API}/user/login/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.refresh) {
          localStorage.setItem("refresh", data.refresh);
          navigate("/");
          return;
        } else {
          setError(Object.values(data)?.map((error) => error[0]));
        }
      });
  };
  return { error, submit };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = (payload) => {
    fetch(`${API}/user/logout/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) navigate("/login");
    });
  };
  return { logout };
};
