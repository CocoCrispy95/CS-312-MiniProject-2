// Age bands. Each has 3 characters; one is picked at random.
// `id` is the PokeAPI Pokédex number used to fetch artwork and types.
module.exports = [
  { max: 12, label: "a rookie", characters: [
    { id: 172, trait: "Small, spark-filled and full of energy. Everyone underestimates you, and you love it." },
    { id: 446, trait: "Hungry, curious and always snacking. You're just getting started and already a fan favourite." },
    { id: 447, trait: "Quick to learn and eager to grow. Your first big adventure is right around the corner." } ] },
  { max: 19, label: "a rising hero", characters: [
    { id: 25,  trait: "Energetic and lovable. You're the face of every group you're in, and you spark things up." },
    { id: 255, trait: "Fiery and fast. You go all in, and then you go in harder." },
    { id: 133, trait: "Full of potential. You can adapt to anything, and you haven't picked a path yet." } ] },
  { max: 34, label: "in your prime", characters: [
    { id: 6,   trait: "Bold and confident, with a flair for the dramatic. You don't do things quietly." },
    { id: 448, trait: "Focused and disciplined, with a strong sense of right and wrong. You read a room in seconds." },
    { id: 94,  trait: "Mischievous with a big grin. You love a good prank and a better late-night story." } ] },
  { max: 54, label: "a veteran", characters: [
    { id: 143, trait: "Relaxed, hungry and impossible to move. You know exactly what matters: rest and snacks." },
    { id: 59,  trait: "Loyal, noble and brave. You're the one people trust to have their back." },
    { id: 68,  trait: "Strong, steady and endlessly helpful. You've done this a hundred times, and you make it look easy." } ] },
  { max: Infinity, label: "legendary", characters: [
    { id: 150, trait: "Powerful and mysterious. People tell stories about you, and most of them are true." },
    { id: 249, trait: "Calm, wise and rarely seen. You watch over everyone from the deep end." },
    { id: 65,  trait: "Sharp-minded and unshakeable. You've seen it all, and you still see it coming." } ] }
];
