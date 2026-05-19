const container = document.getElementById('trailers-container');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentData = []; // On stocke les données ici pour filtrer sans refaire d'appel API

const fetchTrailers = async (studio = '') => {
    try {
        let url = 'http://localhost:3000/api/trailers';
        if (studio) url = `http://localhost:3000/api/trailers/search?studio=${studio}`;
        
        const response = await fetch(url);
        currentData = await response.json();
        renderCards(currentData);
    } catch (error) {
        container.innerHTML = '<p style="color: red;">Error connecting to server.</p>';
    }
};

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

// Logique des filtres
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // UI : Changer le bouton actif
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Logique : Filtrer les données
        const category = btn.getAttribute('data-category');
        if (category === 'all') {
            renderCards(currentData);
        } else {
            const filtered = currentData.filter(item => item.category === category);
            renderCards(filtered);
        }
    });
});

searchBtn.addEventListener('click', () => fetchTrailers(searchInput.value));
resetBtn.addEventListener('click', () => { searchInput.value = ''; fetchTrailers(); });

fetchTrailers();