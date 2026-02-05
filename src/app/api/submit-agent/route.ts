import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
  reviewed: boolean;
}

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function getSubmissions(): Promise<AgentSubmission[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubmissions(submissions: AgentSubmission[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
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
      features: body.features || [],
      launch_approx: body.launch_approx || "",
      submitter_twitter: body.submitter_twitter || "",
      submitter_email: body.submitter_email || "",
      submitted_at: body.submitted_at || new Date().toISOString(),
      reviewed: false,
    };

    // Get existing submissions and add new one
    const submissions = await getSubmissions();
    submissions.push(submission);
    await saveSubmissions(submissions);

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
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ submissions, count: submissions.length });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
