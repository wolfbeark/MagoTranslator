/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import Draggable from "react-draggable";
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
  background-color: orangered;
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

function SecondDragCard(props) {
  const cardRef = useRef();
  const totalInfo = props.totalInfo;
  const waitingInfo = props.waitingInfo;
  const carpetInfo = props.carpetInfo;
  const cardCount = props.count;
  const refArr = props.refArr;
  const openError = props.openError;
  const setOpenError = props.setOpenError;

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  const {
    CurrentSelectNum,
    SecondRanNumArr,
    thisModelSecondCardInfoArr,
    thisModelDeckType,
  } = SecondSpread[CurrentChildNumber];

  const [errorPos, setErrorPos] = useState({ x: 0, y: 0 });
  const [cardInfo, setCardInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [privateRotate, setPrivateRotate] = useState(
    thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate
  );
  const [privateFlip, setPrivateFlip] = useState(
    thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isFlip
  );
  const [imgRoute, setImgRoute] = useState("/images/cut1_s.png");

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
  const imgRouteArr = [
    "/images/TarotDefault/Default",
    "",
    "/images/IChingDefault/iching",
  ];

  const onDragStartHandler = (e) => {
    let alpha = waitingInfo.x - (e.pageX - e.offsetX);
    let beta = waitingInfo.y - (e.pageY - e.offsetY);
    setErrorPos({
      x: -alpha,
      y: -beta,
    });
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    let tempArr = JSON.parse(JSON.stringify(thisModelSecondCardInfoArr));
    let tempNumArr = JSON.parse(JSON.stringify(SecondRanNumArr));
    tempArr[CurrentSelectNum][cardCount].isDraged = true;
    tempArr[CurrentSelectNum][cardCount].privateX = -alpha;
    tempArr[CurrentSelectNum][cardCount].privateY = -beta;
    tempObj[CurrentModelNumber].SecondSpread[
      CurrentChildNumber
    ].thisModelSecondCardInfoArr = tempArr;
    if (privateFlip === true) {
      let _cardType = tempArr[CurrentSelectNum][cardCount].cardType;
      let _imgNum = tempNumArr[CurrentSelectNum][cardCount];
      let _zoomRoute = `${imgRouteArr[_cardType]}${_imgNum}.png`;
      let _zoomName = multiManager.cardNameTotalArr[_cardType][_imgNum];
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      tempManager.isFindOrZoom = true;
      tempManager.zoomImgRoute = _zoomRoute;
      tempManager.zoomCardName = _zoomName;
      tempManager.findOrZoomSelectedNum = _imgNum;

      setMultiModel(tempObj);
      setMultiManager(tempManager);
    } else {
      setMultiModel(tempObj);
    }
  };

  const onDragHandler = (e) => {
    let px = e.pageX; // - e.offsetX - carpetInfo.x;
    let py = e.pageY; // - e.offsetY - carpetInfo.y;

    if (
      px >= carpetInfo.left &&
      px <= carpetInfo.right &&
      py >= carpetInfo.top &&
      py <= carpetInfo.bottom
    ) {
      if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
        true
      ) {
        return;
      } else {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        let tempArr = JSON.parse(JSON.stringify(thisModelSecondCardInfoArr));

        tempArr[CurrentSelectNum][cardCount].isInSpread = true;
        tempObj[CurrentModelNumber].SecondSpread[CurrentChildNumber]
          .remainCardCount[CurrentSelectNum]--;

        tempObj[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].thisModelSecondCardInfoArr = tempArr;

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
    let rotateTrueX = (waitingInfo.height - waitingInfo.width) / 2;
    let rotateTrueY = -(waitingInfo.height / 2 - waitingInfo.width / 2);
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    let tempArr = JSON.parse(JSON.stringify(thisModelSecondCardInfoArr));
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
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
          true &&
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          true
      ) {
        if (privateRotate === false) {
          tempArr[CurrentSelectNum][cardCount].privateX = alpha;
          tempArr[CurrentSelectNum][cardCount].privateY = beta;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotatePosX;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotatePosY;
        }
        tempObj[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].thisModelSecondCardInfoArr = tempArr;

        setMultiModel(tempObj);
      }
    } else {
      if (testX < carpetInfo.left) {
        console.log("좌");
        //console.log(cardObjItem.x);
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = cardObjItem.y - waitingInfo.y;

          tempArr[CurrentSelectNum][cardCount].privateX = errLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errPosY;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errPosY;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotatePosY;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testX > carpetInfo.right) {
        // 우
        console.log("우");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = cardObjItem.y - waitingInfo.y;

          tempArr[CurrentSelectNum][cardCount].privateX = errRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errPosY;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRight;
          // // Y
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errPosY;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotatePosY;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateRight;
          // // Y
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotatePosY;
        }
      }
      if (testY < carpetInfo.top) {
        console.log("상");
        if (privateRotate === false) {
          let temp = -(waitingInfo.top - carpetInfo.top);
          let temp2 = -(waitingInfo.x - cardObjItem.x);

          tempArr[CurrentSelectNum][cardCount].privateX = errPosX;
          tempArr[CurrentSelectNum][cardCount].privateY = errTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errPosX;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errTop;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotatePosX;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateTop;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotatePosX;
        }
      }
      if (testY > carpetInfo.bottom) {
        console.log("하");
        if (privateRotate === false) {
          let temp = carpetInfo.height - cardInfo.height;
          let temp2 = -(waitingInfo.x - cardObjItem.x);

          tempArr[CurrentSelectNum][cardCount].privateX = errPosX;
          tempArr[CurrentSelectNum][cardCount].privateY = errBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errPosX;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errBottom;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotatePosX;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotatePosX;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateBottom;
        }
      }

      if (testX < carpetInfo.left && testY > carpetInfo.bottom) {
        //좌하
        console.log("좌하");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = carpetInfo.height - cardInfo.height;

          tempArr[CurrentSelectNum][cardCount].privateX = errLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errBottom;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateBottom;
        }
      }
      if (testX < carpetInfo.left && testY < carpetInfo.top) {
        //좌상
        console.log("좌상");
        if (privateRotate === false) {
          let temp = -gamma;
          let temp2 = -(waitingInfo.top - carpetInfo.top);

          tempArr[CurrentSelectNum][cardCount].privateX = errLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errTop;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateLeft;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateLeft;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateTop;
        }
      }
      if (testX > carpetInfo.right && testY < carpetInfo.top) {
        // 우상
        console.log("우상");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = -(waitingInfo.top - carpetInfo.top);

          tempArr[CurrentSelectNum][cardCount].privateX = errRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRight;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errTop;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateTop;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateRight;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateTop;
        }
      }
      if (testY > carpetInfo.bottom && testX > carpetInfo.right) {
        //우하
        console.log("우하");
        if (privateRotate === false) {
          let temp = -(waitingInfo.x - carpetInfo.right) - cardInfo.width;
          let temp2 = carpetInfo.height - cardInfo.height;

          tempArr[CurrentSelectNum][cardCount].privateX = errRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRight;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errBottom;
        } else {
          tempArr[CurrentSelectNum][cardCount].privateX = errRotateRight;
          tempArr[CurrentSelectNum][cardCount].privateY = errRotateBottom;

          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateX = errRotateRight;
          // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          //   CurrentChildNumber
          // ][cardCount].privateY = errRotateBottom;
        }
      }

      tempObj[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].thisModelSecondCardInfoArr = tempArr;
      setMultiModel(tempObj);
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    }
  };
  const onDoubleClickHandler = () => {
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
      false
    ) {
      return;
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      let tempArr = JSON.parse(JSON.stringify(thisModelSecondCardInfoArr));

      tempArr[CurrentSelectNum][cardCount].isRotate = !privateRotate;

      tempObj[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].thisModelSecondCardInfoArr = tempArr;
      setPrivateRotate((prev) => !prev);
      setMultiModel(tempObj);
    }
  };
  const styleItem = () => {
    let temp;
    if (
      thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isExtraCard ===
      false
    ) {
      if (thisModelDeckType !== 0) {
        if (thisModelDeckType === 1) {
          if (
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
              false &&
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
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
              x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateX,
              y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateY,
            };
          }
        }
        if (thisModelDeckType === 2) {
          if (
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
              false &&
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
              .isInSpread === true
          ) {
            temp = {
              x: sevenPos[cardCount].x,
              y: sevenPos[cardCount].y,
              //zIndex: cardCount,
            };
          } else {
            temp = {
              x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateX,
              y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateY,
              //zIndex: cardCount,
            };
          }
        }
        if (thisModelDeckType === 3) {
          if (
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
              false &&
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
              .isInSpread === true
          ) {
            temp = {
              x: celticPos[cardCount].x,
              y: celticPos[cardCount].y,
            };
          } else {
            temp = {
              x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateX,
              y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
                .privateY,
            };
          }
        }
      } else if (thisModelDeckType === 0) {
        // Free
        if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            false &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            false
        ) {
          temp = {
            x: 0,
            y: 0,
            zIndex:
              thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].newIdx,
          };
        } else if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            true &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            false
        ) {
          temp = {
            x: 0,
            y: 0,
            zIndex:
              thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].newIdx,
          };
        } else if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            true &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            true
        ) {
          temp = {
            x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
            y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
            zIndex: 0,
          };
        }
      }
    } else {
      if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
          false &&
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].newIdx,
        };
      } else if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
          true &&
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].newIdx,
        };
      } else if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
          true &&
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          true
      ) {
        temp = {
          x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
          y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
          zIndex: 0,
        };
      }
    }

    return temp;
  };
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
      thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate === false
    ) {
      return;
    } else {
      setPrivateRotate(true);
    }
  }, []);
  useEffect(() => {
    if (
      thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isFlip === false
    ) {
      return;
    } else {
      setPrivateFlip(true);
    }
  }, [thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isFlip]);
  useEffect(() => {
    let flag = thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].cardType;
    switch (flag) {
      case 0:
        setImgRoute(
          //`/images/ArcanaOfCard/DefaultImages/TotalImages/Default${dragCardNumArr[_count]}.png` // thiscount 원래 _count였음
          //`/images/TarotDefault/Default${multiModel[CurrentModelNumber].thisModelFirstNumArr[CurrentChildNumber][cardCount]}.png`
          `/images/TarotDefault/Default${SecondRanNumArr[CurrentSelectNum][cardCount]}.png`
        );

        break;
      case 1:
        setImgRoute(
          `/images/Lenormand/DefaultImages/Default_Lenormand${dragCardNumArr[_count]}.png`
        );
        break;
      case 2:
        setImgRoute(
          `/images/IChingDefault/iching${SecondRanNumArr[CurrentSelectNum][cardCount]}.png`
        );
        break;
      case 3:
        break;
      default:
        break;
    }
  }, []);
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
          dragMomentum={false}
          dragConstraints={
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
              .isInSpread === false
              ? refArr[0]
              : refArr[1]
          }
          dragSnapToOrigin={
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount]
              .isInSpread === false
              ? true
              : false
          }
          onDragStart={(e) => {
            onDragStartHandler(e);
          }}
          onDrag={(e) => {
            onDragHandler(e);
          }}
          onDragEnd={(e) => {
            onDragEndHandler(e);
          }}
          onDoubleClick={() => {
            onDoubleClickHandler();
          }}
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
              : `${process.env.PUBLIC_URL}${imgRoute}`
          }
        >
          <img alt="" />
        </MultiDragCardWrapper>
      </Draggable>
    </AnimatePresence>
  );
}

export default SecondDragCard;
