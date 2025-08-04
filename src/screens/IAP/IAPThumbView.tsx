import { Typography } from "antd";
import icIAPThumbnail from "../../assets/icIAPThumbnail.png";
import { IAPConfig } from "../../models/IAPConfig";

export function IAPThumbView(props: { config: IAPConfig }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        aspectRatio: 754 / 686,
        gap: 8,
        marginTop: 60,
      }}
    >
      <img
        src={icIAPThumbnail}
        alt={""}
        style={{
          position: "absolute",
          width: "100%",
          height: "auto",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />

      <span
        style={{
          position: "absolute",
          top: -60,
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          // zIndex: 1,
          margin: 16,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {props.config.thumbTitle}
      </span>
    </div>
  );
}
