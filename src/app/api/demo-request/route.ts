import { NextResponse } from 'next/server';

const TALLY_API_URL = 'https://api.tally.so';

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: '' }));

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }

  const formId = process.env.TALLY_FORM_ID;
  const emailFieldId = process.env.TALLY_EMAIL_FIELD_ID;

  if (!formId || !emailFieldId) {
    return NextResponse.json(
      { error: 'Tally submission is not configured.' },
      { status: 500 },
    );
  }

  const response = await fetch(`${TALLY_API_URL}/forms/${formId}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionUuid: crypto.randomUUID(),
      respondentUuid: crypto.randomUUID(),
      responses: {
        [emailFieldId]: email,
      },
      isCompleted: true,
      password: '',
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    return NextResponse.json(
      { error: 'Unable to submit to Tally.', details },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
