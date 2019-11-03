import { ICreepSpawnArgs, ICreepWithRole } from './interfaces'
import { Actions } from '../../actions'

export const Upgrader: ICreepWithRole = {
  getSpawnArgs: (): ICreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Upgrader${Game.time}`,
      { memory: { role: 'upgrader' } },
    ]
  },

  run: (creep: Creep): boolean => {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false
      Actions.harvestEnergy(creep)
    }

    if (creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true
      return Actions.upgradeController(creep)
    }

    return Actions.harvestEnergy(creep)
  },
}
