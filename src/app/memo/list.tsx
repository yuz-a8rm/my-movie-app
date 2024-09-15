import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import { router, useNavigation } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../../config';
import { Memo } from '../../../types/memo';
import CreateProfileCardButton from '../../components/CreateProfileCard';
import LogOutButton from '../../components/LogoutButton';
import Materialicon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

const List: React.FC = () => {
    const [memos, setMemos] = useState<Memo[]>([]);
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => { return <CreateProfileCardButton /> }
        }),
        navigation.setOptions({
            headerLeft: () => { return <LogOutButton /> }
        })
        }, []),


    

    useEffect(() => {
        if (auth.currentUser === null) { return }
        
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
        const q = query(ref, orderBy('updatedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const remoteMemos: Memo[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data() as Memo;
                remoteMemos.push({
                    id: doc.id,
                    titleText: data.titleText,
                    contentText: data.contentText,
                    updatedAt: data.updatedAt,
                    point: data.point,
                });
            });
            setMemos(remoteMemos);
        });

        return unsubscribe;
    }, []);

    const handlePress = () => {
        router.push('/memo/create');
    };

    return (
        <View style={styles.container}>
            <FlatList 
                data={memos}
                renderItem={({ item }) => <MemoListItem memo={item} />}
                keyExtractor={(item) => item.id}
            />
            <CircleButton onPress={handlePress}>
                <Entypo name="plus"  size={40} color='#ffffff' />
            </CircleButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EEEB'
    },
});

export default List;
