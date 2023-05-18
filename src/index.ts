import * as fs from "fs";
import * as path from "path";

import * as NeverHaveIEver from "./json/never-have-i-ever.json";
import * as TruthOrDare from "./json/truth-or-dare.json";
import * as WouldYouRather from "./json/would-you-rather.json";

export interface IWouldYouRather {
  question: string;
  options: {
    one: string;
    two: string;
  };
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
    question: `Would you rather ${arr[0]} or ${arr[1]}?`,
    options: {
      one: arr[0],
      two: arr[1],
    },
  };
}

console.log(wouldYouRather());
