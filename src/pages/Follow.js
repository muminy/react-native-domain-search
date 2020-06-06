import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import { CancelIcon, KalpIcon } from '../constant/Icons';
import { useIsFocused  } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { getDiffDay } from './Main';

const Follow = ({navigation}) => {

    const [follow, setFollow] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFollow()
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getFollow()
    }, [])

    const getFollow = () => {
        AsyncStorage.getItem('follow_domains')
        .then(value => {
            if(value){
                setFollow(JSON.parse(value));
            } else {
                setFollow([])
            }
        })
    }

    const addFollow = async (item, index) => {
        const getFollow = JSON.parse(await AsyncStorage.getItem('follow_domains'));

        let indexItem = getFollow ? getFollow.findIndex(itemDomain => itemDomain?.domain === item.domain) : -1;
        let addItem = [];
        if(indexItem !== -1){
            getFollow.splice(indexItem, 1);
            addItem = getFollow
        } else if (getFollow){
            addItem = [...getFollow, item];
        } else {
            addItem = [item];
        }


        AsyncStorage.setItem('follow_domains', JSON.stringify(addItem));
        AsyncStorage.getItem('follow_domains')
        .then(value => {
            if(value){
                setFollow(JSON.parse(value));
            } else {
                setFollow([])
            }
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFF', paddingVertical: 20}}>
            <View style={{paddingHorizontal: 15, marginBottom: 20}}>
                <Text style={style.h3}>Takiplerin</Text>
                <Text style={style.p}>Takip listen günlük olarak güncellenir</Text>
            </View>
            {follow.length ? (
                <FlatList
                    style={{paddingHorizontal: 15}}
                    data={follow}
                    keyExtractor={_ => _.domain}
                    renderItem={({item, index}) => (
                        <View style={style.domains}>
                                <View style={[style.d_name, { backgroundColor: item.registrarName === 'MISSING_WHOIS_DATA' ? '#4dd188' : '#ff4800'}]}>
                                    <Text style={style.gun}>{
                                        item.registrarName === 'MISSING_WHOIS_DATA'
                                            ? 'BOŞ'
                                            : getDiffDay(item.delDate)
                                    }</Text>
                                </View>
                                <View style={{marginLeft: 15, marginRight: 'auto'}}>
                                    <Text style={style.domain}>{item.domain}</Text>
                                    <Text numberOfLines={1} style={style.marka}>{
                                        item.registrarName === 'MISSING_WHOIS_DATA' 
                                            ? 'Domain Boşta' 
                                            : item.registrarName
                                    }</Text>
                                </View>
                                <TouchableOpacity 
                                    style={[style.follow_et, { backgroundColor: item.follow ? "#ff4800" : "#eee"}]}
                                    onPress={() => addFollow(item, index, item.follow)}>
                                    <KalpIcon size={20} color={item.follow ? "#fff" : "#111"} />
                                </TouchableOpacity>
                            </View>
                    )}
                />
            ) : (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={style.h3}>Buralar boş!</Text>
                    <Text style={[style.p, { width: '50%', textAlign: 'center'}]}>Henüz takip ettiğin herhangi bir domain bulunmamakta</Text>
                </View>
            )}
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
export default Follow;