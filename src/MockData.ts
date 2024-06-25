interface Card {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export const mockData: Card[] = [
  {
    id: 1,
    title: "Card 1",
    description: "This is card 1",
    createdAt: new Date("2022-01-01")
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is card 2",
    createdAt: new Date("2022-01-02")
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is card 3",
    createdAt: new Date("2022-01-03")
  }
];
