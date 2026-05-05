/**
 * Quick API sanity check (backend running). Does not replace full app E2E.
 *
 * Usage:
 *   API_URL=http://127.0.0.1:8000/api/v1 SMOKE_EMAIL=demo.jewelry@gmail.com SMOKE_PASSWORD=demo123456 node scripts/smoke-api-check.mjs
 */
const BASE = (process.env.API_URL ?? 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');
const STORE_ID = process.env.SMOKE_STORE_ID ?? '1';
const EMAIL = process.env.SMOKE_EMAIL ?? 'demo.jewelry@gmail.com';
const PASS = process.env.SMOKE_PASSWORD ?? 'demo123456';

async function req(path, { method = 'GET', token, body } = {}) {
  const headers = { 'X-Store-Id': STORE_ID };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body != null) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${BASE}/${path.replace(/^\//, '')}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }
  if (!res.ok) {
    const msg =
      json && typeof json === 'object' && json.error?.message
        ? json.error.message
        : `${res.status} ${text?.slice(0, 120)}`;
    throw new Error(msg);
  }
  return json;
}

async function main() {
  console.log(`Smoke API → ${BASE} (store ${STORE_ID})`);

  const loginJson = await req('auth/login', {
    method: 'POST',
    body: { email: EMAIL, password: PASS },
  });
  const token = loginJson?.access_token;
  if (!token) throw new Error('No access_token from login');

  const me = await req('users/me', { token });
  if (!me?.email) throw new Error('users/me missing email');

  const addrs = await req('addresses/', { token });
  if (!Array.isArray(addrs)) throw new Error('addresses response not array');

  await req('auth/logout', { method: 'POST', token, body: {} });

  console.log('OK: login → users/me → addresses → logout');
  console.log(`User: ${me.email} (${me.role ?? '?'})`);
}

main().catch((e) => {
  console.error('FAIL:', e.message || e);
  process.exit(1);
});
