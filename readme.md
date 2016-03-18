Neo4j Data Tree config
-------------------------------------------------

This package loads a Neo4j data tree and will present it as JSON-LD

## Install
1. Install Docker
2. Install the official Neo4j image
3. Go to the browser interface login with the default Neo4j credentials
4. You will be asked to change your password. Remember this for later.
5. `git clone https://github.com/boyhagemann/data-tree`
6. Rename `.example.env` to `.env` and adjust its contents e.g. your new Neo4j password.
7. Run `npm install`
8. Run `npm run serve`
9. Browse to `http://localhost:3000/node/1` to see a json tree response.


