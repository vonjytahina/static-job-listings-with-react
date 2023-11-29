import React, { useState } from "react";
import data from "./data/data.json";

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterClick = (value) => {
    setSelectedFilters((prevFilters) => {
      // Check if the value already exists in the array
      if (!prevFilters.includes(value)) {
        // Add the value to the array
        return [...prevFilters, value];
      } else {
        // Remove the value from the array if it already exists
        return prevFilters.filter((val) => val !== value);
      }
    });
  };

  const clearFilters = () => {
    // Clear all selected filters
    setSelectedFilters([]);
  };

  // Apply filtering only if there are selected filters
  const filteredData =
    selectedFilters.length > 0
      ? data.filter((item) => {
          // Check if any selected filter exists in item properties
          return selectedFilters.some((filter) =>
            // Check if the filter is in role, level, or languages
            ["role", "level", "languages"].some((prop) =>
              // Check if the item property includes the filter
              item[prop].includes(filter)
            )
          );
        })
      : data;

  return (
    <div className="App">
      <div className="container">
        <div
          className="filter-container"
          style={{ opacity: selectedFilters.length < 1 ? 0 : 1 }}
        >
          {/* Filter items go here */}
          <div className="filter-items">
            {selectedFilters.map((filter) => (
              <div key={filter} className="filter-item">
                <div className="filter-item-name">{filter}</div>
                <div
                  className="filter-item-close"
                  onClick={() => handleFilterClick(filter)}
                ></div>
              </div>
            ))}
          </div>
          <div class="clear" onClick={clearFilters}>
            Clear
          </div>
        </div>
        <div className="items-container">
          {filteredData.map((item) => (
            <div key={item.id} className="item">
              <div className="item-left">
                <img
                  className="logo"
                  src={require(`${item.logo}`)}
                  alt={item.company}
                />
                <div className="item-left-details">
                  <div className="company">
                    <div className="company-name">{item.company}</div>
                    {item.new && <div className="new">New!</div>}
                    {item.featured && <div className="featured">Featured</div>}
                  </div>
                  <div className="position">{item.position}</div>
                  <div className="details">
                    <div className="posted-at">{item.postedAt}</div>
                    <div className="dot"></div>
                    <div className="contract">{item.contract}</div>
                    <div className="dot"></div>
                    <div className="location">{item.location}</div>
                  </div>
                </div>
              </div>
              <div className="item-right">
                <div
                  className="role"
                  onClick={() => handleFilterClick(item.role)}
                >
                  {item.role}
                </div>
                <div
                  className="level"
                  onClick={() => handleFilterClick(item.level)}
                >
                  {item.level}
                </div>
                <div className="languages-container">
                  {item.languages.map((language) => (
                    <div
                      key={language}
                      className="language"
                      onClick={() => handleFilterClick(language)}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
