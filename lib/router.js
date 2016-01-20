Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'search',
    waitOn: function(){
        return [
            Meteor.subscribe('searchResults', Meteor._get(this, 'params', 'query', 'srchStr')),
            Meteor.subscribe('selectedItems')
        ];
    },
    data: function() {
        return [SearchResults.find(), SelectedItems.find()];
    }
});

Router.route('/viewNetwork', {
   name: 'viewNetwork',
   waitOn: function(){
       return [
           Meteor.subscribe('nodes'),
           Meteor.subscribe('links')
       ];
   },
   data: function() {
       return [Nodes.find(), Links.find()];
   }
});