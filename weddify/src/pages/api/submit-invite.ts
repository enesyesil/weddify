import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import path from 'path';

type InviteData = {
  firstName: string;
  lastName: string;
  attendees: number;
};

const submitInvite = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { firstName, lastName, attendees } = req.body;

    if (!firstName || !lastName || attendees === undefined || attendees === null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inviteData: InviteData = {
      firstName,
      lastName,
      attendees: parseInt(attendees, 10),
    };

    try {
      const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
      if (!keyPath) {
        throw new Error('Service account key path is not defined in environment variables');
      }
      console.log('Service account key path:', keyPath); // Log the path for debugging

      const auth = new GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      console.log('Google Sheets API client created.');

      const spreadsheetId = '1ImPwo_wtJf7urQczJ6srhUSq_DpkHaO10cs4jm6AnrA'; // Replace with your Google Sheets ID
      const range = 'Sheet1!A:C'; // Adjust the range based on your sheet structure
      console.log('Spreadsheet ID:', spreadsheetId);
      console.log('Range:', range);

      // Append the data to the Google Sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [inviteData.firstName, inviteData.lastName, inviteData.attendees],
          ],
        },
      });
      console.log('Data appended to Google Sheet:', response.data);

   
      return res.status(200).json({ success: true, invite: inviteData });
    } catch (error) {
      console.error('Error saving data to Google Sheets:', error);

      if (error instanceof Error) {
        return res.status(500).json({ error: 'Error saving data to Google Sheets', details: error.message });
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default submitInvite;
