Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'search',
    waitOn: function(){
        console.log(this.params);
        return Meteor.subscribe('searchResults', Meteor._get(this, 'params', 'query', 'srchStr'));
    },
    data: function() {
        console.log(this.params);
        return [SearchResults.find(), SelectedItems.find()];
    }
});

Router.route('/viewNetwork', {
   name: 'viewNetwork',
   data: function() { return [Nodes.find(), Links.find()]; }
});