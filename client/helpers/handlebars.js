Template.registerHelper('getImagePath', function(posterPath, size){
   size = size ? size : 185;
   return 'https://image.tmdb.org/t/p/w' + size + posterPath;
});