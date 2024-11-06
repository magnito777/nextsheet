
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

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A1:AJ1000`,
    });
    return new Response(JSON.stringify(response.data.values), { status: 200 });
  } catch (error) {
    console.error("Error accessing Google Sheets:", error);
    return new Response("Error retrieving data from Google Sheets", { status: 500 });
  }
}




export async function POST(req) {
    try {
      const body = await req.json();
      
      // Map request body fields to Google Sheets values array
      const values = [
        [
          body.patientnumber, 
          body["study-number"], 
          body.xraynumber, 
          body.age, 
          body.sex, 
          body.residence, 
          body.occupation, 
          body.education_level, 
          body.district, 
          body.village, 
          body.road, 
          body.crash_date, 
          body.crash_day, 
          body.crash_time, 
          body.referral, 
          body.referring_hospital, 
          body.evacuation_mode, 
          body.has_fracture, 
          body.fracture_type, 
          body.fracture_nature, 
          body.fractured_bone, 
          body.gustilo_classification, 
          body.head_injury_gcs, 
          body.iss_score, 
          body.diagnosis,
        ]
      ];
      
      // Append data to Google Sheets
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: `${process.env.SHEET_NAME}!A1:AJ1000`,
        valueInputOption: 'RAW',
        resource: { values },
      });
  
      return new Response(JSON.stringify(response.data), { status: 201 });
    } catch (error) {
      console.error("Error appending data to Google Sheets:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }