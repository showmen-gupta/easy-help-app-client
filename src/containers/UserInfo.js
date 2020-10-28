import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { s3Upload, getUserinfo, checkUserInfoExists } from "../libs/awsLib";
import "../styles/css/UserInfo.css";
import InfoForm from "../components/InfoForm";

export default function UserInfo() {
  const file = useRef(null);
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    fullname: "",
    email: "",
    age: "",
    phone: "",
    gender: "",
    address: "",
    attachment: "",
    lat: "",
    long: "",
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
      fields.attachment = file.current ? await s3Upload(file.current) : null;
      fields.email = await getUserinfo();
      const userExists = await checkUserInfoExists();
      if (!userExists) {
        await addUserInfo(fields);
        history.push("/");
        alert("successfully added user");
      } else {
        alert("user with same email already exists");
      }
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function addUserInfo(fields) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    return API.post("users", "/users", {
      headers: headers,
      body: fields
    });
  }

  return (
    <div className="UserInfo">
      <form onSubmit={handleSubmit}>
        <InfoForm
          fields={fields}
          handleFieldChange={handleFieldChange}
          handleImageChange={handleImageChange}
          validateForm={validateForm}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
