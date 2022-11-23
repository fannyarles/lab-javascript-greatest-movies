// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {

    const directorsList = moviesArray.map(movie => movie.director);
    const uniquifiedDirectorsList = [];

    for ( let i = 0 ; i < directorsList.length ; i++ ) {

        if ( !uniquifiedDirectorsList.includes(directorsList[i]) ) {

            uniquifiedDirectorsList.push(directorsList[i]);

        }
    }

    return uniquifiedDirectorsList;

}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {

    return moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes('Drama')).length;

}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if ( !moviesArray.length ) { return 0; }

    const avgScores = moviesArray.reduce((acc, movie) => {
        if (movie.score) {
            return acc + movie.score;
        } else {
            return acc + 0;
        }
    }, 0) / moviesArray.length;
    return +avgScores.toFixed(2);

}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    if ( !moviesArray.length ) { return 0; }

    const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));
    return scoresAverage(dramaMovies);

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    const moviesYearASC = [...moviesArray].sort((a, b) => {
    
        if (a.year > b.year) { 
            return 1; 
        }
        if (b.year > a.year) { return -1; }
        if (a.year === b.year) { 
            if (a.title > b.title) { return 1; }
            if (b.title > a.title) { return -1; }
            if (a.title === b.title) { return 0; }
         }
    
    });

    return moviesYearASC;

}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    const moviesAlphabeticallyASC = [...moviesArray]
        .sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1; //  1 here (instead of -1 for ASC)
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1; // -1 here (instead of  1 for ASC)
            if (a.title.toLowerCase() === 0) return 0;
        })
        .map(movie => movie.title);

    if (moviesArray.length < 20) {
        return moviesAlphabeticallyASC;
    } else {
        return moviesAlphabeticallyASC.slice(0, 20);
    }

}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    let movieTimeInMinute;

    const movieTimeUpdatedArray = [...moviesArray].map(({title, year, director, duration, genre, score}) => {
        
        const hours = +duration.slice(0, duration.indexOf('h'));
        const minutes = +duration.slice(duration.indexOf('h') + 1 , duration.indexOf('min'));

        const durationInMinutes = hours*60 + minutes;

        return {
            title: title,
            year: year,
            director: director,
            duration: durationInMinutes,
            genre: genre,
            scrore: score
        }
    
    });

        //movie.duration.slice(' ').map(el => el.replaceAll('h').replaceAll('min') ).flat();
    

    return movieTimeUpdatedArray;


}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if ( !moviesArray.length ) { return null; }
    
    const uniquifyYearsArray = [];

    for ( let i = 0 ; i < moviesArray.length ; i++ ) {

        if ( !uniquifyYearsArray.includes(moviesArray[i].year) ) {
            uniquifyYearsArray.push(moviesArray[i].year);
        }

    }

    let bestYearAvg = 0;
    let bestYear = 0;

    for ( let i = 0 ; i < uniquifyYearsArray.length ; i++ ) {

        const yearAvg = scoresAverage(moviesArray.filter(movie => movie.year === uniquifyYearsArray[i] ));

        if (yearAvg > bestYearAvg) { 
            bestYearAvg = yearAvg; 
            bestYear = uniquifyYearsArray[i];
        } else if ( yearAvg === bestYearAvg ) {
            bestYear = Math.min(uniquifyYearsArray[i], bestYear);
        }

    }

    return `The best year was ${bestYear} with an average score of ${bestYearAvg}`;

}