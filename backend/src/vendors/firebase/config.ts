export default Object.freeze({
  clientEmail : process.env.FIREBASE_CLIENT_EMAIL,
  privateKey  : (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  projectId   : process.env.FIREBASE_PROJECT_ID,
});
