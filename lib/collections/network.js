NetworkItems = new Mongo.Collection('networkItems');

Nodes = new Mongo.Collection('nodes');
Links = new Mongo.Collection('links');

/* EXAMPLE STRUCTURE
##########################################################
 elements: {
     nodes: [
         { data: { id: 'cat' } },
         { data: { id: 'bird' } },
         { data: { id: 'ladybug' } },
         { data: { id: 'aphid' } },
         { data: { id: 'rose' } },
         { data: { id: 'grasshopper' } },
         { data: { id: 'plant' } },
         { data: { id: 'wheat' } }
     ],
     edges: [
         { data: { source: 'cat', target: 'bird' } },
         { data: { source: 'bird', target: 'ladybug' } },
         { data: { source: 'bird', target: 'grasshopper' } },
         { data: { source: 'grasshopper', target: 'plant' } },
         { data: { source: 'grasshopper', target: 'wheat' } },
         { data: { source: 'ladybug', target: 'aphid' } },
         { data: { source: 'aphid', target: 'rose' } }
     ]
 }

 */