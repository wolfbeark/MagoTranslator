/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { useRecoilState, useRecoilValue } from "recoil";

import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const MultiDragCardWrapper = styled(motion.div)`
  width: ${(props) =>
    props.privaterotate === "false"
      ? `${props.waitinginfo.width}px`
      : `${props.waitinginfo.height}px`};
  height: ${(props) =>
    props.privaterotate === "false"
      ? `${props.waitinginfo.height}px`
      : `${props.waitinginfo.width}px`};
  //background-color: orangered;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.imgsrc});
    ${(props) => {
      if (props.privaterotate === "false") {
        return css`
          transform: rotateZ(0deg);
          background-size: 100% 100%;
        `;
      } else {
        return css`
          transform: rotateZ(-90deg);
          background-size: 100% 100%;
        `;
      }
    }}
    width: ${(props) => props.waitinginfo.width}px;
    height: ${(props) => props.waitinginfo.height}px;
  }
`;

function MultiDragCard(props) {
  const cardRef = useRef();
  const totalInfo = props.totalInfo;
  const waitingInfo = props.waitingInfo;
  const carpetInfo = props.carpetInfo;
  const cardCount = props.count;
  const refArr = props.refArr;
  const openError = props.openError;
  const setOpenError = props.setOpenError;

  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const {
    CurrentChildNumber,
    thisModelDeckType,
    firstCardCount,
    thisModelFirstCardInfoArr,
  } = multiModel[CurrentModelNumber];
  const [privateRotate, setPrivateRotate] = useState(
    thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isRotate
  );
  const [privateFlip, setPrivateFlip] = useState(
    thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isFlip
  );
  // const [modelNumber, setModelNumber] = useState(
  //   multiManager.CurrentModelNumber
  // );
  // const [childNumber, setChildNumber] = useState(
  //   multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
  // );
  // const [selectNumber, setSelectNumber] = useState(
  //   multiModel[modelNumber].SecondSpread[childNumber].CurrentSelectNum
  // );
  const [thisIdx, setThisIdx] = useState(0);
  const [errorPos, setErrorPos] = useState({ x: 0, y: 0 });
  const [cardInfo, setCardInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const carpetCenterX =
    -(carpetInfo.width / 2) -
    (waitingInfo.x - carpetInfo.right) -
    waitingInfo.width / 2;
  const carpetCenterY =
    carpetInfo.height / 2 -
    waitingInfo.height / 2 -
    (waitingInfo.top - totalInfo.top);

  const threePos = [
    {
      x: carpetCenterX - carpetInfo.width * 0.2,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.2,
      y: carpetCenterY,
    },
  ];
  const sevenPos = [
    {
      x: carpetCenterX,
      y: carpetCenterY - carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.15,
      y: carpetCenterY + carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.15,
      y: carpetCenterY + carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY + carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.15,
      y: carpetCenterY - carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.15,
      y: carpetCenterY - carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY,
    },
  ];
  const celticPos = [
    {
      x: carpetCenterX - carpetInfo.width * 0.13,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.07,
      y: carpetCenterY,
    },
    {
      // rotate
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY + carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.25,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY - carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.05,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY + carpetInfo.height * 0.36,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY + carpetInfo.height * 0.12,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY - carpetInfo.height * 0.12,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY - carpetInfo.height * 0.36,
    },
  ];

  useEffect(() => {
    let tempObj = cardRef.current.getBoundingClientRect();
    setCardInfo({
      width: tempObj.width,
      height: tempObj.height,
      x: tempObj.x,
      y: tempObj.y,
    });
  }, []);
  useEffect(() => {
    if (
      thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isRotate ===
      false
    ) {
      return;
    } else {
      setPrivateRotate(true);
    }
  }, []);
  useEffect(() => {
    if (
      thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isFlip === false
    ) {
      return;
    } else {
      setPrivateFlip(true);
    }
  }, [thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isFlip]);
  // useEffect(() => {
  //   setModelNumber(multiManager.CurrentModelNumber);
  // }, [multiManager.CurrentModelNumber]);
  // useEffect(() => {
  //   setChildNumber(
  //     multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
  //   );
  // }, [multiModel[multiManager.CurrentModelNumber].CurrentChildNumber]);
  // useEffect(() => {
  //   setSelectNumber(
  //     multiModel[modelNumber].SecondSpread[childNumber].CurrentSelectNum
  //   );
  // }, [multiModel[modelNumber].SecondSpread[childNumber].CurrentSelectNum]);

  const onDragStartHandler = (e) => {
    let alpha = waitingInfo.x - (e.pageX - e.offsetX);
    let beta = waitingInfo.y - (e.pageY - e.offsetY);
    setErrorPos({
      x: -alpha,
      y: -beta,
    });
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].isDraged = true;
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].privateX = -alpha;
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].privateY = -beta;

    setMultiModel(tempObj);
  };

  const onDragTestHandler = (e) => {
    //posX = e.pageX;
    //posY = e.pageY;

    let px = e.pageX; // - e.offsetX - carpetInfo.x;
    let py = e.pageY; // - e.offsetY - carpetInfo.y;
    if (
      px >= carpetInfo.left &&
      px <= carpetInfo.right &&
      py >= carpetInfo.top &&
      py <= carpetInfo.bottom
    ) {
      //setIsInSpread(true);
      if (
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread === true
      ) {
        return;
      } else {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread = true;
        tempObj[CurrentModelNumber].remainCardCount[CurrentChildNumber]--;
        setMultiModel(tempObj);
      }
    }
  };
  const onDragEndHandler = (e) => {
    let testX = e.pageX; // - e.offsetX - carpetInfo.x;
    let testY = e.pageY; // - e.offsetY - carpetInfo.y;
    let alpha;
    let beta;
    let cardObj = cardRef.current.getBoundingClientRect();
    let cardObjItem = {
      x: cardObj.x,
      y: cardObj.y,
      width: cardObj.width,
      height: cardObj.height,
    };
    let rotateTrueX = (waitingInfo.height - waitingZoneInfo.width) / 2;
    let rotateTrueY = -(waitingZoneInfo.height / 2 - waitingZoneInfo.width / 2);

    // 카드의 상대적 위치
    if (privateRotate === false) {
      alpha = -(waitingZoneInfo.x - (e.pageX - e.offsetX));
      beta = -(waitingZoneInfo.y - (e.pageY - e.offsetY));
    } else {
      let tempX = (waitingZoneInfo.height - waitingZoneInfo.width) / 2;
      let tempY = -(waitingZoneInfo.height / 2 - waitingZoneInfo.width / 2);

      alpha = tempX - (waitingZoneInfo.x - (e.pageX - e.offsetY)); // 오케이
      beta = -(
        tempY +
        (waitingZoneInfo.y - (e.pageY + e.offsetX - waitingZoneInfo.height))
      );
    }
    //console.log("alpha : ", alpha);
    //console.log("beta : ", beta);

    // 에러 발생시 위치
    let gamma = waitingZoneInfo.x - carpetInfo.left;
    let delta = waitingZoneInfo.x - carpetInfo.right + cardInfo.width;
    let epsilon = carpetInfo.top - cardInfo.height;
    let zeta = carpetInfo.bottom - cardInfo.height * 2;

    // Rotate False Error Pos
    let errPosX = -(waitingZoneInfo.x - cardObjItem.x);
    let errPosY = cardObjItem.y - waitingZoneInfo.y;
    let errLeft = -(waitingZoneInfo.x - carpetInfo.left);
    let errRight =
      -(waitingZoneInfo.x - carpetInfo.right) - waitingZoneInfo.width;
    let errTop = -(waitingZoneInfo.top - carpetInfo.top);
    let errBottom = errTop + carpetInfo.height - waitingZoneInfo.height;

    // Rotate True Error Pos
    let errRotatePosX = rotateTrueX - (waitingZoneInfo.x - cardObjItem.x);
    let errRotatePosY = -(waitingZoneInfo.y - cardObjItem.y - rotateTrueY);

    let errRotateLeft = -(waitingZoneInfo.x - carpetInfo.left - rotateTrueX);
    let errRotateRight = -(
      waitingZoneInfo.x -
      carpetInfo.right -
      rotateTrueX +
      waitingZoneInfo.height
    );
    let errRotateTop = rotateTrueY - (waitingZoneInfo.y - carpetInfo.top);
    let errRotateBottom =
      errRotateTop + carpetInfo.height - waitingZoneInfo.width;

    if (
      testX >= carpetInfo.left &&
      testX <= carpetInfo.right &&
      testY >= carpetInfo.top &&
      testY <= carpetInfo.bottom
    ) {
      if (
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isDraged === true &&
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread === true
      ) {
        let tempObj = JSON.parse(JSON.stringify(multiModel));

        if (privateRotate === false) {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = alpha;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = beta;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }

        setMultiModel(tempObj);
      }
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));

      if (testX < carpetInfo.left) {
        console.log("좌");
        //console.log(cardObjItem.x);
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = cardObjItem.y - waitingZoneInfo.y;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errPosY;
        } else {
          // privateRotate === true
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testX > carpetInfo.right) {
        // 우
        console.log("우");
        if (privateRotate === false) {
          let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = cardObjItem.y - waitingZoneInfo.y;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          // Y
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errPosY;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          // Y
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testY < carpetInfo.top) {
        console.log("상");
        if (privateRotate === false) {
          let temp = -(waitingZoneInfo.top - carpetInfo.top);
          let temp2 = -(waitingZoneInfo.x - cardObjItem.x);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errPosX;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
        }
      }
      if (testY > carpetInfo.bottom) {
        console.log("하");
        if (privateRotate === false) {
          let temp = carpetInfo.height - cardInfo.height;
          let temp2 = -(waitingZoneInfo.x - cardObjItem.x);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errPosX;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
        }
      }

      if (testX < carpetInfo.left && testY > carpetInfo.bottom) {
        //좌하
        console.log("좌하");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = carpetInfo.height - cardInfo.height;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
        }
      }
      if (testX < carpetInfo.left && testY < carpetInfo.top) {
        //좌상
        console.log("좌상");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = -(waitingZoneInfo.top - carpetInfo.top);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
        }
      }
      if (testX > carpetInfo.right && testY < carpetInfo.top) {
        // 우상
        console.log("우상");
        if (privateRotate === false) {
          let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = -(waitingZoneInfo.top - carpetInfo.top);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
        }
      }
      if (testY > carpetInfo.bottom && testX > carpetInfo.right) {
        //우하
        // testX === e.pageX
        console.log("우하");
        if (privateRotate === false) {
          let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = carpetInfo.height - cardInfo.height;

          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
        }
      }
      setMultiModel(tempObj);
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    }
  };
  const onDragEndTestHandler = (e) => {
    let testX = e.pageX; // - e.offsetX - carpetInfo.x;
    let testY = e.pageY; // - e.offsetY - carpetInfo.y;
    let alpha;
    let beta;
    let cardObj = cardRef.current.getBoundingClientRect();
    let cardObjItem = {
      x: cardObj.x,
      y: cardObj.y,
      width: cardObj.width,
      height: cardObj.height,
    };
    let rotateTrueX = (waitingInfo.height - waitingInfo.width) / 2;
    let rotateTrueY = -(waitingInfo.height / 2 - waitingInfo.width / 2);
    let tempObj = JSON.parse(JSON.stringify(multiModel));

    if (privateRotate === false) {
      alpha = -(waitingInfo.x - (e.pageX - e.offsetX));
      beta = -(waitingInfo.y - (e.pageY - e.offsetY));
    } else {
      let tempX = (waitingInfo.height - waitingInfo.width) / 2;
      let tempY = -(waitingInfo.height / 2 - waitingInfo.width / 2);

      alpha = tempX - (waitingInfo.x - (e.pageX - e.offsetY)); // 오케이
      beta = -(
        tempY +
        (waitingInfo.y - (e.pageY + e.offsetX - waitingInfo.height))
      );
    }

    // 에러 발생시 위치
    let gamma = waitingInfo.x - carpetInfo.left;
    let delta = waitingInfo.x - carpetInfo.right + cardInfo.width;
    let epsilon = carpetInfo.top - cardInfo.height;
    let zeta = carpetInfo.bottom - cardInfo.height * 2;

    // Rotate False Error Pos
    let errPosX = -(waitingInfo.x - cardObjItem.x);
    let errPosY = cardObjItem.y - waitingInfo.y;
    let errLeft = -(waitingInfo.x - carpetInfo.left);
    let errRight = -(waitingInfo.x - carpetInfo.right) - waitingInfo.width;
    let errTop = -(waitingInfo.top - carpetInfo.top);
    let errBottom = errTop + carpetInfo.height - waitingInfo.height;

    // Rotate True Error Pos
    let errRotatePosX = rotateTrueX - (waitingInfo.x - cardObjItem.x);
    let errRotatePosY = -(waitingInfo.y - cardObjItem.y - rotateTrueY);

    let errRotateLeft = -(waitingInfo.x - carpetInfo.left - rotateTrueX);
    let errRotateRight = -(
      waitingInfo.x -
      carpetInfo.right -
      rotateTrueX +
      waitingInfo.height
    );
    let errRotateTop = rotateTrueY - (waitingInfo.y - carpetInfo.top);
    let errRotateBottom = errRotateTop + carpetInfo.height - waitingInfo.width;

    if (
      testX >= carpetInfo.left &&
      testX <= carpetInfo.right &&
      testY >= carpetInfo.top &&
      testY <= carpetInfo.bottom
    ) {
      if (
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isDraged === true &&
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread === true
      ) {
        if (privateRotate === false) {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = alpha;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = beta;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }
        setMultiModel(tempObj);
      }
    } else {
      if (testX < carpetInfo.left) {
        console.log("좌");
        //console.log(cardObjItem.x);
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = cardObjItem.y - waitingInfo.y;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errPosY;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testX > carpetInfo.right) {
        // 우
        console.log("우");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = cardObjItem.y - waitingInfo.y;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          // Y
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errPosY;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          // Y
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testY < carpetInfo.top) {
        console.log("상");
        if (privateRotate === false) {
          let temp = -(waitingInfo.top - carpetInfo.top);
          let temp2 = -(waitingInfo.x - cardObjItem.x);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errPosX;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
        }
      }
      if (testY > carpetInfo.bottom) {
        console.log("하");
        if (privateRotate === false) {
          let temp = carpetInfo.height - cardInfo.height;
          let temp2 = -(waitingInfo.x - cardObjItem.x);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errPosX;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotatePosX;
        }
      }

      if (testX < carpetInfo.left && testY > carpetInfo.bottom) {
        //좌하
        console.log("좌하");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = carpetInfo.height - cardInfo.height;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
        }
      }
      if (testX < carpetInfo.left && testY < carpetInfo.top) {
        //좌상
        console.log("좌상");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = -(waitingInfo.top - carpetInfo.top);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateLeft;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
        }
      }
      if (testX > carpetInfo.right && testY < carpetInfo.top) {
        // 우상
        console.log("우상");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = -(waitingInfo.top - carpetInfo.top);
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errTop;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateTop;
        }
      }
      if (testY > carpetInfo.bottom && testX > carpetInfo.right) {
        //우하
        console.log("우하");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = carpetInfo.height - cardInfo.height;

          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errBottom;
        } else {
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateX = errRotateRight;
          tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].privateY = errRotateBottom;
        }
      }
      setMultiModel(tempObj);
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    }
  };
  const styleItem = () => {
    let temp;
    if (thisModelDeckType !== 0) {
      if (thisModelDeckType === 1) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
          // if cardCount >= firstCardCount
          // if cardType // Tarot LenorMand... 나중에 추가
        ) {
          if (privateRotate === false) {
            temp = {
              x: threePos[cardCount].x,
              y: threePos[cardCount].y,
            };
          } else {
            temp = {
              x: threePos[cardCount].x,
              y: threePos[cardCount].y,
            };
          }
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
          };
        }
      }
      if (thisModelDeckType === 2) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
        ) {
          temp = {
            x: sevenPos[cardCount].x,
            y: sevenPos[cardCount].y,
            //zIndex: cardCount,
          };
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
            //zIndex: cardCount,
          };
        }
      }
      if (thisModelDeckType === 3) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
        ) {
          temp = {
            x: celticPos[cardCount].x,
            y: celticPos[cardCount].y,
          };
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
          };
        }
      }
    } else if (thisModelDeckType === 0) {
      // Free
      if (
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
          false &&
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].newIdx,
        };
      } else if (
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
          true &&
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].newIdx,
        };
      } else if (
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
          true &&
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isInSpread ===
          true
      ) {
        temp = {
          x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].privateX,
          y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].privateY,
          zIndex: 0,
        };
      }
    }
    return temp;
  };
  const onDoubleClickHandler = (e) => {
    if (
      multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
        CurrentChildNumber
      ][cardCount].isInSpread === false
    ) {
      return;
    } else {
      if (privateRotate === false) {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isRotate = !privateRotate;
        setPrivateRotate((prev) => !prev);
        setMultiModel(tempObj);
      } else {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isRotate = !privateRotate;
        setPrivateRotate((prev) => !prev);
        setMultiModel(tempObj);
      }
    }
  };

  const srcSetting = () => {
    let temp;
    if (privateFlip === false) {
      temp = `${process.env.PUBLIC_URL}/images/Default0.png`;
    } else {
      temp = `${process.env.PUBLIC_URL}/images/TarotDefault/Default${multiModel[CurrentModelNumber].thisModelFirstNumArr[CurrentChildNumber][cardCount]}.png`;
    }
    return temp;
  };
  const cardVar = {
    initial: {
      opacity: 0,
    },
    start: {
      opacity: 1,
    },
    hover: {
      scale: 1.1,
    },
  };
  return (
    <AnimatePresence>
      <Draggable nodeRef={cardRef}>
        <MultiDragCardWrapper
          ref={cardRef}
          drag
          dragConstraints={
            multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
              CurrentChildNumber
            ][cardCount].isInSpread === false
              ? refArr[0]
              : refArr[1]
          }
          dragSnapToOrigin={
            multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
              CurrentChildNumber
            ][cardCount].isInSpread === false
              ? true
              : false
          }
          dragMomentum={false}
          onDragStart={(e) => onDragStartHandler(e)}
          onDrag={(e) => onDragTestHandler(e)}
          onDragEnd={(e) => onDragEndTestHandler(e)}
          onDoubleClick={(e) => onDoubleClickHandler(e)}
          waitinginfo={waitingInfo}
          privaterotate={privateRotate === true ? "true" : "false"}
          style={styleItem()}
          variants={cardVar}
          initial="initial"
          animate="start"
          whileHover="hover"
          imgsrc={
            privateFlip === false
              ? `${process.env.PUBLIC_URL}/images/cut1_s.png`
              : `${process.env.PUBLIC_URL}/images/TarotDefault/Default${multiModel[CurrentModelNumber].thisModelFirstNumArr[CurrentChildNumber][cardCount]}.png`
          }
        >
          <img privaterotate={privateRotate === true ? "true" : "false"} />
        </MultiDragCardWrapper>
      </Draggable>
    </AnimatePresence>
  );
}

export default MultiDragCard;
