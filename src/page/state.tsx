// useSyncExternalStoreを学ぶ

import { Link } from "react-router-dom";
import {
  ContextType,
  useCreateStoreContext,
  useSelector,
} from "../store/useSyncExternalStore";

interface StateType {
  a: number;
  b: number;
  c: number;
}

const A = ({ context }: { context: ContextType<StateType> }) => {
  const value = useSelector(context, (state) => state.a);
  return <div>A:{value}</div>;
};
const B = ({ context }: { context: ContextType<StateType> }) => {
  const value = useSelector(context, (state) => state.b);
  return <div>B:{value}</div>;
};
const C = ({ context }: { context: ContextType<StateType> }) => {
  const value = useSelector(context, (state) => state.c);
  return <div>C:{value}</div>;
};

const Buttons = ({ context }: { context: ContextType<StateType> }) => {
  return (
    <div>
      <button
        onClick={() =>
          context.dispatch((state) => ({ ...state, a: state.a + 1 }))
        }
      >
        A
      </button>
      <button
        onClick={() =>
          context.dispatch((state) => ({ ...state, b: state.b + 1 }))
        }
      >
        B
      </button>
      <button
        onClick={() =>
          context.dispatch((state) => ({ ...state, c: state.c + 1 }))
        }
      >
        C
      </button>
    </div>
  );
};

export default function StatePage() {
  const context = useCreateStoreContext<StateType>(() => ({
    a: 0,
    b: 10,
    c: 100,
  }));
  return (
    <div>
      <A context={context} />
      <B context={context} />
      <C context={context} />
      <Buttons context={context} />
      <Link to="/" children={"home"} />
    </div>
  );
}
