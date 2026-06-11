const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")
const results = document.getElementById("results")

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click()
    }
})
searchButton.addEventListener("click", function() {
    const movieTitle = searchInput.value
    results.innerHTML = "Loading..."

    fetch("http://127.0.0.1:8000/search?movie=" + movieTitle)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                results.innerHTML = "Not available in those countries"
            } else {
                let text = ""
                data.availability.forEach(item => {
                    text = text + item.country + " - " + item.platform + "<br>"
                })
                results.innerHTML = text
            }
        })
        .catch(error => {
            results.innerHTML = "An error occurred, please try again"
        })
})