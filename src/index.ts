/* @ts-ignore */
import * as NeverHaveIEver from "./json/never-have-i-ever.json" assert { type: "json" };
/* @ts-ignore */
import * as TruthOrDare from "./json/truth-or-dare.json" assert { type: "json" };
/* @ts-ignore */
import * as WouldYouRather from "./json/would-you-rather.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaAnimal from "./json/trivia/animal.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaBrainTeaser from "./json/trivia/brain-teaser.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaCelebrities from "./json/trivia/celebrities.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaEntertainment from "./json/trivia/entertainment.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaForKids from "./json/trivia/for-kids.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaGeneral from "./json/trivia/general.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaGeography from "./json/trivia/geography.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaHistory from "./json/trivia/history.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaHobbies from "./json/trivia/hobbies.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaHumanities from "./json/trivia/humanities.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaLiterature from "./json/trivia/literature.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaMovies from "./json/trivia/movies.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaMusic from "./json/trivia/music.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaPeople from "./json/trivia/people.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaReligion from "./json/trivia/religion.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaScience from "./json/trivia/science.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaSports from "./json/trivia/sports.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaTelevision from "./json/trivia/television.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaVideoGames from "./json/trivia/video-games.json" assert { type: "json" };
/* @ts-ignore */
import * as TriviaWorld from "./json/trivia/world.json" assert { type: "json" };

export interface IWouldYouRather {
  sentence: string;
  choice: {
    one: string;
    two: string;
  };
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
  "People",
  "Religion",
  "Science",
  "Sports",
  "Television",
  "Video Games",
  "World",
] as const;

const triviaQuestions = [
  TriviaAnimal,
  TriviaBrainTeaser,
  TriviaCelebrities,
  TriviaEntertainment,
  TriviaForKids,
  TriviaGeneral,
  TriviaGeography,
  TriviaHistory,
  TriviaHobbies,
  TriviaHumanities,
  TriviaLiterature,
  TriviaMovies,
  TriviaMusic,
  TriviaPeople,
  TriviaReligion,
  TriviaScience,
  TriviaSports,
  TriviaTelevision,
  TriviaVideoGames,
  TriviaWorld,
].map((x) => toDefault<ITrivia[]>(x).default);

const TRIVIA_QUESTIONS: ITrivia[] = [].concat(...triviaQuestions);

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

function toDefault<T>(file: any) {
  return file as { default: T };
}

/**
 * Get a random "never have I ever" sentence
 * @example neverHaveIEver();
 */
export function neverHaveIEver(): string {
  return `Never have I ever ${random(
    toDefault<string[]>(NeverHaveIEver).default
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

  const json = toDefault<{
    truth: string[];
    dare: string[];
  }>(TruthOrDare).default;
  if (type === "truth") return random(json.truth);
  else return random(json.dare);
}

/**
 * Get a random "would you rather" sentence
 * @example wouldYouRather();
 */
export function wouldYouRather(): IWouldYouRather {
  const arr: string[] = random(toDefault<string[]>(WouldYouRather).default);
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
  return random(
    options.categories.length === 0
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter((x) => options.categories.includes(x.category))
  );
}

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
): string[][];
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
      const res = toDefault<string[]>(NeverHaveIEver).default;
      if (raw) return res;
      else return res.map((x) => `Never have I ever ${x}.`);
    }
    case "trivia": {
      return TRIVIA_QUESTIONS;
    }
    case "truth-or-dare": {
      return toDefault<ITruthOrDareRaw>(TruthOrDare).default;
    }
    case "would-you-rather": {
      const res = toDefault<string[][]>(WouldYouRather).default;
      if (raw) return res;
      else
        return res.map(
          (x) =>
            ({
              sentence: `Would you rather ${x[0]} or ${x[1]}?`,
              choice: {
                one: x[0],
                two: x[1],
              },
            } as IWouldYouRather)
        );
    }
    default: {
      throw Error(`Party game "${partyGame}" does not exist`);
    }
  }
}
