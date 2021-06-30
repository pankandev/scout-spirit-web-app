import {Auth} from 'aws-amplify';

const customHeaderGenerator = async () => {
  try {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return {
      Authorization: `Bearer ${token}`
    };
  } catch {
    return {};
  }
};

export default {
  UserAgent: 'aws-amplify-cli/2.0',
  Version: '1.0',
  Auth: {
    identityPoolId: 'us-west-2:e136debc-28bb-4221-b17e-4a75036d81c1',
    region: 'us-west-2',
    userPoolId: 'us-west-2_hCEYOTuPN',
    userPoolWebClientId: '449fe3r1v64qrjg559el1l95bn',
    mandatorySignIn: true,
  },
  API: {
    endpoints: [
      {
        name: 'PPSAPI',
        endpoint: 'https://d43k9sss5csvt.cloudfront.net/api',
        custom_header: customHeaderGenerator
      },
      {
        name: 'TESTAPI',
        endpoint: 'http://localhost:3000/api',
        custom_header: customHeaderGenerator
      },
    ]
  }
};
