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
    question: "What are you currently worried you might forget or overlook?",
    type: Types.WARMING_UP,
  },
  {
    question:
      "What are you going to need to sort out in the coming few months?",
    type: Types.WARMING_UP,
  },
  {
    question: "If you weren't here, what might you want to be doing?",
    type: Types.WARMING_UP,
  },
  {
    question: "What scared you recently?",
    type: Types.WARMING_UP,
  },
  {
    question: "What's exciting you at the moment?",
    type: Types.WARMING_UP,
  },
  {
    question: "What would enable you to die (more or less) happy?",
    type: Types.BIG_SERIOUS_THINGS,
  },
  {
    question: "What things do you crave to be reassured about?",
    type: Types.TENDER_THINGS,
  },
  {
    question: "What would you want people to say about you after you're gone?",
    type: Types.TENDER_THINGS,
  },
  {
    question: "What I really look for in a friend is...",
    type: Types.TENDER_THINGS,
  },
  {
    question: "What's the most important thing you've ever learned?",
    type: Types.TENDER_THINGS,
  },
  {
    question:
      "If I had a magic wand, the problem I'd most like to get rid of in my life is...",
    type: Types.BIG_SERIOUS_THINGS,
  },
  {
    question: "If I had more courage I would...",
    type: Types.BIG_SERIOUS_THINGS,
  },
  {
    question: "What sort of person do you admire and, secretly, envy too?",
    type: Types.BIG_SERIOUS_THINGS,
  },
  {
    question: "If I knew I couldn't fail, I might...",
    type: Types.BIG_SERIOUS_THINGS,
  },
  {
    question: "What do you wish people would better understand about you?",
    type: Types.EMOTIONAL_THINGS,
  },
  {
    question: "What do you want more of in your life?",
    type: Types.EMOTIONAL_THINGS,
  },
  {
    question: "In what areas do you feel most inadequate?",
    type: Types.EMOTIONAL_THINGS,
  },
  {
    question: "What have you been learning about yourself recently?",
    type: Types.EMOTIONAL_THINGS,
  },
];
