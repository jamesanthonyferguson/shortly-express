Shortly.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    ''      : 'index' ,
    'create': 'create',
    'signup': 'signup',
    'login' : 'login'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView({ collection: links });
    this.swapView(linksView);
  },

  create: function(){
    this.swapView(new Shortly.createLinkView());
  }

  // signup: function(){
  //   // render index
  //   // replace body of index as signup ejs
  //   this.swapView(new SignUpView());
  // }

  // login: function(){
  //   this.swapView(login)
  // }

});
