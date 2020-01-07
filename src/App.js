import React from "react";
import Axios from "axios";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Table from "react-bootstrap/Table";

import type from "./const";
import { host, api, GUID, BoardID, countString, displayTime } from "./config";

import Tbody from "./Components/Tbody";
import Thead from "./Components/Thead";

// TODO: Рефакторинг методов класса
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: null,
      beginDate: null
    };
    this.request(this.response);
  }

  request = responseFunction => {
    console.log("Делаю запрос");
    Axios.post(host + api, {
      GUID: GUID,
      Data: {
        BoardID: BoardID
      }
    })
      .then(function(response) {
        console.log("Получил ответ", response);
        responseFunction(response.data);
      })
      .catch(function(error) {
        console.log("Ошибка! Не могу связаться с API. " + error);
      });
  };
  response = doctors => {
    this.groupingDoctors(doctors);
  };

  groupingDoctors = doctors => {
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
    console.log("Сгруппированные врачи", categories);
    this.setState({
      doctors: categories
    });
  };
  sortCategories = categories => {
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
  };
  packDoctors = (categories, typeStyle) => {
    let packs = [];
    let curIndex = 0;
    let curCount = 0;
    let array = this.sortCategories(categories);
    packs.push([]);
    debugger;

    if (typeStyle === type.twoWeek || typeStyle === type.oneWeek) {
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
              packs[curIndex][key].push(categories[key][i]);
              curCount = 2;
            }
          } else {
            if (curCount + 2 <= countString) {
              packs[curIndex][key] = [];
              packs[curIndex][key].push(categories[key][i]);
              curCount += 2;
            } else {
              packs.push([]);
              curIndex++;
              packs[curIndex][key] = [];
              packs[curIndex][key].push(categories[key][i]);
              curCount = 2;
            }
          }
        }
      }
    } else if (typeStyle === type.newStyle) {
      curCount = 0;
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
              packs[curIndex][key].push(categories[key][i]);
              curCount = 1;
            }
          } else {
            if (curCount + 1 <= countString) {
              packs[curIndex][key] = [];
              packs[curIndex][key].push(categories[key][i]);
              curCount++;
            } else {
              packs.push([]);
              curIndex++;
              packs[curIndex][key] = [];
              packs[curIndex][key].push(categories[key][i]);
              curCount = 1;
            }
          }
        }
      }
    }
    console.log(packs);
    return packs;
  };
  searchMinDate = date => {
    let newDate = new Date(date);
    let beginDate = this.state.beginDate;
    if (beginDate === null || beginDate > newDate) {
      this.setState({
        beginDate: newDate
      });
    }
  };
  forcedСrutch = array => {
    let crutch = [];
    array.map(item => {
      crutch.push(item);
      crutch.push(item);
      return item;
    });
    return crutch;
  };

  render() {
    if (this.state.doctors !== null) {
      return (
        <Router>
          <Switch>
            <Route path="/two-week">
              <div className={"twoo-week"}>
                <Carousel
                  arrows={false}
                  responsive={{
                    superLargeDesktop: {
                      // the naming can be any, depends on you.
                      breakpoint: { max: 4000, min: 3000 },
                      items: 5
                    },
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1
                    }
                  }}
                >
                  {this.packDoctors(this.state.doctors, type.twoWeek).map(
                    item => {
                      return (
                        <div>
                          <Table bordered>
                            <Thead
                              type={type.twoWeek}
                              beginDate={this.state.beginDate}
                            />
                            <Tbody
                              id={null}
                              type={type.twoWeek}
                              beginDate={this.state.beginDate}
                              doctors={item}
                            />
                          </Table>
                        </div>
                      );
                    }
                  )}
                </Carousel>
              </div>
            </Route>
            <Route path="/one-week">
              <div className={"one-week"}>
                <Carousel
                  autoPlaySpeed={5000}
                  autoPlay={false}
                  arrows={false}
                  responsive={{
                    superLargeDesktop: {
                      // the naming can be any, depends on you.
                      breakpoint: { max: 4000, min: 3000 },
                      items: 5
                    },
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1
                    }
                  }}
                >
                  {this.forcedСrutch(
                    this.packDoctors(this.state.doctors, type.oneWeek)
                  ).map((item, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div>
                          <Table bordered>
                            <Thead
                              id={1}
                              type={type.oneWeek}
                              beginDate={this.state.beginDate}
                            />
                            <Tbody
                              id={1}
                              type={type.oneWeek}
                              beginDate={this.state.beginDate}
                              doctors={item}
                            />
                          </Table>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <Table bordered>
                            <Thead
                              id={2}
                              type={type.oneWeek}
                              beginDate={this.state.beginDate}
                            />
                            <Tbody
                              id={2}
                              type={type.oneWeek}
                              beginDate={this.state.beginDate}
                              doctors={item}
                            />
                          </Table>
                        </div>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </Route>
            <Route path="/new-style">
              <div className={"new-style"}>
                <Carousel
                  infinite={true}
                  autoPlaySpeed={displayTime}
                  autoPlay={true}
                  arrows={false}
                  responsive={{
                    superLargeDesktop: {
                      // the naming can be any, depends on you.
                      breakpoint: { max: 4000, min: 3000 },
                      items: 5
                    },
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1
                    }
                  }}
                >
                  {this.forcedСrutch(
                    this.packDoctors(this.state.doctors, type.newStyle)
                  ).map((item, index) => {
                    if (index % 2 === 0) {
                      return (
                        <div>
                          <Table bordered>
                            <Thead
                              id={1}
                              type={type.newStyle}
                              beginDate={this.state.beginDate}
                            />
                            <Tbody
                              id={1}
                              type={type.newStyle}
                              beginDate={this.state.beginDate}
                              doctors={item}
                            />
                          </Table>
                        </div>
                      );
                    } else {
                      return (
                        <div className={"new-style"}>
                          <Table bordered>
                            <Thead
                              id={2}
                              type={type.newStyle}
                              beginDate={this.state.beginDate}
                            />
                            <Tbody
                              id={2}
                              type={type.newStyle}
                              beginDate={this.state.beginDate}
                              doctors={item}
                            />
                          </Table>
                        </div>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </Route>
          </Switch>
        </Router>
      );
    } else {
      return null;
    }
  }
}

export default App;
