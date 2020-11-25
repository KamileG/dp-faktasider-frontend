import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { theme } from "./theme";
import "./index.less";

const Styling = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    a {
        word-break: break-word;
    }
    html {
        font-size: 112.5%;
        @media (min-width: 1400px) {
          font-size: 125%;
        }
        font-family: 'Source Sans Pro', sans-serif;
    }
    
    .ReactCollapse--collapse {
        transition: height 0.3s;
    }
    
    .decorator-wrapper .sticky-container {
      position: static !important;
    }
`;

const ChatbotStyling = createGlobalStyle`
   .decorator-wrapper {
     .chatbot-container {
     transition: .3s;
        bottom: 1rem;
     }
     .chatbot-container__docked {
        bottom: 0;
     }
   }
`;

export function GlobalStyling() {
  return (
    <>
      <Styling />
      <ChatbotStyling />
    </>
  );
}

/* Scoper denne stylingen så den ikke overskriver styling i Meny/Dekorator */
export const AppStyling = styled.div`
  *:focus {
    ${theme.focus};
    border-radius: 0.2rem;
  }
`;
