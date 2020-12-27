import {notification} from "antd";

export const notificationError = (message: string) => notification.error({
    message: message.toString(), duration: 7, placement: 'bottomRight'
})
export const notificationSuccess = (message: string) => notification.success({
    message: message.toString(), duration: 7, placement: 'bottomRight'
})