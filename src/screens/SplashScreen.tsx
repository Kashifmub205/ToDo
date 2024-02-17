import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {todoSvg} from '../assets/svgs/todoSvg';
import {COLORS} from '../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const SplashScreen = (props: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      props.navigation.navigate('HomeScreen');
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <SvgXml xml={todoSvg} height={hp(25)} width={wp(25)} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
