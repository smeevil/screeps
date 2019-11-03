import { ICreepSpawnArgs, ICreepWithRole } from './interfaces'
import { Actions } from '../../actions'
import { Queries } from '../../queries'

export const Harvester: ICreepWithRole = {
  run(creep: Creep): boolean {
    const empty = Queries.isEmpty(creep)
    if (empty && !creep.memory.harvesting) return Actions.harvestEnergy(creep)

    if (!creep.memory.harvesting) {
      return Actions.deliverEnergy(creep) || Actions.upgradeController(creep)
    }

    return Actions.harvestEnergy(creep)
  },

  getSpawnArgs: (): ICreepSpawnArgs => {
    return [
      [WORK, CARRY, MOVE],
      `Harvester${Game.time}`,
      { memory: { role: 'harvester', harvesting: false } },
    ]
  },
}
