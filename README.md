## party-game-sentences

Generate random party game sentences like trivia, would you rather, never have I ever and truth or dare. Every trivia question can be found at [uberspot/OpenTriviaQA](https://github.com/uberspot/OpenTriviaQA).

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

#### Getting a truth sentence (can be "truth" or "dare")

```ts
truthOrDare("truth");
// Have you ever cheated on a test?
```

#### Getting a would you rather sentence

```ts
wouldYouRather();
/* {
  sentence: 'Would you rather have the ability to fly or be invisible?',
  choice: {
    one: 'have the ability to fly',
    two: 'be invisible'
  }
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

#### Getting a trivia sentence in a specific category (can be multiple categories)

```ts
trivia({ category: ["General"] });
/* {
  "category": "General",
  "sentence": "This drink contains caffeine.",
  "correct": "Coffee",
  "choices": ["Mineral water", "Orange juice", "Coffee", "Beer"]
} */
```
