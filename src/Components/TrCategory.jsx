import React from "react";

function TrCategory(props) {
  return (
    <tr>
      <th className={"td-row"} colSpan="8">
        <div className={"td-name-category"}>
          <p className={"h5"}>{props.categoryName}</p>
        </div>
      </th>
    </tr>
  );
}

export default TrCategory;
