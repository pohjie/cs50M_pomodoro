import {Vibration} from 'react-native'

export function vibrate() {
  Vibration.vibrate([500, 500, 500])
}
