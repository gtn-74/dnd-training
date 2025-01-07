import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function DatePickerPage() {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="Basic date picker"
                style={{ marginBottom: "10px" }}
              >
                デフォルト DatePIcker
              </label>
              <DatePicker label="Basic date picker" />
            </div>
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="Added date picker"
                style={{ marginBottom: "10px" }}
              >
                propsを渡して改変した DatePIcker
              </label>
              <DatePicker
                label="Basic date picker"
                format="YYYY/MM/DD" // 日付のフォーマットを指定
                minDate={dayjs().startOf("day")} // 今日より前の日付を選択できなくする
                desktopModeMediaQuery="@media (max-width: 9999px)" // デスクトップモードのメディアクエリを指定
                // スロットのプロパティを指定
                slotProps={{
                  inputAdornment: { position: "start" },
                  textField: {
                    InputProps: { disabled: true },
                    placeholder: "日付を入力しよう", // プレースホルダーを指定
                  }, // テキストフィールドのプロパティをdisabledにする
                }} // カレンダーアイコンの位置調整
              />
            </div>
          </DemoContainer>
        </LocalizationProvider>
        {/* <Link to="/" children={"home"} /> */}
      </div>
    </div>
  );
}
