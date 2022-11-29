/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DeckContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;
const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 70%;
  //background-color: black;
  padding: 5%;
  border-radius: 10px;
`;
const ImageBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: royalblue;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px black;
`;
const TextBox = styled(motion.div)`
  width: 100%;
  height: 20%;
  background-color: skyblue;
  border-radius: 10px;
  cursor: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jua";
  font-size: 0.8em;
  font-weight: 600;
  text-align: center;
`;
const imageBoxVariants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
  },
  hover: {
    scale: 1.1,
  },
  click: {
    scale: 1.0,
  },
};
function SecondSelectDeck(props) {
  const deckName = props.deckName;
  const type = props.deckType;
  const imgNum = props.imgNum;

  const setDeckControlArr = props.setDeckControlArr;
  let deckControlArr = props.deckControlArr;

  const [isClicked, setIsClicked] = useState(false);

  const DeckNameArr = [
    "+ Major",
    "+ Wand",
    "+ Sword",
    "+ Cup",
    "+ Pentacle",
    "+ Minor", // 5
    `+ Wand Palace`,
    "+ Sword Palace",
    "+ Cup Palace",
    "+ Pentacle Palace",
  ];
  const MinusDeckNameArr = [
    "- Major",
    "- Wand",
    "- Sword",
    "- Cup",
    "- Pentacle",
    "- Minor",
    `- Wand Palace`,
    "- Sword Palace",
    "- Cup Palace",
    "- Pentacle Palace",
  ];

  useEffect(() => {
    let tempArr = deckControlArr;
    let temp = {
      isClicked: isClicked,
      setIsClicked: setIsClicked,
    };
    tempArr[type] = temp;
    setDeckControlArr(tempArr);
  }, []);
  return (
    <DeckContainer>
      <ImageContainer>
        <ImageBox
          variants={imageBoxVariants}
          imgsrc={`${process.env.PUBLIC_URL}/images/TarotDefault/Default${imgNum}.png`}
          //onClick={() => clickDeckHandler()}
          //onClick={() => testClick(type)}
          //onClick={() => totalOffDeckClick(type)}
          onClick={() => deckClickHandler(type)}
          animate={isClicked === false ? "active" : "inactive"}
          whileHover="hover"
          whileTap="click"
        />
      </ImageContainer>
      <TextBox>{deckName}</TextBox>
    </DeckContainer>
  );
}

export default SecondSelectDeck;
