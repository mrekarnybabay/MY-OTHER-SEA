import React from 'react';
import CarouselItem from 'react-bootstrap/CarouselItem';
import Table from 'react-bootstrap/Table'

import Thead from './Thead';
import Tbody from './Tbody';
import type from '../const';


function MyCarouselItem(props) {
    if (props.type === type.twoWeek) {
        return (
            <CarouselItem>
                <Table bordered>
                    <Thead
                        type={props.type}
                        beginDate={props.beginDate}
                    />
                    <Tbody
                        id={null}
                        type={props.type}
                        beginDate={props.beginDate}
                        doctors={props.doctors}
                    />
                </Table>
            </CarouselItem>
        );
    } else if (props.type === type.oneWeek) {
        return (
            <>
                <CarouselItem>
                    <Table bordered>
                        <Thead
                            type={props.type}
                            beginDate={props.beginDate}
                        />
                        <Tbody
                            id={1}
                            type={props.type}
                            beginDate={props.beginDate}
                            doctors={props.doctors}
                        />
                    </Table>
                </CarouselItem>
                <CarouselItem>
                    <Table bordered>
                        <Thead
                            type={props.type}
                            beginDate={props.beginDate}
                        />
                        <Tbody
                            id={2}
                            type={props.type}
                            beginDate={props.beginDate}
                            doctors={props.doctors}
                        />
                    </Table>
                </CarouselItem>
            </>
        );
    } else if (props.type === type.newStyle) {
        return (
            <>
                <CarouselItem>
                    <Table bordered>
                        <Thead
                            type={props.type} 
                            beginDate={props.beginDate}
                        />
                        <Tbody
                            id={1}
                            type={props.type}
                            beginDate={props.beginDate}
                            doctors={props.doctors}
                        />
                    </Table>
                </CarouselItem>
                <CarouselItem>
                    <Table bordered>
                        <Thead
                            type={props.type} 
                            beginDate={props.beginDate}
                        />
                        <Tbody
                            id={2}
                            type={props.type}
                            beginDate={props.beginDate}
                            doctors={props.doctors}
                        />
                    </Table>
                </CarouselItem>
            </>
        );
    }
}

export default MyCarouselItem;