import { useState, useEffect, useRef } from "react";

export const getFile = (e) => {

    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;

};

export const getBase64 = (info) => {
    
    return  new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(info.file.originFileObj);
        reader.onload = () => {
            const base64String = reader.result;
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });

};
