import {
  IonAvatar,
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getCharacters } from '../services/futuramaApi';
import { Character } from '../types/Character';
import './Home.css';

const Home: React.FC = () => {
  // Estado con la lista de personajes obtenida de la API
  const [characters, setCharacters] = useState<Character[]>([]);
  // Estado de carga
  const [loading, setLoading] = useState<boolean>(true);
  // Estado de error (guarda el mensaje para mostrarlo al usuario)
  const [error, setError] = useState<string | null>(null);

  // Función que consulta la API y actualiza los estados correspondientes
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCharacters();
      setCharacters(data.items);
    } catch (err) {
      console.error('Error al obtener los personajes:', err);
      setError('No se pudieron cargar los personajes. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Permite recargar la lista deslizando hacia abajo (pull to refresh)
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await fetchCharacters();
    event.detail.complete();
  };

  // Devuelve el color del badge según el estado vital del personaje
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'ALIVE':
        return 'success';
      case 'DEAD':
        return 'danger';
      default:
        return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Personajes de Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Indicador de carga */}
        <IonLoading isOpen={loading} message="Cargando personajes..." />

        {/* Estado de error */}
        {!loading && error && (
          <div className="state-container">
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && !error && characters.length === 0 && (
          <div className="state-container">
            <IonText color="medium">
              <p>No se encontraron personajes.</p>
            </IonText>
          </div>
        )}

        {/* Lista de personajes */}
        {!loading && !error && characters.length > 0 && (
          <IonList>
            {characters.map((character) => (
              <IonItem key={character.id} lines="full">
                <IonAvatar slot="start">
                  <img src={character.image} alt={character.name} />
                </IonAvatar>

                <IonLabel>
                  <h2>{character.name}</h2>
                  <p>Género: {character.gender}</p>
                </IonLabel>

                <IonBadge color={getStatusColor(character.status)} slot="end">
                  {character.status}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
