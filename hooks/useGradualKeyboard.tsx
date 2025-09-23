import { useKeyboardHandler } from 'react-native-keyboard-controller'
import { useSharedValue } from 'react-native-reanimated'


const PaddingBottom = 10

const useGradualKeyboard = () => {

    const height = useSharedValue(PaddingBottom)

    useKeyboardHandler({
        onMove: (e) => {
            "worklet";
            height.value = Math.max(e.height, PaddingBottom)
        },
    })

    return {
        height
    }
}

export default useGradualKeyboard