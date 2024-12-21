import * as React from "react";
import {
  DndContext,
    // DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
    // DragStartEvent,
  DragOverEvent,
    // DragEndEvent,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
// import { Container, Item } from "../components/article3/dnd-content";
// import { arrayMove } from "@dnd-kit/sortable";
// import { Container, Item } from '../components/article3/dnd-content'

type Items = {
  [key: string]: string[];
};

export default function UserPage() {
  // ドラック要素の状態
  const [items, setItems] = React.useState<Items>({
    unsupported: ["1", "2", "3"], // 1などが、sortableItem、rootがコンテナの塊
    accepted: ["4", "5", "6"],
    selection: ["7", "8", "9"],
    selected: [],
  });

    // const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  // キーボード操作に対するセンサー
  const keyboardSensor = useSensor(KeyboardSensor);
  // マウス操作に対するセンサー
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px ドラッグした時にソート機能を有効にする
    },
  });
  // タッチ操作に対するセンサー
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      // delay：どのくらい遅延させるかの数値
      delay: 50,
      // 10px以内の移動は許容
      tolerance: 10,
    },
  });
  // DndContextの下に効かせるsensorを宣言
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // コンテナの取得関数(SortableContextのバリュー位置が変わったときに動いている)
  // idがどのコンテナに含まれているかfindしている。idが見つからなかったらundefinedを返している
  const findContainer = (id: UniqueIdentifier) => {
    // items(state)の中にidが含まれてたらidを返す
    if (id in items) {
      return id;
    }
    // TODO:items(state)の中にidが含まれてたらidを返す。コンテナ内のitemIdである場合をカバーするために必要
    return Object.keys(items).find((key: string) =>
      items[key].includes(id.toString())
    );
  };

  // ドロップ要素を持ち上げたときに実行
    // const handleDragStart = (event: DragStartEvent) => {
    //   // eventオブジェクトからactiveプロパティを取り出している
    //   const { active } = event;
    //   const { id } = active;
    //   setActiveId(id);
    // };

  // 要素と被った時に発生
  const handleDragOver = (event: DragOverEvent) => {
    // active:移動元 over:移動先
    const { active, over } = event;

    const { id } = active;
    // ドラック要素が着地しそうなドロップ要素のidを取得
    const overId = over?.id;

    // overIdが存在しなかった場合、強制終了
    if (!overId) return;

    // findContainerの中からそれぞれのidを探せ
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // idが存在しないor 動かそうとしてるidと置こうとしてるidが一緒だったら、強制終了
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // ドラック要素の座標が確認できなかったら強制終了
    const draggingRect = active.rect.current.translated;
    if (!draggingRect) return;

    // itemに上書き
    setItems((prev) => {
      // 所属元配列
      const activeItems = prev[activeContainer];
      // 所属予定配列
      const overItems = prev[overContainer];

      // stringをnumberに変換
      const activeIndex = activeItems.indexOf(id as string);
      const overIndex = overItems.indexOf(overId as string);

      // ドラック要素がドロップ先リストの下に存在しているか
      const isBelowLastItem =
        over &&
        // 現在のドラッグ要素が、置こうとしているリストの最下層に置こうとしてるか宣言してる
        overIndex === overItems.length - 1 &&
        // 動かしている要素のY座標（top）が、 > 置こうとしている要素のtop座標と高さを超えていなければ
        draggingRect.top > over.rect.top + over.rect.height;

      //元々あった要素より高い位置になったか、なってないか
      const modifier = isBelowLastItem ? 1 : 0;

      let newIndex;
      if (overId in prev) {
        // overId が prev に存在する場合は、リストの最後に挿入
        newIndex = overItems.length + 1;
      } else if (overIndex >= 0) {
        // overIndex が 0 以上の場合、modifier を加えた位置に挿入
        newIndex = overIndex + modifier;
      } else {
        // それ以外の場合もリストの最後に挿入
        newIndex = overItems.length + 1;
      }

      console.log([...prev[overContainer].slice(0, newIndex)]);
      return {
        // 配列情報全て
        ...prev,
        // activeContainerの値を今の値から更新する
        // すでにactiveContainerに存在するidを除してる
        [activeContainer]: prev[activeContainer].filter((item) => item !== id),
        // 入れ先の配列に属しているidを取り出している
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),

          // activeContainerからドラッグされた要素を取得、
          items[activeContainer][activeIndex],
          // overContainerの中で、newIndex以降のアイテムを保持。
          // 元のoverContainerのアイテムを変更せず、ドラッグされたアイテムの後に配置する。
          ...prev[overContainer].slice(newIndex),
        ],
      };
    });
  };

    // const handleDragEnd = (event: DragEndEvent) => {
    //   // プロパティを取り出してidに代入
    //   const { active, over } = event;
    //   const { id } = active;
    //   const overId = over?.id;

    //   if (!overId) return;

    //   // findContainerの中からそれぞれのidを探せ
    //   const activeContainer = findContainer(id);
    //   const overContainer = findContainer(overId);

    //   // idが存在しないor 動かそうとしてるidと置こうとしてるidが一緒だったら、強制終了
    //   if (
    //     !activeContainer ||
    //     !overContainer ||
    //     activeContainer !== overContainer
    //   ) {
    //     return;
    //   }

    //   // stringをnumberに変換
    //   const activeIndex = items[activeContainer].indexOf(id as string);
    //   const overIndex = items[overContainer].indexOf(overId as string);

    //   // 動かす要素idが置く要素idと一致しなかったら
    //   if (activeIndex !== overIndex) {
    //     setItems((items) => ({
    //       ...items,
    //       // overContainerのidを更新している
    //       [overContainer]: arrayMove(
    //         items[overContainer],
    //         activeIndex,
    //         overIndex
    //       ),
    //     }));
    //   }
    //   setActiveId(null);
    // };
  // arrayMove:sortableが提供するプロパティ。下のように要素を入れ替える
  // arrayMove(配列,old配列番号,new配列番号)

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
      <DndContext
        sensors={sensors} // DndContextでラップしてるコンポーネントに対してsensorを付与
        collisionDetection={closestCorners}
        // onDragStart={handleDragStart}
        onDragOver={handleDragOver} // ドラック要素がドロップ要素の上を通過する際、発火
        // onDragEnd={handleDragEnd}
      >
      {/* <Container id="unsupported" items={items.unsupported} />
        <Container id="accepted" items={items.accepted} />
        <Container id="selection" items={items.selection} />
        <Container id="selected" items={items.selected} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      <Container />
      <Item /> */}
      </DndContext>
      </div>
    </>
  );
}
