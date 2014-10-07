db.knex.schema.hasTable('sessions').then(function(exists){
  if (!exists) {
    db.knex.schema.createTable('sessions', function (user){
      user.increments('id').primary();
      user.string('username', 255).unique();
      user.string('password_hash', 255);
      user.string('password_salt', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
