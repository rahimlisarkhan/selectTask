import { useState } from "react";
import "./App.css";
import data from "./data.json";

type PayloadType = {
  condition: string;
  comparator: string;
  value: string;
};

function App() {
  const [conditions, setConditions] = useState<PayloadType[]>([]);

  console.log("conditions", conditions);

  const handleAddCondition = () => {
    const payload: PayloadType = {
      condition: "",
      comparator: "",
      value: "",
    };

    // Add the new condition to the state
    setConditions((prev) => [...prev, payload]);
  };

  const handleConditionChange = (
    optionIndex: number,
    key: "value" | "condition" | "comparator",
    value: string
  ) => {
    // Copy conditions array
    const newConditions = [...conditions];

    // Update the specific condition's value
    newConditions[optionIndex][key] = value;

    // Log to ensure the value was updated
    console.log("Updated newConditions:", newConditions);

    // Update state
    setConditions(newConditions);
  };

  return (
    <div>
      <button onClick={handleAddCondition}>Add Condition</button>
      <br />
      <br />
      {/* List */}
      <div className="list">
        {conditions.map((item, i) => {
          const options1 = data;

          const currentOptionDetail = options1.find(
            (el) => el.name == item.value
          );

          return (
            <div className="item" key={i}>
              <select
                value={item.value}
                onChange={(e) =>
                  handleConditionChange(i, "value", e.target.value)
                }
              >
                <option value="" disabled>
                  Select option
                </option>
                {options1.map((el, index) => (
                  <option key={"option" + index} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>

              {item.value && (
                <>
                  <select
                    value={item.comparator}
                    onChange={(e) =>
                      handleConditionChange(i, "comparator", e.target.value)
                    }
                  >
                    <option defaultChecked>Select option</option>
                    {currentOptionDetail?.comparators.map((comp, index) => (
                      <option key={"comp" + index} value={comp}>
                        {comp}
                      </option>
                    ))}
                  </select>

                  {currentOptionDetail?.type == "text" ? (
                    <input
                      value={item.condition}
                      onChange={(e) =>
                        handleConditionChange(i, "condition", e.target.value)
                      }
                      placeholder="your text"
                    />
                  ) : (
                    <select
                      value={item.condition}
                      onChange={(e) =>
                        handleConditionChange(i, "condition", e.target.value)
                      }
                    >
                      <option defaultChecked>Select option</option>
                      {(Array.isArray(currentOptionDetail?.data)
                        ? currentOptionDetail?.data
                        : Object.values(currentOptionDetail?.data)
                      ).map((con, index) => (
                        <option key={"con" + index} value={con}>
                          {con}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
