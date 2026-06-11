import { NextResponse } from 'next/server';

const TALLY_API_URL = 'https://api.tally.so';

const BREEZY_FORM_ID = process.env.TALLY_BREEZY_FORM_ID ?? 'RGrdKd';
const BREEZY_TYPE_FIELD_ID =
  process.env.TALLY_BREEZY_TYPE_FIELD_ID ?? '6669d340-3c94-4a43-9d69-a3758edfd0ad';
const BREEZY_EMAIL_FIELD_ID =
  process.env.TALLY_BREEZY_EMAIL_FIELD_ID ?? '1cb3fcd6-f504-44a1-9255-436b0431d641';
const BREEZY_FULL_NAME_FIELD_ID =
  process.env.TALLY_BREEZY_FULL_NAME_FIELD_ID ?? '20c564aa-e805-43e1-93d6-8a5427c5a7cc';
const BREEZY_HIRING_NEEDS_FIELD_ID =
  process.env.TALLY_BREEZY_HIRING_NEEDS_FIELD_ID ?? '24e7bf5f-c951-4eab-8342-a0d5ca4c8da7';

const TYPE_OPTIONS = {
  startup: '6ee5c9fc-1bb8-4050-bbf1-d9309bcdfdaf',
  recruiting_firm: '172be8e8-1e93-4c3f-bf6e-4363bda2489c',
} as const;

type BreezyType = keyof typeof TYPE_OPTIONS;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isBreezyType = (value: unknown): value is BreezyType =>
  typeof value === 'string' && value in TYPE_OPTIONS;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const hiringNeeds = typeof body.hiringNeeds === 'string' ? body.hiringNeeds.trim() : '';
  const type = isBreezyType(body.type) ? body.type : 'startup';

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Valid work email is required.' }, { status: 400 });
  }

  if (!fullName) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
  }

  if (!hiringNeeds) {
    return NextResponse.json({ error: 'Hiring needs are required.' }, { status: 400 });
  }

  const response = await fetch(`${TALLY_API_URL}/forms/${BREEZY_FORM_ID}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionUuid: crypto.randomUUID(),
      respondentUuid: crypto.randomUUID(),
      responses: {
        [BREEZY_TYPE_FIELD_ID]: [TYPE_OPTIONS[type]],
        [BREEZY_EMAIL_FIELD_ID]: email,
        [BREEZY_FULL_NAME_FIELD_ID]: fullName,
        [BREEZY_HIRING_NEEDS_FIELD_ID]: hiringNeeds,
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
