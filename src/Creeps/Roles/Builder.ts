import { ICreepSpawnArgs, ICreepWithRole } from './interfaces'
import { Actions } from '../../actions'
import { Queries } from '../../queries'

export const Builder: ICreepWithRole = {
  getSpawnArgs: (): ICreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Builder${Game.time}`,
      { memory: { role: 'builder', building: false, harvesting: false } },
    ]
  },

  run: (creep: Creep): boolean => {
    if (creep.memory.harvesting && !Queries.isFull(creep))
      return Actions.harvestEnergy(creep)

    creep.memory.harvesting = false

    if (creep.memory.building && Queries.isEmpty(creep)) {
      creep.memory.building = false
      return Actions.harvestEnergy(creep)
    }

    if (!Queries.isEmpty(creep) && Actions.goBuild(creep)) return true

    creep.memory.building = false
    return Actions.harvestEnergy(creep)
  },
}
