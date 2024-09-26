import noble from '@abandonware/noble'
import { Buffer } from 'node:buffer'
import 'dotenv/config'

let controlChar: noble.Characteristic

noble.on('stateChange', async (state) => {
  console.log('[BLE] stateChange: %s', state)

  if (state === 'poweredOn') {
    await noble.startScanningAsync()
  }
})

noble.on('scanStart', () => {
  console.log('[BLE] scanStart')
})

noble.on('scanStop', () => {
  console.log('[BLE] scanStop')
})

noble.on('discover', async (device) => {
  console.log('[BLE] found device [%s] [%s]', device.advertisement.localName, device.uuid)

  if (device.uuid === process.env.GOVEE_H6047_UUID) {
    await noble.stopScanningAsync()
    await connect(device)
  }
})

async function connect(device: noble.Peripheral) {
  device.on('connect', () => {
    console.log('[BLE] connect')
  })

  device.on('disconnect', () => {
    console.log('[BLE] disconnect')
  })

  await device.connectAsync()

  console.log('[BLE] discoverAllServicesAndCharacteristicsAsync')
  const { characteristics } = await device.discoverAllServicesAndCharacteristicsAsync()

  Object.values(characteristics).forEach((char) => {
    if (char.uuid === '000102030405060708090a0b0c0d2b11') {
      controlChar = char
    }
  })

  if (!controlChar) {
    console.log('could not find control characteristic')
  }

  // 330513634b00000000000000000000000000000d -> music from internal microphone
  // 330513634b00000100000000000000000000000c -> music from headphones
  // 3360010100000000000000000000000000000053 -> start music dreamview

  console.log('[BLE] writing')
  await controlChar.writeAsync(Buffer.from('330513634b00000100000000000000000000000c', 'hex'), false) // music from headphones
  await controlChar.writeAsync(Buffer.from('3360010100000000000000000000000000000053', 'hex'), false) // start music dreamview

  await device.disconnectAsync()

  process.exit(0)
}
