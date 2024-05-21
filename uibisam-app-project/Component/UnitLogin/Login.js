import React, { useState } from 'react';
import axios from 'axios';
import api from '../../API/api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = async (email, password) => {
    //const ip = `http://localhost:3000`;
    //const ip = `http://192.168.0.136:8877`;
    const ip = `http://192.168.0.140:8877`;
    //const ip = `http://14.58.108.70:8877`;
    //const ip = `http://192.168.45.171:8877`;
    try {
        console.log("Login ip 시도",ip);
        const response = await axios.post(`${ip}/login`, {
            email,
            password,
        });
        const { accessToken, refreshToken } = response.data; // Assuming these are the names used by your server
        try {
            await AsyncStorage.multiSet([
                ["accessToken", accessToken],
                ["refreshToken", refreshToken],
            ]);

            console.log("토큰 저장 성공");
            
            return "success";
        } catch (storageError) {
            console.error("토큰 저장 실패:", storageError);
            return 'TokenFail';
        }

    } catch (error) {
        console.error("로그인 실패:", error);
        return 'fail';
    }
};
export default Login;