import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { KalpIcon } from '../constant/Icons';
import { getDiffDay } from '../pages/Main';


export default function ({addFollow, item, index}) {
    return (
        <View style={style.domains}>
            <View style={[style.d_name, { backgroundColor: item.registrarName === 'NOT_FOUND' ? '#4dd188' : '#ff4800' }]}>
                <Text style={style.gun}>{
                    item.registrarName === 'NOT_FOUND'
                        ? 'BOŞ'
                        : getDiffDay(item.delDate)
                }</Text>
            </View>
            <View style={{ marginLeft: 15, marginRight: 'auto' }}>
                <Text style={style.domain}>{item.domain}</Text>
                <Text numberOfLines={1} style={style.marka}>{
                    item.registrarName === 'NOT_FOUND'
                        ? 'Domain Boşta'
                        : item.registrarName
                }</Text>
            </View>
            <TouchableOpacity
                style={[style.follow_et, { backgroundColor: item.follow ? "#ff4800" : "#eee" }]}
                onPress={() => addFollow()}>
                <KalpIcon size={20} color={item.follow ? "#fff" : "#111"} />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    domains: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    domain: {
        fontSize: 19,
        fontWeight: 'bold',
        lineHeight: 20
    },
    gun: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    h3: {
        fontWeight: 'bold',
        fontSize: 30
    },
    p: {
        fontSize: 16
    },
    d_name: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    marka: {
        fontSize: 14,
        color: '#7a7a7a'
    },
    follow_et: {
        padding: 8,
        borderRadius: 40,
        backgroundColor: '#eee'
    }
})