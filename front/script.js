const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")
const results = document.getElementById("results")

const flags = {
    IS: "🇮🇸",
    AU: "🇦🇺",
    GB: "🇬🇧"
}

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click()
    }
})

document.querySelectorAll(".chip").forEach(function(chip) {
    chip.addEventListener("click", function() {
        searchInput.value = chip.dataset.title
        searchButton.click()
    })
})

searchButton.addEventListener("click", function() {
    const movieTitle = searchInput.value
    const safeTitle = escapeHTML(movieTitle)

    results.innerHTML =
        '<div class="state state--loading">' +
            '<span class="spinner"></span>' +
            'Searching for &ldquo;' + safeTitle + '&rdquo;&hellip;' +
        '</div>'

    fetch("http://127.0.0.1:8000/search?movie=" + movieTitle)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                results.innerHTML =
                    '<div class="state state--empty">' +
                        '<span class="state__icon">&#10005;</span>' +
                        '&ldquo;' + safeTitle + '&rdquo; isn&rsquo;t on Netflix in Iceland, Australia or the UK.' +
                    '</div>'
            } else {
                let rows = ""
                data.availability.forEach(item => {
                    const flag = flags[item.country] || "🏳️"
                    rows = rows +
                        '<div class="row">' +
                            '<span class="row__country">' + flag + ' ' + item.country + '</span>' +
                            '<span class="row__platform">' + item.platform + '</span>' +
                        '</div>'
                })

                results.innerHTML =
                    '<div class="results-header">Results for &ldquo;' + safeTitle + '&rdquo;</div>' +
                    rows
            }
        })
        .catch(error => {
            results.innerHTML =
                '<div class="state state--error">' +
                    '<span class="state__icon">!</span>' +
                    'Something went wrong &mdash; please try again.' +
                '</div>'
        })
})