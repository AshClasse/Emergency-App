// src/services/EventoService.ts
import { BehaviorSubject, Observable } from 'rxjs';

export interface Evento {
  fecha: string;
  titulo: string;
  descripcion: string;
  foto: string;
}

class EventoService {
  private STORAGE_KEY = 'eventos';
  
  // BehaviorSubject para manejar el estado de los eventos
  private eventosSubject = new BehaviorSubject<Evento[]>([]);

  constructor() {
    // Cargar eventos almacenados al iniciar
    this.cargarEventosDesdeStorage();
  }

  // Método para cargar eventos desde localStorage
  private cargarEventosDesdeStorage() {
    const eventosGuardados = this.obtenerEventos();
    this.eventosSubject.next(eventosGuardados);
  }

  // Guardar un nuevo evento
  guardarEvento(evento: Evento): void {
    // Obtener eventos actuales
    const eventosActuales = this.eventosSubject.value;
    
    // Agregar nuevo evento
    const nuevosEventos = [...eventosActuales, evento];
    
    // Guardar en localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(nuevosEventos));
    
    // Actualizar el BehaviorSubject
    this.eventosSubject.next(nuevosEventos);
  }

  // Obtener eventos desde localStorage
  obtenerEventos(): Evento[] {
    const eventos = localStorage.getItem(this.STORAGE_KEY);
    return eventos ? JSON.parse(eventos) : [];
  }

  // Observable para suscribirse a cambios de eventos
  obtenerEventosObservable(): Observable<Evento[]> {
    return this.eventosSubject.asObservable();
  }

  // Obtener valor actual de eventos
  obtenerEventosActuales(): Evento[] {
    return this.eventosSubject.value;
  }

  // Eliminar un evento
  eliminarEvento(index: number): void {
    const eventosActuales = this.eventosSubject.value;
    const nuevosEventos = eventosActuales.filter((_, i) => i !== index);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(nuevosEventos));
    this.eventosSubject.next(nuevosEventos);
  }

  // Actualizar un evento
  actualizarEvento(index: number, eventoActualizado: Evento): void {
    const eventosActuales = this.eventosSubject.value;
    const nuevosEventos = [...eventosActuales];
    nuevosEventos[index] = eventoActualizado;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(nuevosEventos));
    this.eventosSubject.next(nuevosEventos);
  }
}

export default new EventoService();