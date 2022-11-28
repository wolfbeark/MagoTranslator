/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DeckContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;
const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 70%;
  //background-color: black;
  padding: 5%;
  border-radius: 10px;
`;
const ImageBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: royalblue;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px black;
`;
const TextBox = styled(motion.div)`
  width: 100%;
  height: 20%;
  background-color: skyblue;
  border-radius: 10px;
  cursor: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jua";
  font-size: 0.8em;
  font-weight: 600;
  text-align: center;
`;
const imageBoxVariants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
  },
  hover: {
    scale: 1.1,
  },
  click: {
    scale: 1.0,
  },
};

function SelectDeck(props) {
  const deckName = props.deckName;
  const type = props.deckType;
  const imgNum = props.imgNum;
  const selectCount = props.selectCount;
  const setSelectCount = props.setSelectCount;
  const isClickedTotal = props.isClickedTotal;
  const selectDeckArr = props.selectDeckArr;
  const setSelectDeckArr = props.setSelectDeckArr;
  const setDeckControlArr = props.setDeckControlArr;
  let deckControlArr = props.deckControlArr;
  const isMinorTotalClicked = props.isMinorTotalClicked;
  const setIsMinorTotalClicked = props.setIsMinorTotalClicked;
  const stringArr = props.stringArr;

  const [isClicked, setIsClicked] = useState(false);

  const DeckNameArr = [
    "+ Major",
    "+ Wand",
    "+ Sword",
    "+ Cup",
    "+ Pentacle",
    "+ Minor", // 5
    `+ Wand Palace`,
    "+ Sword Palace",
    "+ Cup Palace",
    "+ Pentacle Palace",
  ];
  const MinusDeckNameArr = [
    "- Major",
    "- Wand",
    "- Sword",
    "- Cup",
    "- Pentacle",
    "- Minor",
    `- Wand Palace`,
    "- Sword Palace",
    "- Cup Palace",
    "- Pentacle Palace",
  ];
  const testClick = (num) => {
    // safety
    let tempArr = [...deckControlArr];
    let flag = tempArr[num].isClicked;
    tempArr[num].isClicked = !flag;
    tempArr[num].setIsClicked((prev) => !prev);
    //console.log(tempArr);
    setDeckControlArr([...tempArr]);
  };

  const deckClickHandler = (num) => {
    let tempListNameArr = [...selectDeckArr];
    let tempSelectCount = selectCount;
    let tempInfoArr = [...deckControlArr];
    let flag = tempInfoArr[num].isClicked;

    let minorControlNameArr = [];

    if (type !== 5) {
      // Minor가 아님
      if (isClickedTotal === false) {
        if (isClicked === false) {
          if (tempSelectCount === 0) {
            // 최초
            tempSelectCount++;
            tempListNameArr[0] = DeckNameArr[num];
            tempInfoArr[type].isClicked = true;
            tempInfoArr[type].setIsClicked(true);
          } else if (tempSelectCount !== 0) {
            tempSelectCount++;
            if (type === 0) {
              tempListNameArr.push(DeckNameArr[type]);
              //tempInfoArr[type].isClicked = true;
              //tempInfoArr[type].setIsClicked(true);
            } else if (type !== 0) {
              let checker = false;
              for (let i = 0; i < tempListNameArr.length; i++) {
                if (tempListNameArr[i] === DeckNameArr[5]) {
                  checker = true;
                  break;
                }
              }

              if (checker === false) {
                // Minor가 없으면

                tempListNameArr.push(DeckNameArr[type]);
                //tempInfoArr[type].isClicked = true;
                //tempInfoArr[type].setIsClicked(true);
              } else if (checker === true) {
                // Minor가 있으면
                for (let i = 0; i < tempListNameArr.length; i++) {
                  if (tempListNameArr[i] === DeckNameArr[5]) {
                    tempListNameArr.splice(i, 1);
                    tempSelectCount--;
                    tempInfoArr[5].isClicked = false;
                    tempInfoArr[5].setIsClicked(false);
                    for (let j = 0; j < tempInfoArr.length; j++) {
                      if (
                        j === 0 ||
                        j === 5
                        //|| j === i
                      ) {
                        continue;
                      } else if (j === i) {
                        // tempInfoArr[j].isClicked = true;
                        // tempInfoArr[j].setIsClicked(true);
                        continue;
                      } else {
                        tempInfoArr[j].isClicked = false;
                        tempInfoArr[j].setIsClicked(false);
                      }
                    }
                    break;
                  }
                }
                tempListNameArr.push(DeckNameArr[type]);
              }
            }
            tempInfoArr[type].isClicked = true;
            tempInfoArr[type].setIsClicked(true);
          }
        } else if (isClicked === true) {
          if (tempSelectCount === 1) {
            tempSelectCount--;
            tempListNameArr[0] = "Select Deck Or Total";
            tempInfoArr[type].isClicked = false;
            tempInfoArr[type].setIsClicked(false);
            if (type !== 0) {
              if (tempInfoArr[5].isClicked === true) {
                tempInfoArr[5].isClicked = false;
                tempInfoArr[5].setIsClicked(false);
                for (let i = 0; i < tempListNameArr.length; i++) {
                  if (tempListNameArr[i] === DeckNameArr[5]) {
                    tempListNameArr.splice(i, 1);
                    break;
                  }
                }
                for (let i = 0; i < tempInfoArr.length; i++) {
                  if (i === 0 || i === 5 || i === type) {
                    continue;
                  } else {
                    tempInfoArr[i].isClicked = false;
                    tempInfoArr[i].setIsClicked(false);
                  }
                }
                tempSelectCount++;
                tempInfoArr[type].isClicked = true;
                tempInfoArr[type].setIsClicked(true);
                for (let i = 0; i < tempListNameArr.length; i++) {
                  if (tempListNameArr[i] === "Select Deck Or Total") {
                    tempListNameArr.splice(i, 1);
                    break;
                  }
                }
                tempListNameArr.push(DeckNameArr[type]);
              }
            }
          } else if (tempSelectCount !== 1) {
            // name count info
            tempSelectCount--;
            if (type === 0) {
              for (let i = 0; i < tempListNameArr.length; i++) {
                if (tempListNameArr[i] === DeckNameArr[type]) {
                  tempListNameArr.splice(i, 1);
                  break;
                }
              }
              tempInfoArr[type].isClicked = false;
              tempInfoArr[type].setIsClicked(false);
            } else if (type !== 0) {
              // 마이너들
              console.log(tempInfoArr[5].isClicked);
              if (tempInfoArr[5].isClicked === false) {
                for (let i = 0; i < tempListNameArr.length; i++) {
                  if (tempListNameArr[i] === DeckNameArr[type]) {
                    tempListNameArr.splice(i, 1);
                    break;
                  }
                }
                tempInfoArr[type].isClicked = false;
                tempInfoArr[type].setIsClicked(false);
              } else if (tempInfoArr[5].isClicked === true) {
                tempInfoArr[5].isClicked = false;
                tempInfoArr[5].setIsClicked(false);
                for (let i = 0; i < tempListNameArr.length; i++) {
                  if (tempListNameArr[i] === DeckNameArr[5]) {
                    tempListNameArr.splice(i, 1);
                  }
                }
                tempListNameArr.push(DeckNameArr[type]);
                tempSelectCount++;
                tempInfoArr[type].isClicked = true;
                tempInfoArr[type].setIsClicked(true);

                for (let i = 0; i < tempInfoArr.length; i++) {
                  if (i === 0 || i === 5 || i === type) {
                    continue;
                  } else {
                    tempInfoArr[i].isClicked = false;
                    tempInfoArr[i].setIsClicked(false);
                  }
                }
              }
              // 다른 마이너들 풀어줘야함
            }
          }
        }
      } else if (isClickedTotal === true) {
        if (isClicked === false) {
          // if (tempSelectCount === 0) {
          //   // count name info
          //   tempSelectCount++;
          //   tempListNameArr.push(MinusDeckNameArr[type]);
          //   tempInfoArr[type].isClicked = true;
          //   tempInfoArr[type].setIsClicked(true);
          // }
          //else if (tempSelectCount !== 0) {
          tempSelectCount++;
          tempListNameArr.push(MinusDeckNameArr[type]);
          tempInfoArr[type].isClicked = true;
          tempInfoArr[type].setIsClicked(true);
          if (type !== 0 && type !== 5) {
            if (tempInfoArr[5].isClicked === true) {
              tempSelectCount--;
              for (let i = 0; i < tempListNameArr.length; i++) {
                if (tempListNameArr[i] === MinusDeckNameArr[5]) {
                  tempListNameArr.splice(i, 1);
                }
              }
              tempInfoArr[5].isClicked = false;
              tempInfoArr[5].setIsClicked(false);

              for (let i = 0; i < tempInfoArr.length; i++) {
                if (i === 0 || i === 5 || i === type) {
                  continue;
                }
                tempInfoArr[i].isClicked = false;
                tempInfoArr[i].setIsClicked(false);
              }
            }
          }
          //}
        } else if (isClicked === true) {
          tempSelectCount--;
          if (type === 0) {
            for (let i = 0; i < tempListNameArr.length; i++) {
              if (tempListNameArr[i] === MinusDeckNameArr[type]) {
                tempListNameArr.splice(i, 1);
                break;
              }
              tempInfoArr[type].isClicked = false;
              tempInfoArr[type].setIsClicked(false);
            }
          } else if (type !== 0 && type !== 5) {
            if (tempInfoArr[5].isClicked === false) {
              for (let i = 0; i < tempListNameArr.length; i++) {
                if (tempListNameArr[i] === MinusDeckNameArr[type]) {
                  tempListNameArr.splice(i, 1);
                  break;
                }
                tempInfoArr[type].isClicked = false;
                tempInfoArr[type].setIsClicked(false);
              }
            } else if (tempInfoArr[5].isClicked === true) {
              tempInfoArr[type].isClicked = true;
              tempInfoArr[type].setIsClicked(true);
              tempSelectCount++;
              tempListNameArr.push(MinusDeckNameArr[type]);

              for (let i = 0; i < tempListNameArr.length; i++) {
                if (tempListNameArr[i] === MinusDeckNameArr[5]) {
                  tempListNameArr.splice(i, 1);
                  break;
                }
              }
              tempInfoArr[5].isClicked = false;
              tempInfoArr[5].setIsClicked(false);
              for (let i = 0; i < tempInfoArr.length; i++) {
                if (i === 0 || i === 5 || i === type) {
                  continue;
                }
                tempInfoArr[i].isClicked = false;
                tempInfoArr[i].setIsClicked(false);
              }
            }
          }
        }
      }
    } else if (type === 5) {
      // Minor임
      let tempCount = 0;
      if (isClickedTotal === false) {
        if (isClicked === false) {
          // 클릭된 적 없음
          if (tempSelectCount === 0) {
            // 최초
            tempSelectCount++;
            tempListNameArr[0] = DeckNameArr[num];
            tempInfoArr[type].isClicked = true;
            tempInfoArr[type].setIsClicked(true);
            // 다른 마이너들 제어해야함
            for (let i = 0; i < tempInfoArr.length; i++) {
              if (i === 0 || i === 5) {
                continue;
              } else {
                tempInfoArr[i].isClicked = true;
                tempInfoArr[i].setIsClicked(true);
              }
            }
          } else {
            // 최초가 아님
            // 리스트 이름 제거
            tempSelectCount++;
            //tempListNameArr.push(DeckNameArr[type]);
            tempInfoArr[type].isClicked = true;
            tempInfoArr[type].setIsClicked(true);

            for (let i = 0; i < tempListNameArr.length; i++) {
              if (
                tempListNameArr[i] === DeckNameArr[0] ||
                tempListNameArr[i] === DeckNameArr[5]
              ) {
                // 메이저와 마이너면 넘어가
                continue;
              } else {
                // 다른 마이너들 리스트에서 제거 카운트
                tempCount++;
              }
            }
            if (tempInfoArr[0].isClicked === true) {
              minorControlNameArr.push(DeckNameArr[0]);
              minorControlNameArr.push(DeckNameArr[5]);
            } else {
              minorControlNameArr.push(DeckNameArr[5]);
            }
            tempListNameArr = [...minorControlNameArr];

            // 리스트 인포 제거
            for (let i = 0; i < tempInfoArr.length; i++) {
              if (i === 0 || i === 5) {
                continue;
              } else {
                tempInfoArr[i].isClicked = true;
                tempInfoArr[i].setIsClicked(true);
              }
            }
            // count
            tempSelectCount -= tempCount;
            // console.log(tempSelectCount);
            // console.log(typeof tempSelectCount);
            // console.log(typeof tempCount);
          }
        } else if (isClicked === true) {
          if (tempSelectCount === 1) {
            tempSelectCount--;
            tempListNameArr[0] = "Select Deck Or Total";
            tempInfoArr[type].isClicked = false;
            tempInfoArr[type].setIsClicked(false);
            for (let i = 0; i < tempInfoArr.length; i++) {
              if (i === 0 || i === 5) {
                continue;
              } else {
                tempInfoArr[i].isClicked = false;
                tempInfoArr[i].setIsClicked(false);
              }
            }
          } else if (tempSelectCount !== 1) {
            tempSelectCount--;

            for (let i = 0; i < tempListNameArr.length; i++) {
              if (tempListNameArr[i] === DeckNameArr[type]) {
                tempListNameArr.splice(i, 1);
                break;
              }
            }

            tempInfoArr[type].isClicked = false;
            tempInfoArr[type].setIsClicked(false);
            for (let i = 0; i < tempInfoArr.length; i++) {
              if (i === 0 || i === 5) {
                continue;
              } else {
                tempInfoArr[i].isClicked = false;
                tempInfoArr[i].setIsClicked(false);
              }
            }
          }
        }
      } else if (isClickedTotal === true) {
        if (isClicked === false) {
          tempSelectCount++;
          //tempListNameArr.push(MinusDeckNameArr[type]);
          tempInfoArr[type].isClicked = true;
          tempInfoArr[type].setIsClicked(true);

          // count check
          //console.log(tempListNameArr.length);
          for (let i = 0; i < tempListNameArr.length; i++) {
            console.log("check1");
            if (
              tempListNameArr[i] === MinusDeckNameArr[0] ||
              tempListNameArr[i] === MinusDeckNameArr[5] ||
              tempListNameArr[i] === stringArr[1]
            ) {
              continue;
            } else {
              tempCount++;
            }
          }
          tempSelectCount -= tempCount;

          // info
          for (let i = 0; i < tempInfoArr.length; i++) {
            //console.log("check2");
            if (i === 0 || i === 5) {
              continue;
            }
            tempInfoArr[i].isClicked = true;
            tempInfoArr[i].setIsClicked(true);
          }

          // name
          if (tempInfoArr[0].isClicked === true) {
            minorControlNameArr.push(stringArr[1]);
            minorControlNameArr.push(MinusDeckNameArr[0]);
            minorControlNameArr.push(MinusDeckNameArr[5]);
          } else {
            minorControlNameArr.push(stringArr[1]);
            minorControlNameArr.push(MinusDeckNameArr[5]);
          }

          tempListNameArr = [...minorControlNameArr];
        } else if (isClicked === true) {
          tempSelectCount--;
          // info
          for (let i = 0; i < tempInfoArr.length; i++) {
            //console.log("check2");
            if (i === 0 || i === 5) {
              continue;
            }
            tempInfoArr[i].isClicked = false;
            tempInfoArr[i].setIsClicked(false);
          }

          // name
          for (let i = 0; i < tempListNameArr.length; i++) {
            if (tempListNameArr[i] === MinusDeckNameArr[5]) {
              tempListNameArr.splice(i, 1);
            }
          }
          tempInfoArr[5].isClicked = false;
          tempInfoArr[5].setIsClicked(false);
        }
      }
    }
    console.log(tempSelectCount);
    setSelectCount(tempSelectCount);
    setSelectDeckArr([...tempListNameArr]);
    setDeckControlArr([...tempInfoArr]);
  };

  useEffect(() => {
    let tempArr = deckControlArr;
    let temp = {
      isClicked: isClicked,
      setIsClicked: setIsClicked,
    };
    tempArr[type] = temp;
    setDeckControlArr(tempArr);
  }, []);

  const clickDeckHandler = () => {
    let tempArr = [...selectDeckArr];
    let count = selectCount;
    let _deckControlArr = [...deckControlArr];
    if (isClicked === false) {
      if (type !== 5) {
        if (count === 0) {
          tempArr[0] = DeckNameArr[type];
        } else {
          tempArr.push(DeckNameArr[type]);
        }
        count++;
      } else {
      }
      _deckControlArr[type].isClicked = true;
      _deckControlArr[type].setIsClicked(true);
    } else if (isClicked === true) {
    }

    setDeckControlArr(_deckControlArr);
    setSelectCount(count);
    setSelectDeckArr(tempArr);
  };

  return (
    <DeckContainer>
      <ImageContainer>
        <ImageBox
          variants={imageBoxVariants}
          imgsrc={`${process.env.PUBLIC_URL}/images/TarotDefault/Default${imgNum}.png`}
          //onClick={() => clickDeckHandler()}
          //onClick={() => testClick(type)}
          //onClick={() => totalOffDeckClick(type)}
          onClick={() => deckClickHandler(type)}
          animate={isClicked === false ? "active" : "inactive"}
          whileHover="hover"
          whileTap="click"
        />
      </ImageContainer>
      <TextBox>{deckName}</TextBox>
    </DeckContainer>
  );
}

export default SelectDeck;
