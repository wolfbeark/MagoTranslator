/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  multiModelPrefabAtom,
} from "../../../atom/multiAtom";

const MultiModelTabBox = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: gray;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 1%;
  padding-right: 1%;
`;
const ModelTabItem = styled(motion.div)`
  width: 20%;
  height: 80%;
  background-color: red;
  margin-right: 0.5%;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1%;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
`;
const DeleteModelBtn = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  background-color: cornflowerblue;
  right: 1%;
`;
const CreateModelBtn = styled(motion.div)`
  width: 5%;
  height: 80%;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
`;

function MultiModelTab() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const modelPrefab = useRecoilValue(multiModelPrefabAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber } = multiModel[CurrentModelNumber];
  const [nameArr, setNameArr] = useState(multiManager.MultiModelNameArr);
  const CreateNewModel = () => {
    if (multiManager.ExistModelCount < 5) {
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      let tempModel = JSON.parse(JSON.stringify(multiModel));
      let prefab = JSON.parse(JSON.stringify(modelPrefab));
      tempModel.push(prefab);
      let len = tempManager.MultiModelNameArr.length;
      //console.log(len);
      tempManager.MultiModelNameArr[len] = "Empty";
      //console.log(tempManager.MultiModelNameArr);
      tempManager.CurrentModelNumber = len;
      tempManager.ExistModelCount++;
      setMultiManager(tempManager);
      setMultiModel(tempModel);
    }
  };
  const changeCurrentNumber = (num) => {
    if (num === CurrentModelNumber) {
      return;
    } else {
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      tempManager.CurrentModelNumber = num;
      setMultiManager(tempManager);
    }
  };
  const DeleteThisModel = (num) => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempModel = JSON.parse(JSON.stringify(multiModel));
    let prefab = JSON.parse(JSON.stringify(modelPrefab));
    let totalArr;
    let nameArr;
    if (tempModel.length === 1) {
      tempModel[0] = prefab;
      tempManager.ExistModelCount--;
      tempManager.MultiModelNameArr = [];
      tempManager.ModelExist = false;
    } else {
      totalArr = [...tempModel];
      nameArr = [...tempManager.MultiModelNameArr];

      totalArr.splice(num, 1);
      nameArr.splice(num, 1);
      tempModel = [...totalArr];
      tempManager.ExistModelCount--;
      tempManager.MultiModelNameArr = [...nameArr];
    }
    tempManager.CurrentModelNumber = 0;
    setMultiManager(tempManager);
    setMultiModel(tempModel);
  };

  //console.log(multiModel);
  useEffect(() => {
    setNameArr(multiManager.MultiModelNameArr);
  }, [multiManager.MultiModelNameArr]);
  return (
    <MultiModelTabBox>
      {nameArr.map((a, i) => {
        return (
          <ModelTabItem
            key={`modelTabItem${CurrentModelNumber}${i}`}
            onClick={() => {
              changeCurrentNumber(i);
            }}
            style={
              i === CurrentModelNumber
                ? {
                    backgroundColor: "whitesmoke",
                  }
                : {
                    backgroundColor: "red",
                  }
            }
          >
            {a}
            {i === CurrentModelNumber ? (
              <DeleteModelBtn
                onClick={() => {
                  DeleteThisModel(i);
                }}
              >
                -
              </DeleteModelBtn>
            ) : null}
          </ModelTabItem>
        );
      })}
      {multiManager.ModelExist === true &&
      multiManager.ExistModelCount > 0 &&
      multiManager.ExistModelCount < 5 ? (
        <CreateModelBtn onClick={CreateNewModel}>+</CreateModelBtn>
      ) : null}
    </MultiModelTabBox>
  );
}

export default MultiModelTab;
