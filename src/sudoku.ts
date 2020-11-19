type One = {1: "true"};
type Two = {2: "true"};
type Three = {3: "true"};
type Four = {4: "true"};
type Five = {5: "true"};
type Six = {6: "true"};
type Seven = {7: "true"};
type Eight = {8: "true"};
type Nine = {0: "true"};

export type Numbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type IsValue<N extends { [K in number]: "true"}, T extends Numbers> = N[T] extends "true" ? "true" : "false"

export type SudokuBox = [Numbers, ...Numbers[]];
export type SudokuGame = [SudokuBox, ...SudokuBox[]];

type UnionContainsTrue<V> = "true" extends V ? "true" : "false";
type UnionDoesNotContainFalse<V> = "false" extends V ? "false" : "true";

type IsSingleNumber<V extends Numbers> =
  UnionContainsTrue<
    IsValue<One, V> |
    IsValue<Two, V> |
    IsValue<Three, V> |
    IsValue<Four, V> |
    IsValue<Five, V> |
    IsValue<Six, V> |
    IsValue<Seven, V> |
    IsValue<Eight, V> |
    IsValue<Nine, V>
  >

type Head<T extends SudokuBox> = T extends [infer U, ...infer T] ? U : never;
type Tail<T extends SudokuBox> = T extends [infer U, ...infer T]
  ? T extends SudokuBox
    ? T
    : never
  : never;

type TailN<T extends SudokuGame> = T extends [infer U, ...infer T]
  ? T extends SudokuGame
    ? T
    : never
  : never;

type IsBoxComplete<G extends SudokuBox> =
  UnionDoesNotContainFalse<G["length"] extends 0 ? never :
    IsSingleNumber<G[0]> | IsBoxComplete<Tail<G>>>;

type FilterSet<C extends Numbers, F extends Numbers> =
  IsSingleNumber<C> extends "true" ? C : Exclude<C, F>;

type FilterBox<G extends SudokuBox, V extends Numbers> =
  IsSingleNumber<V> extends "true" ?
  [
    FilterSet<G[0], V>,
    FilterSet<G[1], V>,
    FilterSet<G[2], V>,
    FilterSet<G[3], V>,
    FilterSet<G[4], V>,
    FilterSet<G[5], V>,
    FilterSet<G[6], V>,
    FilterSet<G[7], V>,
    FilterSet<G[8], V>,
  ]
  : G;

type FilterGridStep<G extends SudokuBox, Values extends SudokuBox> =
  Values["length"] extends 0
    ? G
    : FilterBox<FilterGridStep<G, Tail<Values>>, Values[0]>

type FilterGrid<G extends SudokuBox> =
  FilterGridStep<G, G>


export type SolveBox<G extends SudokuBox> =
  IsBoxComplete<G> extends "true" ? G : SolveBox<FilterGrid<G>>

type FilterGameGrid<G extends SudokuGame> =
  [
    FilterGrid<G[0]>,
    FilterGrid<G[1]>,
    FilterGrid<G[2]>,
    FilterGrid<G[3]>,
    FilterGrid<G[4]>,
    FilterGrid<G[5]>,
    FilterGrid<G[6]>,
    FilterGrid<G[7]>,
    FilterGrid<G[8]>
  ]

// Could not get the recursive form of FilterGameGrid to produce the correct result
// type FilterGameGrid<G extends SudokuGame> =
//   G["length"] extends 0
//   ? G
//   : [FilterGrid<G[0]>, ...FilterGameGrid<Tail<G>>];

type ExcludeNumbersFromUnion<Union extends Numbers, ToRemove extends SudokuBox> =
  IsSingleNumber<Union> extends "true"
  ? Union
  : ToRemove["length"] extends 0
    ? Union
    : IsSingleNumber<ToRemove[0]> extends "true"
      ? ExcludeNumbersFromUnion<Exclude<Union, ToRemove[0]>, Tail<ToRemove>>
      : ExcludeNumbersFromUnion<Union, Tail<ToRemove>>;

type FilterBoxRow<C extends SudokuBox, R1 extends SudokuBox, R2 extends SudokuBox> =
  [
    ExcludeNumbersFromUnion<C[0], [R1[0], R1[1], R1[2], R2[0], R2[1], R2[2]]>,
    ExcludeNumbersFromUnion<C[1], [R1[0], R1[1], R1[2], R2[0], R2[1], R2[2]]>,
    ExcludeNumbersFromUnion<C[2], [R1[0], R1[1], R1[2], R2[0], R2[1], R2[2]]>,

    ExcludeNumbersFromUnion<C[3], [R1[3], R1[4], R1[5], R2[3], R2[4], R2[5]]>,
    ExcludeNumbersFromUnion<C[4], [R1[3], R1[4], R1[5], R2[3], R2[4], R2[5]]>,
    ExcludeNumbersFromUnion<C[5], [R1[3], R1[4], R1[5], R2[3], R2[4], R2[5]]>,

    ExcludeNumbersFromUnion<C[6], [R1[6], R1[7], R1[8], R2[6], R2[7], R2[8]]>,
    ExcludeNumbersFromUnion<C[7], [R1[6], R1[7], R1[8], R2[6], R2[7], R2[8]]>,
    ExcludeNumbersFromUnion<C[8], [R1[6], R1[7], R1[8], R2[6], R2[7], R2[8]]>,
  ];

type FilterBoxColumn<C extends SudokuBox, C1 extends SudokuBox, C2 extends SudokuBox> =
  [
    ExcludeNumbersFromUnion<C[0], [C1[0], C1[3], C1[6], C2[0], C2[3], C2[6]]>,
    ExcludeNumbersFromUnion<C[1], [C1[1], C1[4], C1[7], C2[1], C2[4], C2[7]]>,
    ExcludeNumbersFromUnion<C[2], [C1[2], C1[5], C1[8], C2[2], C2[5], C2[8]]>,

    ExcludeNumbersFromUnion<C[3], [C1[0], C1[3], C1[6], C2[0], C2[3], C2[6]]>,
    ExcludeNumbersFromUnion<C[4], [C1[1], C1[4], C1[7], C2[1], C2[4], C2[7]]>,
    ExcludeNumbersFromUnion<C[5], [C1[2], C1[5], C1[8], C2[2], C2[5], C2[8]]>,

    ExcludeNumbersFromUnion<C[6], [C1[0], C1[3], C1[6], C2[0], C2[3], C2[6]]>,
    ExcludeNumbersFromUnion<C[7], [C1[1], C1[4], C1[7], C2[1], C2[4], C2[7]]>,
    ExcludeNumbersFromUnion<C[8], [C1[2], C1[5], C1[8], C2[2], C2[5], C2[8]]>,
  ];

type FilterGameRows<G extends SudokuGame> =
  [
    FilterBoxRow<G[0], G[1], G[2]>,
    FilterBoxRow<G[1], G[0], G[2]>,
    FilterBoxRow<G[2], G[0], G[1]>,

    FilterBoxRow<G[3], G[4], G[5]>,
    FilterBoxRow<G[4], G[3], G[5]>,
    FilterBoxRow<G[5], G[3], G[4]>,

    FilterBoxRow<G[6], G[7], G[8]>,
    FilterBoxRow<G[7], G[6], G[8]>,
    FilterBoxRow<G[8], G[6], G[7]>,
  ]

type FilterGameColumns<G extends SudokuGame> =
  [
    FilterBoxColumn<G[0], G[3], G[6]>,
    FilterBoxColumn<G[1], G[4], G[7]>,
    FilterBoxColumn<G[2], G[5], G[8]>,

    FilterBoxColumn<G[3], G[0], G[6]>,
    FilterBoxColumn<G[4], G[1], G[7]>,
    FilterBoxColumn<G[5], G[2], G[8]>,

    FilterBoxColumn<G[6], G[0], G[3]>,
    FilterBoxColumn<G[7], G[1], G[4]>,
    FilterBoxColumn<G[8], G[2], G[5]>,
  ]

type IsGameComplete<G extends SudokuGame> =
  G["length"] extends 0
  ? "true"
  : IsBoxComplete<G[0]> | IsGameComplete<TailN<G>>

export type SolverIteration<G extends SudokuGame> =
  FilterGameGrid<FilterGameRows<FilterGameColumns<G>>>

export type SolveGame<G extends SudokuGame> =
  IsGameComplete<G> extends "true"
    ? G
    : SolveGame< SolverIteration<G> >;
