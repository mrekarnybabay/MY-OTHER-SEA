import React from 'react';
import type from '../const';

function Thead(props) {
    if(props.type === type.twoWeek){
        return (
            <thead>
            <tr>
                <th scope='col'/>
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
    } else if(props.type === type.oneWeek){
        return (
            <thead>
            <tr>
                <th scope='col'/>
                {
                    Array.apply(null, {length: 7}).map((item, index) => {
                        item = new Date();
                        if(props.id === 2){
                            item.setDate(props.beginDate.getDate() + index + 7);
                        }else{
                            item.setDate(props.beginDate.getDate() + index);
                        }
                        
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
    } else if(props.type === type.newStyle){
        return (
            <thead>
            <tr>
                <th scope='col'/>
                <th scope='col'>Специальность</th>
                {
                    Array.apply(null, {length: 7}).map((item, index) => {
                        item = new Date();
                        if(props.id === 2){
                            item.setDate(props.beginDate.getDate() + index + 7);
                        }else{
                            item.setDate(props.beginDate.getDate() + index);
                        }
                        
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
  }

  export default Thead;