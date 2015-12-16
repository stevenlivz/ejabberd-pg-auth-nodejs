# ejabberd-pg-auth-nodejs
The starts of a module in NodeJS for eJabberd to do external authentication against a Postgres database.

**This only does authentication just now - other features may be added in future.**

##eJabberd
Install NodeJS, Postgres and run the eJabberd Sql file to create the database (using plain text passwords).

In your ejabberd.yml file 
- add auth_method=external
- extauth_program = "nodejs /path/to/bin/ejabberd-pg-auth.js"

Make sure that the ejabberd-pg-auth.js can be executed (chmod +x ejabberd-pg-auth.js)

##Node
Edit the config.json file to point to your Postgres database.

###Thanks
- https://github.com/asnare/ejabberd-auth
