/* global chrome */
import React, { useState, useEffect } from "react";

function Popup() {
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query the active tab to get its ID
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab) {
        setLoading(false);
        return;
      }

      // Execute a script in the current tab to count words
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: countWords,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            setWordCount(results[0].result);
          }
          setLoading(false);
        }
      );
    });
  }, []);

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Word Count</h2>
      {loading ? (
        <p>Counting words...</p>
      ) : (
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {wordCount.toLocaleString()} words
        </div>
      )}
    </div>
  );
}

// This function will be executed in the context of the current page
function countWords() {
  // Get all visible text on the page
  const bodyText = document.body.innerText || "";

  // Split by whitespace and filter out empty strings
  const words = bodyText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return words.length;
}

export default Popup;
