import { Link } from "react-router-dom";
export default function Home() {
  const params = 555
  console.log(params)
  return (
    <>
      <div>home</div>
      <Link to="/date-picker" children={"date-picker"} />
      <br />
      <Link to="/dnd-example" children={"dnd-example"} />
      <br />
      <Link to={`/article`} children={"articleTop"} />
      <br />
      <Link to={`article/${params}`} children={"articleChildren"} />
      <br />
      <Link to={`/sample`} children={"sample"} />
    </>
  );
}
