import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import MapContainer from "../components/MapContainer";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "../styles/css/Home.css";

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
        //console.log(users);
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
        <p>A helping in pandemic</p>
      </div>
    );
  }

  //AIzaSyBf53cJdRoYn5kZ-qBKC1ASIgP-_ibabtw

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
    return <MapContainer stores={locations} />;
  }

  return (
    <div className="Home">
      {isAuthenticated && !isLoading ? renderUsers() : renderLander()}
    </div>
  );
}
