# Directus API Fetch Bundle

Connect to the 3rd-party api's, then add selected items to your configured collection.

## Details

- Speed up the process of adding items from external sources.
- No, I intentionally only used what is natively available.
- One endpoint and one panel.
- Things I'd improve if I had more time:
    - I would extend it support more data sources (contacts, books, plants, cars, music, etc). 
    - Add more views, filters and responsive.
    - Automatically create the collection with the necessary fields.
    - Refine the code, debounce the input, more checks, etc.
    - Refine the permissions implementation.
    - Make it work with any api.

## Set Up Instructions

The endpoint uses the TVMaze api, which doesn't require any token to api key.

0) Add the extension to your Directus extensions directory.
1) Whitelist the TVMaze domain to allow the show cover image in the selected item preview:
```CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC: "'self' data: blob: https://static.tvmaze.com"```
2) Restart Directus.
3) Create a new collection to store your saved videos. To match the api response the collection should have the following fields:
    - name: string
    - date_created: datetime | timestamp
    - slug: string | slugify
    - network: string
    - country: string
    - runtime: integer
    - genre: csv | tags
    - image: string
    - thumb: string
4) Add a new panel and select the API Lookup panel from the list of available panels.
5) Select a collection you would like to save to.
6) Select the name column from the Response configuration field.
7) Once the panel is added to your dashboard, simply search for items in the TVMaze database, select an item from the results then click save to Directus.

## Screenshots

![Setup your destination collection](./screenshot-1.png)
![Search for an item in the TVMaze database](./screenshot-2.png)
![Select the result and save to Directus](./screenshot-3.png)

## Video preview

[<img
  style="width: 100%; margin: auto; display: block;"
  class="vidyard-player-embed"
  src="https://play.vidyard.com/kApfjos8yrLQPzzofU4j16.jpg"
  data-uuid="kApfjos8yrLQPzzofU4j16"
  data-v="4"
  data-type="inline"
/>](https://share.vidyard.com/watch/kApfjos8yrLQPzzofU4j16?)
