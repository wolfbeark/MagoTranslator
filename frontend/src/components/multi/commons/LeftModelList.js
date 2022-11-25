/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const ModelListBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 89%;
  background-color: fuchsia;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  scroll-behavior: auto;
  overflow: overlay;
  overflow-x: hidden;
`;
const ModelListItemWrapper = styled(motion.div)`
  width: 95%;
  min-height: 10%;
  background-color: yellow;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  position: relative;
`;
const ModelListItem = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: yellow;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  position: relative;
`;
const ModelBtn = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OptionalSecondBtn = styled(motion.div)`
  width: 10%;
  height: 50%;
  background-color: khaki;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1%;
`;
const SecondItemBox = styled(motion.div)`
  //position: absolute;
  width: 100%;
  height: 50%;
  min-height: 50%;
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  padding: 1%;
  justify-content: ${(props) =>
    props.isdefined === "false" ? "center" : "space-evenly"};
  align-items: center;
  //bottom: -50%;
`;
const SecondUndefinedAlarm = styled(motion.div)`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
`;
const SecondNameBox = styled(motion.div)`
  width: 80%;
  height: 15%;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SecondSelectBtn = styled(motion.div)``;

function LeftModelList(props) {
  const count = props.count;
  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, thisModelChildNameArr, SecondSpread } =
    multiModel[CurrentModelNumber];
  const { CurrentSelectNum } = SecondSpread[CurrentChildNumber];

  const [isOpen, setIsOpen] = useState(
    multiModel[CurrentModelNumber].SecondSpread[count].isOpen
  );
  const [isTabFold, setIsTabFold] = useState(
    multiModel[CurrentModelNumber].SecondSpread[count].isTabFold
  );
  const [isDefined, setIsDefined] = useState(
    multiModel[CurrentModelNumber].SecondSpread[count].isDefined
  );
  const changeCurrentChild = (num) => {
    if (num === CurrentChildNumber) {
      return;
    } else {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].CurrentChildNumber = num;
      setMultiModel(tempModel);
    }
  };
  const openSecondSpread = (num) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[CurrentModelNumber].CurrentChildNumber = num;
    tempModel[CurrentModelNumber].SecondSpread[num].isOpen = true;
    tempModel[CurrentModelNumber].SecondSpread[num].isSecondFold = false;
    setMultiModel(tempModel);
  };
  const listOpenControl = (num, flag) => {
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    tempModel[CurrentModelNumber].SecondSpread[num].isTabFold = flag;
    if (
      tempModel[CurrentModelNumber].SecondSpread[num].isDefined === false &&
      tempModel[CurrentModelNumber].SecondSpread[num].isSecondFold === true
    ) {
      tempModel[CurrentModelNumber].SecondSpread[num].isSecondFold = false;
    }
    setMultiModel(tempModel);
  };
  const changeCurrentSelectNum = (num) => {
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .CurrentSelectNum === num
    ) {
      return;
    } else {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].CurrentSelectNum = num;
      tempModel[CurrentModelNumber].SecondSpread[num].isSecondFold = false;
      setMultiModel(tempModel);
    }
  };
  const undefinedControl = () => {
    //let tempModel = JSON.parse(JSON.stringify(multiModel));
    if (
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isDefined === false &&
      multiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .isSecondFold === true
    ) {
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      tempModel[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isSecondFold = false;
      setMultiModel(tempModel);
    }
  };
  useEffect(() => {
    setIsOpen(multiModel[CurrentModelNumber].SecondSpread[count].isOpen);
    setIsTabFold(multiModel[CurrentModelNumber].SecondSpread[count].isTabFold);
    setIsDefined(multiModel[CurrentModelNumber].SecondSpread[count].isDefined);
  }, [multiModel, SecondSpread]);
  return (
    <>
      <ModelListItemWrapper>
        <ModelListItem>
          <ModelBtn
            onClick={() => {
              changeCurrentChild(count);
            }}
            style={
              count === CurrentChildNumber
                ? { backgroundColor: "orangered" }
                : {}
            }
          >
            {thisModelChildNameArr[count]}
          </ModelBtn>
          {SecondSpread[count].isOpen === false &&
          SecondSpread[count].isDefined === false ? (
            <OptionalSecondBtn
              onClick={() => {
                //changeCurrentChild(count);
                openSecondSpread(count);
              }}
            >
              +
            </OptionalSecondBtn>
          ) : null}
          {isOpen === true ? (
            isTabFold === true ? (
              <OptionalSecondBtn
                onClick={() => {
                  listOpenControl(count, false);
                }}
              >
                ▼
              </OptionalSecondBtn>
            ) : (
              <OptionalSecondBtn
                onClick={() => {
                  listOpenControl(count, true);
                }}
              >
                ▲
              </OptionalSecondBtn>
            )
          ) : null}
        </ModelListItem>
      </ModelListItemWrapper>
      {isOpen === true && isTabFold === false ? (
        <SecondItemBox isdefined={isDefined === false ? "false" : "true"}>
          {multiModel[CurrentModelNumber].SecondSpread[count].isDefined ===
          false ? (
            <SecondUndefinedAlarm onClick={undefinedControl}>
              Child Model Undefined
            </SecondUndefinedAlarm>
          ) : (
            <>
              {multiModel[CurrentModelNumber].SecondSpread[
                count
              ].SecondModelTabNameArr.map((a, i) => {
                return (
                  <SecondNameBox
                    key={`secondNameBox${i}${CurrentModelNumber}${CurrentChildNumber}${count}${a}`}
                    onClick={() => {
                      changeCurrentSelectNum(i);
                      undefinedControl();
                    }}
                    style={
                      CurrentSelectNum === i
                        ? {
                            backgroundColor: "red",
                          }
                        : {}
                    }
                  >
                    {a}
                  </SecondNameBox>
                );
              })}
            </>
          )}
        </SecondItemBox>
      ) : null}
    </>
  );
}

export default React.memo(LeftModelList);
