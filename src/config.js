// export default {
//   s3: {
//     REGION: "eu-central-1",
//     BUCKET: "easy-help-app-uploads"
//   },
//   apiGateway: {
//     REGION: "eu-central-1",
//     URL: "https://c9nwoud368.execute-api.eu-central-1.amazonaws.com/prod"
//   },
//   cognito: {
//     REGION: "eu-central-1",
//     USER_POOL_ID: "eu-central-1_OmQunQEmE",
//     APP_CLIENT_ID: "5ua9761c530lne6ej1f75psvle",
//     IDENTITY_POOL_ID: "eu-central-1:4120dbdd-65db-4631-b6e4-051f11a4db06"
//   },
//   MAX_ATTACHMENT_SIZE: 5000000,
//   API_KEY: "AIzaSyBf53cJdRoYn5kZ-qBKC1ASIgP-_ibabtw"
// };

const dev = {
  s3: {
    REGION: "eu-central-1",
    BUCKET: "easy-help-api-dev-attachmentsbucket-nv0qlcpj9fvu"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://rxwogvh82c.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_vJXi02GNY",
    APP_CLIENT_ID: "5vf1t1gho4rlar16jm3hq617ac",
    IDENTITY_POOL_ID: "eu-central-1:bf1dd6e2-fcce-491e-94e9-6aa84ecc9aef"
  }
};

const prod = {
  s3: {
    REGION: "eu-central-1",
    BUCKET: "easy-help-api-prod-attachmentsbucket-1kczn0cycp0js"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://03cohtlgfi.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_xhj1jga3q",
    APP_CLIENT_ID: "714utt66b8crivd1r5daj5cl34",
    IDENTITY_POOL_ID: "eu-central-1:a8834069-b910-455d-8579-267b1a97e629"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  API_KEY: "AIzaSyAwmLZGNV0uK_zTucxwyrWG2GDhTGAAIsQ",
  ...config
};
