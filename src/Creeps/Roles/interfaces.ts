import { ICreepRole } from '../../types/memory'

export type ICreepSpawnArgs = [
  Array<WORK | CARRY | MOVE>,
  string,
  { memory: { role: ICreepRole } }
]

export interface ICreepWithRole {
  run: (creep: Creep) => void
  getSpawnArgs: () => ICreepSpawnArgs
}

export interface ICarrier {
  isFull: (creep: Creep) => boolean
  isEmpty: (creep: Creep) => boolean
}

export interface IDeliverer {
  deliverTo: (structure: Structure) => void
}

export interface IHarvester {
  getClosestEnergySource: (creep: Creep) => Source
  harvestEnergy: (creep: Creep) => void
  deliverEnergy: (creep: Creep) => boolean
  upgradeController: (creep: Creep) => boolean
  getEnergyStructuresThatNeedEnergy: (creep: Creep) => Structure[]
}
