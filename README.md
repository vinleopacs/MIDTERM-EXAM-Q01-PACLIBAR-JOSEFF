# Lost and Found System

Midterm Exam - Integrative Programming (Q01)

This is a Lost and Found Management System for items found around campus. The API is made with Node.js and Express, and the page uses fetch() to talk to it. All the items are saved in data.json.

## Files

- server.js - the server and the API routes
- data.json - where the items are saved
- public/index.html - the page for viewing, searching, adding and deleting items
- package.json - the packages needed (express)

## To run

1. Open the terminal inside the project folder
2. Run `npm install`
3. Run `node server.js`
4. Open http://localhost:3000 in the browser

## Item fields

Each item has these fields:

- id
- item_name
- category
- location_found
- date_found
- claimed

## API routes

- GET /api/items - get all items
- GET /api/items/:id - get one item by id
- POST /api/items - add a new item
- DELETE /api/items/:id - delete an item by id

## How the code works

**server.js**

The server reads data.json every time a request comes in, and writes back to it when an item is added or deleted. This way the file always has the latest items.

- GET /api/items sends back all the items (200).
- GET /api/items/:id looks for the item with that id. If it is not found, it sends an error (404).
- POST /api/items takes item_name, category, location_found and date_found from the request. If any of them is missing, it sends an error (400). The id is the highest id plus one, and `claimed` is always set to false by the server, so the user cannot enter it. The new item is saved and sent back (201).
- DELETE /api/items/:id looks for the item first (404 if not found). If the item is claimed, it sends an error (403) and stops before saving, so data.json is not changed. If it is not claimed, it is removed and the file is saved (200).

**public/index.html**

The page uses fetch() to call the API.

- It loads all the items when the page opens.
- The Search button gets one item by id.
- The Add button sends the form to the API. There is no claimed input in the form.
- The Delete button deletes an item. If the API sends an error, the message is shown in red.
- Each item is shown as CLAIMED or UNCLAIMED depending on its claimed value.

## Instructions from the exam

- When a new item is added, claimed is automatically set to false.
- The user must not enter the claimed value when adding an item.
- A claimed item cannot be deleted.
- Trying to delete a claimed item returns an error and does not change data.json.
- Items are displayed as either CLAIMED or UNCLAIMED.
- The starting data.json has one claimed item and two unclaimed items.
- Only insert, retrieve and delete are done. There is no update, put or patch.

## Status codes used

- 200 - ok
- 201 - item added
- 400 - missing fields
- 403 - tried to delete a claimed item
- 404 - item not found
