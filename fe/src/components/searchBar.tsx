import React, { useState, useEffect, useRef } from "react";

type Props = {
  onSearch: (query: string) => void;
};

// Search bar component - project name ya description se search karne ke liye
const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const isFirstRender = useRef(true); // Pehli baar render check karne ke liye
  const onSearchRef = useRef(onSearch); // Latest onSearch function ko store karne ke liye

  // onSearch function ko ref mein update karo har render pe
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Debounce search - 500ms wait karo typing ke baad
  useEffect(() => {
    // Pehli baar render pe search mat karo (empty input ke liye)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Agar input empty hai toh search mat karo
    if (!input.trim()) {
      return;
    }

    // Debounce timer - 500ms wait karo (typing complete hone ke baad)
    const delay = setTimeout(() => {
      // Double check - input abhi bhi non-empty hai
      if (input.trim()) {
        onSearchRef.current(input.trim()); // Ref se latest function use karo
      }
    }, 500);

    // Cleanup - agar user quickly type kare toh purana timer cancel karo
    return () => clearTimeout(delay);
  }, [input]); // Sirf input change hone pe trigger hoga - onSearch dependency nahi hai

  return (
    <input
      type="text"
      placeholder="Search..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
        minWidth: "200px",
        width: "100%",
        maxWidth: "400px"
      }}
    />
  );
};

export default SearchBar;
