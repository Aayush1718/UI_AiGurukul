import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

// Reusable JWKS client for Logto
// Ensure LOGTO_JWKS_URL is set in Vercel and .env (e.g., https://your-logto-domain/oidc/jwks)
let JWKS;
try {
  JWKS = createRemoteJWKSet(new URL(process.env.LOGTO_JWKS_URL));
} catch (e) {
  console.warn("LOGTO_JWKS_URL is not set or invalid. Authentication will fail.");
}

export default async function handler(req, res) {
  // 1. Verify Authentication
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  if (!JWKS) {
    return res.status(500).json({ error: 'Server configuration error: JWKS URL missing' });
  }

  let userId;
  try {
    const { payload } = await jwtVerify(token, JWKS);
    userId = payload.sub;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (!userId) {
    return res.status(401).json({ error: 'Invalid token payload' });
  }

  // 2. Initialize Supabase Admin Client
  // VITE_SUPABASE_URL is exposed to the frontend but can be used here too.
  // SUPABASE_SERVICE_ROLE_KEY MUST be a secret in Vercel/env, NOT prefixed with VITE_.
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 3. Handle GET request (Fetch Profile)
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('name, email, phone_number, location')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means zero rows found
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || null);
  }

  // 4. Handle POST request (Update/Insert Profile)
  if (req.method === 'POST') {
    const { name, phone_number, location, email } = req.body;

    const { data, error } = await supabase
      .from('users')
      .upsert({
        user_id: userId,
        name,
        phone_number,
        location,
        email, // Optional, can be updated if provided
        last_login: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  // Handle other methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
