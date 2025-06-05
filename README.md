🇪🇸 Este archivo está en español. [English Version](README.en.md)

# WildBorn - Game Design Document (GDD)

## Descripción
En **WildBorn**, encarnarás a un joven druida de 14 años que debe superar una serie de pruebas en un bosque mágico para convertirse en maestro del bosque. Durante su viaje, obtendrá transformaciones con habilidades únicas que le permitirán avanzar en cada nivel y enfrentarse a los desafíos del entorno.

## Género
- Videojuego de plataformas

## Ambientación (Setting)
Un bosque encantado lleno de magia ancestral y y ruinas naturales. El mundo se divide en tres zonas principales: bosque, cueva y templo, cada una con su atmósfera y retos únicos. La estética visual es inspirada en cuentos mágicos y naturaleza viva.

## Características principales

### Gameplay
- Plataformas 2D con físicas personalizadas
- Transformaciones dinámicas
- Resolución de puzzles ambientales

### Transformaciones
- **Ardilla voladora**: Planea durante un corto tiempo. Salta muy poco.
- **Caracol**: Se adhiere a paredes, pero no puede moverse.
- **Pez Globo**: Se infla y flota en el agua. Muere si permanece mucho tiempo fuera de ella. (eliminado en la 1.0)
- **Topo**: Puede excavar en la tierra y salir propulsado.
- **Gallina**: Controles invertidos. Puede mover piedras u objetos con las alas.

## Gameplay

### Controles
- **Movimiento lateral**: `A` (izquierda), `S` (derecha)
- **Saltar**: Barra espaciadora
- **Transformaciones**:
  - **Ardilla**: Mantener espacio para planear
  - **Topo**: `W`, `A`, `S` o `D` para excavar en esa dirección
  - **Gallina**: Pulsar espacio repetidamente para aletear y mover objetos

### Mecánicas
- **Transformaciones** en tiempo real
- **Interacción** con objetos del entorno (piedras, estatuas)
- **Sistema de muerte/reinicio** por peligros como agua, fuego o caída

### Objetivo
Superar los niveles del bosque adquiriendo habilidades, explorando secretos y enfrentando un jefe final para demostrar tu valía como maestro druida.

### Core Loops
- **Saltar** y moverse por plataformas
- **Transformarse** para superar obstáculos específicos
- **Explorar** en busca de coleccionables
- **Resolver puzzles** usando las habilidades adquiridas

## Interfaz

### Cámara
- Cámara lateral que sigue al jugador con suavidad
- Ajustes especiales caer o saltar

### HUD
- Indicadores de coleccionables recogidos

### Menús
- **Menú principal** donde puedes seleccionar el mundo que quieres jugar

## Épicas
- Mundo 0 ✅
- Mundo 1 ✅
- Mundo 2 ✅
- Mundo 3 (Work In Progress)
- Jefe Final ✅
- Mecánidas Básicas (Druida y cada transformación) ✅
- *Cada mundo tiene bso propia, sprites únicos y diseños de nievels propios

## Mundo de Juego

### Niveles
- **Nivel 1 - Bosque**: Se aprenden las transformaciones de caracol y ardilla. Introducción al entorno natural y mecánicas básicas.
- **Nivel 2 - Cueva**: Ambiente oscuro y cerrado. Se obtienen las habilidades de topo y gallina. Más énfasis en puzzles.
- **Nivel 3 - Templo**: Zona final llena de retos combinados. Prepara para el enfrentamiento final.

### Coleccionables
- Fragmentos de historia que narran el origen del druida y los antiguos protectores del bosque.

## Personajes
- **Druida**: Protagonista principal. Un joven que busca superar las pruebas del bosque para convertirse en maestro del mismo.

## Jefes
- **Boss Templo**: Prueba final que combina todos los desafíos anteriores. Se debe usar todas las transformaciones para superarlo. (consta de dos ataques, uno en cruz y disparos que van a la posición del jugador)

## Recursos

- [Trailer oficial](https://youtu.be/eN2waxP5t7Q)
- [WildBorn - Versión web](https://pedroamp22.github.io/Wildborn/)
- [Gameplay PreMundo 3](https://youtu.be/8-qKWgo8lrM)

¡Embárcate en tu aventura y demuestra tu valía como druida en el mágico mundo del bosque!
