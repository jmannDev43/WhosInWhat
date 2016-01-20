SearchResults = new Mongo.Collection('searchResults');

SelectedItems = new Mongo.Collection('selectedItems');

SelectedItems.allow({
   insert: function(doc){
        return !!doc;
   }
});