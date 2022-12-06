/* eslint-disable */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AllCenterDiv } from "../../../CommonComponents";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  multiModelPrefabAtom,
} from "../../../atom/multiAtom";

const OptionalBlock = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 190, 118, 0.5);
  position: absolute;
  //opacity: 0.5;
  left: 0;
  top: 0;
  z-index: 500;
`;
const QuestionBox = styled(AllCenterDiv)`
  width: 50%;
  height: 60%;
  background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1%;
  position: relative;
`;
const QuestionText = styled(AllCenterDiv)`
  width: 90%;
  height: 30%;
  background-color: royalblue;
`;
const QuestionBtnBox = styled(AllCenterDiv)`
  width: 90%;
  height: 30%;
  background-color: olive;
  justify-content: space-evenly;
  padding: 1%;
`;

const QuestionBtn = styled(AllCenterDiv)`
  width: 30%;
  height: 100%;
  padding: 1%;
  background-color: navy;
  & button {
    background-color: skyblue;
    width: 100%;
    height: 100%;
    border: none;
    outline: unset;
    cursor: pointer;
  }
`;

function QuestionOption(props) {
  const optionType = props.optionType;
  const setIsOpenOption = props.setIsOpenOption;
  const setOptionType = props.setOptionType;
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const multiModelPrefab = useRecoilValue(multiModelPrefabAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber } = multiModel[CurrentModelNumber];
  const [qustionText, setQuestionText] = useState("");
  const textArr = ["현재 모델을 다시 시작하시겠습니까?"];
  const btnVar = {
    hover: {
      scale: 1.05,
    },
    click: {
      scale: 1,
    },
  };
  useEffect(() => {
    let tempText = textArr[optionType];
    setQuestionText(tempText);
  }, []);

  const btnNoHandler = () => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    tempManager.isOpenExtra = false;
    setOptionType(10);
    setIsOpenOption(false);
    setMultiManager(tempManager);
  };

  const restartHandler = () => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    let tempPrefab = JSON.parse(JSON.stringify(multiModelPrefab));
    tempModel[CurrentModelNumber] = { ...tempPrefab };
    tempManager.isOpenExtra = false;
    setOptionType(10);
    setIsOpenOption(false);
    setMultiModel(tempModel);
    setMultiManager(tempManager);
  };
  return (
    <>
      <OptionalBlock>
        <QuestionBox>
          <QuestionText>{qustionText}</QuestionText>
          <QuestionBtnBox>
            <QuestionBtn variants={btnVar} whileHover="hover" whileTap="click">
              <button onClick={restartHandler}>Yes</button>
            </QuestionBtn>
            <QuestionBtn variants={btnVar} whileHover="hover" whileTap="click">
              <button onClick={btnNoHandler}>No</button>
            </QuestionBtn>
          </QuestionBtnBox>
        </QuestionBox>
      </OptionalBlock>
    </>
  );
}

export default QuestionOption;
