import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from '../constant/Icons'

export default function(){
    const nav = useNavigation();
    return (
        <View style={style.view}>
            <TouchableOpacity 
                activeOpacity={.5} 
                onPress={() => nav.goBack()}
                style={style.btn}
            >
                <ArrowLeft size={30} color="#111" />
                <Text style={style.text}>Ayarlar</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        height: 50,
    },
    text: {
        fontSize: 16,
        lineHeight: 26
    },
    btn: {
        flexDirection: 'row'
    }
})