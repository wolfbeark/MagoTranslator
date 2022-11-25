/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import MakeNewModel from "../make_model/MakeNewModel";
import MultiDragCard from "../commons/MultiDragCard";
import SpreadScreen from "./SpreadScreen";
import SecondSpreadZone from "./SecondSpreadZone";

const MultiSpreadZoneWrapper = styled(motion.div)`
  width: 100%;
  height: 90%;
  background-color: navy;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  position: relative;
`;

function MultiSpreadZone() {
  const totalRef = useRef();
  const carpetRef = useRef();
  const waitingRef = useRef();

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const {
    CurrentChildNumber,
    thisModelDeckType,
    firstCardCount,
    thisModelFirstCardInfoArr,
    SecondSpread,
  } = multiModel[CurrentModelNumber];

  const [secondFalse, setSecondFalse] = useState(
    multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber].isSecondFold
  );
  const [secondSpread, setSecondSpread] = useState(
    multiModel[CurrentModelNumber].SecondSpread
  );

  return (
    <>
      <MultiSpreadZoneWrapper>
        {multiModel[multiManager.CurrentModelNumber].modelDefined === false ? (
          <MakeNewModel />
        ) : (
          <>
            {/* {multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
            .isSecondFold === false ? (
            <SpreadScreen />
          ) : null} */}
            {multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
              .isOpen === true &&
            multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
              .isSecondFold === false ? (
              <SecondSpreadZone />
            ) : (
              <SpreadScreen />
            )}
          </>
        )}
      </MultiSpreadZoneWrapper>
    </>
  );
}

export default MultiSpreadZone;
