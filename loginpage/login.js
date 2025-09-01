import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Login Function
async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error logging in with Google:', error.message);
    alert('Login failed. Please try again.');
  }
}

// Attach event listener to the login button
document.getElementById('google-login-btn').addEventListener('click', loginWithGoogle);