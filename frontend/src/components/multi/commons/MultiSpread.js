/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";

import MultiSpreadZone from "../spread/MultiSpreadZone";
import MultiModelTab from "../tab_path/MultiModelTab";
import MultiModelPath from "../tab_path/MultiModelPath";
import { multiManagerAtom } from "../../../atom/multiAtom";
import MultiTop from "./MultiTop";

const MultiSpreadWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 1%;
  position: relative;
`;
const MultiSpreadBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1%;
`;
const ControlBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  //background-color: aquamarine;
  z-index: 499;
`;

function MultiSpread() {
  const spreadRef = useRef();
  const multiManager = useRecoilValue(multiManagerAtom);
  const [totalInfo, setTotalInfo] = useState({
    height: 0,
    y: 0,
  });
  const [openControlBox, setOpenControlBox] = useState(false);

  useEffect(() => {
    const temp = spreadRef.current.getBoundingClientRect();
    setTotalInfo({
      height: temp.height,
      y: temp.y,
    });
  }, []);
  //useEffect(() => {}, [multiManager.CurrentModelNumber]);
  return (
    <MultiSpreadWrapper ref={spreadRef}>
      {openControlBox === true ? <ControlBox /> : null}
      <MultiTop setOpenControlBox={setOpenControlBox} totalInfo={totalInfo} />
      {multiManager.isOpenExtra === true ? <ControlBox /> : null}
      <MultiSpreadBox>
        <MultiModelTab />
        <MultiModelPath />
        <MultiSpreadZone />
      </MultiSpreadBox>
    </MultiSpreadWrapper>
  );
}

export default MultiSpread;
