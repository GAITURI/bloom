import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Registration Function
async function registerWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error registering with Google:', error.message);
    alert('Registration failed. Please try again.');
  }
}

// Attach event listener to the registration button
document.getElementById('google-register-btn').addEventListener('click', registerWithGoogle);