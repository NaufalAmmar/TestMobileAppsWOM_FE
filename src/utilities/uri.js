import Constants from "expo-constants";
const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;

exports.uri = uri

