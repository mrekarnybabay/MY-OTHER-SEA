import React from "react";

function Thead(props) {
  return (
    <thead>
      <tr>
        <th scope="col" />
        {Array.apply(null, { length: 7 }).map((item, index) => {
          item = new Date();
          if (props.id === 2) {
            item.setDate(props.beginDate.getDate() + index + 7);
          } else {
            item.setDate(props.beginDate.getDate() + index);
          }

          return (
            <th key={index} scope="col">
              <div className={"date"}>
                {item.toLocaleString("ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric"
                })}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default Thead;
