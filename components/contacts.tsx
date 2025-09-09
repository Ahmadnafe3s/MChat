import React from 'react'
import { FlatList } from 'react-native'
import ChatCard from './ChatCard'

interface Props {
    filter: string
}

const chats = [
    {
        "id": 437038,
        "name": "Ankita",
        "phone": "919044200277",
        "formatted": "A",
        "status": "Active",
        "unread_count": 5,
        "last_message": "Our Services",
        "last_chat": "17:11 PM",
        "is_starred": ""
    },
    {
        "id": 437039,
        "name": "Saumya",
        "phone": "919044200277",
        "formatted": "A",
        "status": "Active",
        "unread_count": 0,
        "last_message": "What is the price of your services , please can you let me know i want to purchase your service",
        "last_chat": "17:11 PM",
        "is_starred": ""
    }
]

const Contacts = ({ filter = 'All Chats' }: Props) => {

    return (
        <FlatList
            data={chats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ChatCard data={item} />
            )}
            contentContainerStyle={{
                paddingHorizontal: 10,
                gap: 5,
            }}
        />
    )
}


export default Contacts