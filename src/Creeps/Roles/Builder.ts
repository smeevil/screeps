import { CreepSpawnArgs, CreepWithRole } from './interfaces'

export const Builder: CreepWithRole = {
  getSpawnArgs: (): CreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Builder${Game.time}`,
      { memory: { role: 'builder' } },
    ]
  },

  run: (creep: Creep): void => {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false
      creep.say('🔄 harvest')
    }
    if (!creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = true
      creep.say('🚧 build')
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES)
      if (targets.length && creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' },
        })
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE)
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
    }
  },
}
