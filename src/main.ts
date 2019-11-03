import { CreepManager, SpawnManager } from './Managers'

export const loop = (): void => {
  console.log(`Current game tick is: ${Game.time}`)
  SpawnManager.logSpawns()
  CreepManager.cleanMemory()
  CreepManager.ensureSpawnedCreeps()
  CreepManager.runCreeps()
}
