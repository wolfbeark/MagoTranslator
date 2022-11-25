/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const MultiTopWrapper = styled(motion.div)`
  width: 80%;
  height: 60%;
  //height: ${(props) => (props.secondisdefined === "false" ? "40%" : "60%")};
  position: absolute;
  top: 0;
  background-color: red;
  z-index: 500;
  ${(props) => {
    if (props.modeldefined === "false") {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    } else {
      return css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        //padding: ${props.secondisdefined === "false" ? "1%" : "0.5%"};
        padding: 1%;
      `;
    }
    // secondisdefined
  }}
`;
const MultiTopOpenBtn = styled(motion.div)`
  width: 20%;
  height: 5%;
  //height: ${(props) => (props.secondisdefined === "false" ? "10%" : "5%")};
  background-color: blue;
  position: absolute;
  //top: calc(20%);
  top: 100%;
  left: 40%;
`;
const ModelUndefinedModal = styled(motion.div)`
  width: 50%;
  height: 30%;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModelNameBox = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  //height: ${(props) => (props.secondisdefined === "false" ? "15%" : "7.5%")};
  background-color: navy;
  //margin-bottom: 1%;
`;
const ModelNameItem = styled(motion.div)`
  width: 19%;
  height: 100%;
  background-color: skyblue;
  margin-left: 2%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5%;
  &:first-child {
    margin-left: 0;
  }
  cursor: pointer;
`;

const ModelChildBox = styled(motion.div)`
  width: 100%;
  height: 40%;
  //height: ${(props) => (props.secondisdefined === "false" ? "60%" : "30%")};
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const ModelChildItem = styled(motion.div)`
  width: 10%;
  height: 90%;
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const ModelChildSelectBox = styled(motion.div)`
  width: 100%;
  height: 80%;
  background-color: yellow;
`;
const ModleChildName = styled(motion.div)`
  width: 100%;
  height: 20%;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SecondChildBox = styled(motion.div)`
  width: 100%;
  height: 40%;
  //height: ${(props) => (props.secondisdefined === "false" ? "15%" : "30%")};

  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SecondChildCreateBox = styled(motion.div)`
  width: 30%;
  height: 50%;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > span {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const CreateCancelBtn = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MultiTop(props) {
  const totalInfo = props.totalInfo;
  const topTabRef = useRef();
  const setOpenControlBox = props.setOpenControlBox;

  const [multiManager, setMultiManger] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  const {
    CurrentSelectNum,
    thisModelSecondCardInfoArr,
    SecondModelTabNameArr,
  } = SecondSpread[CurrentChildNumber];
  const [isFold, setIsFold] = useState(false);

  const [currentModelNum, setCurrentModelNum] = useState(
    multiManager.CurrentModelNumber
  );
  const [currentChildNum, setCurrentChildNum] = useState(
    multiModel[CurrentModelNumber].CurrentChildNumber
  );
  const [topInfo, setTopInfo] = useState({ height: 0, y: 0 });

  const TopVariants = {
    initial: {
      //y: -(topInfo.y + topInfo.height),
      y: 0,
    },
    open: {
      //y: 0,
      y: -topInfo.height,
      transition: {
        type: "tween",
      },
    },
    fold: {
      //y: -(topInfo.y + topInfo.height),
      y: 0,
      transition: {
        type: "tween",
      },
    },
  };

  const onFoldHandler = () => {
    //console.log(isFold);
    setIsFold((prev) => !prev);
    setOpenControlBox((prev) => !prev);
  };
  const changeCurrentModel = (num) => {
    if (num === multiManager.CurrentModelNumber) {
      return;
    } else {
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      tempManager.CurrentModelNumber = num;
      setMultiManger(tempManager);
    }
  };
  const changeCurrentChildNumber = (num) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[currentModelNum].CurrentChildNumber = num;
    tempModel[currentModelNum].SecondSpread[
      currentChildNum
    ].isSecondFold = true;
    if (
      tempModel[currentModelNum].SecondSpread[currentChildNum].isOpen ===
        true &&
      tempModel[currentModelNum].SecondSpread[currentChildNum].isDefined ===
        false
    ) {
      tempModel[currentModelNum].SecondSpread[currentChildNum].isOpen = false;
    }
    setMultiModel(tempModel);
  };
  const createSecondSpread = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[currentModelNum].SecondSpread[currentChildNum].isOpen = true;
    tempModel[currentModelNum].SecondSpread[
      currentChildNum
    ].isSecondFold = false;
    setMultiModel(tempModel);
  };
  const createCancelSecondSpread = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[currentModelNum].SecondSpread[currentChildNum].isOpen = false;
    tempModel[currentModelNum].SecondSpread[
      currentChildNum
    ].isSecondFold = true;
    setMultiModel(tempModel);
  };

  const changeSecondSelNum = (num) => {
    if (
      num ===
      multiModel[CurrentModelNumber].SecondSpread[currentChildNum]
        .CurrentSelectNum
    ) {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      if (
        tempModel[CurrentModelNumber].SecondSpread[currentChildNum]
          .isSecondFold === true
      ) {
        tempModel[CurrentModelNumber].SecondSpread[
          currentChildNum
        ].isSecondFold = false;
      }
      setMultiModel(tempModel);
    } else {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].SecondSpread[
        currentChildNum
      ].CurrentSelectNum = num;
      if (
        tempModel[CurrentModelNumber].SecondSpread[currentChildNum]
          .isSecondFold === true
      ) {
        tempModel[CurrentModelNumber].SecondSpread[
          currentChildNum
        ].isSecondFold = false;
      }
      setMultiModel(tempModel);
    }
  };

  useEffect(() => {
    const temp = topTabRef.current.getBoundingClientRect();
    setTopInfo({
      height: temp.height,
      y: temp.y,
    });
  }, []);

  useEffect(() => {
    setCurrentModelNum(multiManager.CurrentModelNumber);
    setCurrentChildNum(
      multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
    );
  }, [
    multiManager,
    multiModel[multiManager.CurrentModelNumber].CurrentChildNumber,
  ]);
  return (
    <AnimatePresence>
      <MultiTopWrapper
        ref={topTabRef}
        initial={false}
        variants={TopVariants}
        animate={isFold === true ? "fold" : "open"}
        modeldefined={
          multiManager.MultiModelNameArr.length === 0 ? "false" : "true"
        }
      >
        {
          //multiModel[CurrentModelNumber].modelDefined === false
          multiManager.MultiModelNameArr.length === 0 ? (
            <ModelUndefinedModal>Model Undefined</ModelUndefinedModal>
          ) : (
            <>
              <ModelNameBox>
                {multiManager.MultiModelNameArr.map((a, i) => {
                  return (
                    <ModelNameItem
                      key={`model${i}${CurrentModelNumber}`}
                      style={
                        i === multiManager.CurrentModelNumber
                          ? { backgroundColor: "honeydew" }
                          : { backgroundColor: "skyblue" }
                      }
                      onClick={() => {
                        changeCurrentModel(i);
                      }}
                    >
                      {a}
                    </ModelNameItem>
                  );
                })}
              </ModelNameBox>
              <ModelChildBox>
                {multiModel[CurrentModelNumber].thisModelChildNameArr.map(
                  (a, i) => {
                    return (
                      <ModelChildItem
                        key={`modelChildItem${i}${CurrentModelNumber}`}
                      >
                        <ModelChildSelectBox
                          style={
                            i === currentChildNum
                              ? { backgroundColor: "navy" }
                              : {}
                          }
                          onClick={() => {
                            changeCurrentChildNumber(i);
                          }}
                        ></ModelChildSelectBox>
                        <ModleChildName>{a}</ModleChildName>
                      </ModelChildItem>
                    );
                  }
                )}
              </ModelChildBox>
              <SecondChildBox>
                {multiModel[CurrentModelNumber].SecondSpread[currentChildNum]
                  .isOpen === false &&
                multiModel[CurrentModelNumber].modelDefined === true ? (
                  <SecondChildCreateBox onClick={createSecondSpread}>
                    Create Second Spread
                  </SecondChildCreateBox>
                ) : null}
                {multiModel[CurrentModelNumber].SecondSpread[currentChildNum]
                  .isOpen === true &&
                multiModel[CurrentModelNumber].SecondSpread[currentChildNum]
                  .isDefined === false ? (
                  <SecondChildCreateBox
                    style={{
                      cursor: "auto",
                      padding: "0 1% 0 1%",
                    }}
                  >
                    <span>Second Creating...</span>
                    <CreateCancelBtn onClick={createCancelSecondSpread}>
                      X
                    </CreateCancelBtn>
                  </SecondChildCreateBox>
                ) : null}
                {multiModel[CurrentModelNumber].SecondSpread[currentChildNum]
                  .isDefined === true ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    {SecondModelTabNameArr.map((a, i) => {
                      return (
                        <ModelChildItem
                          key={`modelSeocndChildItem${i}${CurrentModelNumber}${currentChildNum}${CurrentSelectNum}`}
                        >
                          <ModelChildSelectBox
                            style={
                              i === CurrentSelectNum &&
                              SecondSpread[currentChildNum].isSecondFold ===
                                false
                                ? { backgroundColor: "navy" }
                                : {}
                            }
                            onClick={() => {
                              changeSecondSelNum(i);
                            }}
                          ></ModelChildSelectBox>
                          <ModleChildName>{a}</ModleChildName>
                        </ModelChildItem>
                      );
                    })}
                  </div>
                ) : null}
              </SecondChildBox>
            </>
          )
        }
        <MultiTopOpenBtn onClick={onFoldHandler}></MultiTopOpenBtn>
      </MultiTopWrapper>
      {/* {isFold === true && <MultiTopOpenBtn></MultiTopOpenBtn>} */}
    </AnimatePresence>
  );
}

export default MultiTop;
