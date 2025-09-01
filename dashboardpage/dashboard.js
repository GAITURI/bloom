// This file no longer imports or uses the Supabase client directly.

const API_BASE_URL = 'http://127.0.0.1:8000/api';
// This should be replaced with a real user ID from your authentication flow later
const USER_ID = 'user_placeholder_123';

// Function to analyze sentiment using GeminiAI (remains on the client for now)
async function analyzeSentiment(text) {
    // IMPORTANT: Replace with your actual Gemini API Key
    const geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=YOUR_GEMINI_API_KEY";
    const payload = {
        contents: [{ parts: [{ text: `Analyze the sentiment of the following text and return only one word: Positive, Negative, or Neutral. Text: "${text}"` }] }],
    };

    try {
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Failed to analyze sentiment');
        const result = await response.json();
        // Extract the plain text from the Gemini response
        return result.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return 'Neutral'; // Default fallback
    }
}

// Function to save a journal entry via the backend
async function saveJournalEntry(entryText, mood) {
    try {
        const response = await fetch(`${API_BASE_URL}/journal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: USER_ID,
                content: entryText,
                mood: mood,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to save entry');
        }
        console.log('Journal entry saved successfully.');
    } catch (error) {
        console.error('Error saving journal entry:', error);
    }
}

// Function to fetch and display journal entries from the backend
async function fetchJournalEntries() {
    try {
        const response = await fetch(`${API_BASE_URL}/journal/${USER_ID}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to fetch entries');
        }
        const data = await response.json();
        return data.entries || []; // The backend returns { "entries": [...] }
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        return [];
    }
}

// Function to render the journal page content
async function renderJournalPage() {
    const entries = await fetchJournalEntries();
    const entriesHtml = entries.map(entry => `
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-4">
            <p class="text-gray-700 leading-relaxed">${entry.content}</p>
            <div class="flex justify-between items-center text-sm text-gray-500 mt-4 border-t pt-4">
                <span>Mood: <span class="font-bold capitalize">${entry.mood}</span></span>
                <span>${new Date(entry.created_at).toLocaleString()}</span>
            </div>
        </div>
    `).join('');

    document.getElementById('content-area').innerHTML = `
        <h1 class="text-4xl font-bold text-gray-800 mb-6">Mood Journal</h1>
        <p class="text-gray-600 mb-8">How are you feeling today? Write it down, let it out.</p>
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
            <h2 class="text-2xl font-semibold text-gray-800">New Journal Entry</h2>
            <textarea id="journal-input" class="mt-4 w-full p-4 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500" rows="6" placeholder="Share your thoughts, feelings, and experiences..."></textarea>
            <button id="save-button" class="mt-4 bg-[#7d3c99] text-white py-2 px-6 rounded-full font-medium hover:bg-[#5a2e73] transition duration-300">
                Save & Analyze
            </button>
        </div>
        <div class="mt-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Previous Entries</h2>
            <div id="entries-list">
                ${entries.length > 0 ? entriesHtml : '<p class="text-gray-500">No entries yet. Start by writing one above!</p>'}
            </div>
        </div>
    `;

    // Re-attach event listener after rendering
    document.getElementById('save-button').addEventListener('click', async () => {
        const saveButton = document.getElementById('save-button');
        const entryText = document.getElementById('journal-input').value.trim();
        if (!entryText) return;

        saveButton.textContent = 'Analyzing...';
        saveButton.disabled = true;

        const mood = await analyzeSentiment(entryText);
        await saveJournalEntry(entryText, mood);

        saveButton.textContent = 'Save & Analyze';
        saveButton.disabled = false;
        
        renderJournalPage(); // Refresh the page with the new entry
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation link
    document.getElementById('journal-link').addEventListener('click', (e) => {
        e.preventDefault();
        renderJournalPage();
    });

    // Load the journal page by default
    renderJournalPage();
});