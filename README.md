# intercom-server

To install npm package

    sudo docker-compose run --rm web npm install cors

## TO COMMIT TO GITHUB

git status, git diff, git add <filename>, git commit, git push

## TO LISTEN TO FILE 
    
    xdg-open data/8210086b-6d80-4f11-b57b-bd56d53f9ce2 

File download URL is http://localhost:3000/tracks/file/8210086b-6d80-4f11-b57b-bd56d53f9ce2

"path":"/data/8210086b-6d80-4f11-b57b-bd56d53f9ce2"

## CREATE MIGRATION

DATABASE_URL=postgres://intercom:intercom@localhost/intercom node ./node_modules/db-migrate/bin/db-migrate create add-filename

## TO RUN MIGRATIONS  

(* see package.js file to see more commands)

(*runs up all)

DATABASE_URL=postgres://intercom:intercom@localhost/intercom npm run migrate 

## TO RUN SERVER

DATABASE_URL=postgres://intercom:intercom@localhost/intercom FILES=/mnt/c/Users/inges/Projects/intercomServer/uploads npm run dev

## USER LIST WITH FILTER
localhost:3000/users?email_address=isaunders@wbjs.org.za

## QUERY 
SELECT t.upload_date, t.file_name FROM tracks t 
    LEFT OUTER JOIN listened l on t.id = l.track_id 
    WHERE $1 = l.user_id 
    AND l.id IS NULL 
    ORDER BY id ASC