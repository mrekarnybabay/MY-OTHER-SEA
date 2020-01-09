import React from 'react';
import CarouselItem from 'react-bootstrap/CarouselItem';
import Table from 'react-bootstrap/Table'

import Thead from './Thead';
import Tbody from './Tbody';


function MyCarouselItem(props) {
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

export default MyCarouselItem;