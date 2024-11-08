import { IonButton, IonContent, IonDatetime, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useState } from 'react';
import EventoService, { Evento } from '../services/EventoService';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [fecha, setFecha] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [present] = useIonToast();

  const tomarFoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      const base64Data = `data:image/jpeg;base64,${image.base64String}`;
      setFoto(base64Data);
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  };

  const guardarEvento = () => {

    if (!fecha || !titulo || !descripcion) {
      present({
        message: 'Por favor complete todos los campos',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    // Crear objeto de evento
    const nuevoEvento: Evento = {
      fecha,
      titulo,
      descripcion,
      foto
    };

    // Guardar evento usando el servicio
    EventoService.guardarEvento(nuevoEvento);


    // Mostrar mensaje de éxito
    present({
      message: 'Evento guardado correctamente',
      duration: 2000,
      color: 'success'
    });

    // Limpiar formulario
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFecha('');
    setTitulo('');
    setDescripcion('');
    setFoto('');
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de Eventos 🦺</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className="evento-container">
          <IonItem>
            <IonLabel position="stacked">Fecha del Evento</IonLabel>
            <IonDatetime 
              presentation="date"
              value={fecha}
              onIonChange={(e) => setFecha(e.detail.value as string)}
            ></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Título del Evento</IonLabel>
            <IonInput 
              value={titulo}
              onIonChange={e => setTitulo(e.detail.value!)}
              placeholder="Ingrese el título"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea 
              value={descripcion}
              onIonChange={e => setDescripcion(e.detail.value!)}
              placeholder="Describa el evento"
            ></IonTextarea>
          </IonItem>

          <div className="foto-container">
            <IonButton onClick={tomarFoto} fill="outline" color="secondary">
              Tomar Foto
            </IonButton>
            {foto && (
              <IonImg 
                src={foto} 
                className="foto-evento"
                alt="Foto del evento"
              />
            )}
          </div>

          <IonButton 
            expand="block" 
            onClick={guardarEvento}
            color="primary"
            className="btn-guardar"
          >
            Guardar Evento
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
