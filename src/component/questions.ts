export type Question = {
  question: string;
  type: Types;
};

enum Types {
  WARMING_UP = "Warming up",
  TENDER_THINGS = "Tender things",
  BIG_SERIOUS_THINGS = "Big serious things",
  EMOTIONAL_THINGS = "Emotional things",
}

export const questions = [
  {
    question: "abc",
    type: Types.WARMING_UP,
  },
  {
    question: "abc",
    type: Types.TENDER_THINGS,
  },
];
