import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { SearchIcon } from '../constant/Icons';

export default function({onPress, onChange, value}){
    return (
        <View style={style.view}>
            <View style={style.info}>
                <Text style={style.h2}>Alan adınızı bulun!</Text>
                <Text style={style.p}>Alan adıyla işinizi online ortama taşıyın.</Text>
            </View>
            <View style={style.inputView}>
                <TextInput 
                    style={style.input}
                    placeholder="bir alan adı ara"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={text => onChange(text)}
                />
                <TouchableOpacity 
                    activeOpacity={.8} 
                    style={style.btn}
                    onPress={() => onPress()}
                    >
                    <SearchIcon size={20} color="#ff4800" />
                    <Text style={style.text}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    view: {
        backgroundColor: '#ff4800',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    input: {
        paddingVertical:8,
        paddingHorizontal: 15,
        flex: 1,
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 5
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#ffe4d9',
        marginRight: 5,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center'
    },
    text: {
        color: '#ff4800',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    info: {
        justifyContent: 'center',
        marginBottom: 20
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff'
    },
    p: {
        fontSize: 18,
        color: '#fff'
    }
})