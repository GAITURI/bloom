
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const closeMenu = document.getElementById('close-menu');
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.getElementById('content-area');
        const navLinks = document.querySelectorAll('aside nav a');

        // Toggle sidebar visibility on mobile
        hamburgerMenu.addEventListener('click', () => {
            sidebar.classList.add('sidebar-visible');
        });

        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-visible');
        });

        // Function to update the content area
        function updateContent(title, description, contentHtml) {
            contentArea.innerHTML = `
                <h1 class="text-4xl font-bold text-gray-800 mb-6">${title}</h1>
                <p class="text-gray-600 mb-8">${description}</p>
                ${contentHtml}
            `;
        }
        
        // Navigation link click handlers
        document.getElementById('journal-link').addEventListener('click', (e) => {
            e.preventDefault();
            updateContent(
                "Mood Journal",
                "How are you feeling today? Write it down, let it out.",
                `
                <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-semibold text-gray-800">New Journal Entry</h2>
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12.428l1.455-1.455a1 1 0 011.414 0L12 19.543l6.673-6.673a1 1 0 011.414 0l1.455 1.455m-14.142 0a.997.997 0 01-1.414 0L2.458 12.428z" />
                        </svg>
                    </div>
                    <p class="text-gray-500 mt-2">Your thoughts are safe and encrypted.</p>
                    <textarea class="mt-4 w-full p-4 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500" rows="6" placeholder="Share your thoughts, feelings, and experiences..."></textarea>
                    <button class="mt-4 bg-[#7d3c99] text-white py-2 px-6 rounded-full font-medium hover:bg-[#5a2e73] transition duration-300">
                        Save & Analyze
                    </button>
                </div>
                <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md mt-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Previous Entries</h2>
                    <p class="text-gray-500 mt-2">No entries found. Start by writing one above!</p>
                </div>
                `
            );
            sidebar.classList.remove('sidebar-visible');
            updateActiveLink(e.currentTarget);
        });

        document.getElementById('trends-link').addEventListener('click', (e) => {
            e.preventDefault();
            updateContent(
                "Your Mood Trends",
                "Visualize your emotional journey over the past week.",
                `
                <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Weekly Mood Overview</h2>
                    <p class="text-gray-500 mb-6">A score from 0 (low) to 100 (high) based on your journal entries.</p>
                    <div class="w-full h-64 bg-gray-100 rounded-lg flex items-end justify-between p-4 space-x-2">
                        <div class="flex-1 bg-purple-500 rounded-full h-1/2"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-1/3"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-3/4"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-4/5"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-2/3"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-1/4"></div>
                        <div class="flex-1 bg-purple-500 rounded-full h-3/5"></div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
                `
            );
            sidebar.classList.remove('sidebar-visible');
            updateActiveLink(e.currentTarget);
        });

        document.getElementById('community-link').addEventListener('click', (e) => {
            e.preventDefault();
            updateContent(
                "Community Wall",
                "Anonymous, uplifting stories from our community. You are not alone.",
                `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                        <p class="text-gray-700 leading-relaxed mb-4">"Had a really tough day, but I remembered a proverb my Gogo used to say: 'A single bracelet does not jingle.' It reminded me I'm not alone. We're all in this together."</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="w-8 h-8 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold mr-2">SW</span>
                            <span class="font-medium">SunshineWarrior</span>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                        <p class="text-gray-700 leading-relaxed mb-4">"Today, I saw a rainbow after the rain and it felt like a sign. A sign that there's beauty after every storm. Sending love to everyone who needs it."</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="w-8 h-8 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold mr-2">RH</span>
                            <span class="font-medium">RainbowHeart</span>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                        <p class="text-gray-700 leading-relaxed mb-4">"I finally found the courage to speak my truth to a close friend, and they accepted me with open arms. There is so much love in the world if we're brave enough to find it."</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold mr-2">GG</span>
                            <span class="font-medium">GentleGiant</span>
                        </div>
                    </div>
                </div>
                `
            );
            sidebar.classList.remove('sidebar-visible');
            updateActiveLink(e.currentTarget);
        });

        document.getElementById('resources-link').addEventListener('click', (e) => {
            e.preventDefault();
            updateContent(
                "Resource Hub",
                "A curated list of safe organizations, hotlines, and support groups across Africa.",
                `
                <div class="space-y-6">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">South Africa</h3>
                        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                            <h4 class="text-lg font-semibold text-purple-800">OUT LGBT Well-being</h4>
                            <p class="text-gray-600 mt-2">Provides health services, research, and advocacy for the LGBTQ+ community.</p>
                            <p class="text-sm text-gray-500 mt-2">info@out.org.za | +27 12 430 3272</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Kenya</h3>
                        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                            <h4 class="text-lg font-semibold text-purple-800">The Triangle Project</h4>
                            <p class="text-gray-600 mt-2">A non-profit organization offering services to ensure the full realisation of constitutional and human rights for LGBTQ+ persons.</p>
                            <p class="text-sm text-gray-500 mt-2">info@triangle.org.za | +27 21 422 0255</p>
                        </div>
                    </div>
                </div>
                `
            );
            sidebar.classList.remove('sidebar-visible');
            updateActiveLink(e.currentTarget);
        });

        document.getElementById('affirmations-link').addEventListener('click', (e) => {
            e.preventDefault();
            updateContent(
                "Daily Affirmation",
                "A moment of inspiration, rooted in African wisdom and LGBTQ+ pride.",
                `
                <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
                    <p class="text-lg text-gray-700 italic text-center">"Just as a river carves its own path with unwavering strength, your unique identity is a beautiful and powerful force. Remember the wisdom of Ubuntu: 'I am because we are,' and your authentic light makes our collective stronger and more vibrant."</p>
                </div>
                `
            );
            sidebar.classList.remove('sidebar-visible');
            updateActiveLink(e.currentTarget);
        });

        // Function to handle active link styling
        function updateActiveLink(activeLink) {
            navLinks.forEach(link => {
                link.classList.remove('bg-purple-200', 'text-purple-800');
                link.classList.add('hover:bg-purple-100');
                link.querySelector('.nav-icon').classList.remove('active');
            });
            activeLink.classList.add('bg-purple-200', 'text-purple-800');
            activeLink.classList.remove('hover:bg-purple-100');
            activeLink.querySelector('.nav-icon').classList.add('active');
        }

        // Set initial active link and content
        document.getElementById('journal-link').click();
