Lost and Found System Midterm - Integrative Programming

Lost and found system for items found around campus, the API is made with Node.js and Express, and the page uses fetch() to talk to it. The items are saved in data.json.

Files: server.js - the server and the API routes data.json - where the items are saved public/index.html - the page for viewing, searching, adding and deleting items package.json - the packages needed (express)

To run it: npm install node server.js Then open http://localhost:3000

API routes: GET /api/items - get all items GET /api/items/:id - get one item by id POST /api/items - add a new item DELETE /api/items/:id - delete an item by id

Item fields: id, item_name, category, location_found, date_found, claimed



When an item is added, claimed is always set to false by the server. The user cannot enter it.
A claimed item cannot be deleted. It returns an error (403) and data.json is not changed.
Items are shown as CLAIMED or UNCLAIMED.
data.json starts with one claimed item and two unclaimed items.
There is no update, put or patch.
