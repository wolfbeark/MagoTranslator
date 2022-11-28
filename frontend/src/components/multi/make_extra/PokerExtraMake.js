/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { AllCenterDiv } from "../../../CommonComponents";
import SelectDeck from "../make_extra/SelectDeck";

const PokerExtraWrapper = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: olive;
  padding: 1%;
  justify-content: space-between;
`;
const SelectDeckBox = styled(AllCenterDiv)`
  width: 73%;
  height: 100%;
  background-color: whitesmoke;
  background-color: royalblue;
  //border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(5, minmax(18%, auto));
  grid-template-rows: repeat(2, minmax(100px, auto));
  column-gap: 2%;
  row-gap: 2%;
  align-items: center;
  // & div{
  //     width: 100%;
  //     height: 100%;
  //     background-color: black;
  // }
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
    //font-family: "Jua";
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
const AlertLi = styled(motion.li)`
  width: 100%;
  height: 10%;
  color: red;
`;
const ExtraBtnBox = styled(AllCenterDiv)`
  width: 100%;
  height: 20%;
  background-color: rgba(130, 204, 221, 1);
  padding: 2%;
  cursor: pointer;
  & button {
    width: 100%;
    height: 100%;
    background-color: navy;
    outline: unset;
    border: none;
    color: beige;
    cursor: pointer;
  }
`;
const controlVar = {
  hover: {
    scale: 1.05,
  },
  click: {
    scale: 1.0,
  },
  active: {
    backgroundColor: "rgba(250, 211, 144, 1.0)",
  },
  inactive: {
    backgroundColor: "rgba(130, 204, 221,1.0)",
  },
};
function PokerExtraMake(props) {
  const setExtraType = props.setExtraType;

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
  const [selectDeckArr, setSelectDeckArr] = useState(["Select Deck Or Total"]);
  const [selectCount, setSelectCount] = useState(0);
  const [isClickedTotal, setIsClickedTotal] = useState(false);
  const [deckControlArr, setDeckControlArr] = useState(new Array(10));
  const [isMinorTotalClicked, setIsMinorTotalClicked] = useState(false);
  // useEffect(() => {
  //   console.log(deckControlArr);
  // }, [deckControlArr]);
  //console.log(deckControlArr);
  const stringArr = ["Select Deck Or Total", "Total"];
  const totalControlHandler = () => {
    let tempArr = [];
    let tempInfoArr = [...deckControlArr];
    if (isClickedTotal === false) {
      setIsClickedTotal((prev) => !prev);
      tempArr.push(stringArr[1]);
      for (let i = 0; i < deckControlArr.length; i++) {
        tempInfoArr[i].isClicked = false;
        tempInfoArr[i].setIsClicked(false);
      }
      setSelectDeckArr(tempArr);
      setDeckControlArr([...tempInfoArr]);
      setSelectCount(1);
    } else if (isClickedTotal === true) {
      setIsClickedTotal((prev) => !prev);
      for (let i = 0; i < deckControlArr.length; i++) {
        tempInfoArr[i].isClicked = false;
        tempInfoArr[i].setIsClicked(false);
      }
      tempArr.push(stringArr[0]);
      setDeckControlArr([...tempInfoArr]);
      setSelectDeckArr(tempArr);
      setSelectCount(0);
      //console.log(selectCount);
    }
    //console.log("total : ", selectCount);
  };
  const clearControlHandler = () => {
    let tempCount = isClickedTotal === false ? 0 : 1;
    //console.log("tempCount : ", tempCount);
    setSelectCount(tempCount);
    let temp = [isClickedTotal === false ? stringArr[0] : stringArr[1]];
    setSelectDeckArr(temp);
    let tempArr = [...deckControlArr];
    for (let i = 0; i < deckControlArr.length; i++) {
      tempArr[i].isClicked = false;
      tempArr[i].setIsClicked(false);
    }
    setDeckControlArr([...tempArr]);
    //console.log("clear : ", selectCount);
  };

  const makeErrorChecker = () => {
    // total, selectCount, ListNameArr
    if (isClickedTotal === false) {
    } else if (isClickedTotal === false) {
    }
  };
  const makeControlHandler = () => {};
  return (
    <>
      <PokerExtraWrapper>
        <SelectDeckBox>
          {DeckNameArr.map((a, i) => {
            return (
              <SelectDeck
                key={`selectDeck${i}${a}`}
                deckName={a}
                deckType={i}
                imgNum={DeckImgNumArr[i]}
                selectCount={selectCount}
                setSelectCount={setSelectCount}
                isClickedTotal={isClickedTotal}
                setSelectDeckArr={setSelectDeckArr}
                selectDeckArr={selectDeckArr}
                deckControlArr={deckControlArr}
                setDeckControlArr={setDeckControlArr}
                isMinorTotalClicked={isMinorTotalClicked}
                setIsMinorTotalClicked={setIsMinorTotalClicked}
                stringArr={stringArr}
              />
            );
          })}
        </SelectDeckBox>
        <ContorlDeckBox>
          <DeckListPannel>
            {selectDeckArr.map((a, i) => {
              return <li key={`selNameList${i}${a}`}>{a}</li>;
            })}
          </DeckListPannel>
          <ControlBox>
            <ExtraBtnBox
              variants={controlVar}
              whileHover="hover"
              whileTap="click"
              animate={isClickedTotal === false ? "inactive" : "active"}
            >
              <button onClick={totalControlHandler}>Total</button>
            </ExtraBtnBox>
            <ExtraBtnBox>
              <button onClick={clearControlHandler}>Clear</button>
            </ExtraBtnBox>
            <ExtraBtnBox>
              <button>Make</button>
            </ExtraBtnBox>
            <ExtraBtnBox>
              <button onClick={() => setExtraType(5)}>Back</button>
            </ExtraBtnBox>
          </ControlBox>
        </ContorlDeckBox>
      </PokerExtraWrapper>
    </>
  );
}

export default PokerExtraMake;
