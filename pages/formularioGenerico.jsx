import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import json from '../models/inputs.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioGenerico = ({ path }) => {
    const [country, setCountry] = useState('');
    const [customCountryVisible, setCustomCountryVisible] = useState(false);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        if (selectedCountry === 'other') {
            setCustomCountryVisible(true);
        } else {
            setCustomCountryVisible(false);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        let data;
        const method = json[path].inputs.filter(input => input.type === 'button').map(button => button.method)[0];

        if (method === 'login') {
            data = {
                username: e.target[0].value,
                password: e.target[1].value,
            };
        } else if (method === 'register') {
            data = {
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                country: country === "other" ? e.target.custom_country.value : country,
            };
        }

        console.log("data: ", data);

        // Aquí iría tu lógica de fetch
        // fetch(`http://localhost:3000/${method}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    };

    const returnInput = (input, index) => {
        if (input.type === "link") {
            return <FormGroup key={index}><a target={input.target} href={input.to}>{input.label}</a></FormGroup>;
        }

        if (input.type === "button") {
            return <FormGroup key={index} className='d-flex justify-content-end'><Button className='m-2 justify-content-end'>{input.label}</Button></FormGroup>;
        }

        if (input.type === "checkbox") {
            return (
                <FormGroup key={index} className='d-flex align-items-center mt-2'>
                    <Input
                        className='pr-2'
                        id={input.id}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        required={input.required ? true : false}
                        pattern={input.regex ? input.regex : null}
                    />
                    <Label for={input.id} className='pl-2'>{input.label}</Label>
                </FormGroup>
            );
        }

        if (input.type === "select" && input.name === "country") {
            return (
                <FormGroup key={index} className=''>
                    <Label for={input.id} className='pr-2'>{input.label}</Label>
                    <Input
                        id={input.id}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        onChange={handleCountryChange}
                    >
                        {input.options.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                        ))}
                    </Input>
                </FormGroup>
            );
        }

        if (input.type === "text" && input.name === "custom_country" && customCountryVisible) {
            return (
                <FormGroup key={index}>
                    <Label for={input.id} className='mr-2'>{input.label}</Label>
                    <Input
                        id={input.id}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                    />
                </FormGroup>
            );
        }

        return (
            <FormGroup key={index}>
                <Label for={input.id} className='mr-2'>{input.label}</Label>
                <Input
                    id={input.id}
                    name={input.name}
                    placeholder={input.placeholder}
                    type={input.type}
                />
            </FormGroup>
        );
    };

    return (
        <Form className="d-flex justify-content-center align-items-center" onSubmit={submitForm}>
            <Col md="6">
                <h1 className='d-flex justify-content-center align-item-center'>{json[path].title}</h1>
                {json[path].inputs.map((input, index) => returnInput(input, index))}
            </Col>
        </Form>
    );
};

export default FormularioGenerico;
