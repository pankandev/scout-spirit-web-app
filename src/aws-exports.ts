import {Auth} from 'aws-amplify';

export default {
  UserAgent: 'aws-amplify-cli/2.0',
  Version: '1.0',
  Auth: {
    identityPoolId: 'us-west-2:b6535368-12b8-45a3-9308-1c30cec20964',
    region: 'us-west-2',
    userPoolId: 'us-west-2_SwOlCeGN1',
    userPoolWebClientId: '12np1gn5jf4dcgfi6ub47e6oeq',
    mandatorySignIn: true,
  },
  API: {
    endpoints: [
      {
        name: 'PPSAPI',
        endpoint: 'https://j2cpy7mcrh.execute-api.us-west-2.amazonaws.com/Prod',
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
