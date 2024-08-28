import { View, Text, StyleSheet, ScrollView } from "react-native";

import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";

import { router, useLocalSearchParams } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import { useEffect, useState } from "react";
import { type Memo } from "../../../types/memo";
import Card from "../../components/Card";

const handlePress = ():void => {
    router.push('/memo/edit')
}

interface CardProps {
  title: string;
  content: string;
}

const Detail = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    console.log(id)
    const [memo, setMemo] = useState<Memo | null>(null)
    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos` ,id)
        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            const { titleText , point, contentText, updatedAt } = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                titleText,
                contentText,
                updatedAt,
                point
            })
        })
        return unsubscribe
    }, [])
    return (
        <View style={styles.container}>
            {memo && (
            <Card 
            title={memo.titleText}
            content={memo.contentText}
            point={memo.point}
            onTitleChange={() => {}}
            onContentChange={() => {}}
            onPointChange={() => {}} 
                />
            )}
            <ScrollView style={styles.memoBody}>

            </ScrollView>
            <CircleButton onPress={handlePress} style={{top: 400, bottom: 'auto'}}>
                <Icon name='pencil' size={40} color='#ffffff' />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    memoBody: {

    },

    
})

export default Detail