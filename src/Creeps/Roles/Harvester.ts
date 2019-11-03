import { CreepRole } from '../../types/memory'
import { CreepSpawnArgs, CreepWithRole } from './interfaces'

export const Harvester: CreepWithRole = {
  getSpawnArgs: (): CreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Harvester${Game.time}`,
      { memory: { role: 'harvester' } },
    ]
  },

  run: (creep: Creep): void => {
    // we have capacity so search for things to store
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE)
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
    } else {
      const targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        },
      })
      if (
        targets.length > 0 &&
        creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' },
        })
      }
    }
  },
}
