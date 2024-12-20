import { View } from "react-native"
import Library from "../components/Library"
import MenuPanel from "../components/MenuPanel";

const LibraryScreen = () => {
    return (
        <View style={styles.container}>
            <Library />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 0
    }
}

export default LibraryScreen;