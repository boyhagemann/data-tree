Neo4j Data Tree config
================================================

This package loads a Neo4j data tree and will present it as JSON-LD

## Install Neo4j
1. Install Docker
2. Install the official Neo4j image
3. Go to the browser interface and run this query:
```
CREATE (a:Node {id: 1, name: "root"})
CREATE (v1:Box {id: 2, class: "box box--offset m p"})
CREATE (b:Node {id: 3, name: "child 1"})
CREATE (c:Node {id: 4, name: "child 2"})
CREATE (v2:Link {id: 5, href: "/testurl", class: "btn btn--positive"})
CREATE (d:Node {id: 6, name: "child 3"})
CREATE (v3:Text {id: 7, text: "Hello"})
CREATE (e:Node {id: 8, name: "child 4"})
CREATE (v4:Text {id: 9, text: "World"})
CREATE (b) - [:HAS_PARENT] -> (a)
CREATE (c) - [:HAS_PARENT] -> (a)
CREATE (d) - [:HAS_PARENT] -> (c)
CREATE (e) - [:HAS_PARENT] -> (c)
CREATE a - [:HAS_VALUE] -> v1
CREATE c - [:HAS_VALUE] -> v2
CREATE d - [:HAS_VALUE] -> v3
CREATE e - [:HAS_VALUE] -> v4
```

## Install package
1. `git clone https://github.com/boyhagemann/data-tree`
2. Rename `.example.env` to `.env` and adjust its contents
3. Run `npm install`
4. Run `npm run serve`
5. Browse to `http://localhost:3000/node/1` to see a json tree response. 


