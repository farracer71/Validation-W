import React, { useEffect, useState } from 'react';




export default function Getapi() {
    const [all, setAll] = useState([])

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/comments"
        //Get Api

        fetch(url, {
            headers: {
                companyId: '456231897456'
            }
        })
            .then(response => response.json())
            .then(file => {
                console.log("data", file)
                setAll(file)
            }).catch(error => {
                console.log("error", error)
            })
    }, [])

    //post and put api implement
    const postPutEvent = () => {
        const url = data.id
            ? "https://jsonplaceholder.typicode.com/comments" + data.id
            : "https://jsonplaceholder.typicode.com/comments"
        const data = {
            id: 'def234',
            name: 'nil',
            mobile: '6589231470',
            designation: 'developer',
            pin: '456789'
        }
        fetch(url, {
            method: data.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log("response", response)
                if (response.state == 200) {
                    alert("success")
                }
            }).catch(error => {
                console.log("error", error)
            })

    }
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h2>Welcome</h2>
                {
                    all.map(item => {
                        return (
                            <div> {item.email} </div>
                        )
                    })
                }
                <button onClick={postPutEvent} > submit </button>
            </div>
        </>
    )
}
