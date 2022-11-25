/* eslint-disable */

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import MakeSecondCustomModel from "./MakeSecondCustomModel";
import MakeSecondDefaultModel from "./MakeSecondDefaultModel";

const MakeModelBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: oldlace;
  display: flex;
  //flex-direction: column;
  flex-direction: ${(props) =>
    props.firstflag === "false" ? "column" : "row"};
  justify-content: ${(props) =>
    props.firstflag === "false" ? "center" : "space-evenly"};
  align-items: center;
  //position: relative;
`;
const MakeModelSpan = styled(motion.span)`
  width: 50%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
`;
const CreateModel = styled(motion.div)`
  width: 30%;
  height: 10%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5%;
`;

const QuestionBox = styled(motion.div)`
  width: 50%;
  height: 50%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const QuestionSpan = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  background-color: orangered;
  margin-bottom: 2%;
`;
const QuestionSelectBox = styled(motion.div)`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-evenly;
  background-color: olive;
  align-items: center;
  padding: 1%;
`;
const QuestionSelectBtn = styled(motion.button)`
  width: 25%;
  height: 100%;
  background-color: beige;
`;
const CreateModelBtn = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const CustomMakeBox = styled(motion.div)`
  width: 45%;
  height: 90%;
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

function MakeSecondModel() {
  const [firstFlag, setFirstflag] = useState(false);
  const [secondFlag, setSecondflag] = useState(false);
  const [makeModelType, setMakeModelType] = useState(2);
  const [isActiveQuest, setIsActiveQuest] = useState(false);

  const firstFlagChanger = () => {
    setFirstflag(true);
  };

  return (
    <MakeModelBox firstflag={firstFlag === false ? "false" : "true"}>
      {firstFlag === false ? (
        <>
          <MakeModelSpan>모델이 생성되지 않았습니다.</MakeModelSpan>
          <MakeModelSpan>옵션을 설정하고 모델을 생성하세요</MakeModelSpan>
          <CreateModel>
            <CreateModelBtn onClick={firstFlagChanger}>Create</CreateModelBtn>
          </CreateModel>
        </>
      ) : null}
      {firstFlag === true && secondFlag === false ? (
        <>
          {/* <MakeCustomModel />
          <CustomMakeBox></CustomMakeBox> */}
          <QuestionBox>
            <QuestionSpan>어떤 설정으로 시작하시겠습니까?</QuestionSpan>
            <QuestionSelectBox>
              <QuestionSelectBtn
                onClick={() => {
                  setSecondflag(true);
                  setMakeModelType(0);
                }}
              >
                Custom
              </QuestionSelectBtn>
              <QuestionSelectBtn
                onClick={() => {
                  setSecondflag(true);
                  setMakeModelType(1);
                }}
              >
                Default
              </QuestionSelectBtn>
            </QuestionSelectBox>
          </QuestionBox>
        </>
      ) : null}
      {makeModelType !== 2 ? (
        makeModelType === 0 ? (
          <MakeSecondCustomModel
            isActiveQuest={isActiveQuest}
            setIsActiveQuest={setIsActiveQuest}
            setSecondflag={setSecondflag}
            setMakeModelType={setMakeModelType}
          />
        ) : (
          <MakeSecondDefaultModel
            isActiveQuest={isActiveQuest}
            setIsActiveQuest={setIsActiveQuest}
            setSecondflag={setSecondflag}
            setMakeModelType={setMakeModelType}
          />
        )
      ) : null}
    </MakeModelBox>
  );
}

export default MakeSecondModel;
