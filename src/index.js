const url='https://venus714.github.io/dbjson/db.json'
const listHolder = document.querySelector('.films ul')
document.querySelector('#poster');

document.addEventListener('DOMContentLoaded', () => {
    fetchM(url)

})


function fetchM(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            
            movies.films.forEach(movie => {
                displayMovie(movie)
            });
        })

}
function displayMovie(movie) {

    const li = document.createElement('li')
    li.style.cursor = "pointer"
    li.textContent = (movie.title).toUpperCase()
    listHolder.appendChild(li)
    
    li.addEventListener('click',(event)=>{
        
        poster.src = movie.poster;
        addClickEvent(event)
    })
    
}

function addClickEvent(url){
    let children=listHolder.children

    for(let i=0; i<children.length; i++){
        let child=children[i]

        child.addEventListener('click',() => {
            
            fetch(`${url}/${i+1}`)
           

            .then(res => res.json())
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                MovieDetails(movie)
            })

        })
    }
}
addClickEvent(url)
function MovieDetails(childMovie) {
    const preview = document.getElementById('poster')
    preview.src = childMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = childMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${childMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = childMovie.description;
    const showTime = document.querySelector('#showtime')
    showTime.textContent = childMovie.showtime;
    const tickets = document.querySelector('#ticket-num')
    tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn = document.getElementById('buy-ticket')

btn.addEventListener('click', function (e) {
    let remTickets = document.querySelector('#ticket-num').textContent
    e.preventDefault()
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1

    }
    else if (parseInt(remTickets, 10) === 0) {
        btn.textContent = 'Sold Out'
    }
})
