// import { Button as MuiButton, styled, css } from "@mui/material";
import { Button as MuiButton, styled } from "@mui/material";

export default function FooButton() {
  interface FooType {
    ui: "primary" | "secondary";
  }

  const FooButton = styled(MuiButton)<FooType>(({ theme, ui }) => ({
    width: "200px",
    padding: "10px",
    ...(ui === "primary" && {
      backgroundColor: theme.palette.primary.main,
      border: `5px solid ${theme.palette.primary.light}`,
      borderRadius: theme.shape.borderRadius * 5, // !shape.borderRadiusはデフォ4。
      "&:hover": {
        color: theme.palette.secondary.main,
        // !spacingは、余白用で用意されているものだから、borderの太さにも使えるが、適切じゃない。
        border: `${theme.spacing(5 / 8)} solid ${theme.palette.secondary.main}`,
      },
    }),
    ...(ui === "secondary" && {
      color: theme.palette.error.main,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "20px",
      border: `5px solid ${theme.palette.primary.light}`,
      "&:hover": {
        backgroundColor: theme.palette.background.default,
        border: `5px solid ${theme.palette.error.dark}`,
      },
    }),
  }));

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

// cssプロパティを使った条件分岐
// import { Button as MuiButton, styled, css } from "@mui/material";

// export default function FooButton() {
//   interface FooType {
//     ui: "primary" | "secondary";
//   }

//   const FooButton = styled(MuiButton)<FooType>`
//     width: 200px;
//     padding: 10px;

//     ${(props) => {
//       if (props.ui === "primary") {
//         return css`
//           background-color: t;
//           border: 5px solid blue;
//           border-radius: 20px;
//           &:hover {
//             color: #909;
//             border: 5px solid #909;
//           }
//         `;
//       } else if (props.ui === "secondary") {
//         return css`
//           color: red;
//           background-color: #fff;
//           border-radius: 20px;
//           border: 5px solid blue;
//           &:hover {
//             background-color: #fff;
//             border: 5px solid red;
//           }
//         `;
//       }
//     }}
//   `;

//   return (
//     <div
//       style={{ border: "5px solid blue", padding: "5px", marginBottom: "5px" }}
//     >
//       <p style={{ textAlign: "center" }}>ui</p>
//       <div
//         style={{
//           width: "100vw",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "20px",
//         }}
//       >
//         <FooButton ui={"primary"}>ui={"primary"}</FooButton>
//         <FooButton ui={"secondary"}>ui={"secondary"}</FooButton>
//       </div>
//     </div>
//   );
// }
