import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import MapContainer from "../components/MapContainer";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "../styles/css/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const users = await loadUsers();
        setUsers(users);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function loadUsers() {
    return API.get("users", "/userList");
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Easy Help App</h1>
        <p>A helping agent in pandemic</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
        <div>
          <Link to="/users/userinfo" className="btn btn-primary btn-lg">
            UserInfo
          </Link>
        </div>
      </div>
    );
  }

  function filterLocations() {
    const arrayofLocations = [];
    users.forEach(element => {
      const location = {
        title: element.fullname,
        latitude: element.lat,
        longitude: element.long
      };
      arrayofLocations.push(location);
    });
    return arrayofLocations;
  }

  function renderUsers() {
    const locations = filterLocations();
    return (
      <div className="users">
        <MapContainer stores={locations} />
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated && !isLoading ? renderUsers() : renderLander()}
    </div>
  );
}
