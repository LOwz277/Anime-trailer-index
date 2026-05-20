const container = document.getElementById('trailers-container');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentData = []; 

// Fetch all items from API on load
const fetchTrailers = async () => {
    try {
        const url = 'http://localhost:3000/api/trailers';
        const response = await fetch(url);
        currentData = await response.json();
        renderCards(currentData);
    } catch (error) {
        container.innerHTML = '<p style="color: red;">Error connecting to server.</p>';
    }
};

// Render HTML cards dynamically
const renderCards = (data) => {
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <div class="category-tag">${item.category}</div>
            <img src="${item.cover_url}" alt="cover">
            <h3>${item.title}</h3>
            <p><strong>${item.category === 'Trailer' ? 'Studio' : 'Artist'}:</strong> ${item.category === 'Trailer' ? item.studio : item.artist}</p>
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${item.youtube_id}" frameborder="0" allowfullscreen></iframe>
        `;
        container.appendChild(card);
    });
};

// Category tabs filtering logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        if (category === 'all') {
            renderCards(currentData);
        } else {
            const filtered = currentData.filter(item => item.category === category);
            renderCards(filtered);
        }
    });
});

// Multi-criteria search logic (Title, Studio, or Artist)
const handleSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = currentData.filter(item => {
        const matchTitle = item.title ? item.title.toLowerCase().includes(query) : false;
        const matchStudio = item.studio ? item.studio.toLowerCase().includes(query) : false;
        const matchArtist = item.artist ? item.artist.toLowerCase().includes(query) : false;
        
        return matchTitle || matchStudio || matchArtist;
    });
    
    renderCards(filtered);
};

// Search event listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Reset search and filters
resetBtn.addEventListener('click', () => { 
    searchInput.value = ''; 
    renderCards(currentData); 
});

// Initial load
fetchTrailers();