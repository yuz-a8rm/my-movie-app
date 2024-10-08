import { View, Text, StyleSheet, ScrollView } from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router, useLocalSearchParams } from "expo-router";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config";
import { useEffect, useState } from "react";
import { type Memo } from "../../../types/memo";
import Card from "../../components/Card";

const Detail = (): JSX.Element => {
    const id = String(useLocalSearchParams().id);
    const [memo, setMemo] = useState<Memo | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [point, setPoint] = useState<string | null>(null);

    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            const data = memoDoc.data();
            setMemo({
                id: memoDoc.id,
                titleText: data?.titleText ?? '',
                contentText: data?.contentText ?? '',
                updatedAt: data?.updatedAt ?? null,
                point: data?.point ?? '',
            });
            setTitle(data?.titleText ?? '');
            setContent(data?.contentText ?? '');
            setPoint(data?.point ?? '');
        });
        return unsubscribe;
    }, []);

    const handleSave = async () => {
        if (auth.currentUser === null || memo === null) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
        await updateDoc(ref, {
            titleText: title,
            contentText: content,
            point: point,
            updatedAt: new Date()
        });
        router.push('/memo/list');
    };

    return (
        <View style={styles.container}>
            {memo && (
                <Card
                    title={title}
                    content={content}
                    point={point}
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                    onPointChange={setPoint}
                />
            )}
            <ScrollView style={styles.memoBody}></ScrollView>
            <CircleButton onPress={handleSave} style={{ top: 400, bottom: 'auto' }}>
                <Icon name='pencil' size={40} color='#ffffff' />
            </CircleButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    memoBody: {},
});

export default Detail;
