import { Button as MuiButton, styled, css } from "@mui/material";

export default function FooButton() {
  interface FooType {
    ui: "primary" | "secondary";
  }

  const FooButton = styled(MuiButton)<FooType>`
    width: 200px;
    padding: 10px;

    ${(props) => {
      if (props.ui === "primary") {
        return css`
          background-color: #fff;
          border: 5px solid blue;
          border-radius: 20px;
          &:hover {
            color: #909;
            border: 5px solid #909;
          }
        `;
      } else if (props.ui === "secondary") {
        return css`
          color: red;
          background-color: #fff;
          border-radius: 20px;
          border: 5px solid blue;
          &:hover {
            background-color: #fff;
            border: 5px solid red;
          }
        `;
      }
    }}
  `;

  return (
    <div
      style={{ border: "5px solid blue", padding: "5px", marginBottom: "5px" }}
    >
      <p style={{ textAlign: "center" }}>ui</p>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FooButton ui={"primary"}>ui={"primary"}</FooButton>
        <FooButton ui={"secondary"}>ui={"secondary"}</FooButton>
      </div>
    </div>
  );
}
