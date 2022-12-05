/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { AllCenterDiv } from "../../../CommonComponents";
import { useRecoilState } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const IChingExtraWrapper = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: olive;
  padding: 1%;
  justify-content: space-between;
  position: relative;
  flex-direction: column;
`;

const TextBox = styled(AllCenterDiv)`
  width: 100%;
  height: 20%;
  background-color: tomato;
`;

const IChingMakePannel = styled(AllCenterDiv)`
  width: 100%;
  height: 80%;
  background-color: orange;
  justify-content: space-evenly;
  padding: 1%;
`;

const IChingBarBox = styled(AllCenterDiv)`
  width: 30%;
  height: 100%;
  background-color: beige;
  width: 30%;
  height: 90%;
  background-color: skyblue;
  border-radius: inherit;
  justify-content: space-evenly;
  flex-direction: column-reverse;
`;

const IChingControlBox = styled(AllCenterDiv)`
  width: 30%;
  height: 60%;
  background-color: lemonchiffon;
  border-radius: inherit;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  flex-direction: column;
  //
`;
const IChingBar = styled(AllCenterDiv)`
  width: 90%;
  height: 15%;
  background-color: gray;
  //border-radius: inherit;
  background-color: white;
  //background-image : url(${(props) => props.imgsrc});
  //background-size: 100%; 100%;
  & > div {
    width: 90%;
    height: 85%;
    background-image: url(${(props) => props.imgsrc});
    background-size: 100% 100%;
    transition: background-image 0.5s ease-in-out;
  }
`;
const Modal = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.7;
  background-color: whitesmoke;
  border-radius: inherit;
  flex-direction: column;
  top: 0;
  left: 0;
  & span {
    font-size: 3em;
    font-weight: 600;
    margin: 2% 0;
  }
`;
const modalVar = {
  initial: {
    opacity: 0,
  },
  start: {
    opacity: 0.7,
    transition: {
      duration: 1.0,
    },
  },
};
const IChingBtn = styled(AllCenterDiv)`
  width: 80%;
  height: 20%;
  background-color: navy;
  border-radius: inherit;
  padding: 2%;
  & > button {
    width: 100%;
    height: 100%;
    background-color: skyblue;
    outline: unset;
    border: none;
    border-radius: inherit;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
  }
`;
const ichingBtnVar = {
  hover: {
    scale: 1.1,
  },
  click: {
    scale: 1.0,
  },
};

function IChingExtraMake(props) {
  const setExtraType = props.setExtraType;
  const setActiveMakeExtra = props.setActiveMakeExtra;
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);

  const { CurrentModelNumber } = multiManager;
  const {
    CurrentChildNumber,
    extraCardCount,
    remainCardCount,
    thisModelFirstNumArr,
    thisModelFirstCardInfoArr,
  } = multiModel[CurrentModelNumber];
  const [timerNum, setTimerNum] = useState(3);

  const [firstFlag, setFirstFlag] = useState(10); // flag 개수 = true 개수
  // true: 앞, false : 뒤로 간주함
  const [secondFlag, setSecondFlag] = useState(10);
  const [thirdFlag, setThirdFlag] = useState(10);
  const [fourthFlag, setFourthFlag] = useState(10);
  const [fifthFlag, setFifthFlag] = useState(10);
  const [sixthFlag, setSixthFlag] = useState(10);

  // Left Image Route
  const [firstRoute, setFirstRoute] = useState("");
  const [secondRoute, setSecondRoute] = useState("");
  const [thirdRoute, setThirdRoute] = useState("");
  const [fourthRoute, setFourthRoute] = useState("");
  const [fifthRoute, setFifthRoute] = useState("");
  const [sixthRoute, setSixthRoute] = useState("");

  // Right Image Route
  const [rightFirstRoute, setRightFirstRoute] = useState("");
  const [rightSecondRoute, setRightSecondRoute] = useState("");
  const [rightThirdRoute, setRightThirdRoute] = useState("");
  const [rightFourthRoute, setRightFourthRoute] = useState("");
  const [rightFifthRoute, setRightFifthRoute] = useState("");
  const [rightSixthRoute, setRightSixthRoute] = useState("");

  //const [leftImgCode, setLeftImgCode] = useState("");
  //const [rightImgCode, setRightImgCode] = useState("");

  const [isOnModal, setIsOnModal] = useState(false);

  const IChingTranslateCodeArr = [
    "111111",
    "000000",
    "100010",
    "010001",
    "111010",
    "010111",
    "010000",
    "000010",
    "111011",
    "110111",
    "111000",
    "000111",
    "101111",
    "111101",
    "001000",
    "000100",
    "100110",
    "011001",
    "110000",
    "000011",
    "100101",
    "101001",
    "000001",
    "100000",
    "100111",
    "111001",
    "100001",
    "011110",
    "010010",
    "101101",
    "001110",
    "011100",
    "001111",
    "111100",
    "000101",
    "101000",
    "101011",
    "110101",
    "001010",
    "010100",
    "110001",
    "100011",
    "111110",
    "011111",
    "000110",
    "011000",
    "010110",
    "011010",
    "101110",
    "011101",
    "100100",
    "001001",
    "001011",
    "110100",
    "101100",
    "001101",
    "011011",
    "110110",
    "010011",
    "110010",
    "110011",
    "001100",
    "101010",
    "010101",
  ];
  const flagStandardArr = [false, true]; // 0, 1
  const defaultImageRoute = `${process.env.PUBLIC_URL}/images/IChingDefault/ichingBaseBar.png`;

  const activeTimer = () => {
    let temp = 3;
    let timerId = setInterval(() => {
      //console.log(temp);
      temp--;
      setTimerNum(temp);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerId);
    }, 3000);
  };
  const flagChecker = () => {
    let tempNum;
    let checker = 0;
    let flagCheckArr = new Array(3);
    for (let i = 0; i < 3; i++) {
      tempNum = Math.floor(Math.random() * 2);
      //console.log(tempNum);
      if (tempNum === 0) {
        flagCheckArr[i] = flagStandardArr[0];
      } else {
        flagCheckArr[i] = flagStandardArr[1];
        checker++;
      }
    }
    return checker;
  };
  const setLeftCheckerRoute = (num, type) => {
    let _str;
    switch (type) {
      case "First":
        if (num >= 2) {
          // true가 2개 이상.
          setFirstRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          // true가 1개 이하.
          setFirstRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      case "Second":
        if (num >= 2) {
          setSecondRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          setSecondRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      case "Third":
        if (num >= 2) {
          setThirdRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          setThirdRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      case "Fourth":
        if (num >= 2) {
          setFourthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          setFourthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      case "Fifth":
        if (num >= 2) {
          setFifthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          setFifthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      case "Sixth":
        if (num >= 2) {
          setSixthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        } else {
          setSixthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        }
        return _str;
      //break;
      default:
        break;
    }
  };
  const setRightCheckerRoute = (num, type) => {
    let _str;
    switch (type) {
      case "First_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightFirstRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightFirstRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      case "Second_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightSecondRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightSecondRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      case "Third_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightThirdRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightThirdRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      case "Fourth_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightFourthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightFourthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      case "Fifth_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightFifthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightFifthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      case "Sixth_R":
        if (num === 3 || num === 1) {
          // true가 3개, 1개 // 나눠진 이미지
          setRightSixthRoute(`/images/IChingDefault/DivBlack.png`);
          _str = "0";
        } else {
          // true 2, 0 // 나눠지지 않은 이미지
          setRightSixthRoute(`/images/IChingDefault/NonBlack.png`);
          _str = "1";
        }
        return _str;
      //break;
      default:
        break;
    }
  };
  const translateIChingCode = (str) => {
    //let _str = str;
    //console.log(str);
    let imgnum;

    for (let i = 0; i < IChingTranslateCodeArr.length; i++) {
      if (IChingTranslateCodeArr[i] === str) {
        //console.log(IChingTranslateCodeArr[i]);
        imgnum = i;
        break;
      }
    }
    return imgnum;
    //console.log("Left : " + imgnum1);
    //console.log("Right : " + imgnum2);
  };

  const onStartHandler = () => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempMultiModel = JSON.parse(JSON.stringify(multiModel));
    let tempCardInfo = {
      // Decktype 0, free
      isDraged: false,
      isFlip: false,
      isInSpread: false,
      isRotate: false,
      newIdx: 0,
      privateX: 0,
      privateY: 0,
      cardType: 2,
      isExtraCard: true,
    };
    let first = flagChecker();
    let second = flagChecker();
    let third = flagChecker();
    let fourth = flagChecker();
    let fifth = flagChecker();
    let sixth = flagChecker();

    let leftTotalStr = "";
    let rightTotalStr = "";
    let _strArr = new Array(6);
    let _strArrR = new Array(6);

    let leftNum;
    let rightNum;

    // Left Image
    _strArr[0] = setLeftCheckerRoute(first, "First");
    _strArr[1] = setLeftCheckerRoute(second, "Second");
    _strArr[2] = setLeftCheckerRoute(third, "Third");
    _strArr[3] = setLeftCheckerRoute(fourth, "Fourth");
    _strArr[4] = setLeftCheckerRoute(fifth, "Fifth");
    _strArr[5] = setLeftCheckerRoute(sixth, "Sixth");

    // Right Image
    _strArrR[0] = setRightCheckerRoute(first, "First_R");
    _strArrR[1] = setRightCheckerRoute(second, "Second_R");
    _strArrR[2] = setRightCheckerRoute(third, "Third_R");
    _strArrR[3] = setRightCheckerRoute(fourth, "Fourth_R");
    _strArrR[4] = setRightCheckerRoute(fifth, "Fifth_R");
    _strArrR[5] = setRightCheckerRoute(sixth, "Sixth_R");

    for (let i = 0; i < _strArr.length; i++) {
      leftTotalStr += _strArr[i];
      rightTotalStr += _strArrR[i];
    }
    //console.log(leftTotalStr);
    //console.log(rightTotalStr);

    leftNum = translateIChingCode(leftTotalStr);
    rightNum = translateIChingCode(rightTotalStr);

    setFirstFlag(first);
    setSecondFlag(second);
    setThirdFlag(third);
    setFourthFlag(fourth);
    setFifthFlag(fifth);
    setSixthFlag(sixth);

    tempMultiModel[CurrentModelNumber].thisModelFirstNumArr[
      CurrentChildNumber
    ].push(leftNum);
    tempMultiModel[CurrentModelNumber].thisModelFirstNumArr[
      CurrentChildNumber
    ].push(rightNum);

    for (let i = 0; i < 2; i++) {
      let tempObj = { ...tempCardInfo };
      tempObj.newIdx = 2 - i;
      tempMultiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
        CurrentChildNumber
      ].push(tempObj);
    }

    tempMultiModel[CurrentModelNumber].extraCardCount[CurrentChildNumber] += 2;
    tempMultiModel[CurrentModelNumber].remainCardCount[CurrentChildNumber] = 2;

    tempManager.isOpenExtra = false;

    // setMultiModel(tempMultiModel);
    // setMultiManager(tempManager);
    // setActiveMakeExtra(false);

    //
    setIsOnModal(true);
    activeTimer();
    setTimeout(() => {
      setIsOnModal(false);
      setTimerNum(3);

      //setOptionType(0);
      //setIsActiveOptionCurtain(false);

      //setIsInCount(_isInCount + 2);
      //setTotalCount(_totalCount + 2);
      //setDragCardNumArr(_dragCardNumArr);
      //setImgTypeArr(_imgTypeArr);
      //setHideInfoArr(_hideTempArr);
      //setHideBtnOnOffArr(_hideBtnOnOffArr);
      setMultiModel(tempMultiModel);
      setMultiManager(tempManager);
      setActiveMakeExtra(false);
    }, 3000);
  };
  return (
    <>
      <IChingExtraWrapper>
        <TextBox></TextBox>
        <IChingMakePannel>
          <IChingBarBox>
            <IChingBar
              imgsrc={
                firstFlag !== 10
                  ? `${process.env.PUBLIC_URL}${firstRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {firstFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                secondFlag !== 10
                  ? `${process.env.PUBLIC_URL}${secondRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {secondFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                thirdFlag !== 10
                  ? `${process.env.PUBLIC_URL}${thirdRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {thirdFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                fourthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${fourthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {fourthFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                fifthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${fifthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {fifthFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                sixthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${sixthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {sixthFlag} */}</div>
            </IChingBar>
          </IChingBarBox>
          <IChingControlBox>
            <IChingBtn
              variants={ichingBtnVar}
              whileHover="hover"
              whileTap="click"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onStartHandler();
                }}
              >
                MAKE
              </button>
            </IChingBtn>
            <IChingBtn
              variants={ichingBtnVar}
              whileHover="hover"
              whileTap="click"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExtraType(5);
                }}
              >
                BACK
              </button>
            </IChingBtn>
          </IChingControlBox>
          <IChingBarBox>
            <IChingBar
              imgsrc={
                firstFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightFirstRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {firstFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                secondFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightSecondRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {secondFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                thirdFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightThirdRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {thirdFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                fourthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightFourthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {fourthFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                fifthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightFifthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {fifthFlag} */}</div>
            </IChingBar>
            <IChingBar
              imgsrc={
                sixthFlag !== 10
                  ? `${process.env.PUBLIC_URL}${rightSixthRoute}`
                  : `${defaultImageRoute}`
              }
            >
              <div>{/* {sixthFlag} */}</div>
            </IChingBar>
          </IChingBarBox>
        </IChingMakePannel>
        {isOnModal === true ? (
          <>
            <Modal variants={modalVar} initial="initial" animate="start">
              <span>잠시만 기다려 주십시오</span>
              <span>{timerNum}</span>
            </Modal>
          </>
        ) : null}
      </IChingExtraWrapper>
    </>
  );
}

export default IChingExtraMake;
