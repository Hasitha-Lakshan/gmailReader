import { environment } from "src/environments/environment";

const BASE_URL = environment.apiEndpointUrl;

export const apiEndpoint = {
    // getCode: `${BASE_URL}/authservice/studentregister`
    getCode: `https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&state=state_parameter_passthrough_value&scope=https://mail.google.com&access_type=offline&response_type=code&redirect_uri=http://localhost&client_id=494046440277-ja95oc5msea1c8lm8b824p8s6mkb391f.apps.googleusercontent.com`
};