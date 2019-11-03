import { Builder, Harvester, Upgrader } from '../Creeps/Roles'
import { ICreepRole } from '../types/memory'
import { ICreepSpawnArgs } from '../Creeps/Roles/interfaces'

export const SpawnManager = {
  getMainSpawn(): StructureSpawn | null {
    const spawns = Game.spawns
    if (!Object.keys.length) return null
    return Game.spawns[Object.keys(spawns)[0]]
  },

  logSpawns(): void {
    const spawn = SpawnManager.getMainSpawn()
    if (!spawn || !spawn.spawning) return

    const spawningCreep = Game.creeps[spawn.spawning.name]

    spawn.room.visual.text(
      `🛠 ${spawningCreep.memory.role}`,
      spawn.pos.x + 1,
      spawn.pos.y,
      {
        align: 'left',
        opacity: 0.8,
      }
    )
  },

  spawnCreep(creepRole: ICreepRole): boolean {
    const spawn = this.getMainSpawn()
    if (!spawn || spawn.spawning !== null) return false

    const [body, name, options] = ((creepRole): ICreepSpawnArgs => {
      switch (creepRole) {
        case 'harvester':
          return Harvester.getSpawnArgs()
        case 'builder':
          return Builder.getSpawnArgs()
        case 'upgrader':
          return Upgrader.getSpawnArgs()
      }
    })(creepRole)

    spawn.spawnCreep(body, name, options)
    return true
  },
}
