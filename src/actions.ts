import { Queries } from './queries'

export const Actions = {
  upgradeController(creep: Creep): boolean {
    const controller = creep.room.controller
    if (!controller) return false

    creep.say(`🚚⚡️🆙`)
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE)
      creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } })
    return true
  },

  deliverEnergy(creep: Creep): boolean {
    const targets = Queries.getEnergyStructuresThatNeedEnergy(creep)

    // if no buildings need energy, dump it in the upgrade
    if (!targets.length) return false
    creep.say(`🚚⚡️🏢`)
    //supply the building with energy
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: '#ffffff' },
      })
    }
    return true
  },

  harvestEnergy(creep: Creep): boolean {
    creep.memory.harvesting = !Queries.isFull(creep)
    const source = Queries.getClosestEnergySource(creep)
    if (!source) return false
    creep.say(`⛏⚡️`)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE)
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } })
    return true
  },

  goBuild(creep: Creep): boolean {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES)
    if (!targets.length) return false
    creep.say('🚚🚧')
    creep.memory.building = true
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE)
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
    return true
  },
}
