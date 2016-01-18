Template.selection.helpers({
    selectedActors: function(){
        return SelectedItems.find({ mediaType: 'person' });
    },
    actorsExist: function(){
        return SelectedItems.find({ mediaType: 'person' }).count() > 0;
    },
    selectedMovies: function(){
        return SelectedItems.find({ mediaType: 'movie' });
    },
    moviesExist: function(){
        return SelectedItems.find({ mediaType: 'movie' }).count() > 0;
    },
    selectedTv: function(){
        return SelectedItems.find({ mediaType: 'tv' });
    },
    tvShowsExist: function(){
        return SelectedItems.find({ mediaType: 'tv' }).count() > 0;
    }
});