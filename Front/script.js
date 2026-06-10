const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

searchButton.addEventListener("click", function() {
    const movieTitle = searchInput.value

    fetch("http://127.0.0.1:8000/search?movie=" + movieTitle)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
})      