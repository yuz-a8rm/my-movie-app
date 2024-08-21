import { 
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, 
    Alert
    } from "react-native";

    const Card = () => {
        <View style={styles.container}>
                  <Text style={styles.title}>タイトル</Text>
                  <Text style={styles.content}>サンプル</Text>
        </View>

    }

    const styles = StyleSheet.create({
        container: {
            height: 296,
            width: 399,
            backgroundColor: '#FFFFFF',
            // alignContent: 'center',
            // justifyContent: 'center',  // 縦方向に中央揃え
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          content: {
            fontSize: 14,
            color: '#333',
          },
        });

    export default Card