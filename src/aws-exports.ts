import {Auth} from 'aws-amplify';

export default {
  UserAgent: 'aws-amplify-cli/2.0',
  Version: '1.0',
  Auth: {
    identityPoolId: 'us-west-2:b6535368-12b8-45a3-9308-1c30cec20964',
    region: 'us-west-2',
    userPoolId: 'us-west-2_Tau9d2K6B',
    userPoolWebClientId: '1i9t2btpfetg45a8d1cg3r5qgs',
    mandatorySignIn: true,
  },
  API: {
    endpoints: [
      {
        name: 'PPSAPI',
        endpoint: 'https://5ls6ka1vg1.execute-api.us-west-2.amazonaws.com/Prod',
        custom_header: async () => {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken();
          return {
            Authorization: `Bearer ${token}`
          };
        }
      },
    ]
  }
};
