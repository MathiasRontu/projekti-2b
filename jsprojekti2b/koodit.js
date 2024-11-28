$(document).ready(function () {
    const searchInput = $('#search-input');
    const searchBtn = $('#search-btn');
    const resultsContainer = $('#results-container');

    // Event Listener for Search Button
    searchBtn.on('click', function () {
        const query = searchInput.val().trim();
        if (query) {
            fetchMeals(query);
        } else {
            alert('Please enter a meal name!');
        }
    });

    // Fetch Meals from TheMealDB API
    function fetchMeals(query) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                displayMeals(data.meals);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Display Meals on the Page
    function displayMeals(meals) {
        resultsContainer.empty(); // Clear previous results
        if (meals) {
            meals.forEach(meal => {
                const mealDiv = $('<div>').addClass('meal card mb-4').hide();
                const mealContent = `
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h3 class="card-title">${meal.strMeal}</h3>
                        <p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>
                        <p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>
                        <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
                    </div>
                `;
                mealDiv.html(mealContent);
                resultsContainer.append(mealDiv);
                mealDiv.fadeIn();
            });
        } else {
            resultsContainer.html('<p>No meals found!</p>');
        }
    }
});
