# intercom-server

To install npm package

    sudo docker-compose run --rm web npm install cors

git status, git diff, git add <filename>, git commit, git push

listen to file 
    
    xdg-open data/8210086b-6d80-4f11-b57b-bd56d53f9ce2 

File download URL is http://localhost:3000/tracks/file/8210086b-6d80-4f11-b57b-bd56d53f9ce2

"path":"/data/8210086b-6d80-4f11-b57b-bd56d53f9ce2"

To build code and run migrations 

DATABASE_URL=postgres://intercom:intercom@localhost/intercom npm run prestart

DATABASE_URL=postgres://intercom:intercom@localhost/intercom npm run migrate

DATABASE_URL=postgres://intercom:intercom@localhost/intercom node ./node_modules/db-migrate/bin/db-migrate up all

Create Table
DATABASE_URL=postgres://intercom:intercom@localhost/intercom node ./node_modules/db-migrate/bin/db-migrate create add-filename

To run server
DATABASE_URL=postgres://intercom:intercom@localhost/intercom FILES=/mnt/c/Users/inges/Projects/intercomServer/uploads npm run dev