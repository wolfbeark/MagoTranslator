/* eslint-disable */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";

import { AllCenterDiv } from "../../../../CommonComponents";
import SecondSelectDeck from "./SecondSelectDeck";
import { multiManagerAtom, multiModelAtom } from "../../../../atom/multiAtom";
import SelectDeck from "../SelectDeck";

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

const ErrorPanel = styled(AllCenterDiv)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(96, 163, 188, 0.5);
  left: 0;
  top: 0;
`;
const MakePanel = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;
const QuestionMakePanel = styled(AllCenterDiv)`
  width: 50%;
  height: 50%;
  background-color: gray;
  padding: 1%;
  flex-direction: column;
  justify-content: space-evenly;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > span:first-child {
    width: 100%;
    height: 20%;
    background-color: red;
  }
  & > span:nth-child(2) {
    width: 80%;
    height: 15%;
    background-color: blue;
  }
`;
const QuestionInputWrapper = styled(AllCenterDiv)`
  width: 80%;
  height: 20%;
  background-color: skyblue;
  padding: 1%;
`;
const QuestionInput = styled(motion.input)`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  outline: unset;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const QuestionBtnBox = styled(AllCenterDiv)`
  width: 100%;
  height: 25%;
  background-color: beige;
  justify-content: space-evenly;
  padding: 1%;
`;
const QuestionBtnWrapper = styled(AllCenterDiv)`
  width: 30%;
  height: 100%;
  background-color: navy;
  padding: 1%;
`;
const QuestionBtn = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: skyblue;
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
const questionBtnVar = {
  hover: {
    scale: 1.05,
  },
  click: {
    scale: 1,
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
  },
};

function SecondPokerExtraMake(props) {
  const setExtraType = props.setExtraType;
  const setActiveMakeExtra = props.setActiveMakeExtra;

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  const { CurrentSelectNum } = SecondSpread[CurrentChildNumber];
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
  const DeckCardCountArr = [22, 10, 4, 56];
  const [extraCountLimit, setExtraCountLimit] = useState(0);

  const [selectDeckArr, setSelectDeckArr] = useState(["Select Deck Or Total"]);
  const [selectCount, setSelectCount] = useState(0);
  const [isClickedTotal, setIsClickedTotal] = useState(false);
  const [isMinorTotalClicked, setIsMinorTotalClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidSuccess, setIsValidSuccess] = useState(false);
  const [questionNumber, setQuestionNumber] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const stringArr = ["Select Deck Or Total", "Total"];
  const errorMessageArr = [
    "선택된 덱이 없습니다",
    "모든 덱을 제외할 수 없습니다",
    "0 이상, 78 이하의 수를 입력하세요",
  ];
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
  const changeQuestionNumber = (e) => {
    let temp = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
    setQuestionNumber(temp);
  };

  const makeErrorChecker = () => {
    // total, selectCount, ListNameArr
    let flag;
    if (isClickedTotal === false) {
      if (selectCount === 0) {
        flag = false;
        setErrorMessage(errorMessageArr[0]);
      } else {
        flag = true;
      }
    } else if (isClickedTotal === true) {
      if (
        deckControlArr[0].isClicked === true &&
        deckControlArr[5].isClicked === true
      ) {
        flag = false;
        setErrorMessage(errorMessageArr[1]);
      } else if (
        deckControlArr[0].isClicked === true &&
        deckControlArr[5].isClicked === false
      ) {
        let tempCount = 0;
        for (let i = 0; i < deckControlArr.length; i++) {
          if (i === 5 || i === 0) {
            continue;
          } else {
            if (deckControlArr[i].isClicked === true) {
              tempCount++;
            }
          }
        }
        if (tempCount === 8) {
          flag = false;
          setErrorMessage(errorMessageArr[1]);
        } else {
          flag = true;
        }
      } else {
        flag = true;
      }
    }
    return flag;
  };
  const makeControlHandler = () => {
    let flag = makeErrorChecker();
    if (flag === false) {
      setIsError(true);
      setTimeout(() => {
        setErrorMessage("");
        setIsError(false);
      }, [1000]);
    } else if (flag === true) {
      //console.log("success");
      let totalNum = 0;
      if (isClickedTotal === false) {
        for (let i = 0; i < deckControlArr.length; i++) {
          if (deckControlArr[i].isClicked === true) {
            if (i === 0) {
              totalNum += DeckCardCountArr[0];
            } else if (i > 0 && i < 5) {
              if (deckControlArr[5].isClicked === false) {
                totalNum += DeckCardCountArr[1];
              } else {
                continue;
              }
            } else if (i === 5) {
              totalNum += DeckCardCountArr[3];
            } else if (i > 5) {
              if (deckControlArr[5].isClicked === false) {
                totalNum += DeckCardCountArr[2];
              } else {
                continue;
              }
            }
          } else {
            continue;
          }
        }
        setExtraCountLimit(totalNum);
      } else {
        let minorChecker = false; // minorTotal 아님 // 하나라도 눌려있으면 true
        for (let i = 0; i < deckControlArr.length; i++) {
          if (i === 0 || i === 5) {
            continue;
          } else {
            if (deckControlArr[i].isClicked === true) {
              minorChecker = true;
              break;
            }
          }
        }

        for (let i = 0; i < deckControlArr.length; i++) {
          if (deckControlArr[i].isClicked === false) {
            if (i === 0) {
              totalNum += DeckCardCountArr[0];
            } else if (i > 0 && i < 5) {
              totalNum += DeckCardCountArr[1];
            } else if (i === 5) {
              if (
                deckControlArr[1].isClicked === false ||
                deckControlArr[2].isClicked === false ||
                deckControlArr[3].isClicked === false ||
                deckControlArr[4].isClicked === false ||
                deckControlArr[6].isClicked === false ||
                deckControlArr[7].isClicked === false ||
                deckControlArr[8].isClicked === false ||
                deckControlArr[9].isClicked === false
              ) {
                continue;
              } else {
                if (minorChecker === false) {
                  totalNum += DeckCardCountArr[3];
                }
              }
            } else {
              totalNum += DeckCardCountArr[2];
            }
          }
        }
        //console.log(totalNum);
        setExtraCountLimit(totalNum);
      }
      setIsValidSuccess(true);
    }
  };

  const questionErrorChekcer = () => {
    let flag;
    let tempNum = Number(questionNumber);
    console.log(extraCountLimit);
    if (tempNum > 0 && tempNum <= extraCountLimit) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  };

  const newRanNumberMaker = () => {
    let newRanNumArr = [];
    if (isClickedTotal === false) {
      let minorChecker = false; // minorTotal 아님 // 하나라도 눌려있으면 true
      for (let i = 0; i < deckControlArr.length; i++) {
        if (i === 0 || i === 5) {
          continue;
        } else {
          if (deckControlArr[i].isClicked === true) {
            minorChecker = true;
            break;
          }
        }
      }

      for (let i = 0; i < deckControlArr.length; i++) {
        if (deckControlArr[i].isClicked === false) {
          continue;
        } else {
          if (i === 5) {
            if (minorChecker === true) {
              continue;
            } else {
              for (
                let j = DeckNumberArr[i].startNum;
                j <= DeckNumberArr[i].endNum;
                j++
              ) {
                newRanNumArr.push(j);
              }
            }
          } else {
            for (
              let j = DeckNumberArr[i].startNum;
              j <= DeckNumberArr[i].endNum;
              j++
            ) {
              newRanNumArr.push(j);
            }
          }
        }
      }
    } else if (isClickedTotal === true) {
      // total에서 클릭이  false면 집어 넣는다는 뜻이다.
      //let isClickedMinor = deckControlArr[5].isClicked;
      let minorChecker = false; // minorTotal 아님 // 하나라도 눌려있으면 true
      for (let i = 0; i < deckControlArr.length; i++) {
        if (i === 0 || i === 5) {
          continue;
        } else {
          if (deckControlArr[i].isClicked === true) {
            minorChecker = true;
            break;
          }
        }
      }

      for (let i = 0; i < deckControlArr.length; i++) {
        if (deckControlArr[i].isClicked === false) {
          if (i === 5) {
            if (minorChecker === true) {
              continue;
            } else {
              for (
                let j = DeckNumberArr[i].startNum;
                j <= DeckNumberArr[i].endNum;
                j++
              ) {
                newRanNumArr.push(j);
              }
              // if (
              //   deckControlArr[1].isClicked === false ||
              //   deckControlArr[2].isClicked === false ||
              //   deckControlArr[3].isClicked === false ||
              //   deckControlArr[4].isClicked === false ||
              //   deckControlArr[6].isClicked === false ||
              //   deckControlArr[7].isClicked === false ||
              //   deckControlArr[8].isClicked === false ||
              //   deckControlArr[9].isClicked === false
              // ) {
              //   continue;
              // } else {

              // }
            }
          } else {
            for (
              let j = DeckNumberArr[i].startNum;
              j <= DeckNumberArr[i].endNum;
              j++
            ) {
              newRanNumArr.push(j);
            }
          }
        } else {
          continue;
        }
      }
    }
    return newRanNumArr;
  };

  const questionBtnHandler = (flag) => {
    if (flag === false) {
      //Back
      setIsValidSuccess(false);
      setQuestionNumber("");
    } else {
      //Make
      let check = questionErrorChekcer(); // 입력 숫자 확인
      if (check === false) {
        setErrorMessage(errorMessageArr[2]);
        setQuestionError(true);
        setQuestionNumber("");
        setTimeout(() => {
          setErrorMessage("");
          setQuestionError(false);
        }, [1000]);
      } else {
        let tempNum = Number(questionNumber);
        let newArea = newRanNumberMaker();
        let newIdxArr = new Array(tempNum);
        let tempManager = JSON.parse(JSON.stringify(multiManager));
        let tempModel = JSON.parse(JSON.stringify(multiModel));
        let tempCardInfo = {
          isDraged: false,
          isFlip: false,
          isInSpread: false,
          isRotate: false,
          newIdx: 0,
          privateX: 0,
          privateY: 0,
          cardType: 0,
          isExtraCard: true,
        };

        // shuffle Idx
        for (let i = 0; i < newIdxArr.length; i++) {
          // if 4, 0, 1, 2, 3
          let _ranIdx = Math.floor(Math.random() * (newArea.length - 1));
          newIdxArr[i] = newArea[_ranIdx];
          for (let j = 0; j < i; j++) {
            if (newIdxArr[i] === newIdxArr[j]) {
              i--;
              break;
            }
          }
        }

        // extra Count
        // tempModel[CurrentModelNumber].extraCardCount[CurrentChildNumber] +=
        //   tempNum;

        tempModel[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].extraCardCount[CurrentSelectNum] += tempNum;

        // remain Count
        // tempModel[CurrentModelNumber].remainCardCount[CurrentChildNumber] =
        //   tempNum;

        tempModel[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].remainCardCount[CurrentSelectNum] += tempNum;

        // new card Info
        // for (let i = 0; i < tempNum; i++) {
        //   let tempObj = { ...tempCardInfo };
        //   tempObj.newIdx = tempNum - i;
        //   tempModel[CurrentModelNumber].thisModelFirstCardInfoArr[
        //     CurrentChildNumber
        //   ].push(tempObj);
        // }

        for (let i = 0; i < tempNum; i++) {
          let tempObj = { ...tempCardInfo };
          tempObj.newIdx = tempNum - i;
          tempModel[CurrentModelNumber].SecondSpread[
            CurrentChildNumber
          ].thisModelSecondCardInfoArr[CurrentSelectNum].push(tempObj);
        }

        // for (let i = 0; i < tempNum; i++) {
        //   tempModel[CurrentModelNumber].thisModelFirstNumArr[
        //     CurrentChildNumber
        //   ].push(newIdxArr[i]);
        // }

        for (let i = 0; i < tempNum; i++) {
          tempModel[CurrentModelNumber].SecondSpread[
            CurrentChildNumber
          ].SecondRanNumArr[CurrentSelectNum].push(newIdxArr[i]);
        }
        console.log(
          tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
            .SecondRanNumArr
        );

        tempManager.isOpenExtra = false;
        setMultiManager(tempManager);
        setMultiModel(tempModel);
        setActiveMakeExtra(false);
      }
    }
  };
  return (
    <>
      <PokerExtraWrapper>
        <SelectDeckBox>
          {DeckNameArr.map((a, i) => {
            return (
              <SelectDeck
                key={`selectSecondDeck${i}${a}`}
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
            <ExtraBtnBox
              variants={controlVar}
              whileHover="hover"
              whileTap="click"
            >
              <button onClick={clearControlHandler}>Clear</button>
            </ExtraBtnBox>
            <ExtraBtnBox
              variants={controlVar}
              whileHover="hover"
              whileTap="click"
            >
              <button onClick={makeControlHandler}>Make</button>
            </ExtraBtnBox>
            <ExtraBtnBox
              variants={controlVar}
              whileHover="hover"
              whileTap="click"
            >
              <button onClick={() => setExtraType(5)}>Back</button>
            </ExtraBtnBox>
          </ControlBox>
        </ContorlDeckBox>
        <AnimatePresence>
          {isError === true ? (
            <ErrorPanel key={`questionTarotError1`}>{errorMessage}</ErrorPanel>
          ) : null}
          {isValidSuccess === true ? (
            <MakePanel>
              <QuestionMakePanel>
                <span>1</span>
                <span>2</span>
                <QuestionInputWrapper>
                  <QuestionInput
                    value={questionNumber}
                    onChange={(e) => {
                      changeQuestionNumber(e);
                    }}
                    maxLength={2}
                    placeholder={`1 ~ ${extraCountLimit}`}
                  />
                </QuestionInputWrapper>
                <QuestionBtnBox>
                  <QuestionBtnWrapper>
                    <QuestionBtn
                      variants={questionBtnVar}
                      initial={false}
                      whileHover={questionNumber.length === 0 ? "" : "hover"}
                      whileTap={questionNumber.length === 0 ? "" : "click"}
                      animate={
                        questionNumber.length === 0 ? "inactive" : "active"
                      }
                      onClick={() => {
                        if (questionNumber.length > 0) {
                          if (
                            Number(questionNumber) <= extraCountLimit &&
                            Number(questionNumber) > 0
                          ) {
                            questionBtnHandler(true);
                          }
                          //extraCountLimit;
                        }
                      }}
                      style={
                        questionNumber.length > 0
                          ? { cursor: "pointer" }
                          : { cursor: "auto" }
                      }
                    >
                      Make
                    </QuestionBtn>
                  </QuestionBtnWrapper>
                  <QuestionBtnWrapper>
                    <QuestionBtn
                      variants={questionBtnVar}
                      whileHover="hover"
                      whileTap="click"
                      animate="active"
                      onClick={() => questionBtnHandler(false)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Back
                    </QuestionBtn>
                  </QuestionBtnWrapper>
                </QuestionBtnBox>
              </QuestionMakePanel>
            </MakePanel>
          ) : null}
          {questionError === true ? (
            <ErrorPanel key={`questionTarotError2`}>{errorMessage}</ErrorPanel>
          ) : null}
        </AnimatePresence>
      </PokerExtraWrapper>
    </>
  );
}

export default SecondPokerExtraMake;
