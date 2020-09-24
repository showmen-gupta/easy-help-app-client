export function onError(error) {
  let message = error.toString();

  //Auth Errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }
  alert(message);
}
