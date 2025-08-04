import icMail from "../assets/icMail.png";

import "../styles/AnalyzingScreen.css";
import "../styles/Common.css";
import ContinueButton from "../components/ContinueButton";
import { useEffect, useRef, useState } from "react";
import { SendEmailSchema } from "../models/WelcomeConfig";

export interface EmailScreenProps {
  config: SendEmailSchema;
  onContinue: (email: string) => void;
}

export function EmailScreen(props: EmailScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function validateEmail(raw: string) {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = strictEmailRegex.test(raw);
    setCanSubmit(isValid);

    if (hasInteracted) {
      setShowError(!isValid && raw.length > 0);
    }
  }

  const handleSubmit = () => {
    props.onContinue(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setHasInteracted(true);
    validateEmail(value);
  };

  const link = (
    <a
      style={{
        fontWeight: 600,
        color: "#2D3142",
        fontSize: 14,
        textDecoration: "underline",
        padding: "0 4px",
      }}
      href="https://begamob.com/cast-policy.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.config.privacyPolicy}
    </a>
  );

  const parts = props.config.description.split("%@");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        width: "100%",
        height: "100%",
        gap: 24,
      }}
      className="justify-between mb-8"
    >
      <div className="flex flex-col gap-4">
        <span className="title-text">{props.config.title}</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              backgroundColor: "#F8F8F8",
              padding: 16,
              margin: "0px 24px",
              borderRadius: 16,
              alignItems: "center",
              border: showError ? "2px solid #FF3D60" : "none",
            }}
          >
            <img src={icMail} alt={""} style={{ width: 24, height: 24 }} />
            <input
              ref={inputRef}
              autoFocus={true}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                fontSize: 16,
              }}
              type={"email"}
              placeholder="name@gmail.com"
              onChange={handleInputChange}
            ></input>
          </div>
          {showError && (
            <span
              style={{
                fontSize: 14,
                color: "#FF3D60",
                margin: "0 24px",
              }}
              className="font-[400] text-start"
            >
              Incorrect email format, please try again
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: 14,
            textAlign: "left",
            lineHeight: 1.5,
            fontStyle: "italic",
            color: "#2D3142",
            margin: "0 24px",
          }}
        >
          {parts[0]}
          {link}
          {parts[1]}
        </span>
      </div>

      <ContinueButton
        disabled={!canSubmit}
        text={props.config.submit}
        onClick={() => handleSubmit()}
      />
    </div>
  );
}
