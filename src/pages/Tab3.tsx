import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonImg,
  IonButton,
  IonAlert
} from '@ionic/react';
import EventoService, { Evento } from '../services/EventoService';
import './Tab3.css';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoParaEliminar, setEventoParaEliminar] = useState<number | null>(null);
  const history = useHistory();

  useEffect(() => {
    // Cargar eventos iniciales
    setEventos(EventoService.obtenerEventosActuales());

    // Suscribirse a cambios de eventos
    const subscription = EventoService.obtenerEventosObservable().subscribe(
      (nuevosEventos) => {
        setEventos(nuevosEventos);
      }
    );

    // Limpiar suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const confirmarEliminacion = (index: number) => {
    setEventoParaEliminar(index);
  };

  const eliminarEvento = () => {
    if (eventoParaEliminar !== null) {
      EventoService.eliminarEvento(eventoParaEliminar);
      setEventoParaEliminar(null);
    }
  };

  const verDetallesEvento = (index: number) => {
    history.push(`/tab4/${index}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listado de Eventos 📃</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {eventos.map((evento, index) => (
            <IonItem key={index} onClick={() => verDetallesEvento(index)}>
              <IonLabel>
                <h2>{evento.titulo}</h2>
                <p>{evento.fecha}</p>
                <p>{ evento.descripcion}</p>
              </IonLabel>
              {evento.foto && (
                <IonImg 
                  src={evento.foto} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              )}
              <IonButton 
                color="danger" 
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se active el clic del item
                  confirmarEliminacion(index);
                }}
              >
                🗑️
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={eventoParaEliminar !== null}
          onDidDismiss={() => setEventoParaEliminar(null)}
          header={'Confirmar Eliminación'}
          message={'¿Estás seguro de que deseas eliminar este evento?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setEventoParaEliminar(null);
              }
            },
            {
              text: 'Eliminar',
              handler: eliminarEvento
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;