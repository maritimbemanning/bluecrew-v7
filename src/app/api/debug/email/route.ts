import { NextResponse } from "next/server";

/**
 * Debug endpoint to check email configuration
 * Only available in development or when accessed with correct secret
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Allow in dev, or with secret in prod
  const isAllowed = process.env.NODE_ENV === 'development' || secret === process.env.DEBUG_SECRET;

  if (!isAllowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const config = {
    RESEND_API_KEY: process.env.RESEND_API_KEY
      ? `✅ SET (${process.env.RESEND_API_KEY.substring(0, 10)}...)`
      : '❌ MISSING',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'DEFAULT: no-reply@send.bluecrew.no',
    RESEND_TO_EMAILS: process.env.RESEND_TO_EMAILS || 'DEFAULT: isak@bluecrew.no,tf@bluecrew.no',
    NODE_ENV: process.env.NODE_ENV,
  };

  const allConfigured = !!process.env.RESEND_API_KEY;

  return NextResponse.json({
    status: allConfigured ? 'OK' : 'MISSING_CONFIG',
    email_ready: allConfigured,
    config,
    note: 'Values show presence only, not actual secrets',
    checklist: {
      '1': 'Is RESEND_API_KEY set in Vercel env vars?',
      '2': 'Is send.bluecrew.no verified in Resend dashboard?',
      '3': 'Is RESEND_TO_EMAILS set to correct addresses?',
      '4': 'Check Vercel function logs for email errors',
    },
  }, { status: 200 });
}

/**
 * Test sending an email
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Only allow with secret
  if (secret !== process.env.DEBUG_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: 'RESEND_API_KEY not configured',
        suggestion: 'Add RESEND_API_KEY to Vercel environment variables'
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@send.bluecrew.no';
    const toEmails = process.env.RESEND_TO_EMAILS?.split(',') || ['isak@bluecrew.no'];

    console.log('[EMAIL TEST] Sending test email to:', toEmails);

    const result = await resend.emails.send({
      from: `Bluecrew Test <${fromEmail}>`,
      to: toEmails,
      subject: '🧪 Test e-post fra Bluecrew',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>🧪 Test e-post</h1>
          <p>Denne e-posten bekrefter at Resend-integrasjonen fungerer!</p>
          <p>Sendt: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    console.log('[EMAIL TEST] Result:', result);

    return NextResponse.json({
      success: true,
      result,
      message: 'Test email sent! Check your inbox.',
    });
  } catch (error) {
    console.error('[EMAIL TEST] ERROR:', error);
    return NextResponse.json({
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
