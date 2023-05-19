import * as NeverHaveIEver from "./json/never-have-i-ever.json";
import * as TruthOrDare from "./json/truth-or-dare.json";
import * as WouldYouRather from "./json/would-you-rather.json";
import * as Trivia from "./json/trivia.json";

export interface IWouldYouRather {
  sentence: string;
  choice: {
    one: string;
    two: string;
  };
}

type Categories =
  | "History"
  | "Geography"
  | "Science"
  | "Movies"
  | "Sports"
  | "Literature"
  | "Technology"
  | "Miscellaneous"
  | "Music"
  | "Mythology"
  | "Food and Drink"
  | "Politics"
  | "Science Fiction"
  | "Pop Culture";

type Difficulties = "Easy" | "Medium" | "Hard";

export interface ITrivia {
  category: Categories;
  difficulty: Difficulties;
  sentence: string;
  correct: string;
  choices: [string, string, string, string];
}

/**
 * Get a random element from an array
 */
function random(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get a random "never have I ever" sentence
 * @example neverHaveIEver();
 */
export function neverHaveIEver(): string {
  return `Never have I ever ${random(
    (NeverHaveIEver as unknown as { default: string[] }).default
  )}.`;
}

/**
 * Get a random "truth or dare" sentence
 * @param {"truth" | "dare"} type - Truth or dare
 * @example truthOrDare();
 */
export function truthOrDare(type: "truth" | "dare"): string {
  if (typeof type !== "string")
    throw new Error("Type option needs to be a string");

  const json = (
    TruthOrDare as unknown as {
      default: {
        truth: string[];
        dare: string[];
      };
    }
  ).default;
  if (type === "truth") return random(json.truth);
  else return random(json.dare);
}

/**
 * Get a random "would you rather" sentence
 * @example wouldYouRather();
 */
export function wouldYouRather(): IWouldYouRather {
  const arr: string[] = random(
    (WouldYouRather as unknown as { default: string[] }).default
  );
  return {
    sentence: `Would you rather ${arr[0]} or ${arr[1]}?`,
    choice: {
      one: arr[0],
      two: arr[1],
    },
  };
}

/**
 * Get a random "trivia" sentence
 * @param {Categories[]} options.categories - Get only the requested type of categories
 * @param {Difficulties[]} options.difficulties - Get only the requested difficulties
 * @example trivia({ categories: ["History"], difficulties: ["Easy"] });
 */
export function trivia(
  options: {
    categories?: Categories[];
    difficulties?: Difficulties[];
  } = {
    categories: [
      "History",
      "Geography",
      "Science",
      "Movies",
      "Sports",
      "Literature",
      "Technology",
      "Miscellaneous",
      "Music",
      "Mythology",
      "Food and Drink",
      "Politics",
      "Science Fiction",
      "Pop Culture",
    ],
    difficulties: ["Easy", "Medium", "Hard"],
  }
): ITrivia {
  return random(
    (Trivia as unknown as { default: ITrivia[] }).default.filter(
      (x) =>
        options.categories.includes(x.category) &&
        options.difficulties.includes(x.difficulty)
    )
  );
}
