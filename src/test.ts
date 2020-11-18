import {SolveGame, Numbers, SolveBox} from "./sudoku";


// We can't really test the compiler output directly
//  so we simply use the types.
// If this code compiles then the values assigned
//  match the type. 
// It's not a complete test as the compiled type may be
//  too broad e.g. it could return 'any' which would also compile.

type SingleBoxResult = SolveBox<[1 | 2 | 3, 2 | 3, 3, 4, 4 | 5, 4 | 5 | 6, 7 | 8, 8, 7 | 8 | 0]>

const singleBox: SingleBoxResult = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// The line below would fail to compile as the value does not exactly match the type
// const failSingleBox: SingleBoxResult = [2, 2, 3, 4, 5, 6, 7, 8, 0];

type _ = Numbers;


// *****************
// Game 1
// *****************

type SampleGame1 = [
  // Row 0
  [
    3, 4, 2,
    5, _, _,
    _, 0, _
  ],
  [
    _, 8, _,
    0, _, _,
    _, _, 4
  ],
  [
    _, _, _,
    _, 2, _,
    3, 8, _
  ],

  // Row 1
  [
    _, 2, _,
    _, 5, _,
    _, 7, _
  ],
  [
    3, _, 5,
    7, _, 6,
    _, 0, 1
  ],
  [
    1, _, _,
    _, 4, _,
    6, 5, 2
  ],

  // Row 2
  [
    6, _, _,
    7, _, _,
    2, _, _,
  ],
  [
    _, 7, 0,
    _, 6, _,
    5, 3, _
  ],
  [
    2, 3, 1,
    8, _, _,
    4, _, _
  ]
];


type Result1 = SolveGame<SampleGame1>

const sampleGame1Solution: Result1 = [
  // Row 0
  [
    3, 4, 2,
    5, 6, 8,
    1, 0, 7
  ],
  [
    6, 8, 7,
    0, 1, 3,
    2, 5, 4
  ],
  [
    5, 1, 0,
    7, 2, 4,
    3, 8, 6
  ],

  // Row 1
  [
    0, 2, 6,
    8, 5, 1,
    4, 7, 3
  ],
  [
    3, 4, 5,
    7, 2, 6,
    8, 0, 1
  ],
  [
    1, 7, 8,
    0, 4, 3,
    6, 5, 2
  ],

  // Row 2
  [
    6, 8, 5,
    7, 3, 4,
    2, 1, 0,
  ],
  [
    4, 7, 0,
    1, 6, 2,
    5, 3, 8
  ],
  [
    2, 3, 1,
    8, 0, 5,
    4, 6, 7
  ]
];


// *****************
// Game 2
// *****************

type SampleGame2 = [
  // Row 0
  [
    _, 4, 5,
    1, 7, _,
    8, _, 6
  ],
  [
    6, _, 8,
    3, _, 4,
    _, _, _
  ],
  [
    _, 1, _,
    8, _, _,
    _, _, _
  ],

  // Row 1
  [
    3, 8, _,
    _, _, _,
    2, 6, 1
  ],
  [
    _, 6, _,
    _, _, _,
    _, 5, _
  ],
  [
    5, 0, 7,
    _, _, _,
    _, 8, 4
  ],

  // Row 2
  [
    _, _, _,
    _, _, 8,
    _, 1, _
  ],
  [
    _, _, _,
    0, _, 7,
    5, _, 6
  ],
  [
    1, _, 8,
    _, 3, 6,
    2, 7, _
  ]
];

type Result2 = SolveGame<SampleGame2>

const sampleGame2Solution: Result2 = [
  // Row 0
  [
    0, 4, 5,
    1, 7, 2,
    8, 3, 6
  ],
  [
    6, 2, 8,
    3, 0, 4,
    1, 7, 5
  ],
  [
    7, 1, 3,
    8, 6, 5,
    0, 4, 2
  ],

  // Row 1
  [
    3, 8, 4,
    7, 5, 0,
    2, 6, 1
  ],
  [
    2, 6, 1,
    8, 4, 3,
    7, 5, 0
  ],
  [
    5, 0, 7,
    6, 2, 1,
    3, 8, 4
  ],

  // Row 2
  [
    6, 0, 7,
    5, 2, 8,
    4, 1, 3
  ],
  [
    4, 3, 2,
    0, 1, 7,
    5, 8, 6
  ],
  [
    1, 5, 8,
    4, 3, 6,
    2, 7, 0
  ]
]