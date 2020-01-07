import React from "react";
import type from "../const";

function TrCategory(props) {
  if (props.type === type.twoWeek) {
    return (
      <tr>
        <th className={"td-row"}>
          <div className={"td-name-category"}>
            <p className={"h5"}>{props.categoryName}</p>
          </div>
        </th>
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
        <th className={"td-row"} />
      </tr>
    );
  } else if (props.type === type.oneWeek) {
    return (
      <tr>
        <th className={"td-row"} colSpan="8">
          <div className={"td-name-category"}>
            <p className={"h5"}>{props.categoryName}</p>
          </div>
        </th>
      </tr>
    );
  } else {
    return null;
  }
}

export default TrCategory;
