export const Queries = {
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

  getClosestEnergySource(creep: Creep): Source {
    return creep.room.find(FIND_SOURCES)[0]
  },

  isFull(creep: Creep): boolean {
    console.log('getting free Capacity', creep.store.getFreeCapacity())
    return creep.store.getFreeCapacity() === 0
  },

  isEmpty(creep: Creep): boolean {
    console.log('getting used Capacity', creep.store.getUsedCapacity())
    return creep.store.getUsedCapacity() === 0
  },
}
