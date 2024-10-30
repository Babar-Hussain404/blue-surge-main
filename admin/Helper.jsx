// src/helpers/renderHTML.js

/**
 * A helper function to safely render HTML content.
 * @param {string} htmlContent - The HTML content to be rendered.
 * @returns {Object} - An object with __html key for dangerouslySetInnerHTML.
 */
export function renderHTML(htmlContent) {
    return { __html: htmlContent };
  }
  