import React from 'react';
import './App.css';
import Axios from 'axios';
import {host, api, GUID, BoardID, twoWeek, deleteEmptyStrings} from './config'

// TODO: Исправить на function
class Thead extends React.Component {
    render() {
        if (this.props.beginDate === null) {
            return ('');
        }
        if (twoWeek) {
            return (
                <thead>
                <tr>
                    <th ск='col'/>
                    {
                        Array.apply(null, {length: 14}).map((item, index) => {
                            if (index === 6) {
                                return ('');
                            }
                            item = new Date();
                            item.setDate(this.props.beginDate.getDate() + index);
                            return (
                                <th key={index} scope='col'>
                                    {
                                        item.toLocaleString(
                                            'ru', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            }
                                        )
                                    }
                                </th>
                            )
                        })
                    }
                </tr>
                </thead>
            );
        } else {
            return (
                <thead>
                <tr>
                    <th ск='col'/>
                    {
                        Array.apply(null, {length: 6}).map((item, index) => {
                            item = new Date();
                            item.setDate(this.props.beginDate.getDate() + index);
                            return (
                                <th key={index} scope='col'>{
                                    item.toLocaleString(
                                        'ru', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        }
                                    )
                                }</th>
                            )
                        })
                    }
                </tr>
                </thead>
            );
        }
    }
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
        if (twoWeek) {
            if (this.props.doctor.Shedule.length === 0) {
                return (
                    Array.apply(null, {length: 13}).map(item => {
                        return (
                            <td>
                            </td>
                        )
                    })
                );
            }
            dates = new Array(13).fill(null);
            this.props.doctor.Shedule.map((item, index) => {
                let date = new Date(item.Date);
                let delta = date.getDate() - this.props.beginDate.getDate();
                if (delta > 6) {
                    dates[delta - 1] = item;
                } else {
                    dates[delta - 1] = item;
                }
            });
        } else {
            if (this.props.doctor.Shedule.length === 0) {
                return (
                    Array.apply(null, {length: 6}).map(item => {
                        return (
                            <td>
                            </td>
                        )
                    })
                );
            }
            dates = new Array(6).fill(null);
            this.props.doctor.Shedule.map((item, index) => {
                let date = new Date(item.Date);
                let delta = date.getDate() - this.props.beginDate.getDate();
                if (delta < 6) {
                    dates[delta] = item;
                }
            });
        }
        return (
            // TODO: НЕ РАБОТАЕТ ЕСЛИ БОЛЬШЕ 2х раз В ДЕНЬ РАБОТАЕТ
            dates.map(item => {
                    if (item !== null) {
                        return (
                            <td>
                                <p>{this.getTime(item.BeginTime)}</p>
                                <p>{this.getTime(item.EndTime)}</p>
                            </td>
                        )
                    } else {
                        return (<td/>);
                    }
                }
            )
        );
    }

    render() {
        // TODO: СДЕЛАТЬ УДАЛЕНИЕ ПУСТЫХ СТРОК + РЕФРАКТОРИНГ КОДА
        if (deleteEmptyStrings && this.isEmptyString()) {
            return ('');
        }
        return (
            <tr>
                <td>{this.getName()}</td>
                {this.getShedule()}
            </tr>
        );
    }
}

class Tbody extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <tbody>
            {
                Object.keys(this.props.doctors).map(item => {
                    return (
                        <React.Fragment>
                            <TrCategory
                                categoryName={item}
                            />
                            {
                                this.props.doctors[item].map((doctor, index) => {
                                    return (
                                        <TrDoctors
                                            doctor={doctor}
                                            beginDate={this.props.beginDate}
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
}

function TrCategory(props) {

    if (twoWeek) {
        return (
            <tr>
                <th>{props.categoryName}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    } else {
        return (
            <tr>
                <th>{props.categoryName}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }
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
        // TODO: Дать нормальные имена переменным
        let categories = {};

        for (let i = 0; i < doctors.length; i++) {

            // TODO: Может быть ошибка, если не один из врачей не работает в пн
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
        this.setState({
            doctors: categories
        });
    }
    searchMinDate = (date) => {
        // TODO: Возможно будет слишком много обновлений state
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
                <table className={'table table-bordered table-striped'}>
                    <Thead
                        beginDate={this.state.beginDate}
                    />
                    <Tbody
                        beginDate={this.state.beginDate}
                        doctors={this.state.doctors}
                    />
                </table>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default App;
