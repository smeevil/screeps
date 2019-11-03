import { CreepManager } from './Managers/CreepManager'
import { SpawnManager } from './Managers/SpawnManager'

export const loop = (): void => {
  console.log(`Current game tick is: ${Game.time}`)
  SpawnManager.logSpawns()
  CreepManager.cleanMemory()
  CreepManager.ensureSpawnedCreeps()
  CreepManager.runCreeps()
}
