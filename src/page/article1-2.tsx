import { Link, Outlet } from "react-router-dom";
import FooButton from "../components/article-1,2/foo-button";
import HoggButton from "../components/article-1,2/hoge-button";

export default function Article12page() {
  const params: number = 444;
  return (
    <>
      <FooButton />
      <HoggButton />
      <Link to="/" children={"home"} />
      <br />
      <Link to={`/article/${params}`} children={"articleChildren"} />
      <Outlet />
    </>
  );
}
