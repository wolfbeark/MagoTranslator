/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue, useRecoilState } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import MakeSecondModel from "../make_model/make_second/MakeSecondModel";
import SecondSpreadScreen from "./SecondSpreadScreen";

const SpreadWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background-color: yellow;
  position: relative;
`;

function SecondSpreadZone() {
  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  return (
    <SpreadWrapper>
      {SecondSpread[CurrentChildNumber].isDefined === false ? (
        <MakeSecondModel />
      ) : (
        <>
          <SecondSpreadScreen />
        </>
      )}
      {/* <SpreadCarpet></SpreadCarpet>
      <SpreadControlBox></SpreadControlBox> */}
    </SpreadWrapper>
  );
}

export default SecondSpreadZone;
