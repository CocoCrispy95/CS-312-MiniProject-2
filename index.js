const express = require("express");
const axios = require("axios");
const path = require("path");
const bands = require("./data/characters");

const app = express();
const PORT = process.env.PORT || 3000;
const AGIFY_URL = process.env.AGIFY_URL || "https://api.agify.io";
const POKEAPI_BASE = process.env.POKEAPI_BASE || "https://pokeapi.co/api/v2";

// IDs used for the background wall of characters
const backgroundIds = bands.flatMap((b) => b.characters.map((c) => c.id));
const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const render = (res, status, extra = {}) =>
  res.status(status).render("index", {
    backgroundIds, spriteUrl,
    result: null, error: null, name: "",
    ...extra,
  });

// Page with the form
app.get("/", (req, res) => render(res, 200));

// Form submission: name -> Agify (age) -> pick character -> PokeAPI (artwork)
app.post("/reveal", async (req, res) => {
  const name = String(req.body.name || "").trim();

  // Letters, spaces, hyphens and apostrophes only, up to 30 characters
  if (!/^[\p{L}][\p{L}\s'-]{0,29}$/u.test(name)) {
    return render(res, 400, { name, error: "Please enter a first name using letters only." });
  }

  try {
    // 1. Ask Agify what age this name is most associated with
    const firstName = name.split(/\s+/)[0];
    const agify = await axios.get(AGIFY_URL, { params: { name: firstName }, timeout: 8000 });
    const age = agify.data.age;

    if (age === null || age === undefined) {
      return render(res, 404, {
        name,
        error: `We don't have data for "${firstName}". Try a different name or spelling.`,
      });
    }

    // 2. Use the age to choose a band, then a random character in it
    const band = bands.find((b) => age <= b.max);
    const pick = band.characters[Math.floor(Math.random() * band.characters.length)];

    // 3. Fetch that character's artwork and types
    const { data } = await axios.get(`${POKEAPI_BASE}/pokemon/${pick.id}`, { timeout: 8000 });
    const art = data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default;

    render(res, 200, {
      name,
      result: {
        firstName,
        age,
        label: band.label,
        character: data.name.replace(/-/g, " "),
        image: art,
        types: data.types.map((t) => t.type.name),
        trait: pick.trait,
      },
    });
  } catch (err) {
    console.error("API request failed:", err.message);
    const limited = err.response && err.response.status === 429;
    render(res, limited ? 429 : 502, {
      name,
      error: limited
        ? "Too many requests today. Please try again later."
        : "We couldn't reach the character database. Please try again in a moment.",
    });
  }
});

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
