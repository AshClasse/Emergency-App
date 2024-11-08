import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonImg 
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import EventoService from '../services/EventoService';

const Tab4: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventos = EventoService.obtenerEventosActuales();
  const evento = eventos[parseInt(id)];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del Evento 📋</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{evento.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p><strong>Descripción:</strong> {evento.descripcion}</p>
            
            {evento.foto && (
              <IonImg 
                src={evento.foto} 
                alt="Foto del evento" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px', 
                  objectFit: 'contain' 
                }} 
              />
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;