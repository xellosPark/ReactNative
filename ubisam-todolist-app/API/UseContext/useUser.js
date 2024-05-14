import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

function useUser() {
    const [user, setUser] = useState(null);

    // 사용자 데이터를 API에서 로드하는 함수
    const loadUser = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            const decoded = decodeJWT(token);
            if (decoded) {
                const userData = { id : decoded.id, name : decoded.name };
                setUser(userData);
            } else {
                console.error("토큰 디코드 에러");
                setUser(null);
            }
            
        } else {
            console.error("토큰 에러");
            setUser(null);
        }
    };

    const decodeJWT = (token) => {
        try {
            //console.log('token 11', token);
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid token: The JWT must have three parts');
            }
    
            const header = JSON.parse(base64decode(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            //const payload = JSON.parse(base64decode(parts[1].replace(/-/g, '+').replace(/_/g, '/'))); //한글없이는 이렇게 사용가능
            const payloadEncoded = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const payloadDecoded = base64decode(payloadEncoded);
            
            const decoder = new TextDecoder('utf-8');
            const payloadUtf8 = decoder.decode(new Uint8Array(Array.from(payloadDecoded).map(char => char.charCodeAt(0))));
            const payload = JSON.parse(payloadUtf8);
            //console.log("Decoded Header:", header);
            //console.log("Decoded Payload:", payload);
    
            return { header, payload };
        } catch (error) {
            console.error("Failed to decode JWT:", error);
            return null;
        }
    }
    

    // 사용자 데이터 업데이트
    const updateUser = (updates) => {
        setUser(current => (current ? { ...current, ...updates } : null));
    };

    // 사용자 데이터 초기화
    const clearUser = () => {
        setUser(null);
    };

    // 컴포넌트 마운트 시 사용자 데이터 로드
    useEffect(() => {
        loadUser();
    }, []);

    return { user, updateUser, clearUser };
}