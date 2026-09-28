# Which character are you?

Type your first name and get a videogame character based on the age your name is most associated with.
Built with Node.js, Express, EJS and Axios, using two free APIs with no key:
[Agify](https://agify.io/) (predicts age from a name) and [PokeAPI](https://pokeapi.co/) (character artwork and types).

## Run it
    npm install
    npm start        # http://localhost:3000

## How it works
- `GET /` shows the name form.
- `POST /reveal` sends the name to Agify with Axios, uses the predicted age to choose an age band
  (`data/characters.js`, 3 characters each), fetches that character from PokeAPI, and renders the result with EJS.
- Invalid names, names Agify has no data for, rate limits and network failures all show an error message
  and bring the form back with the name still filled in.

Note: Agify's free tier has a daily request limit per IP.
