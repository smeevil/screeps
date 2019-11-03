import { Builder, Harvester, Upgrader } from '../Creeps/Roles'
import _ from 'lodash'
import { ICreepRole } from '../types/memory'
import { SpawnManager } from './index'

// Note order also denotes the build queue !
const MIN_CREEPS: Array<{ role: ICreepRole; amount: number }> = [
  { role: 'harvester', amount: 3 },
  { role: 'upgrader', amount: 1 },
  { role: 'builder', amount: 3 },
]

export const CreepManager = {
  getCreepsByRole(role: ICreepRole): Creep[] {
    return _.filter(Game.creeps, (creep: Creep) => creep.memory.role === role)
  },

  cleanMemory(): void {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) delete Memory.creeps[name]
    }
  },

  runCreeps(): void {
    const creeps = Game.creeps
    for (const [_name, creep] of Object.entries(creeps)) {
      switch (creep.memory.role) {
        case 'builder':
          Builder.run(creep)
          break
        case 'upgrader':
          Upgrader.run(creep)
          break
        case 'harvester':
          Harvester.run(creep)
          break
        default:
          break
      }
    }
  },

  ensureSpawnedCreeps(): void {
    MIN_CREEPS.every((creep) => {
      const creeps = this.getCreepsByRole(creep.role)
      if (creeps.length >= creep.amount) return true //next iteration
      return !SpawnManager.spawnCreep(creep.role) // if spawn was accepted, break iteration
    })
  },
}
