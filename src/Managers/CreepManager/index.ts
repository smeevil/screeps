import { Builder, Harvester, Upgrader } from '../../Creeps/Roles'
import _ from 'lodash'
import { ICreepRole } from '../../types/memory'
import { SpawnManager } from '../'

const MIN_CREEPS: { [key in ICreepRole]: number } = {
  harvester: 2,
  builder: 1,
  upgrader: 1,
}

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
    for (const [role, minAmount] of Object.entries(MIN_CREEPS)) {
      const creeps = this.getCreepsByRole(role as ICreepRole)
      if (creeps.length >= minAmount) return
      console.log(`Should spawn a ${role}`)
      SpawnManager.spawnCreep(role as ICreepRole)
    }
  },
}
