# Google Sheets Setup for Agent Submissions

Follow these steps to set up Google Sheets to receive agent submissions.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Molt Ecosystem Submissions"
4. In the first row, add these headers (in order):
   - A1: `ID`
   - B1: `Name`
   - C1: `URL`
   - D1: `GitHub`
   - E1: `Description`
   - F1: `Category`
   - G1: `Status`
   - H1: `Open Source`
   - I1: `Engagement Level`
   - J1: `Key Indicators`
   - K1: `Features`
   - L1: `Launch Date`
   - M1: `Twitter`
   - N1: `Email`
   - O1: `Submitted At`

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append the data as a new row
    sheet.appendRow([
      data.id || '',
      data.name || '',
      data.url || '',
      data.github || '',
      data.description || '',
      data.category || '',
      data.status || '',
      data.open_source ? 'Yes' : 'No',
      data.engagement_level || '',
      data.key_indicators || '',
      data.features || '',
      data.launch_approx || '',
      data.submitter_twitter || '',
      data.submitter_email || '',
      data.submitted_at || new Date().toISOString()
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Molt Ecosystem Webhook Active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (Ctrl+S or Cmd+S)
4. Name the project "Molt Submissions Handler"

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: "Molt Ecosystem Submissions"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
   - If you see "Google hasn't verified this app", click "Advanced" > "Go to Molt Submissions Handler (unsafe)"
   - Click "Allow"
6. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 4: Add Environment Variable

### For Local Development:
Create a `.env.local` file in your project root:
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Go to **Settings > Environment Variables**
3. Add:
   - **Name**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: Your Google Apps Script URL
4. Click **Save**
5. **Redeploy** your application

## Step 5: Test

1. Submit a test agent through the website
2. Check your Google Sheet - you should see the new row
3. If it doesn't work, check:
   - The Apps Script is deployed correctly
   - The URL in your environment variable is correct
   - The deployment is set to "Anyone" can access

## Troubleshooting

### "Failed to submit" error
- Make sure the GOOGLE_SHEETS_WEBHOOK_URL environment variable is set
- Verify the Apps Script is deployed and accessible
- Check the Apps Script execution logs: Extensions > Apps Script > Executions

### Data not appearing in sheet
- Make sure the headers match exactly
- Check that the script has permission to edit the spreadsheet
- Try redeploying the Apps Script

## Security Note

The webhook URL should be kept private. Anyone with the URL can add data to your spreadsheet. Don't commit it to public repositories.
