const containerVideos = document.querySelector('.videos__container');

async function searchShowVideos() {
    try {
        const search = await fetch("http://localhost:3000/videos");
        const videos = await search.json();

        videos.forEach((video) => {
            if(video.categoria == "") {
                throw new Error('Vídeo sem categoria');
            }
            containerVideos.innerHTML += `
                <li class="videos__item">
                        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="description-video">
                            <img class="img-channel" src="${video.imagem}" alt="Logo do canal">
                            <h3 class="title-video">${video.titulo}</h3>
                            <p class="title-channel">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>
                        </div>
                    </li>
                `;
        })
    } catch(error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}.</p>`;
    }
}

searchShowVideos();

const searchBar = document.querySelector('.search__input');

searchBar.addEventListener('input', filterSearch);

function filterSearch() {
    const videos = document.querySelectorAll('.videos__item');

    if(searchBar.value != "") {
        for(let video of videos) {
            let title = video.querySelector('.title-video').textContent.toLowerCase();
            let filterValue = searchBar.value.toLowerCase();

            if(!title.includes(filterValue)) {
                video.style.display = 'none';
            } else {
                video.style.display = 'block';
            }
        }
    } else {
        video.style.display = 'block';
    }
}

const categoryBtn = document.querySelectorAll('.superior__item');

categoryBtn.forEach((button) => {
    let categoryName = button.getAttribute('name');
    button.addEventListener('click', () => filterByCategory(categoryName));
});

function filterByCategory(filter) {
    const videos = document.querySelectorAll('.videos__item');
    for(let video of videos) {
        let category = video.querySelector('.categoria').textContent.toLowerCase();
        let filterValue = filter.toLowerCase();

        if(!category.includes(filterValue) && filterValue != 'tudo') {
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}