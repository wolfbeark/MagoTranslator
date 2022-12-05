import { atom } from "recoil";

let secondSpreadItem = {
  isOpen: false,
  isActive: false, // 실험중
  isSecondFold: true, // false가 열려있는거임
  isDefined: false,
  isTabFold: true,
  modelType: false, // false default, true custom
  thisModelDeckType: 1,
  thisModelTotalCardCount: 0,
  firstCardCount: [0, 0, 0, 0, 0],
  extraCardCount: [0, 0, 0, 0, 0],
  thisModelPreviewThree: false,
  thisModelPreviewThreeNumArr: [],
  thisModelSecondCardInfoArr: [],
  remainCardCount: [],
  SecondRanNumArr: [],
  CurrentSelectNum: 0,
  SecondModelTabNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
  SecondCardInfoArr: [[]], // 현재 사용되지 않음
};
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
const cardNameTotalArr = [
  semiTarotNameArr,
  semiLenormandNameArr,
  semiIchingNameArr,
  semiPokerNameArr,
];

export const secondSpreadItemPrefab = atom({
  key: "secondSpreadItemPrefab",
  default: {
    isLongHeight: false,
    isDefined: false,
    CurrentSelectNum: 0,
    SecondModelTabNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    SecondCardInfoArr: [[]],
  },
});

export const multiManagerAtom = atom({
  key: "multiManagerAtom",
  default: {
    isLongHeight: false,
    SpreadDefaultHeight: 0,
    //ExistModelCount: 1, // 모델의 카운트 (모델 == 최상위)
    // 최상위 모델의 존재 숫자
    CurrentModelNumber: 0, // 현재 선택된 모델 넘버
    DefaultDeckType: 1,
    DefaultNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    DefaultCardCount: 3,
    DefaultPreviewThree: true,
    IsOpenSecondSpread: false,
    // 추가 코드
    MultiModelNameArr: [],
    ModelExist: false,
    ExistModelCount: 0,
    isOpenExtra: false,
    cardNameTotalArr,
    isFindOrZoom: false,
    isClickedFind: false,
    findCardType: 5,
    findOrZoomSelectedNum: null,
    findImgRoute: "",
    findCardName: "",
    zoomImgRoute: "",
    zoomCardName: "",
  },
});
export const secondManagerAtom = atom({
  key: "secondManagerAtom",
  default: {
    //isLongHeight: false,
    //SpreadDefaultHeight: 0,
    ExistModelCount: 1, // 모델의 카운트 (모델 == 최상위)
    // 최상위 모델의 존재 숫자
    CurrentSecondModelNumber: 0, // 현재 선택된 모델 넘버
    DefaultDeckType: 1,
    DefaultNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    DefaultCardCount: 3,
    DefaultPreviewThree: true,
    isOpenExtra: false,
  },
});

export const multiModelAtom = atom({
  key: "multiModelAtom",
  default: [
    {
      isLongHeight: false,
      modelID: 0, // CurrentModelNumber와 비교
      modelName: "Untitle",
      modelDefined: false,
      modelType: false, // false = Default, true = Custom
      thisModelDeckType: 1,
      thisModelTotalCardCount: 0,
      firstCardCount: [0, 0, 0, 0, 0],
      extraCardCount: [0, 0, 0, 0, 0],
      remainCardCount: [],
      thisModelPreviewThree: true,
      // Preview 3장 번호 배열 필요
      thisModelPreviewThreeNumArr: [],
      thisModelChildNameArr: [],
      isFirstFold: false,
      thisModelFirstNumArr: [],
      // CurrentChildNumber : star냐 square냐 이거, Number
      CurrentChildNumber: 0,
      thisModelFirstCardInfoArr: [],
      TabOpenInfoArr: [
        [{ isOpen: false, isCreated: false, isLongHeight: false }],
      ],
      SelectedTabItemNumArr: [],
      // Item0TabNum: 0, // 마지막에 열려있던 CurrentChildNumber
      // //
      // Item1TabNum: 0,
      // Item2TabNum: 0,
      // Item3TabNum: 0,
      // Item4TabNum: 0,
      SecondSpreadModelArr: [],

      SecondSpread: [
        // star
        {
          ...secondSpreadItem,
        },
        // square
        {
          ...secondSpreadItem,
        },
        // triangle
        {
          ...secondSpreadItem,
        },
        // circle
        {
          ...secondSpreadItem,
        },
        // heart
        {
          ...secondSpreadItem,
        },
      ],
    },
  ],
});

// Prefabs
export const multiModelPrefabAtom = atom({
  key: "multiModelPrefabAtom",
  default: {
    isLongHeight: false,
    modelID: 0, // CurrentModelNumber와 비교
    modelName: "Untitle",
    modelDefined: false,
    modelType: false, // false = Default, true = Custom
    thisModelDeckType: 1,
    thisModelTotalCardCount: 0,
    firstCardCount: [0, 0, 0, 0, 0],
    extraCardCount: [0, 0, 0, 0, 0],
    remainCardCount: [],
    thisModelPreviewThree: true,
    // Preview 3장 번호 배열 필요
    thisModelPreviewThreeNumArr: [],
    thisModelChildNameArr: [],
    isFirstFold: false,
    thisModelFirstNumArr: [],
    // CurrentChildNumber : star냐 square냐 이거, Number
    CurrentChildNumber: 0,
    thisModelFirstCardInfoArr: [],
    TabOpenInfoArr: [
      [{ isOpen: false, isCreated: false, isLongHeight: false }],
    ],
    SelectedTabItemNumArr: [],
    FirstControlArr: [],
    SecondSpreadModelArr: [],
    SecondSpread: [
      // star
      {
        ...secondSpreadItem,
      },
      // square
      {
        ...secondSpreadItem,
      },
      // triangle
      {
        ...secondSpreadItem,
      },
      // circle
      {
        ...secondSpreadItem,
      },
      // heart
      {
        ...secondSpreadItem,
      },
    ],
  },
});
