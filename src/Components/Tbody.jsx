import React from 'react';
import TrCategory from './TrCategory';
import TrDoctors from './TrDoctors';


function Tbody(props) {
    return (
        <tbody>
            {
                Object.keys(props.doctors).map(item => {
                    return (
                        <>
                            <TrCategory
                                type={props.type}
                                categoryName={item}
                            />
                            {
                                props.doctors[item].map((doctor) => {
                                    return (    
                                        <TrDoctors
                                            id={props.id}
                                            type={props.type}
                                            categoryName={item}
                                            doctor={doctor}
                                            beginDate={props.beginDate}
                                        />
                                    )
                                })
                            }
                        </>
                    )
                })
            }
        </tbody>
    );
}

export default Tbody;