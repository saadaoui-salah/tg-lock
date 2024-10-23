import { useEffect, useState } from "react";
import { API } from "./auth";
import { useNavigate } from "react-router-dom";

export const useApp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
        if (data.created) {
          setRefresh(!refresh);
          return;
        } else {
          setError(Object.values(data)?.map((error) => error[0]));
        }
      });
  };
  const deleteApp = (payload) => {
    fetch(`${API}/apps/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("refresh"),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deleted) {
          setRefresh(!refresh);
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
  }, [refresh]);
  return { error, submit, apps, deleteApp };
};
