/* eslint-disable */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue, useRecoilState } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const MultiModelPathBox = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: whitesmoke;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1%;
`;
const ModelNameBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  background-color: blueviolet;
`;
const ModelChildNameBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  background-color: coral;
`;
const SelectChildBox = styled(motion.div)`
  width: 60%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  //margin-left: 1%;
`;
const SelectChildBtn = styled(motion.div)`
  width: 2%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
  margin-right: 1%;
  background-color: yellow;
`;
function MultiModelPath() {
  const [multiManager, setMultiManger] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, thisModelChildNameArr, SecondSpread } =
    multiModel[CurrentModelNumber];
  const { CurrentSelectNum } = SecondSpread[CurrentChildNumber];

  const [openChildSelect, setOpenChildSelect] = useState(false);
  const [openSecondSelect, setOpenSecondSelect] = useState(false);

  const [currentModelNum, setCurrentModelNum] = useState(
    multiManager.CurrentModelNumber
  );
  const [currentChildNum, setCurrentChildNum] = useState(
    multiModel[CurrentModelNumber].CurrentChildNumber
  );

  const modelNumberChanger = () => {
    let len = multiManager.MultiModelNameArr.length;
    let modelNum = multiManager.CurrentModelNumber;
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    if (modelNum === len - 1) {
      tempManager.CurrentModelNumber = 0;
    } else if (modelNum < len - 1) {
      tempManager.CurrentModelNumber++;
    }
    setMultiManger(tempManager);
  };
  const changeCurrentChild = (num) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[CurrentModelNumber].CurrentChildNumber = num;
    if (
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === false
    ) {
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = true;
    }

    setMultiModel(tempModel);
  };
  const changeSecondCurrentChild = (num) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    if (
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === true
    ) {
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = false;
    }
    tempModel[CurrentModelNumber].SecondSpread[
      CurrentChildNumber
    ].CurrentSelectNum = num;
    setMultiModel(tempModel);

    // if (
    //   tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
    //     .isSecondFold === false
    // ) {
    //   tempModel[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].isSecondFold = true;
    //   tempModel[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].CurrentSelectNum = num;
    // } else if (
    //   tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
    //     .isSecondFold === true
    // ) {
    //   tempModel[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].isSecondFold = false;
    //   tempModel[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].CurrentSelectNum = num;
    // }
  };
  const secondFoldHandler = () => {
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === true
    ) {
      return;
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      tempObj[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = true;
      setMultiModel(tempObj);
    }
  };
  const openSecondAndChangeSpread = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    let flag =
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold;
    if (
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber].isOpen ===
        true &&
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isDefined === true
    ) {
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = !flag;
    }
    setMultiModel(tempModel);
  };

  const openSecondSpread = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    let num = tempModel[CurrentModelNumber].CurrentChildNumber;
    let flag =
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold;
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber].isOpen ===
        true &&
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isDefined === false
    ) {
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isOpen = false;

      setMultiModel(tempModel);
      return;
    }

    // second on
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isDefined === true
    ) {
      // if second on
      if (flag === false) {
        tempModel[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].isSecondFold = true;
      } else {
        if (num !== 4) {
          tempModel[CurrentModelNumber].CurrentChildNumber++;
        } else if (num === 4) {
          tempModel[CurrentModelNumber].CurrentChildNumber = 0;
        }
      }
    } else {
      if (num < 4) {
        tempModel[CurrentModelNumber].CurrentChildNumber++;
      } else if (num === 4) {
        tempModel[CurrentModelNumber].CurrentChildNumber = 0;
      }
    }
    setMultiModel(tempModel);
  };
  const changeSecondNumber = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    let num =
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .CurrentSelectNum;
    if (
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === true
    ) {
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = false;
    } else {
      if (num !== 4) {
        tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
          .CurrentSelectNum++;
      } else if (num === 4) {
        tempModel[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].CurrentSelectNum = 0;
      }
    }

    setMultiModel(tempModel);
  };
  const openSelectChild = () => {
    if (openSecondSelect === true) {
      setOpenSecondSelect(false);
      setTimeout(() => {
        setOpenChildSelect((prev) => !prev);
      }, 1000);
    } else {
      setOpenChildSelect((prev) => !prev);
    }
  };
  const openSecondSelectChild = () => {
    if (openChildSelect === true) {
      setOpenChildSelect(false);
      setTimeout(() => {
        setOpenSecondSelect((prev) => !prev);
      }, 1000);
    } else {
      setOpenSecondSelect((prev) => !prev);
    }
  };
  const selectChildBoxVar = {
    initial: {
      width: 0,
      opacity: 0,
    },
    start: {
      width: "60%",
      opacity: 1,
      transition: {
        duration: 0.5,
        opacity: {
          delay: 0.5,
        },
      },
    },
    end: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        width: {
          delay: 0.4,
          duration: 0.5,
        },
      },
    },
  };
  const nameBoxFadeVar = {
    initial: {
      opacity: 0,
      width: "10%",
    },
    fadeOut: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 1,
        width: {
          delay: 1.1,
        },
      },
    },
    fadeIn: {
      opacity: 1,
      width: "10%",
      transition: {
        duration: 1,
        delay: 1,
        width: {
          delay: 1,
        },
      },
    },
  };

  const nameBoxStyle = () => {
    let temp;
    let isOpen =
      multiModel[multiManager.CurrentModelNumber].SecondSpread[currentChildNum]
        .isOpen;
    let isSecondFold =
      multiModel[multiManager.CurrentModelNumber].SecondSpread[currentChildNum]
        .isSecondFold;
    let isDefined =
      multiModel[multiManager.CurrentModelNumber].SecondSpread[currentChildNum]
        .isDefined;
    if (isDefined === false) {
      temp = {
        backgroundColor: "rosybrown",
      };
    } else if (isDefined === true && isSecondFold === true) {
      temp = {
        backgroundColor: "rosybrown",
      };
    } else {
      temp = {};
    }

    return temp;
  };
  useEffect(() => {
    setCurrentModelNum(multiManager.CurrentModelNumber);
    setCurrentChildNum(
      multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
    );
  }, [
    multiManager.CurrentModelNumber,
    multiModel[multiManager.CurrentModelNumber].CurrentChildNumber,
  ]);
  return (
    <MultiModelPathBox>
      {/* Untitle - 0 */}
      {multiManager.MultiModelNameArr.length >= 1 ? (
        <ModelNameBox onClick={modelNumberChanger}>
          {multiManager.MultiModelNameArr[currentModelNum]}
        </ModelNameBox>
      ) : null}

      {multiManager.MultiModelNameArr.length >= 1 &&
      multiModel[multiManager.CurrentModelNumber].modelDefined === true ? (
        <SelectChildBtn onClick={openSelectChild}>▶</SelectChildBtn>
      ) : null}
      <AnimatePresence>
        {openChildSelect === true ? (
          <SelectChildBox
            variants={selectChildBoxVar}
            initial="initial"
            animate="start"
            exit="end"
            style={{
              marginRight: "1%",
            }}
          >
            {thisModelChildNameArr.map((a, i) => {
              return (
                <ModelChildNameBox
                  key={`modelChildName${i}${CurrentChildNumber}${CurrentModelNumber}`}
                  style={
                    i === CurrentChildNumber
                      ? {
                          backgroundColor: "coral",
                        }
                      : {
                          backgroundColor: "gray",
                        }
                  }
                  onClick={() => changeCurrentChild(i)}
                >
                  {a}
                </ModelChildNameBox>
              );
            })}
          </SelectChildBox>
        ) : null}
      </AnimatePresence>
      {/* Star */}
      {multiManager.MultiModelNameArr.length >= 1 &&
      multiModel[multiManager.CurrentModelNumber].modelDefined === true ? (
        <ModelNameBox
          onClick={openSecondSpread}
          // style={
          //   multiModel[currentModelNum].SecondSpread[currentChildNum]
          //     .isSecondFold === true
          //     ? multiModel[currentModelNum].SecondSpread[currentChildNum]
          //         .isDefined === false
          //       ? {
          //           backgroundColor: "rosybrown",
          //         }
          //       : {
          //           //backgroundColor: "rosybrown",
          //         }
          //     : {}
          // }
          style={nameBoxStyle()}
        >
          {
            multiModel[CurrentModelNumber].thisModelChildNameArr[
              CurrentChildNumber
            ]
          }
        </ModelNameBox>
      ) : null}

      {multiModel[multiManager.CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isDefined === true ? ( //&&
        //openChildSelect === false
        <SelectChildBtn onClick={openSecondSelectChild}>▶</SelectChildBtn>
      ) : null}
      <AnimatePresence>
        {openChildSelect === false && openSecondSelect === true ? (
          <SelectChildBox
            variants={selectChildBoxVar}
            initial="initial"
            animate="start"
            exit="end"
            style={{
              marginRight: "1%",
            }}
          >
            {multiModel[multiManager.CurrentModelNumber].SecondSpread[
              CurrentChildNumber
            ].SecondModelTabNameArr.map((a, i) => {
              return (
                <ModelChildNameBox
                  key={`modelSecondChildName${i}${CurrentChildNumber}${CurrentModelNumber}${CurrentSelectNum}`}
                  style={
                    i === CurrentSelectNum &&
                    multiModel[CurrentModelNumber].SecondSpread[
                      CurrentChildNumber
                    ].isSecondFold === false
                      ? {
                          backgroundColor: "coral",
                        }
                      : {
                          backgroundColor: "gray",
                        }
                  }
                  onClick={() => changeSecondCurrentChild(i)}
                >
                  {a}
                </ModelChildNameBox>
              );
            })}
          </SelectChildBox>
        ) : null}
      </AnimatePresence>
      {
        //openChildSelect === false &&
        multiModel[multiManager.CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].isDefined === true ? (
          //&& multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber].isSecondFold === false
          <AnimatePresence>
            <ModelNameBox
              // variants={nameBoxFadeVar}
              // initial="initial"
              // animate="fadeIn"
              // exit="fadeOut"
              onClick={changeSecondNumber}
              style={
                multiModel[multiManager.CurrentModelNumber].SecondSpread[
                  CurrentChildNumber
                ].isSecondFold === false
                  ? {
                      backgroundColor: "rosybrown",
                    }
                  : {}
              }
            >
              {
                multiModel[multiManager.CurrentModelNumber].SecondSpread[
                  CurrentChildNumber
                ].SecondModelTabNameArr[CurrentSelectNum]
              }
            </ModelNameBox>
          </AnimatePresence>
        ) : null
      }
    </MultiModelPathBox>
  );
}

export default MultiModelPath;
