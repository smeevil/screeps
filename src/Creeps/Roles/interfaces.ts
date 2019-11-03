import { CreepMemory } from '../../types/memory'

export type ICreepSpawnArgs = [
  Array<WORK | CARRY | MOVE>,
  string,
  { memory: CreepMemory }
]

export interface ICreepWithRole {
  run: (creep: Creep) => boolean
  getSpawnArgs: () => ICreepSpawnArgs
}

export interface ICarrier {
  isFull: (creep: Creep) => boolean
  isEmpty: (creep: Creep) => boolean
}

export interface IDeliverer {
  deliverTo: (structure: Structure) => void
}

