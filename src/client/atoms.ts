import { atom } from "jotai";

export const ActivitiesAtom = atom(
  [
    {
      id: 1,
      name: "Easy run",
      description: "This run was soooooo easy. I'm so great.",
    },
    {
      id: 2,
      name: "Hard run",
      description: "I tried so hard and got so far",
    },
  ]
);