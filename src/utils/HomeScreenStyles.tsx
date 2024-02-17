import {StyleSheet} from 'react-native';
import {COLORS} from './appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  footer: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingBottom: 50,
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    justifyContent: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 1,
    marginRight: wp(2),
    marginTop: hp(3),
    borderRadius: 30,
    padding: hp(0.5),
    bottom: hp(1.5),
    justifyContent: 'center',
  },
  iconContainer: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    bottom: hp(0.2),
    // top: hp(1),
    // marginTop: hp(2),

    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: hp(1),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.border,
    marginVertical: hp(0.5),

    gap: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
