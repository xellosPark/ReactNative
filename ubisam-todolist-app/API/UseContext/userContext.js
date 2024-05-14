import React, { createContext } from 'react';

// 컨텍스트 생성
const UserContext = createContext();

// Provider 컴포넌트
export const UserProvider = UserContext.Provider;

// 컨텍스트 자체를 내보냅니다.
export default UserContext;