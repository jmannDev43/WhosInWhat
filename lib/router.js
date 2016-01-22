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
        //console.log(SearchResults.find().fetch());
        return [SearchResults.find(), SelectedItems.find()];
    },
    action: function(){
        if (this.ready()){
            this.render();
            var srchStr = Meteor._get(this, 'params', 'query', 'srchStr');
            var resultCount = SearchResults.find().count();
            if (srchStr && srchStr.length > 0 && resultCount === 0){
                Materialize.toast('No results found.', 2000, 'toastError');
            }
        }
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