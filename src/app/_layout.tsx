import { Stack } from "expo-router";

const Layout = (): JSX.Element => {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor:'#C5B1AD',
        },
        headerTintColor: '#ffffff',
        headerTitle: 'Movie App',
        headerBackTitle: 'Back',
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold'
        }
    }} />
}

export default Layout