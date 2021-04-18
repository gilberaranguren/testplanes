import './App.css';
import { Component } from 'react';
import { Row, Col, Form, Input, Label, FormGroup, Button, FormFeedback } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rut: '',
      renta: '',
      mensajeRut: '',
      mensajeRenta: '',
      invalidRut: false,
      invalidRenta: false,
      planes: [],
      selectedPlan: '',


    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  onSubmit = e => {
    e.preventDefault();
    const request = {
      selectedPlan: this.state.selectedPlan,
      rut: this.state.rut,
    }
    //Enviar formulario 
    console.log("Se envian los datos " + JSON.stringify(request));

  }

  async onClick() {
    const myHeaders = new Headers();

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      //mode: 'cors',
      cache: 'default'
    };

    const myRequest = new Request(`http://localhost:3001/planes/${this.state.renta}`, myInit);

    const response = await fetch(myRequest);
    const planes = await response.json();
    this.setState({
      planes
    })
    //console.log(response.json());
  }

  onChange = async e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
    //await this.getPlanes();
  }

  
  

  render() {
    return (
      <div>
        <Row>
          <Col xs="3"></Col>
          <Col xs="6">
            <h2>Busqueda de Planes</h2>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Rut</Label>
                <Input type="text" name="rut" value={this.state.rut} onChange={this.onChange} />

              </FormGroup>
              <FormGroup>
                <Label>Renta</Label>
                <Input type="text" name="renta" value={this.state.renta} onChange={this.onChange}  />
                <Button color="link" onClick={this.onClick}>Planes</Button>
              </FormGroup>
              {
                this.state.planes.map(key => (
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="selectedPlan" onChange={this.onChange} value={key.CodigoPlan} />{' '}
                      Nombre: {key.Nombre} - Precio: {key.precio}
                    </Label>
                  </FormGroup>
                ))
              }

              <FormGroup>
                <Button color="success">Enviar</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

      </div>

    )
  }


}

export default App;
