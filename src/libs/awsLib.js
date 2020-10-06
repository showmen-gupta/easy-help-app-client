import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

export async function getUserinfo() {
  //get current user info
  const userInfo = await Auth.currentUserInfo().then(user => {
    return user.attributes.email;
  });
  return userInfo;
}
