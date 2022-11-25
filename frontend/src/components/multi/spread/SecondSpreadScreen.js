/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue, useRecoilState } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import SecondDragCard from "../commons/SecondDragCard";

const SpreadWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InSpreadWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SpreadCarpet = styled(motion.div)`
  width: 84%;
  height: 100%;
  background-color: rebeccapurple;
`;
const SpreadControlBox = styled(motion.div)`
  width: 15%;
  height: 100%;
  background-color: yellowgreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CardStorageContainer = styled.div`
  width: 90%;
  height: 22%;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`;
const CardStorage = styled.div`
  width: 100%;
  height: 100%;
  background-color: cornsilk;
  display: flex;
  align-items: center;
  padding: 1%;
  justify-content: space-evenly;
`;
const CardWaitingZone = styled.div`
  width: 40%;
  height: 100%;
  background-color: darkgoldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardWaitingInBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const CardExtraDeck = styled.div`
  width: 40%;
  height: 100%;
  background-color: darkgoldenrod;
`;
const CardCountBoard = styled.div`
  width: 100%;
  height: 20%;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1%;
`;
const CardCountNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
  width: 100%;
  height: 48%;
`;
const CountNoticeName = styled.span`
  width: 70%;
  height: 100%;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CountNoticeValue = styled.span`
  width: 30%;
  height: 100%;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpreadControlBtnBox = styled.div`
  width: 100%;
  height: 60%;
  background-color: fuchsia;
`;
const SpreadControlBtnWrapper = styled(motion.div)`
  width: 100%;
  height: 15%;
  background-color: olive;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`;
const SpreadControlBtn = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
`;

function SecondSpreadScreen() {
  const totalRef = useRef();
  const waitingRef = useRef();
  const carpetRef = useRef();

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
  const { CurrentSelectNum } = SecondSpread[CurrentChildNumber];

  const [currentModel, setCurrentModel] = useState(
    multiManager.CurrentModelNumber
  );
  const [currentChild, setCurrentChild] = useState(
    multiModel[CurrentModelNumber].CurrentChildNumber
  );
  const [currentSelectNum, setCurrentSelectNum] = useState(
    SecondSpread[CurrentChildNumber].CurrentSelectNum
  );
  const [totalInfo, setTotalInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const [waitingInfo, setWaitingInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const [carpetInfo, setCarpetInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const [refArr, setRefArr] = useState([totalRef, carpetRef]);
  const [openError, setOpenError] = useState(false);

  const onFlipHandler = () => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    //console.log(tempModel[CurrentModelNumber].thisModelFirstCardInfoArr);
    //console.log(tempModel[CurrentModelNumber].thisModelFirstNumArr);
    for (
      let i = 0;
      i <
      tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .thisModelSecondCardInfoArr[currentSelectNum].length;
      i++
    ) {
      if (
        tempModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
          .thisModelSecondCardInfoArr[currentSelectNum][i].isInSpread === true
      ) {
        tempModel[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].thisModelSecondCardInfoArr[currentSelectNum][i].isFlip = true;
      }
    }
    setMultiModel(tempModel);
  };

  useEffect(() => {
    let tempTotal = totalRef.current.getBoundingClientRect();
    let tempInfo = waitingRef.current.getBoundingClientRect();
    let tempCarpetInfo = carpetRef.current.getBoundingClientRect();
    setWaitingInfo({
      width: tempInfo.width,
      height: tempInfo.height,
      left: tempInfo.left,
      right: tempInfo.right,
      bottom: tempInfo.bottom,
      top: tempInfo.top,
      x: tempInfo.x,
      y: tempInfo.y,
    });
    setCarpetInfo({
      width: tempCarpetInfo.width,
      height: tempCarpetInfo.height,
      left: tempCarpetInfo.left,
      right: tempCarpetInfo.right,
      bottom: tempCarpetInfo.bottom,
      top: tempCarpetInfo.top,
      x: tempCarpetInfo.x,
      y: tempCarpetInfo.y,
    });
    setTotalInfo({
      width: tempTotal.width,
      height: tempTotal.height,
      left: tempTotal.left,
      right: tempTotal.right,
      bottom: tempTotal.bottom,
      top: tempTotal.top,
      x: tempTotal.x,
      y: tempTotal.y,
    });
  }, []);

  useEffect(() => {
    setCurrentModel(multiManager.CurrentModelNumber);
    setCurrentChild(multiModel[CurrentModelNumber].CurrentChildNumber);
    setCurrentSelectNum(SecondSpread[CurrentChildNumber].CurrentSelectNum);
  }, [
    multiManager.CurrentModelNumber,
    multiModel[CurrentModelNumber].CurrentChildNumber,
    SecondSpread[CurrentChildNumber].CurrentSelectNum,
  ]);

  return (
    <SpreadWrapper ref={totalRef}>
      <SpreadCarpet ref={carpetRef}></SpreadCarpet>
      <SpreadControlBox>
        <CardStorageContainer>
          <CardStorage>
            <CardWaitingZone>
              <CardWaitingInBox ref={waitingRef}>
                {SecondSpread[CurrentChildNumber].thisModelSecondCardInfoArr[
                  CurrentSelectNum
                ].map((a, i) => {
                  return (
                    <SecondDragCard
                      key={`multiDragCard${i}${currentChild}${currentModel}${currentSelectNum}`}
                      waitingInfo={waitingInfo}
                      carpetInfo={carpetInfo}
                      totalInfo={totalInfo}
                      count={i}
                      refArr={refArr}
                      openError={openError}
                      setOpenError={setOpenError}
                    />
                  );
                })}
              </CardWaitingInBox>
            </CardWaitingZone>
            <CardExtraDeck></CardExtraDeck>
          </CardStorage>
        </CardStorageContainer>
        <CardCountBoard>
          <CardCountNotice>
            <CountNoticeName>Total Count</CountNoticeName>
            <CountNoticeValue>
              {
                SecondSpread[CurrentChildNumber].thisModelTotalCardCount[
                  CurrentSelectNum
                ]
              }
            </CountNoticeValue>
          </CardCountNotice>
          <CardCountNotice>
            <CountNoticeName>Remain Count</CountNoticeName>
            <CountNoticeValue>
              {
                SecondSpread[CurrentChildNumber].remainCardCount[
                  CurrentSelectNum
                ]
              }
            </CountNoticeValue>
          </CardCountNotice>
        </CardCountBoard>
        <SpreadControlBtnBox>
          <SpreadControlBtnWrapper>
            <SpreadControlBtn onClick={onFlipHandler}>Flip</SpreadControlBtn>
          </SpreadControlBtnWrapper>
        </SpreadControlBtnBox>
      </SpreadControlBox>
    </SpreadWrapper>
  );
}

export default SecondSpreadScreen;
