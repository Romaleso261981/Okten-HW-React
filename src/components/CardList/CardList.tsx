import React from "react";

import s from "./CardList.module.css";

interface Card {
  id: number;
  title: string;
  description: string;
}

interface CardListProps {
  cards: Card[];
}

export const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className={s.wrapper}>
      {cards.map((card) => (
        <div className={s.cardItem} key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
