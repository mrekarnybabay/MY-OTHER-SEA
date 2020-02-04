import React from "react";

export class TrDoctors extends React.Component {
  getName = () => {
    if (this.props.doctor.Name[0] === null && this.props.doctor.Patronimic[0] === null) {
      return (
        this.props.doctor.Surname
      );
    } else {
      return (
        this.props.doctor.Surname +
        " " +
        this.props.doctor.Name[0] +
        ". " +
        this.props.doctor.Patronimic[0] +
        "."
      );
    }
  };

  getTime = timeString => {
    let time = new Date(timeString);
    let hours = time.getHours().toString();
    let minuts = time.getMinutes().toString();

    if (hours.length < 2) {
      hours = "0" + hours;
    }
    if (minuts.length < 2) {
      minuts = "0" + minuts;
    }

    return hours + ":" + minuts;
  };

  returnEmpty = () => {
    return Array.apply(null, { length: 7 }).map(item => {
      return <td className={"td-row"}></td>;
    });
  };

  millisecondsTodays = milliseconds => {
    return milliseconds / 1000 / 60 / 60 / 24;
  };

  getShedule = () => {
    if (this.props.doctor.Shedule.length === 0) {
      this.returnEmpty();
    }

    let dates = new Array(7).fill(null).map(item => {
      return (item = []);
    });

    this.props.doctor.Shedule.map(item => {
      let date = new Date(item.Date);
      let delta = this.millisecondsTodays(date - this.props.beginDate);

      if (this.props.id === 1) {
        if (delta < 7) {
          dates[delta].push(item);
        }
      } else if (this.props.id === 2) {
        if (delta > 6) {
          dates[delta - 7].push(item);
        }
      }

      return item;
    });

    return dates.map(item => {
      if (item !== null) {
        return (
          <td>
            <div style={{ height: this.props.doctor.height + "px" }} className={"td-shedule-doctor"}>
              {item.map(date => {
                return (
                  <p>
                    {this.getTime(date.BeginTime)} -{" "}
                    {this.getTime(date.EndTime)}
                  </p>
                );
              })}
            </div>
          </td>
        );
      } else {
        return <td />;
      }
    });
  };

  render() {
    return (
      <tr>
        <td className={"firstCollumn"}>
          <div className={"td-name-doctor"}>
            <p>{this.getName()}</p>
          </div>
        </td>
        {this.getShedule()}
      </tr>
    );
  }
}

export default TrDoctors;
