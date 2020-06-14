import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import Header from '../../components/Header';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

const DomainFilters = () => {

    const [dlist, setDlist] = useState([]);

    const ChangeCheckbox = (text, index) => {
        setDlist(rows => {
            rows[index].active = text;
            return [...rows]
        });
        let rows = dlist;
        rows[index].active = text;
        AsyncStorage.setItem('user_domains', JSON.stringify(rows));
    }

    useEffect(() => {
        getDomains();
    }, [])
    
    const DefaultAvaDomains = [
        {id: 'com', active: true},
        {id: 'org', active: false},
        {id: 'net', active: false},
        {id: 'io', active: false},
        {id: 'app', active: false}
    ];

    const getDomains = async () => {
        const domains = await AsyncStorage.getItem('user_domains');
        if(domains){
            setDlist(JSON.parse(domains));
        } else {
            AsyncStorage.setItem('user_domains', JSON.stringify(DefaultAvaDomains));
            setDlist(DefaultAvaDomains);
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <Header />
            <View style={{paddingHorizontal: 15, marginBottom: 20}}>
                <Text style={style.h3}>Domain Filtre</Text>
                <Text style={style.p}>Arama kısmında görmek istediğiniz domain uzantılarını seçebilirsiniz.</Text>
            </View>
            {dlist.length ? (
                <FlatList
                    data={dlist}
                    keyExtractor={_ => _.id}
                    renderItem={({item, index}) => (
                        <View style={style.dlist}>
                            <Text style={style.item}>{item.id}</Text>
                            <CheckBox
                                disabled={false}    
                                value={item.active}
                                onValueChange={text => ChangeCheckbox(text, index)}
                            />
                        </View>
                    )}
                />
            ) : null}
        </View>
    )
}


const style = StyleSheet.create({
    h3: {
        fontWeight: 'bold',
        fontSize: 30
    },
    p: {
        fontSize: 16
    },
    dlist: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 5
    },
    item: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 'auto'
    }
})
export default DomainFilters;