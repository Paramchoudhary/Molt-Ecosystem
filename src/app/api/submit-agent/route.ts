import { NextRequest, NextResponse } from "next/server";

interface AgentSubmission {
  id: string;
  name: string;
  url: string;
  github: string;
  description: string;
  category: string;
  status: string;
  open_source: boolean;
  engagement_level: string;
  key_indicators: string;
  features: string[];
  launch_approx: string;
  submitter_twitter: string;
  submitter_email: string;
  submitted_at: string;
}

// Google Sheets Web App URL - set this in your environment variables
const GOOGLE_SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

async function sendToGoogleSheets(submission: AgentSubmission): Promise<boolean> {
  if (!GOOGLE_SHEETS_WEBHOOK) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL not configured");
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets responded with ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, category" },
        { status: 400 }
      );
    }

    // Create submission
    const submission: AgentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      url: body.url || "",
      github: body.github || "",
      description: body.description,
      category: body.category,
      status: body.status || "Live",
      open_source: body.open_source || false,
      engagement_level: body.engagement_level || "Emerging",
      key_indicators: body.key_indicators || "",
      features: Array.isArray(body.features) ? body.features.join(", ") : "",
      launch_approx: body.launch_approx || "",
      submitter_twitter: body.submitter_twitter || "",
      submitter_email: body.submitter_email || "",
      submitted_at: body.submitted_at || new Date().toISOString(),
    };

    // Send to Google Sheets
    const success = await sendToGoogleSheets(submission);

    if (!success && GOOGLE_SHEETS_WEBHOOK) {
      // If Google Sheets is configured but failed, return error
      return NextResponse.json(
        { error: "Failed to save submission. Please try again." },
        { status: 500 }
      );
    }

    console.log(`New agent submission: ${submission.name} (${submission.id})`);

    return NextResponse.json(
      { message: "Submission received", id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Submissions are stored in Google Sheets. Check your spreadsheet for data.",
    configured: !!GOOGLE_SHEETS_WEBHOOK
  });
}
