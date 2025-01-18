import { useRef, useSyncExternalStore } from "react";

export type ContextType<T> = {
  state: T;
  storeChanges: Set<() => void>; // 変更監視(リスナー)
  dispatch: (callback: (state: T) => T) => void;
  subscribe: (onStoreChange: () => void) => () => void;
};

// 受け取る側がジェネリクスだから親で型を定義してる
export const useCreateStoreContext = <T>(initState: () => T) => {
  // useRefを書いていないと、この親コンポーネントが肥大化してローカルステートを持った時にレンダリング対象となってしまう様
  const context = useRef<ContextType<T>>({
    state: initState(), // 初期値
    storeChanges: new Set(), // 重複を許さない型らしい

    // onClick発生後pageのdispatchの内容が届けられる
    dispatch: (callback) => {
      context.state = callback(context.state); // 状態の更新
      // リスナーの集合体が:context.storeChanges
      // 下の関数は、リスナー関数の事項部分
      context.storeChanges.forEach((storeChange) => storeChange()); // リスナー関数
    },
    // dispatchの内容を登録したことを確定するスキーム
    subscribe: (onStoreChange) => {
      context.storeChanges.add(onStoreChange);
      // 上記で確定した内容を
      return () => {
        context.storeChanges.delete(onStoreChange);
      };
    },
  }).current;
  return context;
};

// 独自に作ってるuseSelector
export const useSelector = <T, R>(
  context: ContextType<T>,
  getSnapshot: (state: T) => R
) =>
  useSyncExternalStore(
    context.subscribe,
    () => getSnapshot(context.state),
    () => getSnapshot(context.state)
  );

// subscribe: ストアが変更されるたびに呼び出されるコールバックを登録する
// getSnapshot: 現在のストアの値を返す
