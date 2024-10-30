import React from "react";
export const formatDate = (inputDate) => {
  if (!inputDate) return null;

  const hasTime = /\d{2}:\d{2}/.test(inputDate);
  const options = hasTime
    ? {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    : { year: "numeric", month: "2-digit", day: "2-digit" };

  return new Date(inputDate).toLocaleString("en-US", options);
};

export const formatText = (text) => {
  if (!text) return "";
  return text.split("\r\n\r\n").map((paragraph, index) => (
    <React.Fragment key={index}>
      {paragraph.split("\r\n").map((line, index) => (
        <React.Fragment key={index}>
          {line} <br /><br />
        </React.Fragment>
      ))}
    </React.Fragment>
  ));
};



// src/helpers/renderHTML.js

/**
 * A helper function to safely render HTML content.
 * @param {string} htmlContent - The HTML content to be rendered.
 * @returns {Object} - An object with __html key for dangerouslySetInnerHTML.
 */
export function renderHTML(htmlContent) {
  // Inject custom styles for h1, h2, and h3 tags
  const customStyles = `
    <style>
      h1, h2, h3, h4 {
        color: white !important;
      }
    </style>
  `;
  
  // Prepend the custom styles to the HTML content
  const contentWithStyles = `${customStyles}${htmlContent}`;
  
  return { __html: contentWithStyles };
}
