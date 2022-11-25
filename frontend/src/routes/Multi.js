/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import MultiSpread from "../components/multi/commons/MultiSpread";
import MultiLeft from "../components/multi/commons/MultiLeft";
import MultiTop from "../components/multi/commons/MultiTop";
import { multiManagerAtom, secondManagerAtom } from "../atom/multiAtom";

const MultiWrapper = styled.div`
  width: 100%;
  //height: ${(props) => (props.longheight === "true" ? "200vh" : "100vh")};
  height: 100vh;
  background-color: red;
`;
const backgroundAni = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
const MultiBackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    ${(props) => props.theme.gra1},
    ${(props) => props.theme.gra2},
    ${(props) => props.theme.gra3},
    ${(props) => props.theme.gra4}
  );
  background-size: 500% 500%;
  animation: ${backgroundAni} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MultiContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;
const MultiHeader = styled(motion.div)`
  width: 100%;
  //height: ${(props) => (props.longheight === "false" ? "5%" : "2.5%")};
  height: 5%;
  background-color: rgba(0, 0, 0, 0.2);
`;
const MultiMainContainer = styled(motion.div)`
  width: 100%;
  //height: ${(props) => (props.longheight === "false" ? "100%" : "50%")};
  height: 95%;
  background-color: rgba(123, 123, 112, 0.2);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const MultiLeftTab = styled(motion.div)`
  position: absolute;
  width: 20%;
  height: 100%;
  left: -20%;
  background-color: red;
`;
const MultiLeftBox = styled(motion.div)`
  position: absolute;
  width: 10%;
  height: 20%;
  background-color: blue;
  right: -10%;
  //top: ${(props) => `${props.tabbtninfo.height}px`};
  top: calc(40%);
`;

function Multi() {
  const tabBtnBoxRef = useRef();
  const leftTabRef = useRef();
  const mainContainerRef = useRef();

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [secondManager, setSecondManager] = useRecoilState(secondManagerAtom);
  const [mainInfo, setMainInfo] = useState({ width: 0 });
  const [tabBtnInfo, setTabBtnInfo] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let valid = sessionStorage.getItem("AccessAuthority");
    if (valid === "false" || valid === null || valid === undefined) {
      navigate("/auth");
    } else {
      let flag_1 = localStorage.getItem("MultiLoginHistory");
      //console.log(flag_1);
      //console.log(typeof flag_1);
      if (flag_1 === null || flag_1 === "false") {
        let tempObj = JSON.parse(JSON.stringify(multiManager));
        let tempObj2 = JSON.parse(JSON.stringify(secondManager));
        // 최초의 값들. 최초의 최초의 값.
        localStorage.setItem("MultiLoginHistory", "true");
        // DeckType
        localStorage.setItem("DefaultDeckType", "1"); // 0 Free 1 Three
        // DeckName
        localStorage.setItem("DefaultListName1", "Star");
        localStorage.setItem("DefaultListName2", "Square");
        localStorage.setItem("DefaultListName3", "Triangle");
        localStorage.setItem("DefaultListName4", "Circle");
        localStorage.setItem("DefaultListName5", "Heart");
        // Card Count
        localStorage.setItem("DefaultCardCount", "3");
        // Preview Three Card
        localStorage.setItem("DefaultPreviewThree", "true");

        // Recoil Manager 에 담아줄것
        // 이 부분은 최초의 로그인 여부기 때문에 존재하지 않으니
        // 현재 아래 처럼 쓰는게 아니라 직접 값을 넣어줘야한다 최초의 값과 동일하게

        tempObj.DefaultNameArr[0] = "Star";
        tempObj.DefaultNameArr[1] = "Square";
        tempObj.DefaultNameArr[2] = "Triangle";
        tempObj.DefaultNameArr[3] = "Circle";
        tempObj.DefaultNameArr[4] = "Heart";

        //tempObj.DefaultNameArr = ["Star", "Square", "Triangle", "Circle", "Heart"]

        tempObj.DefaultCardCount = 3;
        tempObj.DefaultPreviewThree = true;
        tempObj.DefaultDeckType = 1;

        // second manager
        // DeckType
        localStorage.setItem("SecondDefaultDeckType", "1"); // 0 Free 1 Three
        // DeckName
        localStorage.setItem("SecondDefaultListName1", "Star");
        localStorage.setItem("SecondDefaultListName2", "Square");
        localStorage.setItem("SecondDefaultListName3", "Triangle");
        localStorage.setItem("SecondDefaultListName4", "Circle");
        localStorage.setItem("SecondDefaultListName5", "Heart");
        // Card Count
        localStorage.setItem("SecondDefaultCardCount", "3");
        // Preview Three Card
        localStorage.setItem("SecondDefaultPreviewThree", "true");

        tempObj2.DefaultNameArr[0] = "Star";
        tempObj2.DefaultNameArr[1] = "Square";
        tempObj2.DefaultNameArr[2] = "Triangle";
        tempObj2.DefaultNameArr[3] = "Circle";
        tempObj2.DefaultNameArr[4] = "Heart";
        //tempObj.DefaultNameArr = ["Star", "Square", "Triangle", "Circle", "Heart"]
        tempObj2.DefaultCardCount = 3;
        tempObj2.DefaultPreviewThree = true;
        tempObj2.DefaultDeckType = 1;

        setMultiManager(tempObj);
        setSecondManager(tempObj2);
      }

      // 만약 MultiLoginHistory가 존재한다면
      // 위 내용이 이미 존재한다는 뜻이니 로컬스토리지에서
      // 가져와서 리코일에 담아줄 것
      else {
        let tempObj = JSON.parse(JSON.stringify(multiManager));
        let tempObj2 = JSON.parse(JSON.stringify(secondManager));

        tempObj.DefaultDeckType = Number(
          localStorage.getItem("DefaultDeckType")
        ); // 0 Free 1 Three
        // DeckName
        tempObj.DefaultNameArr[0] = localStorage.getItem("DefaultListName1");
        tempObj.DefaultNameArr[1] = localStorage.getItem("DefaultListName2");
        tempObj.DefaultNameArr[2] = localStorage.getItem("DefaultListName3");
        tempObj.DefaultNameArr[3] = localStorage.getItem("DefaultListName4");
        tempObj.DefaultNameArr[4] = localStorage.getItem("DefaultListName5");
        // Card Count
        tempObj.DefaultCardCount = Number(
          localStorage.getItem("DefaultCardCount")
        );
        // Preview Three Card
        // tempObj.DefaultPreviewThree = Boolean(
        //   localStorage.getItem("DefaultPreviewThree")
        // );

        tempObj.DefaultPreviewThree =
          localStorage.getItem("DefaultPreviewThree") === "false"
            ? false
            : true;

        // DeckType
        tempObj2.DefaultDeckType = Number(
          localStorage.getItem("SecondDefaultDeckType")
        ); // 0 Free 1 Three
        // DeckName
        tempObj2.DefaultNameArr[0] = localStorage.getItem(
          "SecondDefaultListName1"
        );
        tempObj2.DefaultNameArr[1] = localStorage.getItem(
          "SecondDefaultListName2"
        );
        tempObj2.DefaultNameArr[2] = localStorage.getItem(
          "SecondDefaultListName3"
        );
        tempObj2.DefaultNameArr[3] = localStorage.getItem(
          "SecondDefaultListName4"
        );
        tempObj2.DefaultNameArr[4] = localStorage.getItem(
          "SecondDefaultListName5"
        );
        // Card Count
        tempObj2.DefaultCardCount = Number(
          localStorage.getItem("SecondDefaultCardCount")
        );
        // Preview Three Card
        tempObj2.DefaultPreviewThree =
          localStorage.getItem("SecondDefaultPreviewThree") === "false"
            ? false
            : true;

        setMultiManager(tempObj);
        setSecondManager(tempObj2);
      }
    }
  }, []);
  return (
    <MultiWrapper>
      <MultiBackgroundBox>
        <MultiContainer ref={mainContainerRef}>
          <MultiHeader>
            <button>Test</button>
          </MultiHeader>
          <MultiMainContainer>
            {/* <MultiLeft /> */}
            {/* <MultiTop /> */}
            <MultiSpread />
          </MultiMainContainer>
        </MultiContainer>
      </MultiBackgroundBox>
    </MultiWrapper>
  );
}

export default Multi;