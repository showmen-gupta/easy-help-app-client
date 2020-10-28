import { Storage } from "aws-amplify";
import { Auth, API } from "aws-amplify";

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

export async function checkUserInfoExists() {
  try {
    const email = await getUserinfo();
    await API.get("users", `/getUsers/${email}`);
    return true;
  } catch (e) {
    if (e) {
      return false;
    }
  }
}
