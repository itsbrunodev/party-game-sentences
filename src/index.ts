import { readFileSync } from "node:fs";
import { join } from "node:path";

const JSON_PATH = join(process.cwd(), "src", "json");
const NEVER_HAVE_I_EVER_PATH = join(JSON_PATH, "never-have-i-ever.json");
const TRUTH_OR_DARE_PATH = join(JSON_PATH, "truth-or-dare.json");
const WOULD_YOU_RATHER_PATH = join(JSON_PATH, "would-you-rather.json");

const NEVER_HAVE_I_EVER = getJson<string[]>(NEVER_HAVE_I_EVER_PATH);
const TRUTH_OR_DARE = getJson<{
  truth: string[];
  dare: string[];
}>(TRUTH_OR_DARE_PATH);
const WOULD_YOU_RATHER = getJson<string[][]>(WOULD_YOU_RATHER_PATH);

export interface IWouldYouRather {
  sentence: string;
  choices: [string, string];
}

export const TRIVIA_CATEGORIES = [
  "Animal",
  "Brain Teaser",
  "Celebrities",
  "Entertainment",
  "For Kids",
  "General",
  "Geography",
  "History",
  "Hobbies",
  "Humanities",
  "Literature",
  "Movies",
  "Music",
  "People",
  "Religion",
  "Science",
  "Sports",
  "Television",
  "Video Games",
  "World",
] as const;

const TRIVIA_QUESTIONS: ITrivia[] = [].concat(...getTriviaJson());

export type TCategory = (typeof TRIVIA_CATEGORIES)[number];

export interface ITrivia {
  category: TCategory;
  sentence: string;
  correct: string;
  choices: string[];
}

export interface ITruthOrDareRaw {
  truth: string[];
  dare: string[];
}

/**
 * Get a random element from an array
 */
function random(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function getTriviaJson() {
  return TRIVIA_CATEGORIES.map((category) =>
    getJson<ITrivia[]>(
      join(
        JSON_PATH,
        "trivia",
        `${category.replace(/\s+/g, "-").toLowerCase()}.json`
      )
    )
  );
}

function wouldYouRatherConstructor(choices: [string, string]): IWouldYouRather {
  return {
    sentence: `Would you rather ${choices[0]} or ${choices[1]}?`,
    choices,
  };
}

function neverHaveIEverConstructor(str: string) {
  return `Never have I ever ${str}.`;
}

/**
 * Get one or multiple `Never Have I Ever` sentences
 * @example neverHaveIEver();
 */
export function neverHaveIEver(): string {
  return neverHaveIEverConstructor(random(NEVER_HAVE_I_EVER));
}

/**
 * Get one or multiple `Truth or Dare` sentences
 * @param {"truth" | "dare"} type - Truth or Dare
 * @example truthOrDare();
 */
export function truthOrDare(type: "truth" | "dare"): string {
  if (typeof type !== "string")
    throw new Error('"type" parameter needs to be a string');
  if (!["truth", "dare"].includes(type))
    throw new Error('"type" parameter needs to be either "truth" or "dare"');
  if (type === "truth") return random(TRUTH_OR_DARE.truth);
  else return random(TRUTH_OR_DARE.dare);
}

/**
 * Get one or multiple `Would You Rather` sentences
 * @example wouldYouRather();
 */
export function wouldYouRather(): IWouldYouRather {
  return wouldYouRatherConstructor(random(WOULD_YOU_RATHER));
}

/**
 * Get one or multiple `Trivia` sentences
 * @param {TCategory[]} options.categories - Get only the requested type of categories
 * @example trivia({ categories: ["History"] });
 */
export function trivia(
  options: {
    categories?: TCategory[];
  } = {
    categories: [],
  }
): ITrivia {
  if (
    options.categories.length > 0 &&
    !options.categories.every((category) =>
      TRIVIA_CATEGORIES.includes(category)
    )
  )
    throw new Error(
      '"options.categories" parameter can only consist of elements also found in "TRIVIA_CATEGORIES"'
    );
  return random(
    options.categories.length === 0
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter((x) => options.categories.includes(x.category))
  );
}

console.log(trivia());

/**
 * Get every sentence from a party game
 * @param {string} partyGame - The party game type
 * @param {boolean} raw - Return a raw JSON response without the responses being formatted
 * @example getEverySentence("would-you-rather", true);
 */
export function getEverySentence(
  partyGame: "never-have-i-ever",
  raw?: boolean
): string[];
export function getEverySentence(partyGame: "trivia", raw?: false): ITrivia[];
export function getEverySentence(
  partyGame: "truth-or-dare",
  raw?: false
): ITruthOrDareRaw;
export function getEverySentence(
  partyGame: "would-you-rather",
  raw?: true
): IWouldYouRather["choices"][];
export function getEverySentence(
  partyGame: "would-you-rather",
  raw?: false
): IWouldYouRather[];
export function getEverySentence(
  partyGame:
    | "never-have-i-ever"
    | "trivia"
    | "truth-or-dare"
    | "would-you-rather",
  raw = false
) {
  switch (partyGame) {
    case "never-have-i-ever": {
      if (raw) return NEVER_HAVE_I_EVER;
      else return NEVER_HAVE_I_EVER.map((x) => neverHaveIEverConstructor(x));
    }
    case "trivia": {
      return TRIVIA_QUESTIONS;
    }
    case "truth-or-dare": {
      return TRUTH_OR_DARE;
    }
    case "would-you-rather": {
      const res = WOULD_YOU_RATHER as IWouldYouRather["choices"][];
      if (raw) return res;
      else return res.map((choices) => wouldYouRatherConstructor(choices));
    }
    default: {
      throw Error(`Party game "${partyGame}" does not exist`);
    }
  }
}
