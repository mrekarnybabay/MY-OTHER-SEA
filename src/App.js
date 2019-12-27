import React from 'react';
import './App.css';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';

import {Router, Switch} from "react-router";
import {host, api, GUID, BoardID, twoWeek, deleteEmptyStrings, countString, displayTime} from './config';

function Thead(props) {
    return (
        <thead>
        <tr>
            <th ск='col'/>
            {
                Array.apply(null, {length: 14}).map((item, index) => {
                    item = new Date();
                    item.setDate(props.beginDate.getDate() + index);
                    return (
                        <th key={index} scope='col'>
                            <div className={"date"}>
                                {
                                    item.toLocaleString(
                                        'ru', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        }
                                    )
                                }
                            </div>
                        </th>
                    )
                })
            }
        </tr>
        </thead>
    );
}

class TrDoctors extends React.Component {
    getName = () => {
        return this.props.doctor.Surname + ' ' + this.props.doctor.Name + ' ' + this.props.doctor.Patronimic;
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
    getShedule = () => {
        let dates;
        if (this.props.doctor.Shedule.length === 0) {
            return (
                Array.apply(null, {length: 14}).map(item => {
                    return (
                        <td className={"td-row"}>
                        </td>
                    )
                })
            );
        }

        dates = new Array(14).fill(null).map(item => {
            return item = []
        });

        this.props.doctor.Shedule.map((item, index) => {
            let date = new Date(item.Date);
            let delta = (date - this.props.beginDate) / 1000 / 60 / 60 / 24;

            dates[delta].push(item);
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
                        return (<td className={"td-row"}/>);
                    }
                }
            )
        );
    }

    render() {
        if (deleteEmptyStrings && this.props.doctor.Shedule.length === 0) {
            return null;
        }

        if (twoWeek) {
            return (
                <tr>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.getName()}</p></div>
                    </td>
                    {this.getShedule()}
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>
                        <div className={"td-row td-name-doctor"}><p className={""}>{this.getName()}</p></div>
                    </td>
                    {this.getShedule()}
                </tr>
            );
        }
    }
}

function Tbody(props) {
    return (
        <tbody>
        {
            Object.keys(props.doctors).map(item => {
                return (
                    <React.Fragment>
                        <TrCategory
                            categoryName={item}
                        />
                        {
                            props.doctors[item].map((doctor) => {
                                return (
                                    <TrDoctors
                                        doctor={doctor}
                                        beginDate={props.beginDate}
                                    />
                                )
                            })
                        }
                    </React.Fragment>
                )
            })
        }
        </tbody>
    );
}


function TrCategory(props) {
    return (
        <tr>
            <th className={"td-row"}>
                <div className={"td-name-category"}><p className={"h5"}>{props.categoryName}</p></div>
            </th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
            <th className={"td-row"}></th>
        </tr>
    );
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: null,
            beginDate: null
        }
        this.request(this.response);
    }

    request = (responseFunction) => {
        console.log('Делаю запрос');
        Axios.post(host + api, {
            GUID: GUID,
            Data: {
                BoardID: BoardID
            }
        })
            .then(function (response) {
                console.log('Получил ответ', response);
                responseFunction(response.data);
                //groupingDoctors();
            })
            .catch(function (error) {
                console.log('Ошибка! Не могу связаться с API. ' + error);
            });
    }
    response = (doctors) => {
        this.groupingDoctors(doctors);
    }

    groupingDoctors = (doctors) => {
        let categories = {};

        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].Shedule.length > 0) {
                this.searchMinDate(doctors[i].Shedule[0].Date);
            }

            let nameCategories = Object.keys(categories);
            let doctorsCategories = doctors[i].Doctors.slice();

            for (let j = 0; j < doctorsCategories.length; j++) {
                let category = nameCategories.filter(name => {
                    if (name === doctors[i].Doctors[j].DoctName) {
                        return name;
                    } else {
                        return null;
                    }
                });
                if (category.length === 0) {
                    categories[doctors[i].Doctors[j].DoctName] = [];
                    categories[doctors[i].Doctors[j].DoctName].push(doctors[i]);
                } else {
                    category.map(elem => {
                        categories[elem].push(doctors[i]);
                        return null;
                    });
                }
            }
        }
        console.log('Сгруппированные врачи', categories);
        this.packDoctors(categories);
        this.setState({
            doctors: this.packDoctors(categories)
        });
    }
    sortCategories = (categories) => {
        let array = [];
        for (let key in categories) {
            array.push(key);
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (categories[array[j]].length > categories[array[j + 1]].length) {
                    let temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;

    }
    packDoctors = (categories) => {
        //debugger;
        let packs = [];
        let curIndex = 0;
        let curCount = 0;
        let array = this.sortCategories(categories);
        packs.push([]);
        for (let k in array) {
            let key = array[k];
            for (let i = 0; i < categories[key].length; i++) {
                if (packs[curIndex][key]) {
                    if (curCount < countString) {
                        packs[curIndex][key].push(categories[key][i]);
                        curCount++;
                    } else {
                        packs.push([]);
                        curIndex++;
                        packs[curIndex][key] = [];
                        packs[curIndex][key].push(categories[key][i])
                        curCount = 2;
                    }
                } else {
                    if (curCount + 2 <= countString) {
                        packs[curIndex][key] = [];
                        packs[curIndex][key].push(categories[key][i])
                        curCount += 2;
                    } else {
                        packs.push([]);
                        curIndex++;
                        packs[curIndex][key] = [];
                        packs[curIndex][key].push(categories[key][i])
                        curCount = 2;
                    }
                }
            }
        }
        console.log(packs);
        return (packs);
    }
    searchMinDate = (date) => {
        let newDate = new Date(date);
        let beginDate = this.state.beginDate;
        if (beginDate === null || beginDate > newDate) {
            this.setState({
                beginDate: newDate
            });
        }
    }

    render() {
        if (this.state.doctors !== null) {
            return (
                <Carousel interval={displayTime}>
                    {this.state.doctors.map(item => {
                        return (
                            <CarouselItem>
                                <Table bordered>
                                    <Thead
                                        beginDate={this.state.beginDate}
                                    />
                                    <Tbody
                                        beginDate={this.state.beginDate}
                                        doctors={item}
                                    />
                                </Table>
                            </CarouselItem>

                        )
                    })}

                </Carousel>
            );
        }
        else{
            return null;
        }
    }
}

export default App;
