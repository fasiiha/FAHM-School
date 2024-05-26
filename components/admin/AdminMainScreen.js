import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"




import AdminDashboard from "./AdminDashboard.js"
import ClassesScreen from "./ClassesScreen.js"
import RecordsScreen from "./RecordsScreen.js"
import FeeScreen from "./FeeScreen.js"
import TimetableScreen from "./TimetableScreen.js"
import SyllabusScreen from "./SyllabusScreen.js"
import AdminLogin from "./AdminLogin.js"


const Drawer = createDrawerNavigator();

const AdminMainScreen = () => {

    
    return(

        <NavigationContainer> 
            <Drawer.Navigator screenOptions={{
                drawerStyle : {
                    paddingVertical: 80,
                    backgroundColor: "#8349EA",
                    width: 250
                },
                drawerLabelStyle: {
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontFamily: 'Poppins-Medium',
                },

                // headerTitle: "Welcome, Admin!",
                headerShadowVisible: false,
                headerLeftLabelVisible: true,
                headerStyle: {
                    backgroundColor: "#8349EA",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    height: 120   
                },

                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 22, 
                },

                drawerActiveTintColor: "#BFA8E5",
                
            }}>
                <Drawer.Screen name = "Dashboard" component={AdminDashboard} options={{
                    // drawerIcon: () =>{
                    //     <Icon name = "home-filled"/>
                    // }
                }} />
                <Drawer.Screen name = "Classes" component={ClassesScreen}/>
                <Drawer.Screen name = "Records"  component={RecordsScreen}/>
                <Drawer.Screen name = "Fee"  component={FeeScreen}/>
                <Drawer.Screen name = "Syllabus"  component={SyllabusScreen}/>
                <Drawer.Screen name = "Timetable"  component={TimetableScreen}/>


                {/* yahan pe iss ko logout karao  */}
                <Drawer.Screen name = "Logout" component={AdminLogin}/>

            </Drawer.Navigator>

        </NavigationContainer>

        // <ScrollView>
        //     <Text>Admin Dashboard</Text>
        // </ScrollView>

    );
}

const styles = StyleSheet.create({



})

export default AdminMainScreen