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

    if (!firstName || !lastName || !attendees) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inviteData: InviteData = {
      firstName,
      lastName,
      attendees: parseInt(attendees, 10),
    };

    try {
      const keyPath = path.join(process.cwd(), 'path/to/your/service-account-file.json');
      const auth = new GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = '1ImPwo_wtJf7urQczJ6srhUSq_DpkHaO10cs4jm6AnrA/edit?gid=0#gid=0'; // Replace with your Google Sheets ID
      const range = 'Sheet1!A:C'; // Adjust the range based on your sheet structure

      // Append the data to the Google Sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [inviteData.firstName, inviteData.lastName, inviteData.attendees],
          ],
        },
      });

      return res.status(200).json({ success: true, invite: inviteData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving data to Google Sheets' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default submitInvite;
