import {Auth} from 'aws-amplify';

const customHeaderGenerator = async () => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return {
    Authorization: `Bearer ${token}`
  };
};

export default {
  UserAgent: 'aws-amplify-cli/2.0',
  Version: '1.0',
  Auth: {
    identityPoolId: 'us-west-2:51fb4d6b-10d4-461e-8172-ac52529b4f2a',
    region: 'us-west-2',
    userPoolId: 'us-west-2_GikObR6zU',
    userPoolWebClientId: '6ibudrnjml4p3rc4t9oabvis8o',
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
