import { Builder, Harvester, Upgrader } from '../../Creeps/Roles'
import { CreepRole } from '../../types/memory'
import { CreepSpawnArgs } from '../../Creeps/Roles/interfaces'

export const SpawnManager = {
  logSpawns(): void {
    const spawn = Game.spawns[0]
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

  spawnCreep(creepRole: CreepRole): void {
    const [body, name, options] = ((creepRole): CreepSpawnArgs => {
      switch (creepRole) {
        case 'harvester':
          return Harvester.getSpawnArgs()
        case 'builder':
          return Builder.getSpawnArgs()
        case 'upgrader':
          return Upgrader.getSpawnArgs()
      }
    })(creepRole)

    const spawn = Object.keys(Game.spawns)[0]
    if (!spawn) return
    Game.spawns[spawn].spawnCreep(body, name, options)
  },
}
