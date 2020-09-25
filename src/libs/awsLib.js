import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;
  const headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", "true");

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
    headers: headers
  });

  return stored.key;
}
