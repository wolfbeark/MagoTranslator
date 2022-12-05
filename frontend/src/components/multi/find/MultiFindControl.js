/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { AllCenterDiv } from "../../../CommonComponents";
import MultiTarotFind from "./MultiTarotFind";

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
const FindQuestion = styled(AllCenterDiv)`
  width: 50%;
  height: 60%;
  background-color: beige;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  padding: 1%;
  grid-gap: 1%;
  position: relative;
`;
const SelectFindTypeBtn = styled(AllCenterDiv)`
  background-color: blue;
  width: 60%;
  height: 50%;
  cursor: pointer;
`;
const CancelFindBtn = styled(AllCenterDiv)`
  width: 15%;
  height: 10%;
  background-color: gray;
  position: absolute;
  bottom: -12%;
  right: 0;
`;

const MakeFindPannel = styled(AllCenterDiv)`
  width: 70%;
  height: 90%;
  background-color: azure;
`;

function MultiFindControl(props) {
  const closeControlBox = props.closeControlBox;
  const setIsOpenFindOption = props.setIsOpenFindOption;
  const [findType, setFindType] = useState(5);
  const SelectDeckArr = ["Tarot", "Lenormand", "IChing", "Poker"];

  return (
    <>
      <OptionalBlock>
        {findType === 5 ? (
          <>
            <AnimatePresence>
              <FindQuestion>
                <AnimatePresence>
                  {findType === 5
                    ? SelectDeckArr.map((a, i) => {
                        return (
                          <SelectFindTypeBtn
                            key={`selectExtraType${i}${a}`}
                            onClick={() => setFindType(i)}
                          >
                            {a}
                          </SelectFindTypeBtn>
                        );
                      })
                    : null}
                </AnimatePresence>
                <CancelFindBtn
                  onClick={() => {
                    setIsOpenFindOption(false);
                    closeControlBox();
                  }}
                >
                  Back
                </CancelFindBtn>
              </FindQuestion>
            </AnimatePresence>
          </>
        ) : (
          <>
            <AnimatePresence>
              <MakeFindPannel>
                <AnimatePresence>
                  {findType === 0 ? (
                    <MultiTarotFind
                      closeControlBox={closeControlBox}
                      setIsOpenFindOption={setIsOpenFindOption}
                      findType={findType}
                    />
                  ) : null}
                </AnimatePresence>
              </MakeFindPannel>
            </AnimatePresence>
          </>
        )}
      </OptionalBlock>
    </>
  );
}

export default MultiFindControl;
