import {
  ICarrier,
  ICreepSpawnArgs,
  ICreepWithRole,
  IDeliverer,
  IHarvester,
} from './interfaces'

export const Harvester: ICreepWithRole & ICarrier & IDeliverer & IHarvester = {
  run(creep: Creep): void {
    if (this.isEmpty(creep)) return this.harvestEnergy(creep)

    if (!this.deliverEnergy(creep)) this.upgradeController(creep)
  },

  getSpawnArgs: (): ICreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Harvester${Game.time}`,
      { memory: { role: 'harvester' } },
    ]
  },

  isFull: (creep: Creep): boolean => {
    return creep.store.getFreeCapacity() === 0
  },

  isEmpty(creep: Creep): boolean {
    return creep.store.getUsedCapacity() === 0
  },

  deliverTo(_structure: Structure): void {
    return
  },

  getClosestEnergySource(creep: Creep): Source {
    return creep.room.find(FIND_SOURCES)[0]
  },

  harvestEnergy(creep: Creep): void {
    const source = this.getClosestEnergySource(creep)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE)
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } })
  },

  deliverEnergy(creep: Creep): boolean {
    const targets = this.getEnergyStructuresThatNeedEnergy(creep)

    // if no buildings need energy, dump it in the upgrade
    if (!targets.length) return false

    //supply the building with energy
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: '#ffffff' },
      })
    }
    return true
  },

  getEnergyStructuresThatNeedEnergy(creep: Creep): Structure[] {
    return creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        )
      },
    })
  },

  upgradeController(creep: Creep): boolean {
    const controller = creep.room.controller
    if (!controller) return false
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE)
      creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } })
    return true
  },
}
