## party-game-sentences

Generate random party game sentences like "would you rather, "never have I ever", "truth or dare", and "trivia".

### Installation

```
npm install party-game-sentences
```

### Usage

```js
// a "never have I ever" sentence
neverHaveIEver();

// a "truth" sentence from "truth or dare"
truthOrDare("truth");

// a "would you rather" sentence
wouldYouRather();

// a "trivia" sentence
trivia();

// a "trivia" sentence in the "Miscellaneous" category and a difficulty of "Easy"
trivia({ categories: ["Miscellaneous"], difficulties: ["Easy"] });

// get every "trivia" sentence
getEverySentence("trivia");
```

### Example response

Unlike the `neverHaveIEver` and `truthOrDare` functions, where only a string is returned, the `wouldYouRather` and `trivia` functions return a unique object.

```js
// a "would you rather" response
{
  sentence: "Would you rather have the ability to fly or be invisible?",
  choice: {
    one: "have the ability to fly",
    two: "be invisible",
  }
}
```

```js
// a "trivia" response
{
  category: "Miscellaneous",
  difficulty: "Easy",
  question: "How many sides does a hexagon have?",
  correct: "6",
  choices: ["6", "4", "8", "10"]
}
```
