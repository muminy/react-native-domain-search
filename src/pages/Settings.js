import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import { ArrowRight } from '../constant/Icons';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from '../constant/appRoute';

const Settings = () => {

    const nav = useNavigation();
    return (
        <View style={{flex: 1, backgroundColor: '#FFF', paddingVertical: 20}}>
            <View style={{paddingHorizontal: 15, marginBottom: 20}}>
                <Text style={style.h3}>Ayarlar</Text>
                <Text style={style.p}>Arama optimizasyonu, bildirim ve tema ayarlarını özelleştirebilirsiniz!</Text>
            </View>
            <TouchableOpacity 
                activeOpacity={.5}
                onPress={() => nav.navigate(AppRoute.SETTINGS.D_FILTER)} 
                style={style.org} 
            >
                <View style={{marginRight: 'auto'}}>
                    <Text style={style.title}>Aranacak Domain</Text>
                    <Text style={style.value}>.com, .net, .org</Text>
                </View>
                <ArrowRight size={30} color="#111" />
            </TouchableOpacity>
            {/* <TouchableOpacity 
                activeOpacity={.5}
                onPress={() => nav.navigate(AppRoute.SETTINGS.NOTIFY)} 
                style={style.org} 
            >
                <View style={{marginRight: 'auto'}}>
                    <Text style={style.title}>Bildirimler</Text>
                    <Text style={style.value}>20 Gün kala</Text>
                </View>
                <ArrowRight size={30} color="#111" />
            </TouchableOpacity>
            <TouchableOpacity style={style.org}>
                <View style={{marginRight: 'auto'}}>
                    <Text style={style.title}>Tema</Text>
                    <Text style={style.value}>Dark Tema</Text>
                </View>
                <ArrowRight size={30} color="#111" />
            </TouchableOpacity> */}
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
    org: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19
    }
})
export default Settings;