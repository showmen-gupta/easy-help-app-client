export default {
  s3: {
    REGION: "eu-north-1",
    BUCKET: "easy-help-uploads"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://c9nwoud368.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_OmQunQEmE",
    APP_CLIENT_ID: "5ua9761c530lne6ej1f75psvle",
    IDENTITY_POOL_ID: "eu-central-1:4120dbdd-65db-4631-b6e4-051f11a4db06"
  },
  MAX_ATTACHMENT_SIZE: 5000000
};
