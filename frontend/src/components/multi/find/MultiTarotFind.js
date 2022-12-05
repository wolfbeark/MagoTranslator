/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { AllCenterDiv } from "../../../CommonComponents";
import { useRecoilState } from "recoil";
import { multiManagerAtom } from "../../../atom/multiAtom";

const TarotFindWrapper = styled(AllCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: olive;
  padding: 1%;
  justify-content: space-between;
  position: relative;
`;

const SelectCardTypeBox = styled(AllCenterDiv)`
  width: 15%;
  height: 100%;
  background-color: burlywood;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1%;
`;

const SelectCardDetailBox = styled(AllCenterDiv)`
  width: 58%;
  height: 100%;
  background-color: burlywood;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1% 0;
  scroll-behavior: auto;
  overflow: overlay;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 1vw;
  }
  ::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }
`;
const SemiTypeBtn = styled(motion.button)`
  outline: unset;
  border: none;
  width: 80%;
  height: 40%;
  min-height: 10%;
  max-height: 10%;
  background-color: gray;
  margin-bottom: 5%;
  font-weight: 600;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
`;
const SelectCardControlBox = styled(AllCenterDiv)`
  width: 25%;
  height: 100%;
  background-color: burlywood;
  padding: 1%;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CardTypeBtn = styled(AllCenterDiv)`
  width: 100%;
  height: auto;
  min-height: 10%;
  background-color: gray;
`;

const PreviewBox = styled(AllCenterDiv)`
  width: 100%;
  height: 49%;
  justify-content: space-between;
  background-color: lemonchiffon;
`;
const PreviewItemBox = styled(AllCenterDiv)`
  width: 48%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rebeccapurple;
`;
const ChoiceItemBox = styled(AllCenterDiv)`
  width: 48%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rebeccapurple;
`;
const PreviewTextBox = styled(AllCenterDiv)`
  width: 100%;
  height: 15%;
  background-color: wheat;
`;
const PreviewImgBox = styled(AllCenterDiv)`
  width: 100%;
  height: 74%;
  background-color: chartreuse;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
`;

const ControlBox = styled(AllCenterDiv)`
  width: 100%;
  height: 39%;
  background-color: saddlebrown;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 2%;
`;

const ControlBtn = styled(AllCenterDiv)`
  width: 100%;
  height: 30%;
  background-color: salmon;
`;
function MultiTarotFind(props) {
  const findType = props.findType;
  const setIsOpenFindOption = props.setIsOpenFindOption;
  const closeControlBox = props.closeControlBox;

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [selectedDeck, setSelectedDeck] = useState([]);

  const [isClickedTypeMenu, setIsClickedTypeMenu] = useState(false);

  const [typeMenuArr, setTypeMenuArr] = useState([]);
  const [semiTypeNum, setSemiTypeNum] = useState(10);

  const [semiTypeArr, setSemiTypeArr] = useState([]);
  const [semiNumArr, setSemiNumArr] = useState([]);

  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverNum, setHoverNum] = useState();
  const [selectedNum, setSelectedNum] = useState(null);

  const imgRouteArr = ["/images/TarotDefault/Default"];
  const tarotMenuNameArr = ["MAJOR", "WAND", "SWORD", "CUP", "PENTACLE"];
  const lenorMenuNameArr = ["1 - 10", "11 - 20", "21 - 30", "31 - 36"];
  const ichingMenuNameArr = [
    "1 - 10",
    "11 - 20",
    "21 - 30",
    "31 - 40",
    "41 - 50",
    "51 - 60",
    "61 - 64",
  ];
  const pokerMenuNameArr = [
    // 흑 스 하 클 다 색
    "JOKER",
    "SPADE",
    "HEART",
    "CLOVER",
    "DIAMOND",
  ];

  const semiTarotNameArr = [
    "THE FOOL",
    "THE MAGICIAN",
    "THE HIGH PRIESTESS",
    "THE EMPRESS",
    "THE EMPEROR",
    "THE HIEROPHANT",
    "THE LOVERS",
    "THE CHARIOT",
    "STRENGTH",
    "THE HERMIT",
    "THE WHEEL OF FORTUNE",
    "JUSTICE",
    "THE HANGED MAN",
    "DEATH",
    "TEMPERANCE",
    "THE DEVIL",
    "THE TOWER",
    "THE STAR",
    "THE MOON",
    "THE SUN",
    "JUDGEMENT",
    "THE WORLD",
    "WAND 1",
    "WAND 2",
    "WAND 3",
    "WAND 4",
    "WAND 5",
    "WAND 6",
    "WAND 7",
    "WAND 8",
    "WAND 9",
    "WAND 10",
    "PAGE OF WANDS",
    "KNIGHT OF WANDS",
    "QUEEN OF WANDS",
    "KING OF WANDS",
    "SWORD 1",
    "SWORD 2",
    "SWORD 3",
    "SWORD 4",
    "SWORD 5",
    "SWORD 6",
    "SWORD 7",
    "SWORD 8",
    "SWORD 9",
    "SWORD 10",
    "PAGE OF SWORDS",
    "KNIGHT OF SWORDS",
    "QUEEN OF SWORDS",
    "KING OF SWORDS",
    "CUP 1",
    "CUP 2",
    "CUP 3",
    "CUP 4",
    "CUP 5",
    "CUP 6",
    "CUP 7",
    "CUP 8",
    "CUP 9",
    "CUP 10",
    "PAGE OF CUPS",
    "KNIGHT OF CUPS",
    "QUEEN OF CUPS",
    "KING OF CUPS",
    "PENTACLE 1",
    "PENTACLE 2",
    "PENTACLE 3",
    "PENTACLE 4",
    "PENTACLE 5",
    "PENTACLE 6",
    "PENTACLE 7",
    "PENTACLE 8",
    "PENTACLE 9",
    "PENTACLE 10",
    "PAGE OF PENTACLES",
    "KNIGHT OF PENTACLES",
    "QUEEN OF PENTACLES",
    "KING OF PENTACLES",
  ];
  const semiLenormandNameArr = [
    "1 RIDER",
    "2 CLOVER",
    "3 SHIP",
    "4 HOUSE",
    "5 TREE",
    "6 CLOUD",
    "7 SNAKE",
    "8 COFFIN",
    "9 BOUQUET",
    "10 SCYTHE",
    "11 WHIP",
    "12 BIRDS",
    "13 CHILD",
    "14 FOX",
    "15 BEAR",
    "16 STARS",
    "17 STORK",
    "18 DOG",
    "19 TOWER",
    "20 GARDEN",
    "21 MOUNTAIN",
    "22 PATHS",
    "23 MICE",
    "24 HEART",
    "25 RING",
    "26 BOOK",
    "27 LETTER",
    "28 MAN",
    "29 LADY",
    "30 LILY",
    "31 SUN",
    "32 MOON",
    "33 KEY",
    "34 FISH",
    "35 ANCHOR",
    "36 CROSS",
  ];
  const semiIchingNameArr = [
    "중천건", //0
    "중지곤", //1
    "수뢰둔", //2
    "산수몽", //3
    "수천수", //4
    "천수송", //5
    "지수사", //6
    "수지비", //7

    "풍천소축", //8
    "천택리", //9
    "지천태", //10
    "천지비", //11
    "천화동인", //12
    "화천대유", //13
    "지산겸", //14
    "뇌지예", //15

    "택뢰수", //16
    "산풍고", //17
    "지택림", //18
    "풍지관", //19
    "화뢰서합", //20
    "산화비", //21
    "산지박", //22
    "지뢰복", //23

    "천뢰무망", //24
    "산천대축", //25
    "산뢰이", //26
    "택풍대과", //27
    "중수감", //28
    "중화리", //29
    "택산함", //30
    "뇌풍항", //31

    "천산돈", //32
    "뇌천대장", //33
    "화지진", //34
    "지화명이", //35
    "풍화가인", //36
    "화택규", //37
    "수산건", //38
    "뇌수해", //39

    "산택손", //40
    "풍뢰익", //41
    "택천쾌", //42
    "천풍구", //43
    "택지췌", //44
    "지풍승", //45
    "택수곤", //46
    "수풍정", //47

    "택화혁", //48
    "화풍정", //49
    "중뢰진", //50
    "중산간", //51
    "풍산점", //52
    "뇌택귀매", //53
    "뇌화풍", //54
    "화산려", //55

    "중풍손", //56
    "중택태", //57
    "풍수환", //58
    "수택절", //59
    "풍택중부", //60
    "뇌산소과", //61
    "수화기제", //62
    "화수미제", //63
  ];
  const semiPokerNameArr = [
    "BLACK JOKER",

    "ACE OF SPADE",
    "TWO OF SPADES",
    "THREE OF SPADES",
    "FOUR OF SPADES",
    "FIVE OF SPADES",
    "SIX OF SPADES",
    "SEVEN OF SPADES",
    "EIGHT OF SPADES",
    "NINE OF SPADES",
    "TEN OF SPADES",
    "JACK OF SPADES",
    "QUEEN OF SPADES",
    "KING OF SPADES",

    "ACE OF HEART",
    "TWO OF HEARTS",
    "THREE OF HEARTS",
    "FOUR OF HEARTS",
    "FIVE OF HEARTS",
    "SIX OF HEARTS",
    "SEVEN OF HEARTS",
    "EIGHT OF HEARTS",
    "NINE OF HEARTS",
    "TEN OF HEARTS",
    "JACK OF HEARTS",
    "QUEEN OF HEARTS",
    "KING OF HEARTS",

    "ACE OF CLOVER",
    "TWO OF CLOVERS",
    "THREE OF CLOVERS",
    "FOUR OF CLOVERS",
    "FIVE OF CLOVERS",
    "SIX OF CLOVERS",
    "SEVEN OF CLOVERS",
    "EIGHT OF CLOVERS",
    "NINE OF CLOVERS",
    "TEN OF CLOVERS",
    "JACK OF CLOVERS",
    "QUEEN OF CLOVERS",
    "KING OF CLOVERS",

    "ACE OF DIAMOND", // 총 13장
    "TWO OF DIAMONDS",
    "THREE OF DIAMONDS",
    "FOUR OF DIAMONDS",
    "FIVE OF DIAMONDS",
    "SIX OF DIAMONDS",
    "SEVEN OF DIAMONDS",
    "EIGHT OF DIAMONDS",
    "NINE OF DIAMONDS",
    "TEN OF DIAMONDS",
    "JACK OF DIAMONDS",
    "QUEEN OF DIAMONDS",
    "KING OF DIAMONDS",

    "RED JOKER",
  ];

  const semiTotalNameArr = [
    semiTarotNameArr,
    semiLenormandNameArr,
    semiIchingNameArr,
    semiPokerNameArr,
  ];
  const tarotNumArr = [
    {
      start: 0,
      end: 22,
    },
    {
      start: 22,
      end: 36,
    },
    {
      start: 36,
      end: 50,
    },
    {
      start: 50,
      end: 64,
    },
    {
      start: 64,
      end: 78,
    },
  ];
  const lenorNumArr = [];
  const iChingNumArr = [];
  const pokerNumArr = [];

  const semiTotalNumArr = [
    [...tarotNumArr],
    lenorNumArr,
    iChingNumArr,
    pokerNumArr,
  ];

  const semiTypeSetting = (num) => {
    let _tempNum = 0;
    let _tempArr = [];
    let _lastNum = 0;
    switch (selectMenuNum) {
      case 0:
        if (num === 0) {
          _tempNum = 0;
          _lastNum = 22;
          _tempArr = settingSemiTypeArr(0, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        } else if (num > 0) {
          if (num === 1) {
            _tempNum = 22;
          } else {
            _tempNum = 22 + 14 * (num - 1);
          }
          _lastNum = 14;
          _tempArr = settingSemiTypeArr(0, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        }
        setSemiTypeNum(num);
        break;
      case 1:
        if (num < 3) {
          if (num === 0) {
            _tempNum = 0;
          } else {
            _tempNum = num * 10;
          }
          _lastNum = 10;
          _tempArr = settingSemiTypeArr(1, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        } else if (num === 3) {
          _tempNum = 30;
          _lastNum = 6;
          _tempArr = settingSemiTypeArr(1, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        }
        setSemiTypeNum(num);
        break;
      case 2:
        if (num < 6) {
          if (num === 0) {
            _tempNum = 0;
          } else {
            _tempNum = num * 10;
          }
          _lastNum = 10;
          _tempArr = settingSemiTypeArr(2, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        } else if (num === 6) {
          _tempNum = 60;
          _lastNum = 4;
          _tempArr = settingSemiTypeArr(2, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        }
        setSemiTypeNum(num);
        break;
      case 3:
        if (num === 0) {
          // Joker. 0, 53
          _tempArr.push(semiTotalNameArr[3][0]);
          _tempArr.push(semiTotalNameArr[3][53]);
          setSemiTypeArr(_tempArr);
        } else if (num > 0) {
          _tempNum = 1 + (num - 1) * 13;
          _lastNum = 13;
          _tempArr = settingSemiTypeArr(3, _tempNum, _lastNum);
          setSemiTypeArr(_tempArr);
        }
        setSemiTypeNum(num);
        break;
      default:
        break;
    }
  };

  const clickCardTypeHanler = (num) => {
    let tempArr = [];
    let tempNumArr = [];
    let _selectDeck = semiTotalNameArr[findType];
    let startNum = semiTotalNumArr[findType][num].start;
    let endNum = semiTotalNumArr[findType][num].end;

    for (let i = startNum; i < endNum; i++) {
      tempArr.push(_selectDeck[i]);
      tempNumArr.push(i);
    }
    setSemiTypeArr(tempArr);
    setSemiNumArr(tempNumArr);
  };

  const selectCardBtn = (num) => {
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempStr;
    if (tempManager.isClickedFind === false) {
      tempManager.isClickedFind = true;
    }
    tempManager.isFindOrZoom = false;
    tempManager.findCardType = findType;
    tempManager.findOrZoomSelectedNum = num;
    // tempStr += imgRouteArr[findType];
    // tempStr += String(num);
    // tempStr += `.png`;
    tempManager.findImgRoute = `${imgRouteArr[findType]}${num}.png`;
    //tempManager.findImgRoute = tempStr;
    tempManager.findCardName = `${semiTotalNameArr[findType][num]}`;
    //console.log(`${imgRouteArr[findType]}${num}.png`);
    tempManager.isOpenExtra = false;
    setMultiManager(tempManager);
  };

  useEffect(() => {
    switch (findType) {
      case 0:
        setSelectedDeck(tarotMenuNameArr);
        break;
    }
  }, []);
  return (
    <TarotFindWrapper>
      <SelectCardTypeBox>
        {selectedDeck.map((a, i) => {
          return (
            <CardTypeBtn
              key={`cardTypeBtn${a}${i}`}
              onClick={(e) => {
                e.preventDefault();
                setIsClickedTypeMenu(true);
                clickCardTypeHanler(i);
              }}
            >
              {a}
            </CardTypeBtn>
          );
        })}
      </SelectCardTypeBox>
      <SelectCardDetailBox>
        {isClickedTypeMenu && (
          <>
            {semiTypeArr.map((a, i) => {
              return (
                <SemiTypeBtn
                  key={`cardSemiTypeBtn${a}${i}`}
                  onClick={(e) => {
                    //e.preventDefault();
                    if (isClicked === false) {
                      setIsClicked(true);
                    }
                    setSelectedNum(semiNumArr[i]);
                  }}
                  onHoverStart={() => {
                    setHoverNum(semiNumArr[i]);
                    setIsHover(true);
                  }}
                  onHoverEnd={() => {
                    setHoverNum();
                    setIsHover(false);
                  }}
                >
                  {a}
                </SemiTypeBtn>
              );
            })}
          </>
        )}
      </SelectCardDetailBox>
      <SelectCardControlBox>
        <PreviewBox>
          <PreviewItemBox>
            <PreviewTextBox>Preview</PreviewTextBox>
            <PreviewImgBox
              imgsrc={
                isHover === true
                  ? `${process.env.PUBLIC_URL}${imgRouteArr[findType]}${hoverNum}.png`
                  : {}
              }
            ></PreviewImgBox>
          </PreviewItemBox>
          <ChoiceItemBox>
            <PreviewTextBox>Selected</PreviewTextBox>
            <PreviewImgBox
              imgsrc={
                isClicked === true
                  ? `${process.env.PUBLIC_URL}${imgRouteArr[findType]}${selectedNum}.png`
                  : {}
              }
            ></PreviewImgBox>
          </ChoiceItemBox>
        </PreviewBox>
        <ControlBox>
          <ControlBtn
            onClick={() => {
              if (selectedNum !== null) {
                selectCardBtn(selectedNum);
                setIsOpenFindOption(false);
                //closeControlBox();
              }
            }}
          >
            Choice
          </ControlBtn>
          <ControlBtn>Back</ControlBtn>
        </ControlBox>
      </SelectCardControlBox>
    </TarotFindWrapper>
  );
}

export default MultiTarotFind;
