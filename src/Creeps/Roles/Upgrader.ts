import { CreepSpawnArgs, CreepWithRole } from './interfaces'

export const Upgrader: CreepWithRole = {
  getSpawnArgs: (): CreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Upgrader${Game.time}`,
      { memory: { role: 'upgrader' } },
    ]
  },

  run: (creep: Creep): void => {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false
      creep.say('🔄 harvest')
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true
      creep.say('⚡ upgrade')
    }

    if (creep.memory.upgrading) {
      const controller = creep.room.controller

      if (
        controller &&
        creep.upgradeController(controller) === ERR_NOT_IN_RANGE
      )
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } })
    } else {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE)
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
    }
  },
}
