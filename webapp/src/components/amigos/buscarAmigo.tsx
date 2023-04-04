import React, { Component, ChangeEvent, FormEvent } from 'react';
import { getSolidDataset, getThing, getStringNoLocale } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";

interface Props {}

interface State {
  correo: string;
  perfil: any;
  error: string | null;
  cargando: boolean;
}

class BuscarAmigo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      correo: '',
      perfil: null,
      error: null,
      cargando: false
    };
  }

  async buscarUsuario() {
    try {
      const { correo } = this.state;
      console.log("Buscando usuario con correo", correo);
      this.setState({ cargando: true });
      const dataset = await getSolidDataset(`https://${correo}/profile/card`);
      console.log("Dataset encontrado:", dataset);
      const perfil = getThing(dataset, `https://${correo}/profile/card#me`);
      console.log("Perfil encontrado:", perfil);
      if (!perfil) {
        throw new Error('Perfil no encontrado');
      }
      this.setState({ perfil, error: null, cargando: false });
    } catch (error: any) {
      console.error(error);
      this.setState({ perfil: null, error: (error as Error).message, cargando: false });
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ correo: event.target.value });
  }
  
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.buscarUsuario();
  }

  agregarAmigo = () => {
    // Agregar código para enviar una solicitud de amistad al usuario encontrado.
    // Este código aún no está implementado, ya que el proceso de solicitud puede variar
    // según la plataforma de Solid que se esté utilizando.
    alert('Solicitud de amistad enviada');
  }

  render() {
    const { correo, perfil, error, cargando } = this.state;
    console.log("Renderizando con perfil:", perfil);
    return (
      <div className="contenedor_buscador_principal">
        <h1>Buscar Amigo</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Correo:
            <input type="text" value={correo} onChange={this.handleChange} />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {cargando && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {perfil && (
          <div>
            <h2>{getStringNoLocale(perfil, FOAF.name)}</h2>
            <p>WebID: {perfil.getSubject().asRef()}</p>
            <ul>
              <li>Email: {getStringNoLocale(perfil, FOAF.mbox)}</li>
              <li>Teléfono: {getStringNoLocale(perfil, FOAF.phone)}</li>
              <li>Amigos: {perfil.getAllRefs(FOAF.knows).join(', ')}</li>
            </ul>
            <button onClick={this.agregarAmigo}>Agregar amigo</button>
          </div>
        )}
      </div>
    );
  }
  
}

export default BuscarAmigo;

