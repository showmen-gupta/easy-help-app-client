import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
//import { s3Upload } from "../libs/awsLib";
import "../styles/css/UserInfo.css";

export default function UpdateUserInfo() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    fullname: "",
    age: "",
    phone: "",
    gender: "",
    address: "",
    attachment: "",
    lat: 58.96417684,
    long: 5.6501957,
    userType: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadUsers() {
      return API.get("users", `/getUser/${id}`);
    }
  });

  function validateForm() {
    return (
      fields.age > 0 && fields.gender.length > 0 && fields.address.length > 0
    );
  }

  function handleImageChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      //fields.attachment = file.current ? await s3Upload(file.current) : null;
      await updateUserInfo(fields);
      history.push("/");
      alert("successfully added user");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function updateUserInfo(fields) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    return API.post("users", "/users", {
      headers: headers,
      body: fields
    });
  }

  function deleteUser() {
    return API.del("users", `/removeUser/${id}`);
  }

  return (
    <div className="UserInfo">
      <FormGroup controlId="fullname">
        <FormControl
          value={fields.fullname}
          type="text"
          onChange={handleFieldChange}
          placeholder="Full Name"
        />
      </FormGroup>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="age">
          <FormControl
            value={fields.age}
            type="number"
            onChange={handleFieldChange}
            placeholder="Age"
          />
        </FormGroup>
        <FormGroup controlId="phone">
          <FormControl
            value={fields.phone}
            type="text"
            onChange={handleFieldChange}
            placeholder="Phone"
          />
        </FormGroup>
        <FormGroup controlId="gender">
          <FormControl
            value={fields.gender}
            type="text"
            onChange={handleFieldChange}
            placeholder="Gender"
          />
        </FormGroup>
        <FormGroup controlId="address">
          <FormControl
            value={fields.address}
            componentClass="textarea"
            onChange={handleFieldChange}
            placeholder="Address"
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Profile Image</ControlLabel>
          <FormControl onChange={handleImageChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Update
        </LoaderButton>
      </form>
    </div>
  );
}
