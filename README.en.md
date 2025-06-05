🇬🇧 This is the English version. [Spanish Version](README.es.md)

# WildBorn - Game Design Document (GDD)

## Description
In **WildBorn**, you play as a 14-year-old young druid who must overcome a series of trials in a magical forest to become the forest master. Throughout the journey, he will acquire transformations with unique abilities that allow him to progress through each level and face environmental challenges.

## Genre
- 2D Platformer

## Setting
An enchanted forest filled with ancient magic and natural ruins. The world is divided into three main zones: forest, cave, and temple—each with its own atmosphere and unique challenges. The visual aesthetic is inspired by magical tales and vibrant nature.

## Key Features

### Gameplay
- 2D platforming with custom physics
- Dynamic transformations
- Environmental puzzle solving

### Transformations
- **Flying Squirrel**: Glides for a short period. Has a low jump.
- **Snail**: Clings to walls but cannot move.
- **Pufferfish**: Inflates and floats in water. Dies if it stays too long out of it. *(Removed in version 1.0)*
- **Mole**: Digs through the ground and bursts out with force.
- **Chicken**: Inverted controls. Can move stones or objects using its wings.

## Gameplay

### Controls
- **Lateral movement**: `A` (left), `S` (right)
- **Jump**: Spacebar
- **Transformations**:
  - **Squirrel**: Hold space to glide
  - **Mole**: `W`, `A`, `S`, or `D` to dig in that direction
  - **Chicken**: Press space repeatedly to flap and move objects

### Mechanics
- **Real-time** transformation system
- **Interaction** with environment objects (stones, statues)
- **Death/reset system** triggered by dangers like water, fire, or falling

### Objective
Complete the forest levels by acquiring abilities, exploring secrets, and facing a final boss to prove your worth as a druid master.

### Core Loops
- **Jump** and move across platforms
- **Transform** to overcome specific obstacles
- **Explore** to find collectibles
- **Solve puzzles** using acquired abilities

## Interface

### Camera
- Side-scrolling camera that smoothly follows the player
- Special behavior when falling or jumping

### HUD
- Indicators showing collected items

### Menus
- **Main Menu** allows you to select which world to play

## Epics
- World 0 ✅  
- World 1 ✅  
- World 2 ✅  
- World 3 (Work In Progress)  
- Final Boss ✅  
- Basic Mechanics (Druid and all transformations) ✅  
- *Each world features its own soundtrack, unique sprites, and level design*

## Game World

### Levels
- **Level 1 - Forest**: Introduces the snail and squirrel transformations. Teaches basic mechanics and natural environment.
- **Level 2 - Cave**: Dark and confined environment. Unlocks mole and chicken abilities. Focus on puzzles increases.
- **Level 3 - Temple**: Final zone with combined challenges. Prepares players for the final boss fight.

### Collectibles
- Story fragments that reveal the origin of the druid and the ancient forest guardians.

## Characters
- **Druid**: The main protagonist. A young boy seeking to overcome the forest’s trials to become its master.

## Bosses
- **Temple Boss**: The final challenge combining all previous mechanics. Players must use every transformation to defeat it. (Features two attack types: a cross-shaped strike and targeted projectiles)

## Resources

- [Official Trailer](https://youtu.be/eN2waxP5t7Q)  
- [WildBorn - Web Version](https://pedroamp22.github.io/Wildborn/)  
- [Gameplay Pre-World 3](https://youtu.be/8-qKWgo8lrM)

Embark on your journey and prove your worth as a druid in the magical forest world!

