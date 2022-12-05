/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { useRecoilState } from "recoil";

import { AllCenterDiv } from "../../../CommonComponents";
import { multiManagerAtom } from "../../../atom/multiAtom";

const FindWrapper = styled(AllCenterDiv)`
  width: 15%;
  height: 80%;
  background-color: aqua;
  position: absolute;
  right: 1%;
  top: 2%;
  padding: 1%;
  justify-content: space-evenly;
  flex-direction: column;
  z-index: 200;
`;

const ImgBox = styled(AllCenterDiv)`
  width: 90%;
  height: 50%;
  background-color: beige;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
`;

const NameBox = styled(AllCenterDiv)`
  width: 90%;
  height: 10%;
  background-color: beige;
  font-size: 0.5em;
`;

const ActiveBtn = styled(AllCenterDiv)`
  width: 90%;
  height: 20%;
  background-color: royalblue;
`;

function MultiFind(props) {
  const refArr = props.refArr;
  const openControlBox = props.openControlBox;
  const setIsOpenFindOption = props.setIsOpenFindOption;

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [imgRoute, setImgRoute] = useState(multiManager.findImgRoute);
  const findRef = useRef();
  const [findType, setFindType] = useState(multiManager.findCardType);
  //console.log(multiManager.findImgRoute);
  const [cardName, setCardName] = useState("");
  const [modeType, setModeType] = useState(multiManager.isFindOrZoom);
  useEffect(() => {
    if (multiManager.isFindOrZoom === false) {
      setImgRoute(multiManager.findImgRoute);
      setCardName(multiManager.findCardName);
    } else {
      setImgRoute(multiManager.zoomImgRoute);
      setCardName(multiManager.zoomCardName);
    }
    setModeType(multiManager.isFindOrZoom);
    setFindType(multiManager.findCardType);
  }, [multiManager]);

  const changeMode = () => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let flag = tempManager.isFindOrZoom;
    tempManager.isFindOrZoom = !flag;
    setModeType(!flag);
    setMultiManager(tempManager);
  };
  return (
    <Draggable nodeRef={findRef}>
      <FindWrapper
        ref={findRef}
        drag
        dragConstraints={refArr[1]}
        dragMomentum={false}
      >
        <ImgBox
          imgsrc={
            //findType !== 5
            multiManager.findOrZoomSelectedNum !== null
              ? `${process.env.PUBLIC_URL}${imgRoute}`
              : {}
          }
        ></ImgBox>
        <NameBox>
          {modeType === false
            ? multiManager.findCardName
            : multiManager.zoomCardName}
        </NameBox>
        <NameBox
          onClick={() => {
            changeMode();
          }}
        >
          {modeType === false ? "Mode : Find" : "Mode : Zoom"}
        </NameBox>
        <ActiveBtn
          onClick={() => {
            setIsOpenFindOption(true);
            openControlBox();
          }}
        >
          FIND CARD
        </ActiveBtn>
      </FindWrapper>
    </Draggable>
  );
}

export default MultiFind;
