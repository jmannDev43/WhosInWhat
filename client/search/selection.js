Template.selection.helpers({
    selectedActors: function(){
        return SelectedItems.find({ media_type: 'person' });
    },
    actorsExist: function(){
        return SelectedItems.find({ media_type: 'person' }).count() > 0;
    },
    selectedMovies: function(){
        return SelectedItems.find({ media_type: 'movie' });
    },
    moviesExist: function(){
        return SelectedItems.find({ media_type: 'movie' }).count() > 0;
    },
    selectedTv: function(){
        return SelectedItems.find({ media_type: 'tv' });
    },
    tvShowsExist: function(){
        return SelectedItems.find({ media_type: 'tv' }).count() > 0;
    }
});

