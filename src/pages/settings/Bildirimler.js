import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Switch,
} from 'react-native';
import Header from '../../components/Header';

const Bildirimler = () => {
   
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <Header />
            <View style={{paddingHorizontal: 15, marginBottom: 20}}>
                <Text style={style.h3}>Bildirimler</Text>
                <Text style={style.p}>Bildirimleri açarak tüm gelişmelerden haberdar olabilirsiniz</Text>
            </View>
            <View style={style.bildirimler}>
                <View style={style.mr}>
                    <Text style={style.title}>Boşa düşen domailer</Text>
                    <Text>Açık</Text>
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
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
    },
    bildirimler: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    mr: {
        marginRight: 'auto'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    }
})
export default Bildirimler;