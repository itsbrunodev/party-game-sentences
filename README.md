## party-game-sentences

Generate random party game sentences like "would you rather, "never have I ever", and "truth or dare".

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
```

### Example response

Unlike the `neverHaveIEver` and `truthOrDare` functions, where only a string is returned, the `wouldYouRather` function returns an object like the one below.

```js
{
  question: "Would you rather have the ability to fly or be invisible?",
  options: {
    one: "have the ability to fly",
    two: "be invisible",
  }
}
```
