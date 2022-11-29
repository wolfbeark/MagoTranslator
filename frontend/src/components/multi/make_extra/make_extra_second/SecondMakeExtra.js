/* eslint-disable */

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";

import { AllCenterDiv } from "../../../../CommonComponents";
import SecondPokerExtraMake from "./SecondPokerExtraMake";

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
const ExtraMakeQuestion = styled(AllCenterDiv)`
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
const SelectExtraTypeBtn = styled(AllCenterDiv)`
  background-color: blue;
  width: 60%;
  height: 50%;
  cursor: pointer;
`;
const CancelExtraBtn = styled(AllCenterDiv)`
  width: 15%;
  height: 10%;
  background-color: gray;
  position: absolute;
  bottom: -12%;
  right: 0;
`;
const MakeExtraPannel = styled(AllCenterDiv)`
  width: 70%;
  height: 90%;
  background-color: azure;
`;
function SecondMakeExtra(props) {
  const setActiveMakeExtra = props.setActiveMakeExtra;
  const [extraType, setExtraType] = useState(5);
  const SelectExtraDeckArr = ["Tarot", "Lenormand", "IChing", "Poker"];

  const closeControlBox = () => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    tempManager.isOpenExtra = false;
    setMultiManager(tempManager);
  };

  return (
    <>
      <OptionalBlock>
        {extraType === 5 ? (
          <AnimatePresence>
            <ExtraMakeQuestion>
              <AnimatePresence>
                {extraType === 5
                  ? SelectExtraDeckArr.map((a, i) => {
                      return (
                        <SelectExtraTypeBtn
                          key={`selectExtraSecondType${i}${a}`}
                          onClick={() => setExtraType(i)}
                        >
                          {a}
                        </SelectExtraTypeBtn>
                      );
                    })
                  : null}
              </AnimatePresence>
              <CancelExtraBtn
                onClick={() => {
                  setActiveMakeExtra(false);
                  closeControlBox();
                }}
              >
                Back
              </CancelExtraBtn>
            </ExtraMakeQuestion>
          </AnimatePresence>
        ) : (
          <>
            <AnimatePresence>
              <MakeExtraPannel>
                <AnimatePresence>
                  {extraType === 0 ? (
                    <SecondPokerExtraMake
                      setActiveMakeExtra={setActiveMakeExtra}
                      setExtraType={setExtraType}
                    />
                  ) : null}
                </AnimatePresence>
              </MakeExtraPannel>
            </AnimatePresence>
          </>
        )}
      </OptionalBlock>
    </>
  );
}

export default SecondMakeExtra;
