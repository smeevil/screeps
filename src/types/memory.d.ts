export type ICreepRole = 'harvester' | 'builder' | 'upgrader'

export interface CreepMemory {
  building: boolean
  upgrading: boolean
  role: ICreepRole
}

export interface FlagMemory {}

export interface PowerCreepMemory {}

export interface RoomMemory {}

export interface SpawnMemory {}
