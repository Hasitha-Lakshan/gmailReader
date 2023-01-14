import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiEndpointUrl;
const GMAIL_URL = environment.gmail;

export const apiEndpoint = {
  saveInvoiceData: `${BASE_URL}/mailservice/saveinvoice`,
  getAllInvoiceData: `${BASE_URL}/mailservice/getallinvoice`
};

export const gmailEndpoint = {
  gmailUsers: `${GMAIL_URL}/gmail/v1/users/`
}
