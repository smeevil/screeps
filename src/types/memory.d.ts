export type CreepRole = 'harvester' | 'builder' | 'upgrader'

export interface CreepMemory {
  building: boolean
  upgrading: boolean
  role: CreepRole
}

export interface FlagMemory {}

export interface PowerCreepMemory {}

export interface RoomMemory {}

export interface SpawnMemory {}
