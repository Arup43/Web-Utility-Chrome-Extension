/* global chrome */
import React, { useState, useEffect } from "react";

function Popup() {
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");
  const [note, setNote] = useState("");
  const [savedUrls, setSavedUrls] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0 for word count, 1 for URL saver

  useEffect(() => {
    // Query the active tab to get its ID and URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab) {
        setLoading(false);
        return;
      }

      setCurrentUrl(tab.url);

      // Execute a script in the current tab to count words
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
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

    // Load saved URLs from storage
    loadSavedUrls();
  }, []);

  const loadSavedUrls = () => {
    chrome.storage.local.get(["savedUrls"], (result) => {
      if (result.savedUrls) {
        setSavedUrls(result.savedUrls);
      }
    });
  };

  const saveUrl = () => {
    if (!note.trim()) return;

    const newEntry = {
      url: currentUrl,
      note: note,
      date: new Date().toLocaleString(),
    };

    const updatedUrls = [...savedUrls, newEntry];
    setSavedUrls(updatedUrls);

    // Save to Chrome's Extension Local storage
    chrome.storage.local.set({ savedUrls: updatedUrls }, () => {
      setNote(""); // Clear the note input
    });
  };

  const deleteUrl = (index) => {
    const updatedUrls = savedUrls.filter((_, i) => i !== index);
    setSavedUrls(updatedUrls);
    chrome.storage.local.set({ savedUrls: updatedUrls });
  };

  // Common styles
  const containerStyle = {
    width: "320px",
    minHeight: "300px",
    padding: "15px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: "15px", borderBottom: "1px solid #ccc" }}>
        <button
          onClick={() => setActiveTab(0)}
          style={{
            backgroundColor: activeTab === 0 ? "#f0f0f0" : "transparent",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            borderBottom: activeTab === 0 ? "2px solid #4285f4" : "none",
            color: activeTab === 0 ? "black" : "white",
          }}
        >
          Word Count
        </button>
        <button
          onClick={() => setActiveTab(1)}
          style={{
            backgroundColor: activeTab === 1 ? "#f0f0f0" : "transparent",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            borderBottom: activeTab === 1 ? "2px solid #4285f4" : "none",
            color: activeTab === 1 ? "black" : "white",
          }}
        >
          Save URLs
        </button>
      </div>

      {activeTab === 0 ? (
        // Word Count Tab
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <h2 style={{ marginBottom: "10px" }}>Word Count</h2>
          {loading ? (
            <p>Counting words...</p>
          ) : (
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {wordCount.toLocaleString()} words
            </div>
          )}
        </div>
      ) : (
        // URL Saver Tab
        <div>
          <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>
            Save Current URL
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              value={currentUrl}
              readOnly
              style={{
                width: "calc(100% - 16px)",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "12px",
              }}
            />
            <textarea
              placeholder="Add a note about this URL..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: "calc(100% - 16px)",
                padding: "8px",
                height: "60px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={saveUrl}
              style={{
                marginTop: "10px",
                backgroundColor: "#4285f4",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
              }}
            >
              Save URL with Note
            </button>
          </div>

          {savedUrls.length > 0 && (
            <div>
              <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
                Saved URLs
              </h3>
              <div
                style={{
                  maxHeight: "180px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "calc(100% - 16px)",
                }}
              >
                {savedUrls.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      borderBottom:
                        index < savedUrls.length - 1
                          ? "1px solid #eee"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "250px",
                          }}
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#4285f4", textDecoration: "none" }}
                          >
                            {new URL(item.url).hostname}
                          </a>
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          {item.date}
                        </div>
                        <div style={{ marginTop: "5px" }}>{item.note}</div>
                      </div>
                      <button
                        onClick={() => deleteUrl(index)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "#888",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
