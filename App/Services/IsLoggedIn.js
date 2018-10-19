import React from 'react'
import { get } from "../Api/Util";

export const isLoggedIn = async () => {
        let token =  await get('AUTH_TOKEN');
        return token
};