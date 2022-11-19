import { getAccordionDetailsUtilityClass } from '@mui/material';
import React, { useState, useEffect } from 'react'

export default function Fetch() {
    //data state // storage
    const [data, setdata] = useState([]);

    useEffect(() => {
        // loadData();
        getData();
    }, []);

    // const loadData = async () => {
    //     await fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(receivedData => {
    //             setdata(receivedData)
    //         }).catch(error => {
    //             console.log("error", error)
    //         })
    //         ;
    // }

    async function getData() {
        const api = `https://jsonplaceholder.typicode.com/users`;
        const result = await fetch(api);
        const getResult = await result.json();
        setdata(getResult);
        console.log(getResult)
    }

    // console.log(data);
    return (
        <>
            <div div style={{ textAlign: 'center' }
            }>
                <p>Fwtch / Async / Await</p>
                {
                    data.map(record => (
                        <div key={record.id}> {record.name}, {record.username} </div>
                    ))
                }

            </div>
        </>
    )
}
