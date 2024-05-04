const containerVideos = document.querySelector('.videos__container');

const api = fetch("http://localhost:3000/videos")
    .then(res => res.json())
    .then((videos) =>
    videos.forEach((video) => {
        containerVideos.innerHTML += `
            <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="description-video">
                        <img class="img-channel" src="${video.imagem}" alt="Logo do canal">
                        <h3 class="title-video">${video.titulo}</h3>
                        <p class="title-channel">${video.descricao}</p>
                    </div>
                </li>
            `;
    })
)