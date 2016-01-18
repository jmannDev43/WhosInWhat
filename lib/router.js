Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'search',
    //waitOn: function(){ return [Meteor.subscribe('movieResults'), Meteor.subscribe('actorResults')]; },
    data: function() { return [SearchResults.find(), SelectedItems.find()]; }
});