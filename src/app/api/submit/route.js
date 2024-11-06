
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GCP_TYPE,
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: process.env.GCP_AUTH_URI,
    token_uri: process.env.GCP_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });


export async function POST(request) {
    try {
        const { values } = req.body;
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${sheetName}!A1:AJ1000`,
          range : `${sheetName}!A1:A1000`,
          valueInputOption: 'RAW',
          resource: { values },
        });
        res.status(201).send(response.data);
      } catch (error) {
        res.status(500).send(error.message);
      }
  }