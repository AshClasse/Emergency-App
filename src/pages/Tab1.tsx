import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Emergencias 911 🚨</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="home-container">
            <h1>Bienvenido al Sistema de Registro de Emergencias</h1>
            <p>
              Nuestra aplicación está diseñada para ayudar a los equipos de 
              emergencia a registrar y gestionar rápidamente información crítica 
              después de cada misión.
            </p>
            <IonImg 
              src="/images/icon-home.png" 
              alt="Imagen de emergencia" 
              className="emergency-image"
            />
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
