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


## Routes

```
GET /init
```
This route will insert some basic nodes for testing purposes

```
GET /node/:id
```
Shows a tree graph based on one root node.

```
POST /node
```
Create a new node and its values.
Required fields:
* parent (the ID of the parent node)
* type (the value type, e.g. 'Box' or 'Link')
* order (must be an integer)
Optional fields
* props (can be nested, like props[name] of props[label])
* values (can be nested, like values[name] of values[label])

```
UPDATE /node/:id
```
Update new node.
Optional fields
* props (can be nested, like props[name] of props[label])
* values (can be nested, like values[name] of values[label])

```
DELETE /node/:id
```
Delete new node and all of its children.


Components
==============================================
* [ ] Breadcrumb
* [ ] Tabs
* [ ] Node properties
* [ ] Node content

Todo
==============================================
* [ ] Generate form based on PropTypes of component
* [ ] Display a list of available components
* [ ] Drag and drop components as children

