import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { s3Upload } from "../libs/awsLib";
import "./UserInfo.css";

export default function UserInfo() {
  const file = useRef(null);
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    fullname: "",
    age: 0,
    phone: "",
    gender: "",
    address: "",
    attachment: "",
    lat: 0.0,
    long: 22.05,
    userType: 0
  });

  const [isLoading, setIsLoading] = useState(false);

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
      const attachment = file.current ? await s3Upload(file.current) : null;

      await addUserInfo(
        fields.fullname,
        fields.age,
        fields.phone,
        fields.gender,
        fields.address,
        attachment,
        fields.lat,
        fields.long,
        fields.userType
      );
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function addUserInfo(content) {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    return API.post("users", "/users", {
      body: content,
      headers: headers
    });
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
