/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import LeftModelList from "./LeftModelList";

const MultiLeftTab = styled(motion.div)`
  position: absolute;
  width: 20%;
  height: 100%;
  left: -20%;
  background-color: red;
  //display: ${(props) => (props.modeldefined === "false" ? "flex" : "block")};
  ${({ modeldefined }) => {
    if (modeldefined === "false") {
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
        padding: 1%;
      `;
    }
  }}
  z-index: 500;
`;
const MultiLeftBox = styled(motion.div)`
  position: absolute;
  width: 10%;
  height: 20%;
  background-color: blue;
  right: -10%;
  top: calc(40%);
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: navy;
  //margin-bottom: 1%;
`;
const ModelListBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 89%;
  min-height: 89%;
  background-color: fuchsia;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  scroll-behavior: auto;
  overflow: overlay;
  overflow-x: hidden;
`;
const ModelListItemWrapper = styled(motion.div)`
  width: 95%;
  height: 10%;
  /* height: ${(props) => {
    props.istabFold === "true" ? `10%` : `20%`;
  }}; */
  background-color: yellow;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  position: relative;
`;
const ModelListItem = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: yellow;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  position: relative;
`;
const ModelBtn = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateSecondBtn = styled(motion.div)`
  width: 10%;
  height: 50%;
  background-color: khaki;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1%;
`;
const SecondItemBox = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: cadetblue;
  bottom: -50%;
`;
function MultiLeft() {
  const leftTabRef = useRef();

  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber } = multiModel[CurrentModelNumber];

  const [isFold, setIsFold] = useState(true);
  const [leftTabInfo, setLeftTabInfo] = useState({ width: 0 });
  const [secondSpread, setSecondSpread] = useState(
    multiModel[CurrentModelNumber].SecondSpread
  );
  const [thisModelDefined, setThisModelDefined] = useState(false);
  const LeftVariants = {
    initial: {
      x: -leftTabInfo.width,
      //x: 0,
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
      },
    },
    fold: {
      x: leftTabInfo.width,
      transition: {
        type: "tween",
      },
    },
  };

  useEffect(() => {
    let left = leftTabRef.current.getBoundingClientRect();
    setLeftTabInfo({
      width: left.width,
    });
  }, []);
  useEffect(() => {
    if (multiModel[CurrentModelNumber].modelDefined === false) {
      setThisModelDefined(false);
    } else {
      setThisModelDefined(true);
    }
  }, [
    multiModel[CurrentModelNumber].modelDefined,
    multiManager.MultiModelNameArr,
  ]);
  useEffect(() => {
    setSecondSpread(multiModel[CurrentModelNumber].SecondSpread);
  }, [multiModel[CurrentModelNumber].SecondSpread]);

  const changeCurrentChild = (num) => {
    if (num === CurrentChildNumber) {
      return;
    } else {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].CurrentChildNumber = num;
      setMultiModel(tempModel);
    }
  };
  const openSecondSpread = (num) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel.CurrentChildNumber = num;
    tempModel[CurrentModelNumber].SecondSpread[num].isOpen = true;
    setMultiModel(tempModel);
  };
  const openUndefinedControl = () => {
    // 여기서는 SecondFold를 true 시켜야함
    // if (
    //   multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
    //     .isDefined === false &&
    //   multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
    //     .isSecondFold === true
    // ) {
    //   let tempModel = JSON.parse(JSON.stringify(multiModel));
    //   tempModel[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].isSecondFold = false;
    //   setMultiModel(tempModel);
    // }
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === false
    ) {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = true;
      setMultiModel(tempModel);
    }
  };

  return (
    <AnimatePresence initial={false}>
      <MultiLeftTab
        ref={leftTabRef}
        variants={LeftVariants}
        initial={false}
        animate={isFold === true ? "fold" : "open"}
        modeldefined={thisModelDefined === false ? "false" : "true"}
      >
        {multiModel[CurrentModelNumber].modelDefined === false ? (
          <ModelUndefinedModal>Model Undefined</ModelUndefinedModal>
        ) : (
          <>
            <ModelNameBox
              onClick={openUndefinedControl}
              //style={{backgroundColor: }}
            >
              {multiModel[CurrentModelNumber].modelName}
            </ModelNameBox>
            <ModelListBox>
              {multiModel[CurrentModelNumber].SecondSpread.map((a, i) => {
                return (
                  <LeftModelList
                    key={`modelListItem${i}${CurrentModelNumber}${CurrentChildNumber}`}
                    count={i}
                  />
                );
              })}
            </ModelListBox>
          </>
        )}
        <MultiLeftBox onClick={() => setIsFold((prev) => !prev)}></MultiLeftBox>
      </MultiLeftTab>
    </AnimatePresence>
  );
}

export default MultiLeft;
