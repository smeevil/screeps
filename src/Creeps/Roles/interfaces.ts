import { CreepRole } from '../../types/memory'

export type CreepSpawnArgs = [
  Array<WORK | CARRY | MOVE>,
  string,
  { memory: { role: CreepRole } }
]

export interface CreepWithRole {
  run: (creep: Creep) => void
  getSpawnArgs: () => CreepSpawnArgs
}
