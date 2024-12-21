import { Button as MuiButton, styled, css } from "@mui/material";

export default function HoggButton() {
  interface HoggType {
    variant: string;
  }

  const HoggButton = styled(MuiButton)<HoggType>`
    width: 200px;
    padding: 10px;

    ${(props) => {
      if (props.variant === "outlined") {
        return css`
          background-color: #000;
          border: 5px solid green;
          &:hover {
            background-color: #fff;
            border: 5px solid red;
          }
        `;
      } else if (props.variant === "text") {
        return css`
          color: red;
          background-color: #fff;
          border: 5px solid yellow;
          &:hover {
            background-color: #fff;
            border: 5px solid blue;
          }
        `;
      }
    }}
  `;

  return (
    <div
      style={{ border: "5px solid red", padding: "5px", marginBottom: "5px" }}
    >
      <p style={{ textAlign: "center" }}>variant</p>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <HoggButton variant={"contained"}>variant={"contained"}</HoggButton>
        <HoggButton variant={"outlined"}>variant={"outlined"}</HoggButton>
        <HoggButton variant={"text"}>variant={"text"}</HoggButton>
      </div>
    </div>
  );
}
