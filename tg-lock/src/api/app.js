import { useEffect, useState } from "react";
import { API } from "./auth";
import { useNavigate } from "react-router-dom";

export const useApp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [apps, setApps] = useState([]);
  const submit = (payload) => {
    fetch(`${API}/apps/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("refresh"),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return;
        } else {
          setError(Object.values(data)?.map((error) => error[0]));
        }
      });
  };
  useEffect(() => {
    fetch(`${API}/apps/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("refresh"),
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status != 200) {
          navigate("/login");
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) setApps(data);
      });
  }, []);
  return { error, submit, apps };
};
