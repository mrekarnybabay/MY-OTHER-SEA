import React from 'react';

import type from '../const';

export class TrDoctors extends React.Component {
    getName = () => {
        return (this.props.doctor.Surname + ' ' + this.props.doctor.Name + ' ' + this.props.doctor.Patronimic);
    }

    getTime = (timeString) => {
        let time = new Date(timeString);
        let hours = time.getHours().toString();
        let minuts = time.getMinutes().toString();

        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minuts.length < 2) {
            minuts = '0' + minuts;
        }

        return (
            hours + ':' + minuts
        );
    }
    returnEmpty = () => {
        if (this.props.type === type.twoWeek) {
            return (
                Array.apply(null, { length: 14 }).map(item => {
                    return (
                        <td className={"td-row"}>
                        </td>
                    )
                })
            );
        } else {
            return (
                Array.apply(null, { length: 7 }).map(item => {
                    return (
                        <td className={"td-row"}>
                        </td>
                    )
                })
            );
        }
    }
    millisecondsTodays = (milliseconds) => {
        return milliseconds / 1000 / 60 / 60 / 24;
    }
    getShedule = () => {
        if (this.props.doctor.Shedule.length === 0) {
            this.returnEmpty();
        }

        let dates = this.props.type === type.twoWeek ?
            new Array(14).fill(null).map(item => {
                return item = []
            })
            :
            new Array(7).fill(null).map(item => {
                return item = []
            });

        this.props.doctor.Shedule.map((item) => {
            let date = new Date(item.Date);
            let delta = this.millisecondsTodays(date - this.props.beginDate);

            if (this.props.type === type.twoWeek) {
                dates[delta].push(item);
            } else {
                if (this.props.id === 1) {
                    if (delta < 7) {
                        dates[delta].push(item);
                    }
                } else if (this.props.id === 2) {
                    if (delta > 6) {
                        dates[delta - 7].push(item);
                    }
                }
            }

            return item;
        });

        return (
            dates.map(item => {
                if (item !== null) {
                    return (
                        <td className={"td-row"}>
                            <div className={"td-shedule-doctor"}>
                                {
                                    item.map(date => {
                                        return (<p>{this.getTime(date.BeginTime)} - {this.getTime(date.EndTime)}</p>);
                                    })
                                }
                            </div>
                        </td>
                    )
                } else {
                    return (<td className={"td-row"} />);
                }
            }
            )
        );
    }

    render() {
        if (this.props.type === type.twoWeek) {
            return (
                <tr>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.getName()}</p></div>
                    </td>
                    {this.getShedule()}
                </tr>
            );
        } else if (this.props.type === type.oneWeek) {
            return (
                <tr>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.getName()}</p></div>
                    </td>
                    {this.getShedule()}
                </tr>
            );
        } else if (this.props.type === type.newStyle) {
            return (
                <tr>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.getName()}</p></div>
                    </td>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.props.categoryName}</p></div>
                    </td>
                    {this.getShedule()}
                </tr>
            );
        }
    }
}

export default TrDoctors;