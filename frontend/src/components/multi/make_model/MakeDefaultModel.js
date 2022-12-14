/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  multiModelPrefabAtom,
} from "../../../atom/multiAtom";

const AllCenterDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CustomDefaultBox = styled(motion.div)`
  width: 45%;
  height: 95%;
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1%;
`;
const Title = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5%;
`;
const ItemLabel = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: chocolate;
`;
const DecideModelName = styled(motion.div)`
  width: 100%;
  height: 20%;
  background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TypeBox = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ItemInput = styled(motion.input)`
  width: 79%;
  height: 100%;
  background-color: thistle;
`;
const ItemInputBox = styled(motion.input)`
  width: 100%;
  height: 10%;
  background-color: thistle;
  border: none;
  outline: unset;
`;

const DeckNameBox = styled(motion.div)`
  width: 100%;
  height: 50%;
  background-color: darkgrey;
`;
const DeckTypeBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: darkgoldenrod;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1%;
`;
const DeckTypeBtnBox = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionCustomMakeBox = styled(motion.div)`
  width: 45%;
  height: 95%;
  position: absolute;
  background-color: coral;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionMake = styled(motion.span)`
  width: 100%;
  height: 30%;
  background-color: burlywood;
`;
const QuestionCaution = styled(motion.span)`
  width: 100%;
  height: 10%;
  background-color: blue;
`;
const QuestionBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  display: flex;
  background-color: cornflowerblue;
  justify-content: space-evenly;
  align-items: center;
`;
const QuestionBtn = styled(motion.button)`
  width: 30%;
  height: 100%;
  background-color: aquamarine;
`;

const ErrorBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: absolute;
`;

const MakeBoxBtn = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: cadetblue;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
`;
const OptionalBtnBox = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionSettingBtnBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 10%;
  height: ${(props) => `${props.optionbtninfo.width}px`};
  right: 1%;
  background-color: beige;
`;
const DefaultReadyInfoBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: navajowhite;
  width: 100%;
  height: 90%;
  ${ItemLabel} {
    height: 5%;
  }
  /* ${ItemInput} {
    height: 10%;
  } */
`;
const ShowInfoBox = styled(motion.div)`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: honeydew;
`;
const ShowDeckNameBox = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: gainsboro;
  padding: 1%;
`;
const DeckNameItem = styled(AllCenterDiv)`
  width: 100%;
  height: 15%;
  background-color: lemonchiffon;
  justify-content: space-evenly;
  padding: 1%;
`;
const DeckNameNumber = styled(AllCenterDiv)`
  width: 30%;
  height: 100%;
  background-color: violet;
`;
const DeckDefaultName = styled(AllCenterDiv)`
  width: 65%;
  height: 100%;
  background-color: rosybrown;
`;
const ShowModelInfoBox = styled(AllCenterDiv)`
  width: 29%;
  height: 100%;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: indigo;
  padding: 1%;
`;
const ModelInfoItem = styled(AllCenterDiv)`
  width: 100%;
  height: 30%;
  flex-direction: column;
  background-color: green;
`;
const ModelInfoName = styled(AllCenterDiv)`
  width: 100%;
  height: 50%;
  background-color: olivedrab;
`;
const ModelInfoValue = styled(AllCenterDiv)`
  width: 100%;
  height: 50%;
  background-color: orange;
`;

const btnVar = {
  active: {
    backgroundColor: "rgba(5, 196, 107, 1.0)",
  },
  inactive: {
    backgroundColor: "rgba(15, 188, 249, 1.0)",
  },
};

function MakeDefaultModel({
  isActiveQuest,
  setIsActiveQuest,
  setSecondflag,
  setMakeModelType,
}) {
  const optionBtnRef = useRef();
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const multiModelPrefab = useRecoilValue(multiModelPrefabAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrrentChildNumber } = multiModel[CurrentModelNumber];
  const deckTypeCountArr = ["", 3, 7, 11];
  const deckNameArr = ["Free", "Three", "Seven", "Celtic"];
  const [optionBtnInfo, setOptionBtnInfo] = useState({
    width: 0,
  });
  const [optionClose, setOptionClose] = useState(true);
  const [customModelName, setCustomModelName] = useState("");
  const [nameValue0, setNameValue0] = useState("");
  const [nameValue1, setNameValue1] = useState("");
  const [nameValue2, setNameValue2] = useState("");
  const [nameValue3, setNameValue3] = useState("");
  const [nameValue4, setNameValue4] = useState("");
  const [activeThree, setActiveThree] = useState(
    localStorage.getItem("DefaultPreviewThree") === "false" ? false : true
  );
  const [deckType, setDeckType] = useState(
    Number(localStorage.getItem("DefaultDeckType"))
  );
  const [cardCount, setCardCount] = useState(
    Number(localStorage.getItem("DefaultCardCount"))
  );
  const [activeError, setActiveError] = useState(false);
  const resetHandler = () => {
    setNameValue0("");
    setNameValue1("");
    setNameValue2("");
    setNameValue3("");
    setNameValue4("");
  };
  const onNameChangeHandler = (e, num) => {
    let temp = e.target.value;
    switch (num) {
      case 0:
        setNameValue0(temp);
        break;
      case 1:
        setNameValue1(temp);
        break;
      case 2:
        setNameValue2(temp);
        break;
      case 3:
        setNameValue3(temp);
        break;
      case 4:
        setNameValue4(temp);
        break;
      default:
        break;
    }
  };
  const previewSettingChanger = (flag) => {
    setActiveThree(flag);
  };
  const deckTypeChanger = (num) => {
    if (deckType === num) {
      return;
    } else {
      setDeckType(num);
      setCardCount(deckTypeCountArr[num]);
    }
  };
  const errorChecker = () => {
    if (cardCount === "" || cardCount === 0) {
      setActiveError(true);
      setTimeout(() => {
        setActiveError(false);
        setIsActiveQuest(false);
      }, 2000);
      return false;
    } else {
      return true;
    }
  };
  const makeNewDefaultModel = () => {
    let checkCount = errorChecker();
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempMultiModel = JSON.parse(JSON.stringify(multiModel));
    let tempObj = {};
    // CardInfoArr
    let tempCardInfo = {
      // Decktype 1,2
      isDraged: false,
      isFlip: false,
      isInSpread: true,
      isRotate: false,
      newIdx: 0,
      privateX: 0,
      privateY: 0,
      cardType: 0,
      isExtraCard: false,
    };
    let rotateCardInfo = {
      // Decktype 3,
      isDraged: false,
      isFlip: false,
      isInSpread: true,
      isRotate: true,
      newIdx: 0,
      privateX: 0,
      privateY: 0,
      cardType: 0,
      isExtraCard: false,
    };
    let tempCardInfo2 = {
      // Decktype 0, free
      isDraged: false,
      isFlip: false,
      isInSpread: false,
      isRotate: false,
      newIdx: 0,
      privateX: 0,
      privateY: 0,
      cardType: 0,
      isExtraCard: false,
    };
    if (checkCount === false) {
      console.log("fail");
      return;
    } else {
      tempObj = JSON.parse(JSON.stringify(multiModelPrefab));
      tempObj.modelDefined = true;
      tempObj.modelType = false;
      tempObj.thisModelDeckType = deckType;
      tempObj.thisModelTotalCardCount = cardCount;
      //tempObj.firstCardCount[CurrrentChildNumber] = cardCount;
      tempObj.thisModelPreviewThree = activeThree;

      //ModelName
      if (customModelName !== "") {
        tempObj.modelName = customModelName;
      } else {
        tempObj.modelName = `Untitle - ${CurrentModelNumber}`;
      }
      //List Name
      let tempNameArr = new Array(5);
      tempNameArr[0] = nameValue0;
      tempNameArr[1] = nameValue1;
      tempNameArr[2] = nameValue2;
      tempNameArr[3] = nameValue3;
      tempNameArr[4] = nameValue4;
      for (let i = 0; i < 5; i++) {
        if (tempNameArr[i] === "") {
          tempNameArr[i] = localStorage.getItem(`DefaultListName${i + 1}`);
        }
      }
      tempObj.thisModelChildNameArr = [...tempNameArr];

      // Preview Check
      if (activeThree === true) {
        let tempArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          let tempArr2 = new Array(3);
          for (let k = 0; k < 3; k++) {
            let tempNum = Math.floor(Math.random() * 78);
            tempArr2[k] = tempNum;
            for (let l = 0; l < k; l++) {
              if (tempArr2[k] === tempArr2[l]) {
                k--;
                break;
              }
            }
          }
          tempArr[i] = tempArr2;
        }
        tempObj.thisModelPreviewThreeNumArr = [...tempArr];
      }

      // Ran Num Arr
      let ranNumArr = new Array(5);
      for (let i = 0; i < 5; i++) {
        let tempRanNumArr = new Array(cardCount);
        for (let a = 0; a < tempRanNumArr.length; a++) {
          let tempNum = Math.floor(Math.random() * 78);
          tempRanNumArr[a] = tempNum;
          for (let b = 0; b < a; b++) {
            if (tempRanNumArr[b] === tempRanNumArr[a]) {
              a--;
              break;
            }
          }
        }
        ranNumArr[i] = tempRanNumArr;
      }
      tempObj.thisModelFirstNumArr = [...ranNumArr];

      // Card Info Arr
      let tempCardInfoArr = new Array(5);
      if (deckType === 3) {
        // Celtic
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(11);
          for (let c = 0; c < tempArr.length; c++) {
            if (c === 2) {
              tempArr[c] = rotateCardInfo;
            } else {
              tempArr[c] = tempCardInfo;
            }
          }
          tempCardInfoArr[b] = tempArr;
        }
      } else if (deckType !== 0 && deckType !== 3) {
        // Three, Seven
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(deckType === 1 ? 3 : 7);
          for (let c = 0; c < tempArr.length; c++) {
            tempArr[c] = tempCardInfo;
          }
          tempCardInfoArr[b] = tempArr;
        }
      } else if (deckType === 0) {
        // Free
        for (let b = 0; b < 5; b++) {
          //console.log("sdf : ", cardCount);
          let tempArr = new Array(cardCount);
          for (let c = 0; c < tempArr.length; c++) {
            let tempObj = { ...tempCardInfo2 };
            tempObj.newIdx = tempArr.length - c;
            tempArr[c] = tempObj;
          }
          tempCardInfoArr[b] = tempArr;
        }
        //console.log(tempCardInfoArr);
      }
      tempObj.thisModelFirstCardInfoArr = [...tempCardInfoArr];

      // remain Counter, firstCardCount
      if (deckType !== 0) {
        let tempRemainCountArr = new Array(5);
        let tempFirstCardCountArr = new Array(5);

        for (let i = 0; i < 5; i++) {
          tempRemainCountArr[i] = 0;
          tempFirstCardCountArr[i] = Number(cardCount);
        }
        tempObj.remainCardCount = [...tempRemainCountArr];
        tempObj.firstCardCount = [...tempFirstCardCountArr];
      } else {
        let tempRemainCountArr = new Array(5);
        let tempFirstCardCountArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempRemainCountArr[i] = Number(cardCount);
          tempFirstCardCountArr[i] = Number(cardCount);
        }
        tempObj.remainCardCount = [...tempRemainCountArr];
        tempObj.firstCardCount = [...tempFirstCardCountArr];
      }

      if (customModelName !== "") {
        tempManager.MultiModelNameArr[CurrentModelNumber] = customModelName;
      } else {
        tempManager.MultiModelNameArr[
          CurrentModelNumber
        ] = `Untitle - ${CurrentModelNumber}`;
      }
      if (tempManager.ModelExist === false) {
        tempManager.ModelExist = true;
      }

      tempMultiModel[tempManager.CurrentModelNumber] = { ...tempObj };
      //console.log(tempMultiModel);
      if (tempManager.ExistModelCount === 0) {
        tempManager.ExistModelCount++;
      }
      setMultiManager(tempManager);
      setMultiModel(tempMultiModel);
    } // else ?????????
    //console.log(multiModel);
  };

  const setNewDefaultValue = () => {
    let flag = errorChecker();
    if (flag === false) {
      return;
    } else {
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      let tempArr = new Array(5);
      tempArr[0] = nameValue0;
      tempArr[1] = nameValue1;
      tempArr[2] = nameValue2;
      tempArr[3] = nameValue3;
      tempArr[4] = nameValue4;
      for (let i = 0; i < 5; i++) {
        if (tempArr[i] === "") {
          tempArr[i] = localStorage.getItem(`DefaultListName${i + 1}`);
        }
      }
      for (let i = 0; i < 5; i++) {
        tempManager.DefaultNameArr[i] = tempArr[i];
      }
      tempManager.DefaultDeckType = deckType;
      tempManager.DefaultCardCount = cardCount;
      tempManager.DefaultPreviewThree = activeThree;

      // LocalStorage
      localStorage.setItem("DefaultListName1", tempArr[0]);
      localStorage.setItem("DefaultListName2", tempArr[1]);
      localStorage.setItem("DefaultListName3", tempArr[2]);
      localStorage.setItem("DefaultListName4", tempArr[3]);
      localStorage.setItem("DefaultListName5", tempArr[4]);

      localStorage.setItem("DefaultDeckType", String(deckType));
      localStorage.setItem("DefaultCardCount", String(cardCount));
      localStorage.setItem("DefaultPreviewThree", String(activeThree));

      setMultiManager(tempManager);
      setOptionClose(true);

      // reset
      resetHandler();
    }
  };
  useEffect(() => {
    let _cardCount = localStorage.getItem("DefaultCardCount");
    let _deckType = localStorage.getItem("DefaultDeckType");
    let _preview =
      localStorage.getItem("DefaultPreviewThree") === "false" ? false : true;
    // num num bool
    setCardCount(Number(_cardCount));
    setDeckType(Number(_deckType));
    setActiveThree(Boolean(_preview));
  }, []);
  useEffect(() => {
    const temp = optionBtnRef.current.getBoundingClientRect();
    setOptionBtnInfo({
      width: temp.width,
    });
  }, []);

  //useEffect(() => {}, [multiManager]);

  return (
    <>
      <CustomDefaultBox>
        <Title>
          Default Model
          <OptionSettingBtnBox
            onClick={() => {
              setOptionClose((prev) => !prev);
            }}
            ref={optionBtnRef}
            optionbtninfo={optionBtnInfo}
          >
            Set
          </OptionSettingBtnBox>
        </Title>
        {optionClose === false ? (
          <>
            <DefaultReadyInfoBox>
              {/* <ItemLabel>Model Name</ItemLabel>
              <ItemInputBox
                value={customModelName}
                onChange={(e) => {
                  setCustomModelName(e.target.value);
                }}
                placeholder={multiModel[CurrentModelNumber].modelName}
              /> */}
              <ItemLabel>Deck Name</ItemLabel>
              <DeckNameBox>
                <DecideModelName>
                  <TypeBox>Deck 1</TypeBox>
                  <ItemInput
                    value={nameValue0}
                    onChange={(e) => onNameChangeHandler(e, 0)}
                    placeholder={localStorage.getItem("DefaultListName1")}
                  ></ItemInput>
                </DecideModelName>
                <DecideModelName>
                  <TypeBox>Deck 2</TypeBox>
                  <ItemInput
                    value={nameValue1}
                    onChange={(e) => onNameChangeHandler(e, 1)}
                    placeholder={localStorage.getItem("DefaultListName2")}
                  ></ItemInput>
                </DecideModelName>
                <DecideModelName>
                  <TypeBox>Deck 3</TypeBox>
                  <ItemInput
                    value={nameValue2}
                    onChange={(e) => onNameChangeHandler(e, 2)}
                    placeholder={localStorage.getItem("DefaultListName3")}
                  ></ItemInput>
                </DecideModelName>
                <DecideModelName>
                  <TypeBox>Deck 4</TypeBox>
                  <ItemInput
                    value={nameValue3}
                    onChange={(e) => onNameChangeHandler(e, 3)}
                    placeholder={localStorage.getItem("DefaultListName4")}
                  ></ItemInput>
                </DecideModelName>
                <DecideModelName>
                  <TypeBox>Deck 5</TypeBox>
                  <ItemInput
                    value={nameValue4}
                    onChange={(e) => onNameChangeHandler(e, 4)}
                    placeholder={localStorage.getItem("DefaultListName5")}
                  ></ItemInput>
                </DecideModelName>
              </DeckNameBox>
              <ItemLabel>Deck Type</ItemLabel>
              <DeckTypeBox>
                {deckNameArr.map((a, i) => {
                  return (
                    <DeckTypeBtnBox
                      key={a + i}
                      variants={btnVar}
                      initial={false}
                      animate={deckType === i ? "active" : "inactive"}
                      onClick={() => {
                        deckTypeChanger(i);
                      }}
                    >
                      {a}
                    </DeckTypeBtnBox>
                  );
                })}
              </DeckTypeBox>
              <ItemLabel>Card Count</ItemLabel>
              <ItemInputBox
                value={cardCount}
                readOnly={deckType !== 0 ? true : false}
                maxLength={2}
                onChange={(e) => {
                  let temp = e.target.value
                    .replace(/[^0-9]/g, "")
                    .replace(/(\..*)\./g, "$1");
                  setCardCount(Number(temp));
                }}
              ></ItemInputBox>
              <ItemLabel>Preview Three Card</ItemLabel>
              <DeckTypeBox>
                <DeckTypeBtnBox
                  variants={btnVar}
                  initial={false}
                  animate={activeThree === true ? "active" : "inactive"}
                  onClick={() => {
                    previewSettingChanger(true);
                  }}
                >
                  True
                </DeckTypeBtnBox>
                <DeckTypeBtnBox
                  variants={btnVar}
                  initial={false}
                  animate={activeThree === false ? "active" : "inactive"}
                  onClick={() => {
                    previewSettingChanger(false);
                  }}
                >
                  False
                </DeckTypeBtnBox>
              </DeckTypeBox>
            </DefaultReadyInfoBox>
            <MakeBoxBtn>
              <OptionalBtnBox
                onClick={() => {
                  setOptionClose(true);
                  resetHandler();
                  setDeckType(multiManager.DefaultDeckType);
                  setCardCount(multiManager.DefaultCardCount);
                  setActiveThree(multiManager.DefaultPreviewThree);
                }}
              >
                Back
              </OptionalBtnBox>
              <OptionalBtnBox
                onClick={() => {
                  setNewDefaultValue();
                }}
              >
                Set
              </OptionalBtnBox>
            </MakeBoxBtn>
          </>
        ) : (
          <>
            <DefaultReadyInfoBox>
              <ItemLabel>Model Name</ItemLabel>
              <ItemInputBox
                value={customModelName}
                onChange={(e) => {
                  setCustomModelName(e.target.value);
                }}
                placeholder={multiModel[CurrentModelNumber].modelName}
              />
              <ShowInfoBox>
                <ShowDeckNameBox>
                  {multiManager.DefaultNameArr.map((a, i) => {
                    return (
                      <DeckNameItem key={`DefaultName${i}`}>
                        <DeckNameNumber>{`List ${i + 1}`}</DeckNameNumber>
                        <DeckDefaultName>{a}</DeckDefaultName>
                      </DeckNameItem>
                    );
                  })}
                </ShowDeckNameBox>
                <ShowModelInfoBox>
                  <ModelInfoItem>
                    <ModelInfoName>Deck Type</ModelInfoName>
                    <ModelInfoValue>
                      {deckNameArr[multiManager.DefaultDeckType]}
                    </ModelInfoValue>
                  </ModelInfoItem>
                  <ModelInfoItem>
                    <ModelInfoName>Preview 3 Card</ModelInfoName>
                    <ModelInfoValue>
                      {String(multiManager.DefaultPreviewThree)}
                    </ModelInfoValue>
                  </ModelInfoItem>
                  <ModelInfoItem>
                    <ModelInfoName>Card Count</ModelInfoName>
                    <ModelInfoValue>
                      {multiManager.DefaultCardCount}
                    </ModelInfoValue>
                  </ModelInfoItem>
                </ShowModelInfoBox>
              </ShowInfoBox>
            </DefaultReadyInfoBox>
            <MakeBoxBtn>
              <OptionalBtnBox
                onClick={() => {
                  setSecondflag(false);
                  setMakeModelType(2);
                  if (isActiveQuest === true) {
                    setIsActiveQuest(false);
                  }
                }}
              >
                Back
              </OptionalBtnBox>
              <OptionalBtnBox
                onClick={() => {
                  if (isActiveQuest === false) {
                    setIsActiveQuest(true);
                  }
                }}
              >
                Make
              </OptionalBtnBox>
            </MakeBoxBtn>
          </>
        )}
      </CustomDefaultBox>
      {isActiveQuest === true ? (
        <QuestionCustomMakeBox>
          <QuestionMake>Are you Sure?</QuestionMake>
          <QuestionCaution>this setting caution</QuestionCaution>
          <QuestionBtnBox>
            <QuestionBtn onClick={() => makeNewDefaultModel()}>Yes</QuestionBtn>
            <QuestionBtn onClick={() => setIsActiveQuest(false)}>
              No
            </QuestionBtn>
          </QuestionBtnBox>
          {activeError === true ? <ErrorBox>Error</ErrorBox> : null}
        </QuestionCustomMakeBox>
      ) : null}
    </>
  );
}

export default MakeDefaultModel;
