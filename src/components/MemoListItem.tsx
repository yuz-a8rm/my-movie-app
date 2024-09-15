import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { db, auth } from "../config";
import { doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

import Icon from "./icon";
import { type Memo } from "../../types/memo";

interface Props {
    memo: Memo
}

const handlePress = ( id: string):void => {
    if (auth.currentUser === null) { return }
    const ref = doc( db, `users/${auth.currentUser.uid}/memos` , id)
    Alert.alert('メモを削除します', 'よろしいですか？', [
        {
            text: 'キャンセル'
        },
        {
            text: '削除する',
            style: 'destructive',
            onPress: () => {
                deleteDoc(ref)
                .catch(() => Alert.alert('削除に失敗しました'))
            }
        }
    ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
    const { memo } = props
    
    const { contentText, updatedAt, titleText, point } = memo
    if ( contentText === null || updatedAt === null) { return null }
    const  dateString = updatedAt.toDate().toLocaleString('ja-JP')

    return (
        <Link
         href={{ pathname: '/memo/detail', params: { id: memo.id } } } 
         asChild>
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListItemPoint}>{point}</Text>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{titleText}</Text>
                    <Text numberOfLines={1} style={styles.memoListItemContent}>{contentText}</Text>
                    <Text style={styles.memoListItemDate}>{dateString}</Text>

                </View>
                <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
                    <Icon name='delete' size={32} color='#b0b0b0' />
                </TouchableOpacity>
            </TouchableOpacity>
            </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem :{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: 400,
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
    },
    memoListItemTitle :{
        fontSize: 20,
        lineHeight: 32,
        color: '#C5B1AD',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    memoListItemContent :{
        fontSize: 16,
        lineHeight: 32,
        color: '#C5B1AD',

    },
    memoListItemDate :{
        fontSize: 12,
        lineHeight: 16,
        color: '#C5B1AD'

    },
    memoListItemPoint :{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        color: '#C5B1AD'
    }
})

export default MemoListItem

