import {createStackNavigator} from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import Welcome from "../screens/Welcome"
import { NavigationContainer } from "@react-navigation/native"
import ListaScreen from "../screens/lista"

const Stack = createStackNavigator()

function MyStack(){
    return (
    <Stack.Navigator>
        <Stack.Screen name="Registro" component={ RegisterScreen}/>
        <Stack.Screen name="Inicio de sesión" component={ LoginScreen}/>
        <Stack.Screen name="Welcome" component={ Welcome}/>
        <Stack.Screen name="Lista" component={ ListaScreen}/>
    </Stack.Navigator>

    )
}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )

}