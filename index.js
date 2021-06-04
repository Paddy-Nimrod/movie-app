createAutocomplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src = "${imgSrc}" />
        ${movie.Title}(${movie.Year})
   `;
    },
    onOptionSelect(movie){
        onMovieSelect(movie);
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                 apikey: '4ff57a4c',
                 s: searchTerm
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;  
    }
});



const onMovieSelect = async movie =>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '4ff57a4c',
            i : movie.imdbID
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class = "media-left">
                <p class = "image">
                    <img src = "${movieDetail.Poster}" />
                </p>
            </figure>
            <div class = "media-content">
                <div class = "content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class = "notification is-primary">
            <p class="title">${movieDetail.Awards}</P>
            <p class = "subtitles">Awards</p>
        </article>
        <article class = "notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</P>
            <p class = "subtitles">Box Office</p>
        </article>
        <article class = "notification is-primary">
            <p class="title">${movieDetail.MetaScore}</P>
            <p class = "subtitles">Metascore</p>
        </article>
        <article class = "notification is-primary">
            <p class="title">${movieDetail.imdbRating}</P>
            <p class = "subtitles">IMDB Rating</p>
        </article>

    `;
};


