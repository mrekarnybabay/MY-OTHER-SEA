import React from 'react';
import './App.css';
import Axios from "axios";
import {host, api, GUID, BoardID} from './config'

class Thead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
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
                    }
                });
                if (category.length === 0) {
                    categories[doctors[i].Doctors[j].DoctName] = new Array();
                    categories[doctors[i].Doctors[j].DoctName].push(doctors[i]);
                } else {
                    category.map(elem => {
                        categories[elem].push(doctors[i]);
                    });
                }
            }
        }
        console.log('Сгруппированные врачи', categories);
        this.doctors = categories;
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
        return (
            <table className={"table table-bordered table-striped"}>
                <thead>
                <tr>
                    <th ск="col"></th>
                    <th scope="col">09.12.2019</th>
                    <th scope="col">10.12.2019</th>
                    <th scope="col">11.12.2019</th>
                    <th scope="col">12.12.2019</th>
                    <th scope="col">13.12.2019</th>
                    <th scope="col">15.12.2019</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Нейрохирургия</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="doctor in doctors">
                    <td>Иванов И.И.</td>
                    <td>
                    </td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td></td>
                    <td>
                    </td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                </tr>
                <tr>
                    <td>Иванов И.И.</td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td></td>
                    <td>
                        <p>08:00</p>
                        <p>12:00</p>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default App;
