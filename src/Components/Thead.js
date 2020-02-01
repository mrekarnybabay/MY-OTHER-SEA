import React from "react";

class Thead extends React.Component {
  dayOfWeek = day => {
    let numberDay = day.getDay();
    switch (numberDay) {
      case 0:
        return "Вс";
      case 1:
        return "Пн";
      case 2:
        return "Вт";
      case 3:
        return "Ср";
      case 4:
        return "Чт";
      case 5:
        return "Пт";
      case 6:
        return "Сб";
      default:
        return "Ошибка";
    }
  };
  render() {
    return (
      <thead>
        <tr>
          <th scope="col" />
          {Array.apply(null, { length: 7 }).map((item, index) => {
            item = new Date();
            if (this.props.id === 2) {
              item.setDate(this.props.beginDate.getDate() + index + 7);
            } else {
              item.setDate(this.props.beginDate.getDate() + index);
            }

            return (
              <th key={index} scope="col">
                <div className={"date"}>
                  <div class="dayOfWeek">{this.dayOfWeek(item)}</div>
                  <div class="numberDay">
                    {item.toLocaleString("ru", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric"
                    })}{" "}
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default Thead;
