/* eslint-disable */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";

import { AllCenterDiv } from "../../../../CommonComponents";
import SecondSelectDeck from "./SecondSelectDeck";

const PokerExtraWrapper = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: olive;
  padding: 1%;
  justify-content: space-between;
  position: relative;
`;
const SelectDeckBox = styled(AllCenterDiv)`
  width: 73%;
  height: 100%;
  background-color: whitesmoke;
  background-color: royalblue;
  display: grid;
  grid-template-columns: repeat(5, minmax(18%, auto));
  grid-template-rows: repeat(2, minmax(100px, auto));
  column-gap: 2%;
  row-gap: 2%;
  align-items: center;
  padding: 0 1%;
`;
const ContorlDeckBox = styled(AllCenterDiv)`
  width: 26%;
  height: 100%;
  background-color: skyblue;
  flex-direction: column;
  justify-content: space-between;
  padding: 1%;
`;
const DeckListPannel = styled(motion.ul)`
  width: 100%;
  height: 55%;
  background-color: royalblue;
  padding-left: 5%;
  padding-top: 5%;
  list-style: none;
  & li {
    color: red;
    font-size: 0.8em;
    width: 100%;
    height: auto;
  }
`;
const ControlBox = styled(AllCenterDiv)`
  width: 100%;
  height: 40%;
  background-color: royalblue;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5%;
`;

function SecondPokerExtraMake(props) {
  const setExtraType = props.setExtraType;
  const setActiveMakeExtra = props.setActiveMakeExtra;

  const [deckControlArr, setDeckControlArr] = useState(new Array(10));

  const DeckNameArr = [
    "Major",
    "Wand",
    "Sword",
    "Cup",
    "Pentacle",
    "Minor",
    `Wand Palace`,
    "Sword Palace",
    "Cup Palace",
    "Pentacle Palace",
  ];
  const DeckImgNumArr = [
    0, // Major
    22, // Wand
    36, // Sword
    50, // Cup
    64, // Pentacle
    73, // Minor
    35, // Wand Palace
    49, // Sword Palace
    63, // Cup Palace
    77, // Pentacle Palace
  ];
  const DeckNumberArr = [
    {
      // Major
      startNum: 0,
      endNum: 21,
    },
    {
      // Wand
      startNum: 22,
      endNum: 31,
    },
    {
      // Sword
      startNum: 36,
      endNum: 45,
    },
    {
      // Cup
      startNum: 50,
      endNum: 59,
    },
    {
      // Pentacle
      startNum: 64,
      endNum: 73,
    },
    {
      // Minor
      startNum: 22,
      endNum: 77,
    },
    {
      // Wand Palace
      startNum: 32,
      endNum: 35,
    },
    {
      // Sword Palace
      startNum: 46,
      endNum: 49,
    },
    {
      // Cup Palace
      startNum: 60,
      endNum: 63,
    },
    {
      // Pentacle Palace
      startNum: 74,
      endNum: 77,
    },
  ];
  return (
    <>
      <PokerExtraWrapper>
        <SelectDeckBox>
          {DeckNameArr.map((a, i) => {
            return (
              <SecondSelectDeck
                key={`selectSecondDeck${i}${a}`}
                deckName={a}
                deckType={i}
                imgNum={DeckImgNumArr[i]}
                // selectCount={selectCount}
                // setSelectCount={setSelectCount}
                // isClickedTotal={isClickedTotal}
                // setSelectDeckArr={setSelectDeckArr}
                // selectDeckArr={selectDeckArr}
                deckControlArr={deckControlArr}
                setDeckControlArr={setDeckControlArr}
                // isMinorTotalClicked={isMinorTotalClicked}
                // setIsMinorTotalClicked={setIsMinorTotalClicked}
                // stringArr={stringArr}
              />
            );
          })}
        </SelectDeckBox>
        <ContorlDeckBox>
          <DeckListPannel></DeckListPannel>
          <ControlBox></ControlBox>
        </ContorlDeckBox>
        {/* <AnimatePresence>
          {isError === true ? (
            <ErrorPanel key={`questionTarotError1`}>{errorMessage}</ErrorPanel>
          ) : null}
        </AnimatePresence> */}
      </PokerExtraWrapper>
    </>
  );
}

export default SecondPokerExtraMake;
