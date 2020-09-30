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
    BUCKET: "easy-help-api-dev-attachmentsbucket-16l5qrm4mxs87"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://7eii0xlvvb.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_cYTc6VdqX",
    APP_CLIENT_ID: "33tiroc01g9tlq694pj8q08hqc",
    IDENTITY_POOL_ID: "eu-central-1:c300c296-aaaa-4919-8955-77c688863069"
  }
};

const prod = {
  s3: {
    REGION: "eu-central-1",
    BUCKET: "easy-help-api-prod-attachmentsbucket-34bfpvnr8evv"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://wsvx2u29ii.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_yZsfitJJ5",
    APP_CLIENT_ID: "7kpgrt86t4s6siv3paf249i3ft",
    IDENTITY_POOL_ID: "eu-central-1:61c9975f-1589-47db-a10b-842bed766ee3"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  API_KEY: "AIzaSyBf53cJdRoYn5kZ-qBKC1ASIgP-_ibabtw",
  ...config
};
