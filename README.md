## party-game-sentences

Generate random party game sentences like trivia, would you rather, never have I ever and truth or dare. Every trivia sentence can be found at <a href="https://github.com/uberspot/OpenTriviaQA" target="_blank">uberspot/OpenTriviaQA</a>.

### Installation

```
npm install party-game-sentences
```

### Usage

```ts
import {
  neverHaveIEver,
  truthOrDare,
  wouldYouRather,
  trivia,
} from "party-game-sentences";
// or
const {
  neverHaveIEver,
  truthOrDare,
  wouldYouRather,
  trivia,
} = require("party-game-sentences");
```

### Example Responses

Below are examples of each function that returns a sentence.

#### Getting a never have I ever sentence

```ts
neverHaveIEver();
// Never have I ever been skydiving.
```

#### Getting a truth or dare sentence

```ts
truthOrDare("truth");
// Have you ever cheated on a test?

truthOrDare("dare");
// Eat a spoonful of mustard.
```

#### Getting a would you rather sentence

```ts
wouldYouRather();
/* {
  sentence: 'Would you rather have the ability to fly or be invisible?',
  choices: ['have the ability to fly', 'be invisible']
} */
```

#### Getting a random trivia sentence

```ts
trivia();
/* {
  "category": "Geography",
  "sentence": "What is the capital of Italy?",
  "correct": "Rome",
  "choices": ["Venice", "Rome", "Naples", "Milan"]
} */
```

#### Getting a trivia sentence in a specific category or categories

An export named `TRIVIA_CATEGORIES` is available where every category is listed as an array of strings.

```ts
trivia({ category: ["General"] });
/* {
  "category": "General",
  "sentence": "This drink contains caffeine.",
  "correct": "Coffee",
  "choices": ["Mineral water", "Orange juice", "Coffee", "Beer"]
} */
```

### Utility

#### Trivia categories

An export named `TRIVIA_CATEGORIES` is available where every category is listed as a readonly array of strings.

```ts
import { TRIVIA_CATEGORIES } from "party-game-sentences";
// or
const { TRIVIA_CATEGORIES } = require("party-game-sentences");
```

#### TypeScript

Although every function uses types and jsdoc for the best experience, there are a couple types exported.

- `TCategory` - a type union consisting of categories found in `TRIVIA_CATEGORIES`
- `ITrivia` - the object that every Trivia sentence is returned as
- `IWouldYouRather` - the object that every Would You Rather sentence is returned as
- `ITruthOrDareRaw` - the raw JSON returned when using `getEverySentence("truth-or-dare", true)`
