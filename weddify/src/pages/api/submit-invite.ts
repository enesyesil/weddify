import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

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
      const base64EncodedServiceAccount = process.env.GOOGLE_SERVICE_ACCOUNT;
      if (!base64EncodedServiceAccount) {
        throw new Error('Service account credentials not found');
      }

      const serviceAccount = JSON.parse(Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf8'));

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: serviceAccount.client_email,
          private_key: serviceAccount.private_key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = '1ImPwo_wtJf7urQczJ6srhUSq_DpkHaO10cs4jm6AnrA';
      const range = 'Sheet1!A:C'; // Adjust the range based on your sheet structure

      console.log('Appending data to Google Sheets...');
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

      console.log('Google Sheets API Response:', response.data);

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
