import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    FlatList,
    Alert,
    Keyboard
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import getApi from '../constant/Api';
import AsyncStorage from '@react-native-community/async-storage';
import DomainList from '../components/DomainList';

export const getDiffDay = (finish_date) => {
    const u_date = new Date();
    const f_date = new Date(finish_date);
    const diffTime = Math.abs(f_date.getTime() - u_date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

const Main = ({navigation}) => {

    
    const [domain, setDomain] = useState('');
    const [domains, setDomains] = useState([]);
    const [avDomain, setAvaDomains] = useState([]);
    const [userFetch, setUserFetch] = useState(false);

    useEffect(() => {
        const updateStorage = navigation.addListener('focus', () => {
            getAppData()
        });
    
        return updateStorage;
    }, [navigation]);

    useEffect(() => {
        getAppData();
    }, [])

    const getAppData = () => {
        AsyncStorage.getItem('user_domains')
        .then(userConfig => {
            if (userConfig){
                const active_domains = JSON.parse(userConfig).filter(item => item.active === true);
                setAvaDomains(active_domains)
            } else {
                setAvaDomains([{id: 'com', active: true}])
            }
        })
    }

    let onPress = async () => {
        setDomains([]);
        setUserFetch(true);
        Keyboard.dismiss()
        if (domain === ''){
            return Alert.alert(
                'Hata', 
                'Lütfen domain alanını boş bırkamayınız!'
            )
        }
        avDomain.forEach(async (element, index) => {
            const elDomain = domain +'.'+ element.id;
            const getDomainData = await getApi(elDomain);
            const getFollow = JSON.parse(await AsyncStorage.getItem('follow_domains'));
            const schema = {
                gun: getDiffDay(getDomainData.expiresDate),
                id: index,
                domain: elDomain,
                registrarName: getDomainData.registrarName,
                follow: getFollow ? (getFollow.find(it => it.domain === elDomain) ? true : false) : false,
                delDate: getDomainData.expiresDate
            }
            setDomains(dList => [...dList, schema])
        });
    }

    const addFollow = async (item, index, follow) => {
        const getFollow = JSON.parse(await AsyncStorage.getItem('follow_domains'));
        let indexItem = getFollow ? getFollow.findIndex(itemDomain => itemDomain?.domain === item.domain) : -1;
        let addItem = [];

        if(indexItem !== -1){
            getFollow.splice(indexItem, 1);
            addItem = getFollow
        } else if (getFollow){
            item.follow = true;
            addItem = [...getFollow, item];
        } else {
            item.follow = true
            addItem = [item];
        }
        AsyncStorage.setItem('follow_domains', JSON.stringify(addItem));
        setDomains(dList => {
            let newlist = dList;
            newlist[index].follow = !follow;
            return [...newlist]
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <SearchComponent 
                value={domain} 
                onChange={text => setDomain(text)}
                onPress={() => onPress()} 
            />
            {!userFetch ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={style.h3}>Haberdar olun!</Text>
                    <Text style={style.p}>Uygun alan adınızın whois kayıtlarını araştırabilir, uygun olanı kayıt ettirebilir, uygun olmayanları takip edebilirsiniz.</Text>
                </View>
            ) : null}
            {domains.length ? (
                <FlatList
                    style={{paddingHorizontal: 15}}
                    contentContainerStyle={{paddingTop: 20}}
                    data={domains}
                    keyExtractor={_ => _.id.toString()}
                    renderItem={({item, index}) => (
                        <DomainList 
                            item={item}
                            addFollow={() => addFollow(item, index, item.follow)}
                            index={index}
                        />
                    )}
                />
            ) : null}
        </View>
    )
}

const style = StyleSheet.create({
    h3: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
    p: {
        fontSize: 16,
        textAlign: 'center',
        width: '70%',
        textAlign: 'center'
    },
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
    d_name: {
        width: 40,
        height: 40,
        backgroundColor: '#4dd188',
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
export default Main;