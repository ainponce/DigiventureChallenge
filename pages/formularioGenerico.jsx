import { Button, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import json from '../models/inputs.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const FormularioGenerico = ({ path }) => {
    return (
        <Form className="d-flex justify-content-center align-items-center">
            <Col md="6">
                <h1 className='d-flex justify-content-center align-item-center'>{json[path].title}</h1>
                {json[path].inputs.map((input, index) => (
                    returnInput(input, index)
                ))}
            </Col>
        </Form>
    );
};

function returnInput(input, index) {
    if (input.type === "link") {
        return <FormGroup key={index}><a target={input.target} href={input.to}>{input.label}</a></FormGroup>
    }

    if (input.type === "button") {
        return <FormGroup key={index} className='d-flex justify-content-end'><Button className='m-2 justify-content-end'>{input.label}</Button></FormGroup>
    }

    if (input.type === "checkbox") {
        return (<><FormGroup key={index} className='d-flex align-items-center mt-2'>
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
        </>)
    }

    return (<>
        <Label for={input.id} className='mr-2'>{input.label}</Label>

        <Input
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
        />
    </>)


}

export default FormularioGenerico;