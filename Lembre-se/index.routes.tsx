import React,{useEffect}from "react";


import {createStackNavigator}from '@react-navigation/stack';




export default function Routes (){
    const Stack = createStackNavigator();  

    return(

        <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
                headerShown:false,
                cardStyle:{
                    backgroundColor:'#FFF'
                }
            }}/>
        


    )
}