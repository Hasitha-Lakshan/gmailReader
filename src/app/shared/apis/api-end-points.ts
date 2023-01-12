import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiEndpointUrl;

export const apiEndpoint = {
  saveInvoiceData: `${BASE_URL}/mailservice/saveinvoice`,
  getAllInvoiceData: `${BASE_URL}/mailservice/getallinvoice`
};
